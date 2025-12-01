
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateGPTReport(clean,data,rules){
  const prompt = `Impagina questo risultato:\nTESTO:\n${clean}\nDATI:\n${JSON.stringify(data)}\nREGOLE:\n${JSON.stringify(rules)}`;
  const r = await client.chat.completions.create({
    model:'gpt-4o-mini',
    messages:[{role:'user', content:prompt}]
  });
  return r.choices[0].message.content;
}
