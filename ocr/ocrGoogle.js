
import { ImageAnnotatorClient } from "@google-cloud/vision";

let client=null;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  try {
    const creds = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    client = new ImageAnnotatorClient({ credentials: creds });
  } catch(e){ console.log("Vision init error", e.message); }
}

export async function ocrGoogle(buf) {
  if (!client) return "";
  try {
    const [r] = await client.textDetection({ image:{content:buf} });
    return r.fullTextAnnotation?.text || "";
  } catch(e){
    return "";
  }
}
