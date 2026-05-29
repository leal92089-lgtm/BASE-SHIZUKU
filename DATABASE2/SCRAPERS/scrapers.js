const fetch = require('node-fetch');

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("TUA_API_GEMINI");

async function BuscarNogpt(query) {
try {

const model = genAI.getGenerativeModel({
model: "gemini-1.5-flash"
});

const result = await model.generateContent(query);

return result.response.text();

} catch (e) {
return "Erro: " + e;
}
}

async function BaixarNoYt(query, tipo) {
try {const res = await fetch(`https://shizuku-ia.0.obrh.uno/api/download/youtube?query=${encodeURIComponent(query.trim())}&tipo=${tipo}`)
const api = await res.json()
const result = api?.resultado?.download;
return result;
} catch (e) {
return "Erro ao buscar resultados";
}
};

async function ttkdl(url) {

const res = await fetch(
`https://tikwm.com/api/?url=${encodeURIComponent(url)}`
);

const json = await res.json();

return json.data.play;
}
if(!api?.resultado) return conn.sendMessage(from, {text: "Erro ao buscar por resultados"}, {quoted: info})
const i = api?.resultado?.data[0];
const txt = `*Titulo:* ${i?.title}
*Sub Titulo:* ${i?.title_audio}

*DOWNLOAD VIA SHIZUKU API'S*`;
setTimeout(() => {
return conn.sendMessage(from, {image: {url: i?.thumb}, caption: txt}, {quoted: info})
}, 2000);
setTimeout(() => {
return conn.sendMessage(from, {video: {url: i?.videoMp4}, mimetype: "video/mp4"}, {quoted: info});
}, 2000);
setTimeout(() => {
return conn.sendMessage(from, {audio: {url: i?.audioMp3}, mimetype: "audio/mpeg", ptt: false, contextInfo: ShizukuStile}, {quoted: info})
}, 2000);
} catch (e) {
return conn.sendMessage(from, {text: "Erro ao buscar por resultados!"});
}
};

async function instadl(url, conn, from, info, quoted, ShizukuStile, SHIZUKU_SITE, SHIZUKU_KEY) {
if(!url?.includes("instagram")) return conn.sendMessage(from, {text: "Apenas links do Instagram"}, {quoted: info})
try {const res = await fetch(`${SHIZUKU_SITE}/download/igdl?url=${encodeURIComponent(url?.trim())}&apitoken=${SHIZUKU_KEY}`);
const api = await res.json();
if(!api?.resultado) return conn.sendMessage(from, {text: "Erro ao obter informações do vídeo"}, {quoted: info});
const i = api?.resultado[0];
setTimeout(() => {
return conn.sendMessage(from, {image: {url: i?.thumb}, caption: "*_baixando e enviando o vídeo, aguarde.._*"}, {quoted: info});
}, 2000);
setTimeout(() => {
return conn.sendMessage(from, {video: {url: i?.url}, mimetype: "video/mp4"}, {quoted: info});
}, 2000);
} catch (e) {
conn.sendMessage(from, {text: "Erro ao buscar resultados"});
return;
}
}

async function METADINHAS(conn, from, info,quoted, SHIZUKU_KEY, SHIZUKU_SITE) {
try {const res = await fetch(`${SHIZUKU_SITE}/api/metadinha?&apitoken=${SHIZUKU_KEY}`);
const json = await res.json();
const api = json?.resultado;
const homem = api?.masculino;
const mulher = api?.feminino;
setTimeout(() => {
conn.sendMessage(from, {image: {url: homem},caption: "🤵 | Perfil masculino"}, {quoted: info});
}, 2000);
setTimeout (() => {
conn.sendMessage(from, {image: {url: mulher}, caption: "👰 | Perfil feminino"}, {quoted: info})
}, 2000);
} catch (e) {
return conn.sendMessage(from, {text: "Erro no comando"}, {quoted: info});
}
}
const ytSearch = require('yt-search');

async function BuscarYoutube(query) {
  try {
    const r = await ytSearch(query);
    const videos = r.videos.slice(0, 5);
    if (!videos.length) return null;
    return videos.map(v => ({
      titulo: v.title,
      duracao: v.timestamp,
      visualizacoes: v.views,
      url: v.url,
      thumb: v.thumbnail
    }));
  } catch (e) {
    return null;
  }
}

const ytdlp = require('yt-dlp-exec');

async function BaixarNoYt(url) {

try {

const info = await ytdlp(url, {
dumpSingleJson: true
});

return {
titulo: info.title,
audio: info.url
};

} catch(e) {
return "Erro ao baixar";
}
}
module.exports = { BuscarNogpt, BaixarNoYt, ttkdl, instadl, METADINHAS, BuscarYoutube, BaixarYtLocalmente }
