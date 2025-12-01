
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import sharp from 'sharp';
import { spawn } from 'child_process';

export async function pdfToFirstPageImage(buffer) {
  const tmp = os.tmpdir();
  const pdf = path.join(tmp, `p-${Date.now()}.pdf`);
  const out = path.join(tmp, `o-${Date.now()}`);
  await fs.writeFile(pdf, buffer);
  await new Promise((res, rej)=>{
    const p = spawn('pdftoppm', ['-png','-singlefile','-r','300', pdf, out]);
    p.on('close', c=> c===0?res():rej());
  });
  const img = await fs.readFile(out+".png");
  return sharp(img).grayscale().sharpen().toBuffer();
}
