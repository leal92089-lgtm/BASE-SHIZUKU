/*
================================================================
====================== SHIZUKU BASE ============================
================================================================

ESTA E UMA BASE LIMPA E SIMPLES, DESENVOLVIDA TOTALMENTE DO ZERO
POR MIM JPZINH. NAO E UM BOT COMPLETO, E UMA ESTRUTURA PARA
AJUDAR QUEM ESTA COMEANDO E NAO SABE O BASICO.

NAO VENDA, NAO REPASSE E NAO DIGA QUE FOI VOCE QUE FEZ.
USE COM RESPONSABILIDADE. ESTA BASE FOI CRIADA COM MUITO ESFORCO.

----------------------------------------------------------------
==================== INFORMACOES DO PROJETO =====================
----------------------------------------------------------------

NOME: SHIZUKU BASE
CREATOR: JPZINH

WHATSAPP (MEU E DO MEU BOT):
- 55 16 98828-0081
- 55 93 9242-0001
- 55 93 9229-1244

----------------------------------------------------------------
======================== SOBRE AS KEYS ==========================
----------------------------------------------------------------

ALGUNS COMANDOS COMO DOWNLOADS EXIGEM KEY PARA FUNCIONAR.

ADQUIRA SUA KEY NO SITE OFICIAL:
HTTPS://SHIZUKU-APIS.SHOP

DONOS: JPZINH E DEV-FOXY
LOJA (TELEGRAM): HTTPS://T.ME/SHIZUKUAPIS_BOT

----------------------------------------------------------------
====================== CHAT IA (SUPORTE) ========================
----------------------------------------------------------------

ACESSE:
HTTPS://SHIZUKU-IA.0.OBRH.UNO/

----------------------------------------------------------------
==================== CANAL DE ATUALIZACOES ======================
----------------------------------------------------------------

ACESSE:
HTTPS://WHATSAPP.COM/CHANNEL/0029VBBOQI7F1YLYIXIWBD37

----------------------------------------------------------------
======================== GRUPO DE SUPORTE =======================
----------------------------------------------------------------

ENTRE NO GRUPO:
HTTPS://CHAT.WHATSAPP.COM/D1WUKVCRWR FCU05MGGPWTY

----------------------------------------------------------------
=========================== AVISO FINAL =========================
----------------------------------------------------------------

DEIXE OS CREDITOS.
NAO REMOVA OS CREDITOS.
RESPEITE O TRABALHO FEITO AQUI.

================================================================
========================== END OF FILE ==========================
================================================================
*/

const colors = require("colors");
const cfonts = require('cfonts')
const axios = require('axios')
const fetch = require('node-fetch');

var corzinhas = ["red", "green", "yellow", "blue","magenta", "cyan", "white", "gray", "redBright","greenBright", "yellowBright", "blueBright", "magentaBright", "cyanBright", "whiteBright"];
const cor1 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];	
const cor2 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];	
const cor3 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];
const cor4 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];	
const cor5 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];

function normalizeJid(jid) {//FUNÇÃO BY: NKZIN-DEV, NÃO TIRA OS CRÉDITOS DESGRAÇA!!
if(!jid) return null;
let id = jid.replace(/:.*(?=@)/, '');
if (id.endsWith('@lid')) {
id = id.replace('@lid', '@s.whatsapp.net');
} else if (!id.endsWith('@s.whatsapp.net')) {
id += '@s.whatsapp.net';
}
return id;
}

function getGroupAdmins(participants) {////FUNÇÃO BY: NKZIN-DEV, NÃO TIRA OS CRÉDITOS DESGRAÇA!!
return participants
.filter(p => p.admin === "admin" || p.admin === "superadmin")
.map(p => {
const jidReal = p.jid || p.participantPn || (p.participant.includes('@') ? p.participant.split(':')[0] + '@s.whatsapp.net' : p.participant + '@s.whatsapp.net');
return normalizeJid(jidReal);
});
}

function getMembros(participants) {//FUNÇÃO BY: NKZIN-DEV, NÃO TIRA OS CRÉDITOS DESGRAÇA!!
return participants
.filter(p => !p.admin)
.map(p => {
const jidReal = p.jid || p.participantPn || (p.participant.includes('@') ? p.participant.split(':')[0] + '@s.whatsapp.net' : p.participant + '@s.whatsapp.net');
return normalizeJid(jidReal);
});
}

const getBuffer = async (url, opcoes) => {
try {
opcoes ? opcoes : {}
const post = await axios({
method: "get",
url,
headers: {
'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36', 
	'DNT': 1,
	'Upgrade-Insecure-Request': 1
},
...opcoes,
responseType: 'arraybuffer'
})
return post.data
} catch (erro) {
console.log(`Erro identificado: ${erro}`)
}
}

const ShizukuStile = {
forwardingScore: 100000,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363423209367684@newsletter",
    newsletterName: "❊ 𖤐 𝘚𝘩𝘪𝘻𝘶𝘬𝘶 - 𝘊𝘩𝘢𝘯𝘯𝘦𝘭 𖤐 ❊"
  }
};
async function fetchJson(url, options = {}) {
try {
const res = await fetch(url, options);
const json = await res.json();
return json;
} catch (err) {
throw err;
}
}


const banner2 = cfonts.render(('Criador: jpzinh | WhatsApp: +55 16 98828-0081'), {
font: 'console',
align: 'center',
gradrient: [`${cor4}`,`${cor2}`], 
colors: [`${cor3}`,`${cor1}`,`${cor5}`],
lineHeight: 1
});

 const banner3 = cfonts.render((`BASE-SHIZUKU`), {
font: 'slick',             
align: 'center',           
colors: [`${cor1}`,`${cor3}`,`${cor4}`,`${cor2}`],
background: 'transparent',  
letterSpacing: 1,           
lineHeight: 1,            
space: true,               
maxLength: '0',            
gradrient: [`${cor4}`,`${cor2}`],     
independentGradient: false, 
transitionGradient: false, 
env: 'node'
});  

const jpzinhhomi = "5516988280081@s.whatsapp.net";//NÃO SEJA UM CABA CORNO E N MUDA NADA AQ!!
const Shizukuu = "559392420001@s.whtsapp.net";//NÃO MUDA AQUI NÃO!

module.exports = { banner2, banner3, fetchJson, getBuffer, getGroupAdmins, getMembros, jpzinhhomi, Shizukuu, ShizukuStile};