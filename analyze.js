
import { pdfToFirstPageImage } from "./ocr/pdfToImage.js";
import { ocrGoogle } from "./ocr/ocrGoogle.js";
import cleanOCR from "./utils/cleanOCR.js";
import extractData from "./extract/extractDataFromText.js";
import applyRules from "./rules/applyRules.js";
import { generateGPTReport } from "./ai/openai.js";
import Tesseract from "tesseract.js";

export default async function analyze(buffer, opts={}) {
  const img = await pdfToFirstPageImage(buffer);
  let text = await ocrGoogle(img);
  if (!text.trim()) {
    const t = await Tesseract.recognize(img, "eng+ita");
    text = t.data.text || "";
  }
  const clean = cleanOCR(text);
  const data = extractData(clean);
  const rules = applyRules(data);
  const report = await generateGPTReport(clean, data, rules);
  return { clean, data, rules, report };
}
