const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const LIST_FILE = "playlist.txt";

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/panel.html");
});

app.post("/add", (req, res) => {
    fs.appendFileSync(LIST_FILE, req.body.url + "\n");
    res.send("OK");
});

app.get("/playlist.m3u8", (req, res) => {

    const urls = fs.readFileSync(LIST_FILE, "utf8")
        .split("\n")
        .filter(Boolean);

    const playlist = `#EXTM3U\n` +
        urls.map(u =>
            `#EXTINF:-1,Film\n${u}`
        ).join("\n");

    res.setHeader("Content-Type", "application/x-mpegURL");
    res.send(playlist);
});

app.listen(3000);
