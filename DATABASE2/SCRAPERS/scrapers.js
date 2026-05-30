const fetch = require('node-fetch');
const ytSearch = require('yt-search');
const ytdl = require('@distube/ytdl-core');
const fs = require('fs');
const path = require('path');

async function RespostaIA(pergunta, pushname) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `És um bot de WhatsApp chamado Shizuku. Respondes sempre em português de Angola. Tens uma personalidade sarcástica, inteligente e bem-humorada. Nunca és grosseiro mas sempre tens uma resposta afiada. O utilizador chama-se ${pushname}.`,
        messages: [{ role: 'user', content: pergunta }]
      })
    });
    const data = await res.json();
    return data?.content?.[0]?.text || 'Nem eu sei responder a isso...';
  } catch (e) {
    return 'Erro ao pensar... o que já diz muito sobre a pergunta.';
  }
}

async function RespostaIA(pergunta, pushname) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: `És um bot de WhatsApp chamado Shizuku. Respondes sempre em português de Angola. Tens personalidade sarcástica, inteligente e bem-humorada. O utilizador chama-se ${pushname}.` }]
          },
          contents: [{ parts: [{ text: pergunta }] }]
        })
      }
    );
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Nem eu sei responder a isso...';
  } catch (e) {
    return 'Erro ao pensar... o que já diz muito sobre a pergunta.';
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

async function ttkdl(url, conn, from, info, quoted, ShizukuStile, SHIZUKU_SITE, SHIZUKU_KEY) {
if(!url?.includes("tiktok")) return conn.sendMessage(from, {text: "Apenas links do tiktok"}, {quoted: info})
try {const res = await fetch(`${SHIZUKU_SITE}/download/tiktokdl-2?url=${encodeURIComponent(url.trim())}&apitoken=${SHIZUKU_KEY}`)
const api = await res.json();

if(!api?.resultado) return conn.sendMessage(from, {text: "Erro ao buscar por resultados"}, {quoted: info})
const i = api?.resultado?.data[0];
const txt = `*Titulo:* ${i?.title}\n*Sub Titulo:* ${i?.title_audio}\n\n*DOWNLOAD VIA SHIZUKU API'S*`;
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

async function METADINHAS(conn, from, info, quoted, SHIZUKU_KEY, SHIZUKU_SITE) {
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

async function BaixarYtLocalmente(query, tipo) {
  try {
    const r = await ytSearch(query);
    const video = r.videos[0];
    if (!video) return null;

    const info = await ytdl.getInfo(video.url);
    const titulo = info.videoDetails.title;
    const thumb = info.videoDetails.thumbnails[0].url;

    const tmpDir = './tmp';
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const nomeArquivo = path.join(tmpDir, `yt_${Date.now()}.${tipo === 'mp3' ? 'mp3' : 'mp4'}`);

    await new Promise((resolve, reject) => {
      const formato = tipo === 'mp3'
        ? ytdl(video.url, { filter: 'audioonly', quality: 'highestaudio' })
        : ytdl(video.url, { filter: 'videoandaudio', quality: 'highest' });
      formato.pipe(fs.createWriteStream(nomeArquivo))
        .on('finish', resolve)
        .on('error', reject);
    });

    return { titulo, thumb, arquivo: nomeArquivo, tipo };
  } catch (e) {
    return null;
  }
}

module.exports = { BuscarNogpt, RespostaIA, BaixarNoYt, ttkdl, instadl, METADINHAS, BuscarYoutube, BaixarYtLocalmente }
