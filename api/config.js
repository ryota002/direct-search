module.exports = function handler(req, res) {
  res.status(200).json({
    hasGoogleMapsKey: Boolean(process.env.GOOGLE_MAPS_API_KEY),
  });
};
