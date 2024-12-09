const express = require("express");
const { sendEmail, savePdf } = require("../controllers/email");

const routerPdf = express.Router();

routerPdf.post("/sendEmail",sendEmail)
routerPdf.post("/save",savePdf)

module.exports = {routerPdf};