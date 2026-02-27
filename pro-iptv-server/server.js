const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const PLAYLIST_FILE = "playlist.txt";

// Ana panel
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "panel.html"));
});

// Film ekleme
app.post("/add", (req, res) => {
  const url = req.body.url;
  if (url) {
    fs.appendFileSync(PLAYLIST_FILE, url + "\n");
  }
  res.redirect("/");
});

// IPTV M3U
app.get("/playlist.m3u8", (req, res) => {
  if (!fs.existsSync(PLAYLIST_FILE)) {
    fs.writeFileSync(PLAYLIST_FILE, "");
  }
  const urls = fs.readFileSync(PLAYLIST_FILE, "utf8")
    .split("\n")
    .filter(Boolean);

  const m3uContent = `#EXTM3U\n` + urls.map(u => `#EXTINF:-1,Film Kanal\n${u}`).join("\n");

  res.setHeader("Content-Type", "application/x-mpegURL");
  res.send(m3uContent);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
