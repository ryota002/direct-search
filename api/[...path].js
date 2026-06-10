const { handleRequest } = require("../server");

module.exports = async function handler(req, res) {
  try {
    return await handleRequest(req, res);
  } catch (error) {
    console.error("Vercel function crashed", error);
    return res.status(500).json({
      error: "FUNCTION_CRASHED",
      message: error.message || "Unexpected function error",
    });
  }
};
