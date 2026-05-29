```js
const fetch = require('node-fetch');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ytdlp = require('yt-dlp-exec');


// =====================================
// CONFIG
// =====================================

const GEMINI_API = process.env.GEMINI_API;

const genAI = new GoogleGenerativeAI(GEMINI_API);


// =====================================
// GPT
// =====================================

async function BuscarNogpt(query) {

try {

if (!query) return "Faça uma pergunta.";

const model = genAI.getGenerativeModel({
model: "gemini-1.5-flash"
});

const result = await model.generateContent(query);

const resposta = result.response.text();

return resposta;

} catch (e) {

console.log(e);

return "Erro ao usar GPT.";

}

}


// =====================================
// YOUTUBE
// =====================================

async function BaixarNoYt(url, tipo = "audio") {

try {

const info = await ytdlp(url, {
dumpSingleJson: true
});

if (tipo === "video") {

return {
titulo: info.title,
download: info.url
};

}

if (tipo === "audio") {

return {
titulo: info.title,
download: info.url
};

}

return {
titulo: info.title,
download: info.url
};

} catch (e) {

console.log(e);

return "Erro ao baixar conteúdo.";

}

}


// =====================================
// TIKTOK
// =====================================

async function ttkdl(
url,
conn,
from,
info,
quoted,
ShizukuStile
) {

try {

if (!url.includes("tiktok")) {

return conn.sendMessage(
from,
{text: "Apenas links do TikTok"},
{quoted: info}
);

}

const res = await fetch(
`https://tikwm.com/api/?url=${encodeURIComponent(url)}`
);

const json = await res.json();

if (!json.data) {

return conn.sendMessage(
from,
{text: "Erro ao obter vídeo."},
{quoted: info}
);

}

const data = json.data;

const txt = `
🎵 *TikTok Download*

📌 *Título:* ${data.title}

👤 *Autor:* ${data.author.nickname}
`;

await conn.sendMessage(
from,
{
image: {url: data.cover},
caption: txt
},
{quoted: info}
);

await conn.sendMessage(
from,
{
video: {url: data.play},
mimetype: "video/mp4"
},
{quoted: info}
);

await conn.sendMessage(
from,
{
audio: {url: data.music},
mimetype: "audio/mpeg",
ptt: false,
contextInfo: ShizukuStile
},
{quoted: info}
);

} catch (e) {

console.log(e);

return conn.sendMessage(
from,
{text: "Erro ao baixar TikTok."},
{quoted: info}
);

}

}


// =====================================
// INSTAGRAM
// =====================================

async function instadl(
url,
conn,
from,
info,
quoted,
ShizukuStile
) {

try {

if (!url.includes("instagram")) {

return conn.sendMessage(
from,
{text: "Apenas links do Instagram"},
{quoted: info}
);

}

const res = await fetch(
"https://v3.igdownloader.app/api/ajaxSearch",
{
method: "POST",
headers: {
"content-type":
"application/x-www-form-urlencoded; charset=UTF-8"
},
body:
`recaptchaToken=&q=${encodeURIComponent(url)}&t=media`
}
);

const json = await res.json();

if (!json.data || !json.data[0]) {

return conn.sendMessage(
from,
{text: "Erro ao obter vídeo."},
{quoted: info}
);

}

const video = json.data[0].url;

await conn.sendMessage(
from,
{
text: "📥 Baixando vídeo do Instagram..."
},
{quoted: info}
);

await conn.sendMessage(
from,
{
video: {url: video},
mimetype: "video/mp4"
},
{quoted: info}
);

} catch (e) {

console.log(e);

return conn.sendMessage(
from,
{text: "Erro ao baixar Instagram."},
{quoted: info}
);

}

}


// =====================================
// METADINHAS
// =====================================

async function METADINHAS(
conn,
from,
info
) {

try {

const masculino =
"https://i.imgur.com/8PT6G3D.jpeg";

const feminino =
"https://i.imgur.com/2YQZ6Yg.jpeg";

await conn.sendMessage(
from,
{
image: {url: masculino},
caption: "🤵 | Perfil masculino"
},
{quoted: info}
);

await conn.sendMessage(
from,
{
image: {url: feminino},
caption: "👰 | Perfil feminino"
},
{quoted: info}
);

} catch (e) {

console.log(e);

return conn.sendMessage(
from,
{text: "Erro no comando"},
{quoted: info}
);

}

}


// =====================================
// EXPORTS
// =====================================

module.exports = {

BuscarNogpt,
BaixarNoYt,
ttkdl,
instadl,
METADINHAS

};
```
