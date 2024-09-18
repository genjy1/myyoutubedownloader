const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/download', async (req, res) => {
  const videoURL = req.query.url;

  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    let title = info.videoDetails.title || 'video';
    title = title.replace(/[<>:"/\\|?*]+/g, '');
    // Устанавливаем заголовок для скачивания файла
    res.header('Content-Disposition', `attachment; filename="${encodeURIComponent(title)}.mp4"`);

    // Передаем видеопоток на клиент
    ytdl(videoURL, {
      format: 'mp4',
    }).pipe(res);
  } catch (error) {
    console.error('Failed to download video:', error);
    res.status(500).json({ error: 'Failed to process video download' });
  }
});

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
