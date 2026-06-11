const { handleRequest } = require("../lib/server");

module.exports = async function handler(req, res) {
  return handleRequest(req, res);
};
