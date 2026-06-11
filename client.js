const PROFILE_STORAGE_KEY = "dasapato-profile-v2";
const COURSE_STORAGE_KEY = "dasapato-course";

const courseConfig = {
  design: {
    label: "Webデザイン",
    researchTarget: "公式HP",
    subject: "ホームページについて気になった点がありご連絡いたしました",
    proposalType: "HPリニューアル提案",
    industries: [
      "医療・クリニック系",
      "個人サロン",
      "士業・専門職系",
      "整体院",
      "ネイルサロン",
      "美容室",
      "飲食店",
      "地域密着企業",
      "リフォーム・外壁塗装業者",
      "不動産会社・賃貸管理",
      "オンラインスクール・コーチング",
      "結婚相談所・婚活サービス",
      "保険代理店",
    ],
    skillOptions: ["HPデザイン改善", "Webサイトリニューアル", "スマホ最適化", "LP改善", "ブランディングデザイン"],
    defaultProfile: {
      name: "",
      skill: "HPデザイン改善",
      strength: "",
      portfolio: "",
      experience: "",
      note: "",
    },
    placeholders: {
      name: "例：山田 花子 / Harada Design",
      strength: "例：スマホで見やすく、予約まで迷わない導線づくり",
      portfolio: "例：https://portfolio.example.com",
      experience: "例：本業で店舗運営を経験。美容サロンのLP改善実績あり。色彩検定2級。近隣店舗の導線改善が得意です。",
      note: "例：営業というより、拝見して気になった点や改善できそうなポイントを相談ベースでお伝えしたいです。",
    },
    signalWeights: {
      oldDesign: 18,
      weakMobile: 20,
      brokenLayout: 16,
      staleContent: 14,
      weakCta: 16,
      slowPage: 8,
      lowTrustVisuals: 8,
    },
    signalLabels: {
      oldDesign: "HPが古い",
      weakMobile: "スマホ対応が弱い",
      brokenLayout: "デザイン崩れ",
      staleContent: "更新停止",
      weakCta: "予約・問い合わせ導線が弱い",
      slowPage: "表示速度が遅い",
      lowTrustVisuals: "信頼要素の見せ方が弱い",
    },
    issuePhrases: {
      "HPが古い": "ホームページ全体の見え方",
      "スマホ対応が弱い": "スマートフォンでの見やすさ",
      "デザイン崩れ": "レイアウトの整え方",
      "更新停止": "お知らせやサービス情報の更新導線",
      "予約・問い合わせ導線が弱い": "予約・お問い合わせまでの導線",
      "表示速度が遅い": "ページ表示の軽さ",
      "信頼要素の見せ方が弱い": "写真や代表者紹介などの信頼要素",
    },
  },
  sns: {
    label: "SNS",
    researchTarget: "Instagram",
    subject: "Instagram運用について気になった点がありご連絡いたしました",
    proposalType: "SNS運用提案",
    industries: [
      "美容系",
      "飲食店",
      "整体院",
      "パーソナルジム",
      "学習塾",
      "不動産会社",
      "地域企業",
      "結婚相談所",
      "フォトスタジオ",
      "ハウスメーカー・工務店",
      "ペットサロン・トリミングサロン",
      "ヨガ・ピラティススタジオ",
    ],
    skillOptions: ["Instagram運用", "リール企画", "投稿設計", "プロフィール改善", "SNS導線改善"],
    defaultProfile: {
      name: "",
      skill: "Instagram運用",
      strength: "",
      portfolio: "",
      experience: "",
      note: "",
    },
    placeholders: {
      name: "例：山田 花子 / Hanako SNS",
      strength: "例：投稿頻度を整え、リールや導線で見込み客に伝わりやすくすること",
      portfolio: "例：https://portfolio.example.com",
      experience: "例：本業で接客・店舗運営を経験。美容系Instagram運用経験あり。撮影、投稿企画、リール編集が得意です。",
      note: "例：営業というより、現在のInstagramを拝見して感じた改善案を相談ベースでお伝えしたいです。",
    },
    signalWeights: {
      instagramStopped: 24,
      noReels: 20,
      lowPostFrequency: 20,
      lowFollowers: 12,
      weakCta: 14,
      lowTrustVisuals: 10,
    },
    signalLabels: {
      instagramStopped: "Instagram更新停止",
      noReels: "リールがない",
      lowPostFrequency: "投稿頻度が低い",
      lowFollowers: "フォロワーが少ない可能性",
      weakCta: "予約・問い合わせ導線が弱い",
      lowTrustVisuals: "世界観の見せ方が弱い",
    },
    issuePhrases: {
      "Instagram更新停止": "Instagramの更新状況",
      "リールがない": "リール動画の活用",
      "投稿頻度が低い": "投稿頻度や企画の整え方",
      "フォロワーが少ない可能性": "認知獲得の導線",
      "予約・問い合わせ導線が弱い": "プロフィールから予約までの導線",
      "世界観の見せ方が弱い": "投稿デザインや世界観の統一感",
    },
  },
  writing: {
    label: "ライティング",
    researchTarget: "ブログ・コラム・記事募集",
    subject: "記事制作について気になった点がありご連絡いたしました",
    proposalType: "記事制作提案",
    industries: [
      "ブログ運営企業",
      "士業",
      "不動産会社",
      "人材会社",
      "リフォーム会社",
      "工務店・ハウスメーカー",
      "医療系以外のオウンドメディア",
      "結婚相談所",
      "パーソナルジム",
      "オンラインスクール",
      "BtoBサービス会社",
      "製造業",
      "IT企業",
    ],
    skillOptions: ["SEO記事制作", "ブログ改善", "コラム企画", "取材ライティング", "導入事例制作"],
    defaultProfile: {
      name: "",
      skill: "SEO記事制作",
      strength: "",
      portfolio: "",
      experience: "",
      note: "",
    },
    placeholders: {
      name: "例：山田 花子 / Hanako Writing",
      strength: "例：検索意図に沿った記事構成と、サービスの強みが伝わる文章づくり",
      portfolio: "例：https://portfolio.example.com",
      experience: "例：本業で人材、不動産、士業領域に関わっています。宅建やFPなどの資格知識を、専門記事に落とし込めます。",
      note: "例：営業というより、現在のブログやコラムを拝見して感じた改善案を相談ベースでお伝えしたいです。",
    },
    signalWeights: {
      blogStopped: 24,
      weakSeo: 20,
      lowArticleCount: 20,
      fewColumns: 16,
      weakCta: 10,
      staleContent: 10,
    },
    signalLabels: {
      blogStopped: "ブログ更新停止",
      weakSeo: "SEO対策不足",
      lowArticleCount: "記事数不足",
      fewColumns: "コラムが少ない",
      weakCta: "問い合わせ導線が弱い",
      staleContent: "情報更新が古い",
    },
    issuePhrases: {
      "ブログ更新停止": "ブログやコラムの更新状況",
      "SEO対策不足": "検索される記事構成",
      "記事数不足": "記事数やテーマ設計",
      "コラムが少ない": "コラムコンテンツの拡充",
      "問い合わせ導線が弱い": "記事から相談までの導線",
      "情報更新が古い": "古い情報の見直し",
    },
  },
};

let currentCourse = localStorage.getItem(COURSE_STORAGE_KEY) || "design";

const baseLeads = [
  {
    name: "桜丘デンタルクリニック",
    industry: "歯科クリニック",
    address: "東京都世田谷区桜丘",
    url: "https://example.jp/sakuragaoka-dental",
    distance: 1.8,
    lastUpdated: 2021,
    phone: "03-0000-1122",
    contact: "問い合わせフォーム",
    signals: {
      oldDesign: true,
      weakMobile: true,
      brokenLayout: false,
      staleContent: true,
      weakCta: true,
      slowPage: false,
      lowTrustVisuals: true,
    },
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
    signals: {
      oldDesign: true,
      weakMobile: true,
      brokenLayout: true,
      staleContent: true,
      weakCta: true,
      slowPage: true,
      lowTrustVisuals: false,
    },
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
    signals: {
      oldDesign: false,
      weakMobile: true,
      brokenLayout: false,
      staleContent: false,
      weakCta: true,
      slowPage: false,
      lowTrustVisuals: true,
    },
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
    signals: {
      oldDesign: true,
      weakMobile: false,
      brokenLayout: true,
      staleContent: true,
      weakCta: false,
      slowPage: true,
      lowTrustVisuals: true,
    },
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
    signals: {
      oldDesign: true,
      weakMobile: true,
      brokenLayout: false,
      staleContent: true,
      weakCta: true,
      slowPage: false,
      lowTrustVisuals: false,
    },
  },
];

let leads = [];
let selectedLeadId = null;
let isScanning = false;

const $ = (selector) => document.querySelector(selector);

const elements = {
  courseButtons: document.querySelectorAll(".course-card"),
  profileName: $("#profileName"),
  profileSkill: $("#profileSkill"),
  profileStrength: $("#profileStrength"),
  profilePortfolio: $("#profilePortfolio"),
  profileExperience: $("#profileExperience"),
  profileNote: $("#profileNote"),
  locationInput: $("#locationInput"),
  radiusInput: $("#radiusInput"),
  industryInput: $("#industryInput"),
  researchTargetInput: $("#researchTargetInput"),
  noLocationInput: $("#noLocationInput"),
  includePhoneOnlyInput: $("#includePhoneOnlyInput"),
  includeLineOnlyInput: $("#includeLineOnlyInput"),
  styleInput: $("#styleInput"),
  sortInput: $("#sortInput"),
  exportCsvButton: $("#exportCsvButton"),
  leadList: $("#leadList"),
  detailPanel: $("#detailPanel"),
  metricTotal: $("#metricTotal"),
  metricHot: $("#metricHot"),
  metricAverage: $("#metricAverage"),
  metricCopies: $("#metricCopies"),
  integrationStatus: $("#integrationStatus"),
  profileSaveStatus: $("#profileSaveStatus"),
  saveProfileButton: $("#saveProfileButton"),
  resetProfileButton: $("#resetProfileButton"),
};

function hydrateProfile() {
  const savedProfile = readSavedProfile();
  setProfile(savedProfile ?? getCourse().defaultProfile);
  updateProfileStatus(savedProfile ? "保存済み" : "未保存");
}

function readSavedProfile() {
  try {
    const saved = localStorage.getItem(profileStorageKey());
    return saved ? { ...getCourse().defaultProfile, ...JSON.parse(saved) } : null;
  } catch {
    return null;
  }
}

function setProfile(profile) {
  elements.profileName.value = profile.name;
  elements.profileSkill.value = profile.skill;
  elements.profileStrength.value = profile.strength;
  elements.profilePortfolio.value = profile.portfolio;
  elements.profileExperience.value = profile.experience;
  elements.profileNote.value = profile.note;
}

function setProfilePlaceholders() {
  const placeholders = getCourse().placeholders || {};

  elements.profileName.placeholder = placeholders.name || "例：山田 花子 / 屋号";
  elements.profileStrength.placeholder = placeholders.strength || "例：得意な改善や支援内容";
  elements.profilePortfolio.placeholder = placeholders.portfolio || "例：https://portfolio.example.com";
  elements.profileExperience.placeholder =
    placeholders.experience || "例：本業、資格、過去実績、得意業界など、営業先との相性が伝わる情報";
  elements.profileNote.placeholder = placeholders.note || "例：提案文に入れたい相談ベースの一言";
}

function saveProfile() {
  localStorage.setItem(profileStorageKey(), JSON.stringify(getProfile()));
  updateProfileStatus("保存済み");
}

function resetProfile() {
  localStorage.removeItem(profileStorageKey());
  setProfile(getCourse().defaultProfile);
  updateProfileStatus("未保存");
  renderDetail();
}

function updateProfileStatus(status) {
  elements.profileSaveStatus.textContent = status;
}

function getCourse() {
  return courseConfig[currentCourse] || courseConfig.design;
}

function profileStorageKey() {
  return `${PROFILE_STORAGE_KEY}:${currentCourse}`;
}

function applyCourse(courseId, { resetProfileToCourse = false } = {}) {
  currentCourse = courseConfig[courseId] ? courseId : "design";
  localStorage.setItem(COURSE_STORAGE_KEY, currentCourse);
  const config = getCourse();

  document.body.dataset.course = currentCourse;
  elements.researchTargetInput.value = config.researchTarget;
  setProfilePlaceholders();
  elements.courseButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.course === currentCourse);
    button.setAttribute("aria-pressed", String(button.dataset.course === currentCourse));
  });

  elements.industryInput.innerHTML = config.industries
    .map((industry) => `<option value="${escapeHtml(industry)}">${escapeHtml(industry)}</option>`)
    .join("");
  elements.profileSkill.innerHTML = config.skillOptions
    .map((skill) => `<option value="${escapeHtml(skill)}">${escapeHtml(skill)}</option>`)
    .join("");
  if (resetProfileToCourse) {
    const savedProfile = readSavedProfile();
    setProfile(savedProfile ?? config.defaultProfile);
    updateProfileStatus(savedProfile ? "保存済み" : "未保存");
  }
}

function calculateLeadScore(lead) {
  const config = getCourse();
  const signalWeights = config.signalWeights;

  const issueScore = Object.entries(lead.signals).reduce((total, [key, active]) => {
    return active ? total + signalWeights[key] : total;
  }, 0);

  const industryIndex = config.industries.indexOf(lead.industry);
  const industryBoost = industryIndex >= 0 ? Math.max(0, 12 - industryIndex) : 4;
  const distance = Number(lead.distance);
  const distanceBoost = Number.isFinite(distance) ? (distance <= 2 ? 8 : distance <= 5 ? 5 : 2) : 0;
  const contactBoost = normalizedContactChannels(lead).length ? 5 : 0;

  return Math.min(100, issueScore + industryBoost + distanceBoost + contactBoost);
}

function buildProfileKeywords() {
  const profile = getProfile();

  return [profile.skill, profile.strength, profile.experience]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

function priorityFromScore(score) {
  if (score >= 82) return "A";
  if (score >= 62) return "B";
  return "C";
}

function issueLabels(lead) {
  const labels = getCourse().signalLabels;

  return Object.entries(lead.signals)
    .filter(([, active]) => active)
    .map(([key]) => labels[key]);
}

function diagnoseLead(lead) {
  const score = calculateLeadScore(lead);
  return {
    ...lead,
    contactChannels: normalizedContactChannels(lead),
    id: crypto.randomUUID(),
    score,
    priority: priorityFromScore(score),
    issues: issueLabels(lead),
  };
}

async function loadApiConfig() {
  if (location.protocol === "file:") {
    elements.integrationStatus.textContent = "file表示中: API連携はlocalhost起動で有効";
    return;
  }

  try {
    const response = await fetch("/api/config");
    const config = await response.json();
    elements.integrationStatus.textContent = config.hasGoogleMapsKey
      ? "Google Maps API 接続準備OK"
      : "APIキー未設定: デモ候補で表示";
  } catch {
    elements.integrationStatus.textContent = "API未接続: デモ候補で表示";
  }
}

function syncLocationMode() {
  const noLocation = elements.noLocationInput.checked;

  elements.locationInput.disabled = noLocation;
  elements.radiusInput.disabled = noLocation;
  elements.locationInput.placeholder = noLocation
    ? "拠点なしモード中：経歴・資格・実績との相性を優先"
    : "例：東京都世田谷区 / 渋谷駅 / 大阪市北区";
}

async function runScan() {
  if (isScanning) return;

  const selectedIndustry = elements.industryInput.value;
  const radius = Number(elements.radiusInput.value);
  const location = elements.locationInput.value.trim();
  const noLocation = elements.noLocationInput.checked;

  isScanning = true;
  $("#runScanButton").textContent = "診断中...";
  $("#runScanButton").disabled = true;
  elements.integrationStatus.textContent = noLocation ? "経歴・実績と相性の良い営業先を取得中" : "営業先を取得中";
  renderLoadingState(noLocation);

  try {
    if (window.location.protocol !== "file:") {
      const params = new URLSearchParams({
        course: currentCourse,
        location,
        industry: selectedIndustry,
        radius: String(radius),
        noLocation: noLocation ? "1" : "0",
        profileKeywords: buildProfileKeywords(),
      });
      const response = await fetch(`/api/leads?${params}`);
      const payload = await response.json();

      if (!response.ok || payload.error) {
        throw new Error(payload.message || "API検索に失敗しました");
      }

      leads = payload.leads.map(diagnoseLead);
      selectedLeadId = leads[0]?.id ?? null;
      elements.integrationStatus.textContent = payload.message || "候補を取得しました";
      render();
      return;
    }
  } catch (error) {
    console.warn(error);
    elements.integrationStatus.textContent = "API検索失敗: デモ候補で表示";
  } finally {
    isScanning = false;
    $("#runScanButton").textContent = "候補を診断";
    $("#runScanButton").disabled = false;
  }

  const matched = baseLeads
    .filter((lead) => noLocation || lead.industry === selectedIndustry || lead.distance <= radius)
    .map((lead) => ({
      ...lead,
      address: noLocation ? "拠点指定なし" : lead.address.replace("東京都世田谷区", location || "東京都世田谷区"),
      distance: noLocation ? null : lead.distance,
    }))
    .map(diagnoseLead);

  leads = matched;
  selectedLeadId = leads[0]?.id ?? null;
  render();
}

function renderLoadingState(noLocation = false) {
  elements.leadList.innerHTML = `
    <div class="loading-card" role="status" aria-live="polite">
      <span class="loading-spinner" aria-hidden="true"></span>
      <div>
        <strong>営業先を検索中です</strong>
        <p>${noLocation ? "拠点なしモードで、業種と強みの相性を見ながら候補を探しています。" : "Google Maps APIから候補を取得し、上位候補の連絡手段とサイトを確認しています。"}</p>
      </div>
    </div>
  `;
  elements.detailPanel.innerHTML = `
    <div class="empty-detail">
      <h2>診断中です</h2>
      <p>候補が見つかり次第、提案文と診断結果を表示します。</p>
    </div>
  `;
}

function sortLeads(items) {
  const sortBy = elements.sortInput.value;
  return [...items].sort((a, b) => {
    if (sortBy === "distance") return sortableDistance(a.distance) - sortableDistance(b.distance);
    if (sortBy === "updated") return sortableYear(a.lastUpdated) - sortableYear(b.lastUpdated);
    return b.score - a.score;
  });
}

function sortableDistance(value) {
  const distance = Number(value);
  return Number.isFinite(distance) ? distance : 9999;
}

function sortableYear(value) {
  const year = Number(value);
  return Number.isFinite(year) ? year : 9999;
}

function formatDistance(lead) {
  const distance = Number(lead.distance);
  return Number.isFinite(distance) ? `${distance.toFixed(1)}km` : "拠点なし";
}

function render() {
  renderMetrics();
  renderLeadList();
  renderDetail();
}

function renderMetrics() {
  const visibleLeads = filteredLeads();
  const total = visibleLeads.length;
  const hot = visibleLeads.filter((lead) => lead.priority === "A").length;
  const average = total
    ? Math.round(visibleLeads.reduce((sum, lead) => sum + lead.score, 0) / total)
    : 0;

  elements.metricTotal.textContent = total;
  elements.metricHot.textContent = hot;
  elements.metricAverage.textContent = average;
  elements.metricCopies.textContent = total;
}

function renderLeadList() {
  const sorted = sortLeads(filteredLeads()).slice(0, 50);

  if (!sorted.length) {
    const hasRawLeads = leads.length > 0;
    elements.leadList.innerHTML = hasRawLeads
      ? '<p class="empty-list">連絡手段フィルターで候補が非表示になっています。電話込み・LINE込みをオンにするか、別の業種で試してください。</p>'
      : '<p class="empty-list">候補を取得できませんでした。業種を具体的にするか、拠点あり検索に切り替えて再検索してください。</p>';
    return;
  }

  const primaryLeads = sorted.slice(0, 10);
  const compactLeads = sorted.slice(10, 50);
  const primaryHtml = primaryLeads
    .map((lead) => {
      const tags = lead.issues.slice(0, 4).map((issue) => `<span class="tag">${issue}</span>`).join("");
      const channels = renderChannelIcons(lead.contactChannels, "compact");
      const active = lead.id === selectedLeadId ? " active" : "";
      const link = leadLinkUrl(lead);
      const linkHtml = link
        ? `<a class="lead-title-link" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${lead.name}のホームページを開く`)}">${escapeHtml(lead.name)}</a>`
        : `<span>${escapeHtml(lead.name)}</span>`;
      return `
        <article class="lead-card${active}" data-lead-id="${lead.id}" tabindex="0" role="button" aria-label="${escapeHtml(`${lead.name}を選択`)}">
          <div>
            <div class="lead-card-title">
              <span class="priority priority-${lead.priority.toLowerCase()}">${lead.priority}</span>
              <h3>${linkHtml}</h3>
            </div>
            <div class="meta-row">
              <span>${escapeHtml(lead.industry)}</span>
              <span>${formatDistance(lead)}</span>
              <span>最終更新 ${lead.lastUpdated}</span>
            </div>
            <div class="channel-row compact" aria-label="連絡手段">${channels}</div>
            <div class="tag-row">${tags}</div>
          </div>
          <div class="score-block">
            <strong>${lead.score}</strong>
            <span>score</span>
          </div>
        </article>
      `;
    })
    .join("");
  const compactHtml = compactLeads.length
    ? `
      <details class="compact-leads" aria-label="追加候補">
        <summary class="compact-leads-header">
          <span>
            <h3>追加候補 ${compactLeads.length}件</h3>
          </span>
          <span class="compact-toggle-label">開く</span>
        </summary>
        <div class="compact-lead-list">
          ${compactLeads
            .map((lead, index) => {
              const link = leadLinkUrl(lead);
              const rank = index + 11;
              return link
                ? `<a class="compact-lead-link" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer"><span>${rank}</span>${escapeHtml(lead.name)}</a>`
                : `<span class="compact-lead-link disabled"><span>${rank}</span>${escapeHtml(lead.name)}</span>`;
            })
            .join("")}
        </div>
      </details>
    `
    : "";

  elements.leadList.innerHTML = primaryHtml + compactHtml;

  elements.leadList.querySelectorAll(".lead-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedLeadId = card.dataset.leadId;
      render();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectedLeadId = card.dataset.leadId;
        render();
      }
    });
    card.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => event.stopPropagation());
    });
  });
}

function filteredLeads() {
  return leads.filter((lead) => contactFilterAllows(lead));
}

function contactFilterAllows(lead) {
  const channels = normalizedContactChannels(lead);
  if (!channels.length) return true;

  const channelTypes = new Set(channels.map((channel) => channel.type));
  const hasNonPhoneLine = [...channelTypes].some((type) => !["phone", "line"].includes(type));

  if (hasNonPhoneLine) return true;

  const hasPhone = channelTypes.has("phone");
  const hasLine = channelTypes.has("line");

  if (hasPhone && elements.includePhoneOnlyInput.checked) return true;
  if (hasLine && elements.includeLineOnlyInput.checked) return true;

  return false;
}

function leadLinkUrl(lead) {
  if (lead.url && /^https?:\/\//i.test(lead.url)) return lead.url;
  if (lead.googleMapsUri && /^https?:\/\//i.test(lead.googleMapsUri)) return lead.googleMapsUri;
  return "";
}

function exportCsv() {
  const rows = sortLeads(filteredLeads())
    .slice(0, 50)
    .map((lead) => ({
      "営業先": lead.name,
      "リンク": leadLinkUrl(lead),
      "提案文": generateProposal(lead),
    }));

  if (!rows.length) {
    elements.integrationStatus.textContent = "CSV出力対象がありません。";
    return;
  }

  const headers = ["営業先", "リンク", "提案文"];
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
  ].join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `dasapato-leads-${currentCourse}-${date}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  elements.integrationStatus.textContent = `CSVを出力しました: ${rows.length}件`;
}

function csvEscape(value) {
  const text = String(value ?? "").replaceAll('"', '""');
  return `"${text}"`;
}

function renderDetail() {
  const visibleLeads = filteredLeads();
  let lead = visibleLeads.find((item) => item.id === selectedLeadId);

  if (!lead && visibleLeads.length) {
    selectedLeadId = visibleLeads[0].id;
    lead = visibleLeads[0];
  }

  if (!lead) {
    elements.detailPanel.innerHTML = `
      <div class="empty-detail">
        <h2>候補を診断してください</h2>
        <p>地域と業種を選ぶと、${getCourse().proposalType}に向いた営業先の診断結果がここに表示されます。</p>
      </div>
    `;
    return;
  }

  const copy = generateProposal(lead);
  const issues = lead.issues.map((issue) => `<li>${issue}</li>`).join("");
  const hypothesis = generateHypothesis(lead);
  const profile = getProfile();
  const fit = generateProfileFit(profile, lead);

  elements.detailPanel.innerHTML = `
    <div class="detail-heading">
      <p class="eyebrow">${lead.industry}</p>
      <h2>${lead.name}</h2>
      <p>${lead.address}</p>
      <div class="detail-score-row">
        <div class="mini-stat"><span>優先度</span><strong>${lead.priority}</strong></div>
        <div class="mini-stat"><span>スコア</span><strong>${lead.score}</strong></div>
        <div class="mini-stat"><span>距離</span><strong>${formatDistance(lead)}</strong></div>
      </div>
    </div>

    <div class="detail-section">
      <h3>連絡手段</h3>
      ${renderContactMethods(lead)}
    </div>

    <div class="detail-section">
      <h3>検出した課題</h3>
      <ul>${issues}</ul>
    </div>

    <div class="detail-section">
      <h3>取得・診断メモ</h3>
      <ul>${renderEvidence(lead)}</ul>
    </div>

    <div class="detail-section">
      <h3>提案の切り口</h3>
      <p>${hypothesis}</p>
    </div>

    <div class="detail-section">
      <h3>強みとの接点</h3>
      <p class="strength-note">${escapeHtml(fit)}</p>
    </div>

    <div class="detail-section">
      <h3>生成メール文</h3>
      <textarea class="copy-box" id="proposalCopy">${escapeHtml(copy)}</textarea>
      <div class="detail-actions">
        <button class="primary-button" id="copyButton" type="button">文面をコピー</button>
        <button class="secondary-button" id="regenerateButton" type="button">再生成</button>
      </div>
    </div>
  `;

  $("#copyButton").addEventListener("click", copyProposal);
  $("#regenerateButton").addEventListener("click", () => {
    $("#proposalCopy").value = generateProposal(lead, true);
  });
}

function normalizedContactChannels(lead) {
  const channels = Array.isArray(lead.contactChannels) ? [...lead.contactChannels] : [];

  if (lead.phone && lead.phone !== "未取得") {
    channels.push({ type: "phone", label: "電話", value: lead.phone, source: "基本情報" });
  }

  if (!channels.length && lead.contact) {
    if (lead.contact.includes("メール")) {
      channels.push({ type: "email", label: "メール", value: lead.contact, source: "概要" });
    }
    if (lead.contact.includes("フォーム") || lead.contact.includes("問い合わせ")) {
      channels.push({ type: "form", label: "フォーム", value: lead.contact, source: "概要" });
    }
    if (lead.contact.includes("電話")) {
      channels.push({ type: "phone", label: "電話", value: lead.contact, source: "概要" });
    }
  }

  const seen = new Set();

  return channels.filter((channel) => {
    const key = `${channel.type}:${channel.value || channel.label}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderContactMethods(lead) {
  const channels = normalizedContactChannels(lead);

  if (!channels.length) {
    return '<p class="muted-copy">公式HPから連絡手段を検出できませんでした。</p>';
  }

  const rows = channels
    .map(
      (channel) => `
        <div class="contact-method">
          ${renderChannelIcon(channel)}
          <div>
            <strong>${escapeHtml(channel.label)}</strong>
            <span>${escapeHtml(channel.value || "検出済み")}</span>
          </div>
        </div>
      `,
    )
    .join("");

  return `<div class="contact-methods">${rows}</div>`;
}

function renderChannelIcons(channels = [], mode = "") {
  if (!channels.length) return '<span class="channel-empty">未検出</span>';

  return channels.map((channel) => renderChannelIcon(channel, mode)).join("");
}

function renderChannelIcon(channel, mode = "") {
  const meta = channelMeta(channel.type);
  const label = channel.label || meta.label;
  const title = `${label}${channel.value ? `: ${channel.value}` : ""}`;

  return `
    <span class="channel-icon channel-${meta.type} ${mode}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">
      ${meta.glyph}
    </span>
  `;
}

function channelMeta(type) {
  const channels = {
    phone: { type: "phone", label: "電話", glyph: "☎" },
    email: { type: "email", label: "メール", glyph: "@" },
    form: { type: "form", label: "フォーム", glyph: "✉" },
    line: { type: "line", label: "LINE", glyph: "L" },
    instagram: { type: "instagram", label: "Instagram", glyph: "◎" },
    x: { type: "x", label: "X", glyph: "X" },
  };

  return channels[type] || { type: "other", label: "その他", glyph: "?" };
}

function renderEvidence(lead) {
  const evidence = [
    `取得元: ${lead.source === "google_places" ? "Google Maps API" : "デモデータ"}`,
    `HP検出: ${lead.websiteSource || "未取得"}`,
    ...(lead.evidence || []),
  ];

  return evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function getProfile() {
  return {
    name: elements.profileName.value.trim() || "氏名",
    skill: elements.profileSkill.value,
    strength: elements.profileStrength.value.trim(),
    portfolio: elements.profilePortfolio.value.trim(),
    experience: elements.profileExperience.value.trim(),
    note: elements.profileNote.value.trim(),
  };
}

function generateProfileFit(profile, lead) {
  const config = getCourse();
  const strength = profile.strength || "見やすさと問い合わせ導線の改善";
  const topic = naturalIssuePhrase(lead.issues);

  return `${profile.skill}の強みを使って、${topic}を点検し、${strength}につながる${config.proposalType}ができます。`;
}

function generateHypothesis(lead) {
  const config = getCourse();
  const topic = naturalIssuePhrase(lead.issues);

  if (currentCourse === "sns") {
    return `${topic}を整えることで、発信内容やサービスの魅力が初めて見る方にも伝わりやすくなる可能性があります。`;
  }

  if (currentCourse === "writing") {
    return `${topic}を見直すことで、検索から訪れた方に専門性やサービスの強みが伝わりやすくなる可能性があります。`;
  }

  if (lead.industry.includes("美容")) {
    return `${topic}を整えることで、施術内容や院内の雰囲気が初めて見る方にも伝わりやすくなる可能性があります。`;
  }

  if (lead.industry.includes("歯科")) {
    return `${topic}を見直すことで、診療内容を確認してから予約・問い合わせまで迷いにくいHPにできる可能性があります。`;
  }

  return `${topic}を整理することで、地域の方が必要な情報を確認しやすい${config.researchTarget}にできる可能性があります。`;
}

function naturalIssuePhrase(issues) {
  const phrases = getCourse().issuePhrases;

  const selected = issues.slice(0, 2).map((issue) => phrases[issue] ?? issue);

  if (selected.length === 0) return "情報の見せ方";
  if (selected.length === 1) return selected[0];

  return `${selected[0]}や${selected[1]}`;
}

function generatePositiveObservation(lead) {
  if (currentCourse === "sns") {
    return "サービス内容や雰囲気を地域の方に届けようとされている点が印象的でした。";
  }

  if (currentCourse === "writing") {
    return "専門性やサービス内容を丁寧に伝えようとされている点が印象的でした。";
  }

  if (lead.industry.includes("歯科")) {
    return "診療内容やアクセス情報が掲載されており、地域の方が来院前に必要な情報を確認できる点が印象的でした。";
  }

  if (lead.industry.includes("美容")) {
    return "施術内容やクリニックの雰囲気が伝わる情報が掲載されており、初めて見る方にもサービス内容を確認しやすいと感じました。";
  }

  if (lead.industry.includes("皮膚科")) {
    return "診療内容や受付情報が整理されており、症状に悩む方が事前に確認しやすい内容だと感じました。";
  }

  return "サービス内容やアクセス情報が掲載されており、地域の方に向けて必要な情報を届けようとされている点が印象的でした。";
}

function generateProposal(lead, variant = false) {
  const config = getCourse();
  const copyTarget = researchTargetForCopy();
  const profile = getProfile();
  const style = elements.styleInput.value;
  const observation = generatePositiveObservation(lead);
  const hypothesis = generateHypothesis(lead);
  const issueText = naturalIssuePhrase(lead.issues);
  const profileFit = generateProfileFit(profile, lead);
  const intro = profile.experience
    ? profile.experience
    : `地域の事業者様向けに、${profile.skill}を中心とした${config.proposalType}を行っております。`;
  const note = profile.note
    ? profile.note
    : "営業というよりは、現在のホームページを拝見した上で、気になった点や改善できそうなポイントを相談ベースでお伝えできればと思っております。";
  const portfolioLine = profile.portfolio ? `ポートフォリオURL：${profile.portfolio}` : "ポートフォリオURL";
  const subject =
    style === "地域密着型"
      ? `件名：近隣エリアの${config.proposalType}についてご連絡いたしました`
      : `件名：${config.subject}`;
  const closing =
    style === "サンプル提案型"
      ? `もしご興味がございましたら、${config.proposalType}の改善イメージを簡単にお作りしてお送りできればと思っております。`
      : `もしご興味がございましたら、現在の${copyTarget}を拝見した上で感じたことを簡単にお伝えできればと思っております。`;
  const opener = variant
    ? `突然のご連絡失礼いたします。${copyTarget}を拝見して、少し気になった点がありご連絡いたしました。`
    : "突然のご連絡失礼いたします。";

  return `${subject}

${lead.name}
ご担当者様

${opener}

貴社の${copyTarget}を拝見し、${observation}

一方で、${issueText}のあたりをもう少し整理すると、初めて検討される方にとってさらに分かりやすくなるのではないかと感じました。

${hypothesis}

${profileFit}

私は${profile.name}と申します。${intro}

${note}

${closing}

最後までお読みいただきありがとうございました。

何卒よろしくお願いいたします。

---
${profile.name}
連絡先
${portfolioLine}`;
}

function researchTargetForCopy() {
  if (currentCourse === "writing") return "ブログやコラム";
  return getCourse().researchTarget;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function copyProposal() {
  const text = $("#proposalCopy").value;
  await navigator.clipboard.writeText(text);
  const button = $("#copyButton");
  button.textContent = "コピー済み";
  window.setTimeout(() => {
    button.textContent = "文面をコピー";
  }, 1200);
}

$("#runScanButton").addEventListener("click", runScan);
elements.sortInput.addEventListener("change", render);
elements.includePhoneOnlyInput.addEventListener("change", render);
elements.includeLineOnlyInput.addEventListener("change", render);
elements.noLocationInput.addEventListener("change", () => {
  syncLocationMode();
  runScan();
});
elements.exportCsvButton.addEventListener("click", exportCsv);
elements.saveProfileButton.addEventListener("click", saveProfile);
elements.resetProfileButton.addEventListener("click", resetProfile);
elements.courseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyCourse(button.dataset.course, { resetProfileToCourse: true });
    leads = [];
    selectedLeadId = null;
    render();
    runScan();
  });
});
[elements.profileName, elements.profileSkill, elements.profileStrength, elements.profilePortfolio, elements.profileExperience, elements.profileNote].forEach((input) => {
  input.addEventListener("input", () => {
    updateProfileStatus("未保存の変更あり");
    renderDetail();
  });
});

applyCourse(currentCourse);
syncLocationMode();
hydrateProfile();
loadApiConfig();
runScan();
