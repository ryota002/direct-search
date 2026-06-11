const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const PORT = Number(process.env.PORT || 8000);
const HOST = process.env.HOST || "0.0.0.0";
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";
const ROOT = path.dirname(__dirname);
const CURRENT_YEAR = new Date().getFullYear();
const API_CACHE_MS = Number(process.env.API_CACHE_MS || 10 * 60_000);
const API_CACHE_MAX = Number(process.env.API_CACHE_MAX || 200);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

const apiCache = new Map();

const demoLeads = [
  {
    name: "桜丘デンタルクリニック",
    industry: "歯科クリニック",
    address: "東京都世田谷区桜丘",
    url: "https://example.jp/sakuragaoka-dental",
    distance: 1.8,
    lastUpdated: 2021,
    phone: "03-0000-1122",
    contact: "問い合わせフォーム",
    contactChannels: [
      { type: "phone", label: "電話", value: "03-0000-1122", source: "demo" },
      { type: "form", label: "フォーム", value: "問い合わせフォーム", source: "demo" },
    ],
    source: "demo",
    websiteSource: "demo",
    signals: {
      oldDesign: true,
      weakMobile: true,
      brokenLayout: false,
      staleContent: true,
      weakCta: true,
      slowPage: false,
      lowTrustVisuals: true,
    },
    evidence: ["デモデータ: 古いHP、スマホ対応、更新停止を想定"],
  },
  {
    name: "青葉美容皮膚科",
    industry: "美容皮膚科・美容クリニック",
    address: "東京都世田谷区三軒茶屋",
    url: "https://example.jp/aoba-skin",
    distance: 3.2,
    lastUpdated: 2020,
    phone: "03-0000-3344",
    contact: "メール",
    contactChannels: [
      { type: "phone", label: "電話", value: "03-0000-3344", source: "demo" },
      { type: "email", label: "メール", value: "info@example.jp", source: "demo" },
      { type: "instagram", label: "Instagram", value: "https://instagram.com/example", source: "demo" },
    ],
    source: "demo",
    websiteSource: "demo",
    signals: {
      oldDesign: true,
      weakMobile: true,
      brokenLayout: true,
      staleContent: true,
      weakCta: true,
      slowPage: true,
      lowTrustVisuals: false,
    },
    evidence: ["デモデータ: 表示崩れとページの重さを想定"],
  },
  {
    name: "成城こども内科",
    industry: "内科・小児科",
    address: "東京都世田谷区成城",
    url: "https://example.jp/seijo-kids",
    distance: 5.6,
    lastUpdated: 2023,
    phone: "03-0000-5566",
    contact: "問い合わせフォーム",
    contactChannels: [
      { type: "phone", label: "電話", value: "03-0000-5566", source: "demo" },
      { type: "form", label: "フォーム", value: "問い合わせフォーム", source: "demo" },
      { type: "line", label: "LINE", value: "https://line.me/R/ti/p/example", source: "demo" },
    ],
    source: "demo",
    websiteSource: "demo",
    signals: {
      oldDesign: false,
      weakMobile: true,
      brokenLayout: false,
      staleContent: false,
      weakCta: true,
      slowPage: false,
      lowTrustVisuals: true,
    },
    evidence: ["デモデータ: スマホ導線と信頼要素を改善余地として想定"],
  },
  {
    name: "用賀整形外科クリニック",
    industry: "整形外科・整体に近いクリニック",
    address: "東京都世田谷区用賀",
    url: "https://example.jp/yoga-ortho",
    distance: 2.7,
    lastUpdated: 2019,
    phone: "03-0000-7788",
    contact: "電話・フォーム",
    contactChannels: [
      { type: "phone", label: "電話", value: "03-0000-7788", source: "demo" },
      { type: "form", label: "フォーム", value: "問い合わせフォーム", source: "demo" },
    ],
    source: "demo",
    websiteSource: "demo",
    signals: {
      oldDesign: true,
      weakMobile: false,
      brokenLayout: true,
      staleContent: true,
      weakCta: false,
      slowPage: true,
      lowTrustVisuals: true,
    },
    evidence: ["デモデータ: 更新停止とレイアウト改善余地を想定"],
  },
  {
    name: "駒沢皮膚科",
    industry: "皮膚科",
    address: "東京都世田谷区駒沢",
    url: "https://example.jp/komazawa-derma",
    distance: 4.4,
    lastUpdated: 2022,
    phone: "03-0000-9900",
    contact: "メール",
    contactChannels: [
      { type: "phone", label: "電話", value: "03-0000-9900", source: "demo" },
      { type: "email", label: "メール", value: "info@example.jp", source: "demo" },
      { type: "x", label: "X", value: "https://x.com/example", source: "demo" },
    ],
    source: "demo",
    websiteSource: "demo",
    signals: {
      oldDesign: true,
      weakMobile: true,
      brokenLayout: false,
      staleContent: true,
      weakCta: true,
      slowPage: false,
      lowTrustVisuals: false,
    },
    evidence: ["デモデータ: スマホ対応と更新停止を想定"],
  },
];

async function handleRequest(req, res) {
  try {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);

    if (requestUrl.pathname === "/health") {
      return sendJson(res, { ok: true, service: "dasapato" });
    }

    if (requestUrl.pathname === "/api/config") {
      return sendJson(res, { hasGoogleMapsKey: Boolean(GOOGLE_MAPS_API_KEY) });
    }

    if (requestUrl.pathname === "/api/leads") {
      const cacheKey = cacheKeyFor(requestUrl);
      const cached = getCachedPayload(cacheKey);
      if (cached) return sendJson(res, { ...cached, cached: true });

      const payload = await searchLeads(requestUrl.searchParams);
      setCachedPayload(cacheKey, payload);
      return sendJson(res, payload);
    }

    if (requestUrl.pathname === "/api/diagnose") {
      const targetUrl = requestUrl.searchParams.get("url");
      const diagnosis = await diagnoseWebsite(targetUrl);
      return sendJson(res, diagnosis);
    }

    return serveStatic(requestUrl.pathname, res);
  } catch (error) {
    console.error(error);
    return sendJson(
      res,
      {
        error: "SERVER_ERROR",
        message: error.message || "Unexpected server error",
      },
      500,
    );
  }
}

if (require.main === module) {
  const server = http.createServer(handleRequest);

  server.listen(PORT, HOST, () => {
    const displayHost = HOST === "0.0.0.0" ? "127.0.0.1" : HOST;
    console.log(`ダサパト is running at http://${displayHost}:${PORT}`);
    if (!GOOGLE_MAPS_API_KEY) {
      console.log("GOOGLE_MAPS_API_KEY is not set. The app will use demo leads.");
    }
  });
}

module.exports = {
  handleRequest,
  searchLeads,
  diagnoseWebsite,
  sendJson,
};

async function searchLeads(searchParams) {
  const course = searchParams.get("course") || "design";
  const noLocation = searchParams.get("noLocation") === "1";
  const location = searchParams.get("location") || (noLocation ? "" : "東京都世田谷区");
  const industry = searchParams.get("industry") || "歯科クリニック";
  const radiusKm = Number(searchParams.get("radius") || 5);
  const profileKeywords = searchParams.get("profileKeywords") || "";

  if (!GOOGLE_MAPS_API_KEY) {
    return {
      source: "demo",
      needsKey: true,
      message: "GOOGLE_MAPS_API_KEY が未設定のため、デモ候補を表示しています。",
      leads: buildDemoLeads(location, industry, radiusKm, course, noLocation),
    };
  }

  const center = noLocation ? null : await geocodeLocation(location);
  const places = await searchPlaces({ course, location, industry, radiusKm, center, noLocation, profileKeywords });
  const leads = await Promise.all(
    places.slice(0, 50).map(async (place, index) => {
      const website = place.websiteUri || place.googleMapsUri || "";
      const shouldDiagnose = index < 10 && place.websiteUri;
      const diagnosis = shouldDiagnose
        ? await diagnoseWebsite(place.websiteUri, course)
        : lightweightWebsiteDiagnosis(place.websiteUri, course);
      const contactChannels = mergeContactChannels(diagnosis.contactChannels, [
        place.nationalPhoneNumber
          ? {
              type: "phone",
              label: "電話",
              value: place.nationalPhoneNumber,
              source: "Google Places",
            }
          : null,
      ]);

      return {
        name: place.displayName?.text || "名称未取得",
        industry,
        address: place.formattedAddress || location || "拠点指定なし",
        url: website,
        distance: distanceKm(center, place.location),
        lastUpdated: diagnosis.lastUpdated,
        phone: place.nationalPhoneNumber || "未取得",
        contact: summarizeContactChannels(contactChannels),
        contactChannels,
        rank: index + 1,
        listMode: index < 10 ? "diagnosed" : "compact",
        source: "google_places",
        websiteSource: place.websiteUri ? "Google Places websiteUri" : "Google Maps URL",
        googleMapsUri: place.googleMapsUri,
        placeId: place.id,
        businessStatus: place.businessStatus,
        signals: diagnosis.signals,
        evidence: diagnosis.evidence,
      };
    }),
  );

  return {
    source: "google_places",
    needsKey: false,
    center,
    message: noLocation
      ? `${industry} を拠点なしモードで取得しました。経歴・実績キーワードとInstagram検索も併用しています。`
      : `${location} 周辺の ${industry} をGoogle Maps APIで取得しました。Instagram検索も併用しています。`,
    leads,
  };
}

function buildDemoLeads(location, industry, radiusKm, course = "design", noLocation = false) {
  const matched = demoLeads
    .filter((lead) => noLocation || lead.industry === industry || lead.distance <= radiusKm)
    .map((lead) => ({
      ...lead,
      address: noLocation ? "拠点指定なし" : lead.address.replace("東京都世田谷区", location || "東京都世田谷区"),
      distance: noLocation ? null : lead.distance,
    }));

  return Array.from({ length: 50 }, (_, index) => {
    const base = matched[index % matched.length] || demoLeads[index % demoLeads.length];
    const suffix = index < matched.length ? "" : ` ${index + 1}`;

    return {
      ...base,
      name: `${industry}サンプル${suffix || ` ${index + 1}`}`,
      industry,
      url: `${base.url}?demo=${index + 1}`,
      distance: noLocation ? null : Number((base.distance + index * 0.1).toFixed(1)),
      rank: index + 1,
      listMode: index < 10 ? "diagnosed" : "compact",
      signals: demoSignalsForCourse(course, index),
      evidence: demoEvidenceForCourse(course),
    };
  });
}

async function geocodeLocation(location) {
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", location);
  url.searchParams.set("region", "jp");
  url.searchParams.set("language", "ja");
  url.searchParams.set("key", GOOGLE_MAPS_API_KEY);

  const data = await fetchJson(url);
  const first = data.results?.[0];

  if (!first?.geometry?.location) {
    throw new Error(`住所を緯度経度に変換できませんでした: ${location}`);
  }

  return {
    latitude: first.geometry.location.lat,
    longitude: first.geometry.location.lng,
    formattedAddress: first.formatted_address,
  };
}

async function searchPlaces({ course, location, industry, radiusKm, center, noLocation = false, profileKeywords = "" }) {
  const baseBody = {
    languageCode: "ja",
    regionCode: "JP",
    pageSize: 20,
  };
  const searchBody =
    noLocation || !center
      ? baseBody
      : {
          ...baseBody,
          rankPreference: "DISTANCE",
          locationBias: {
            circle: {
              center: {
                latitude: center.latitude,
                longitude: center.longitude,
              },
              radius: Math.min(Math.max(radiusKm * 1000, 500), 50000),
            },
          },
        };
  const queries = buildPlaceQueries(course, industry, location, profileKeywords, noLocation);
  const places = [];
  const seen = new Set();

  for (const textQuery of queries) {
    let pageToken = "";

    while (places.length < 50) {
      const body = pageToken ? { ...searchBody, textQuery, pageToken } : { ...searchBody, textQuery };
      const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.businessStatus,places.types,nextPageToken",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Google Places API request failed: ${response.status} ${text}`);
      }

      const data = await response.json();

      (data.places || []).forEach((place) => {
        const key = place.id || `${place.displayName?.text}:${place.formattedAddress}`;
        if (seen.has(key)) return;
        seen.add(key);
        places.push(place);
      });

      if (!data.nextPageToken || places.length >= 50) break;
      pageToken = data.nextPageToken;
    }

    if (places.length >= 50) break;
  }

  return places.slice(0, 50);
}

function buildPlaceQueries(course, industry, location, profileKeywords = "", noLocation = false) {
  const normalizedProfile = profileKeywords.replace(/\s+/g, " ").trim();
  const locality = noLocation ? "" : location;
  const queryCore = [industry, locality, normalizedProfile].filter(Boolean).join(" ");
  const baseQuery =
    course === "writing"
      ? `${queryCore} ブログ コラム 記事 オウンドメディア`
      : queryCore;
  const instagramQuery = `${queryCore} Instagram`;
  const courseSpecificQuery =
    course === "sns"
      ? `${queryCore} Instagram リール 投稿`
      : course === "writing"
      ? `${queryCore} ライター募集 記事制作`
      : `${queryCore} ホームページ`;

  return course === "sns"
    ? [courseSpecificQuery, instagramQuery, baseQuery]
    : [baseQuery, courseSpecificQuery, instagramQuery];
}

async function diagnoseWebsite(targetUrl, course = "design") {
  if (!targetUrl) return missingWebsiteDiagnosis();

  const started = Date.now();
  const response = await fetchWithTimeout(targetUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DasaPatrol/0.1; +http://127.0.0.1)",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  const elapsedMs = Date.now() - started;
  const html = await response.text();
  const normalizedHtml = html.toLowerCase();
  const visibleText = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const hasResponsiveCss = /@media\s*\(|max-width|min-width|srcset=/i.test(html);
  const hasOldTags = /<(font|frameset|frame|marquee|center)\b/i.test(html);
  const hasTableLayout = (html.match(/<table\b/gi) || []).length >= 3;
  const hasFixedWidth = /width\s*[:=]\s*["']?(9\d{2,}|1\d{3,})/i.test(html);
  const hasBrokenSignals = /mixed content|404 not found|not found|undefined|nanpx|display:\s*none\s*!important/i.test(
    normalizedHtml,
  );
  const links = extractLinks(html, response.url);
  const hasCta = /予約|問い合わせ|お問合せ|お問い合わせ|web予約|ネット予約|電話|tel:|line/i.test(
    html,
  );
  const contactChannels = extractContactChannels(html, visibleText, response.url, links);
  const hasTrustSignals = /院長|医師|スタッフ|症例|設備|院内|写真|プロフィール|ご挨拶|理念/i.test(
    visibleText,
  );
  const imageCount = (html.match(/<img\b/gi) || []).length;
  const years = extractYears(visibleText);
  const latestYear = years.length ? Math.max(...years) : null;
  const contentLength = Buffer.byteLength(html, "utf8");

  const signals = buildCourseSignals(course, {
    html,
    normalizedHtml,
    visibleText,
    links,
    hasViewport,
    hasResponsiveCss,
    hasOldTags,
    hasTableLayout,
    hasFixedWidth,
    hasBrokenSignals,
    hasCta,
    hasTrustSignals,
    imageCount,
    latestYear,
    elapsedMs,
    contentLength,
  });

  return {
    ok: true,
    status: response.status,
    finalUrl: response.url,
    elapsedMs,
    contentLength,
    lastUpdated: latestYear || "未検出",
    contactMethod: summarizeContactChannels(contactChannels) || (hasCta ? "HP内CTAあり" : "CTA要確認"),
    contactChannels,
    signals,
    evidence: buildEvidence(course, {
      hasViewport,
      hasResponsiveCss,
      hasOldTags,
      hasTableLayout,
      hasFixedWidth,
      hasBrokenSignals,
      hasCta,
      hasTrustSignals,
      imageCount,
      latestYear,
      elapsedMs,
      contentLength,
    }),
  };
}

function missingWebsiteDiagnosis(course = "design") {
  return {
    ok: false,
    lastUpdated: "未検出",
    contactMethod: "公式HP未取得",
    contactChannels: [],
    signals: demoSignalsForCourse(course, 0),
    evidence: ["Google Placesから公式HP URLを取得できませんでした。"],
  };
}

function lightweightWebsiteDiagnosis(websiteUri, course = "design") {
  if (!websiteUri) return missingWebsiteDiagnosis(course);

  return {
    ok: false,
    lastUpdated: "未診断",
    contactMethod: "未診断",
    contactChannels: [],
    signals: demoSignalsForCourse(course, 11),
    evidence: ["11件目以降のため、一覧表示用にHPリンクのみ取得しています。"],
  };
}

function buildCourseSignals(course, details) {
  if (course === "sns") {
    const hasInstagram = details.links.some((link) => isInstagramUrl(link.href.toLowerCase()));
    const hasReelsSignal = /reel|reels|リール/i.test(details.html);
    const hasPostSignal = /instagram|sns|投稿|発信|キャンペーン|最新情報/i.test(details.visibleText);

    return {
      instagramStopped: !hasInstagram,
      noReels: !hasReelsSignal,
      lowPostFrequency: !hasInstagram || !hasPostSignal,
      lowFollowers: !hasInstagram,
      weakCta: !details.hasCta,
      lowTrustVisuals: details.imageCount < 2 || !details.hasTrustSignals,
    };
  }

  if (course === "writing") {
    const blogLinks = details.links.filter((link) => /blog|column|media|article|news|コラム|ブログ|記事/i.test(`${link.href} ${link.text}`));
    const hasDescription = /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{40,}/i.test(details.html);
    const hasH1 = /<h1\b/i.test(details.html);
    const hasColumnWords = /ブログ|コラム|記事|お役立ち|SEO|導入事例|事例/i.test(details.visibleText);

    return {
      blogStopped: details.latestYear ? details.latestYear <= CURRENT_YEAR - 2 : blogLinks.length === 0,
      weakSeo: !hasDescription || !hasH1,
      lowArticleCount: blogLinks.length < 3,
      fewColumns: !hasColumnWords,
      weakCta: !details.hasCta,
      staleContent: details.latestYear ? details.latestYear <= CURRENT_YEAR - 2 : false,
    };
  }

  return {
    oldDesign: details.hasOldTags || details.hasTableLayout || details.hasFixedWidth,
    weakMobile: !details.hasViewport || !details.hasResponsiveCss || details.hasFixedWidth,
    brokenLayout: details.hasBrokenSignals,
    staleContent: details.latestYear ? details.latestYear <= CURRENT_YEAR - 2 : false,
    weakCta: !details.hasCta,
    slowPage: details.elapsedMs > 2500 || details.contentLength > 700000,
    lowTrustVisuals: details.imageCount < 2 || !details.hasTrustSignals,
  };
}

function demoSignalsForCourse(course, index = 0) {
  if (course === "sns") {
    return {
      instagramStopped: index % 2 === 0,
      noReels: true,
      lowPostFrequency: index % 3 !== 0,
      lowFollowers: index % 4 === 0,
      weakCta: true,
      lowTrustVisuals: index % 5 === 0,
    };
  }

  if (course === "writing") {
    return {
      blogStopped: index % 2 === 0,
      weakSeo: true,
      lowArticleCount: index % 3 !== 0,
      fewColumns: true,
      weakCta: index % 2 !== 0,
      staleContent: index % 4 === 0,
    };
  }

  return {
    oldDesign: index % 2 === 0,
    weakMobile: true,
    brokenLayout: index % 3 === 0,
    staleContent: index % 2 !== 0,
    weakCta: true,
    slowPage: index % 5 === 0,
    lowTrustVisuals: index % 4 === 0,
  };
}

function demoEvidenceForCourse(course) {
  if (course === "sns") {
    return ["デモデータ: Instagram更新停止、リール不足、投稿頻度不足を想定"];
  }

  if (course === "writing") {
    return ["デモデータ: ブログ更新停止、SEO対策不足、記事数不足を想定"];
  }

  return ["デモデータ: 古いHP、スマホ対応、更新停止を想定"];
}

function extractContactChannels(html, visibleText, baseUrl, knownLinks = null) {
  const channels = [];
  const links = knownLinks || extractLinks(html, baseUrl);
  const rawText = visibleText.replace(/\s+/g, " ");
  const emailMatches = [
    ...html.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi),
  ].map((match) => match[0]);
  const phoneMatches = [
    ...rawText.matchAll(/(?:0\d{1,4}[-ー−]?\d{1,4}[-ー−]?\d{3,4})/g),
  ].map((match) => match[0]);

  links.forEach((link) => {
    const href = link.href;
    const lowerHref = href.toLowerCase();
    const text = link.text || href;

    if (lowerHref.startsWith("tel:")) {
      channels.push({
        type: "phone",
        label: "電話",
        value: cleanContactValue(href.replace(/^tel:/i, "")),
        source: "HPリンク",
      });
    } else if (lowerHref.startsWith("mailto:")) {
      channels.push({
        type: "email",
        label: "メール",
        value: cleanContactValue(href.replace(/^mailto:/i, "").split("?")[0]),
        source: "HPリンク",
      });
    } else if (isLineUrl(lowerHref)) {
      channels.push({ type: "line", label: "LINE", value: href, source: "HPリンク" });
    } else if (isInstagramUrl(lowerHref)) {
      channels.push({ type: "instagram", label: "Instagram", value: href, source: "HPリンク" });
    } else if (isXUrl(lowerHref)) {
      channels.push({ type: "x", label: "X", value: href, source: "HPリンク" });
    } else if (isContactFormUrl(lowerHref, text)) {
      channels.push({ type: "form", label: "フォーム", value: href, source: "HPリンク" });
    }
  });

  emailMatches.forEach((email) => {
    channels.push({
      type: "email",
      label: "メール",
      value: cleanContactValue(email),
      source: "HPテキスト",
    });
  });

  phoneMatches.forEach((phone) => {
    channels.push({
      type: "phone",
      label: "電話",
      value: cleanContactValue(phone),
      source: "HPテキスト",
    });
  });

  if (/<form\b/i.test(html) && /問い合わせ|お問合せ|お問い合わせ|contact|予約|相談/i.test(html)) {
    channels.push({
      type: "form",
      label: "フォーム",
      value: "フォーム要素を検出",
      source: "HP HTML",
    });
  }

  return mergeContactChannels(channels);
}

function extractLinks(html, baseUrl) {
  const links = [];
  const linkPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;

  for (const match of html.matchAll(linkPattern)) {
    const rawHref = match[1].trim();
    const text = match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

    try {
      links.push({
        href: new URL(rawHref, baseUrl).toString(),
        text,
      });
    } catch {
      links.push({ href: rawHref, text });
    }
  }

  return links;
}

function isLineUrl(value) {
  return /(^|\/\/)(line\.me|lin\.ee|page\.line\.me|liff\.line\.me)\//i.test(value);
}

function isInstagramUrl(value) {
  return /(^|\/\/)(www\.)?instagram\.com\//i.test(value);
}

function isXUrl(value) {
  return /(^|\/\/)((www\.)?x\.com|(www\.)?twitter\.com)\//i.test(value);
}

function isContactFormUrl(href, text) {
  return /contact|inquiry|reservation|reserve|appointment|form|otoiawase|mail/i.test(href)
    || /問い合わせ|お問合せ|お問い合わせ|予約|相談|フォーム/i.test(text);
}

function cleanContactValue(value) {
  return String(value).replace(/[()\s]/g, "").trim();
}

function mergeContactChannels(...channelGroups) {
  const seen = new Set();
  const channels = [];

  channelGroups.flat().filter(Boolean).forEach((channel) => {
    const value = cleanContactValue(channel.value || channel.label);
    const key = contactChannelKey(channel.type, value);

    if (seen.has(key)) return;

    seen.add(key);
    channels.push({
      ...channel,
      value,
    });
  });

  return channels.sort((a, b) => channelOrder(a.type) - channelOrder(b.type));
}

function contactChannelKey(type, value) {
  const normalizedValue =
    type === "form"
      ? "form"
      : type === "phone"
      ? value.replace(/[^\d]/g, "")
      : value.toLowerCase().replace(/\/$/, "");

  return `${type}:${normalizedValue}`;
}

function channelOrder(type) {
  const order = {
    phone: 1,
    email: 2,
    form: 3,
    line: 4,
    instagram: 5,
    x: 6,
  };

  return order[type] || 99;
}

function summarizeContactChannels(channels = []) {
  return [...new Set(channels.map((channel) => channel.label))].join("・");
}

function buildEvidence(course, details) {
  const evidence = [];

  evidence.push(details.hasViewport ? "viewport metaあり" : "viewport meta未検出");
  evidence.push(details.hasResponsiveCss ? "レスポンシブCSSの手がかりあり" : "レスポンシブCSSの手がかりが少ない");

  if (details.hasOldTags) evidence.push("古いHTMLタグを検出");
  if (details.hasTableLayout) evidence.push("tableタグが多く、古いレイアウトの可能性");
  if (details.hasFixedWidth) evidence.push("固定幅指定らしき記述を検出");
  if (details.hasBrokenSignals) evidence.push("表示崩れや未定義値の手がかりを検出");
  evidence.push(details.hasCta ? "予約・問い合わせ導線らしき文言あり" : "予約・問い合わせ導線の文言が少ない");
  evidence.push(details.hasTrustSignals ? "信頼要素の文言あり" : "院内写真・先生紹介などの信頼要素が少ない可能性");
  evidence.push(`画像数: ${details.imageCount}`);
  evidence.push(details.latestYear ? `検出した最新年: ${details.latestYear}` : "更新年を検出できず");
  evidence.push(`HTML取得: ${details.elapsedMs}ms / ${Math.round(details.contentLength / 1024)}KB`);

  if (course === "sns") {
    evidence.push("SNSコース: Instagramリンク、リール文言、投稿導線の手がかりを確認");
  }

  if (course === "writing") {
    evidence.push("ライティングコース: ブログ/コラムリンク、meta description、h1、記事導線を確認");
  }

  return evidence;
}

function extractYears(text) {
  return [...text.matchAll(/\b(20[0-2][0-9])\b/g)]
    .map((match) => Number(match[1]))
    .filter((year) => year >= 2000 && year <= CURRENT_YEAR);
}

async function fetchJson(url) {
  const response = await fetchWithTimeout(url);
  const data = await response.json();

  if (!response.ok || data.status === "REQUEST_DENIED" || data.status === "INVALID_REQUEST") {
    throw new Error(data.error_message || `Google API request failed: ${response.status}`);
  }

  return data;
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || 12000);

  try {
    return await fetch(url, {
      ...options,
      redirect: "follow",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function distanceKm(center, location) {
  if (!center || !location?.latitude || !location?.longitude) return null;

  const earthRadius = 6371;
  const dLat = toRad(location.latitude - center.latitude);
  const dLng = toRad(location.longitude - center.longitude);
  const lat1 = toRad(center.latitude);
  const lat2 = toRad(location.latitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((earthRadius * c).toFixed(1));
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

function cacheKeyFor(requestUrl) {
  const entries = [...requestUrl.searchParams.entries()].sort(([a], [b]) => a.localeCompare(b));
  return `${requestUrl.pathname}?${entries.map(([key, value]) => `${key}=${value}`).join("&")}`;
}

function getCachedPayload(key) {
  const cached = apiCache.get(key);

  if (!cached) return null;
  if (Date.now() > cached.expiresAt) {
    apiCache.delete(key);
    return null;
  }

  return cached.payload;
}

function setCachedPayload(key, payload) {
  if (apiCache.size >= API_CACHE_MAX) {
    const oldestKey = apiCache.keys().next().value;
    if (oldestKey) apiCache.delete(oldestKey);
  }

  apiCache.set(key, {
    expiresAt: Date.now() + API_CACHE_MS,
    payload,
  });
}

function serveStatic(pathname, res) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const safePath = path.normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    return sendText(res, "Forbidden", 403);
  }

  fs.readFile(filePath, (error, data) => {
    if (error) return sendText(res, "Not found", 404);

    const ext = path.extname(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}

function sendJson(res, payload, status = 200) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function sendText(res, text, status = 200) {
  res.writeHead(status, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(text);
}
