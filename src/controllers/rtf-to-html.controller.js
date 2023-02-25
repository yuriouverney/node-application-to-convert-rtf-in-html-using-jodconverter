const RtfToHtmlService = require('../services/rtf-to-html.service');

const HtmlToRtfController = {
  async startProcess(req, res) {
    const service = new RtfToHtmlService()
    const data = await service.startProcess();
    res.json(data);
  },
};

module.exports = HtmlToRtfController;