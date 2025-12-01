
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import analyze from './analyze.js';

const app = express();
const upload = multer({ dest: '/tmp' });

const ENABLE_EMAIL = process.env.ENABLE_EMAIL === 'true';

app.post('/analyze', upload.single('label'), async (req, res) => {
  try {
    const buf = await fs.readFile(req.file.path);
    const result = await analyze(buf, { enableEmail: ENABLE_EMAIL });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await fs.unlink(req.file.path).catch(()=>{});
  }
});

app.listen(8080, ()=>console.log("UltraCheck v2 running"));
