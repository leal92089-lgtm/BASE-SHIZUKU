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

const baileys = require("@whiskeysockets/baileys");
const { NumberDono, prefix, NickDono, NomeBot, SHIZUKU_KEY, SHIZUKU_SITE} = require("./dono/dono");
const ytSearch = require('yt-search');
const chalk = require('chalk');
const { version } = require("./package");

const { 
fetchJson, 
colors, 
hora, 
data, 
getBuffer,
 fs, 
SimilarComandos, 
ListaComandos, 
getGroupAdmins, 
getMembros, 
moment, 
msg,
axios,
kyun,
infoSystem,
os,
menu,
menus, 
FotoMenu,
Config,
Config2,
linkfy,
util,
exec,
jpzinhhomi,
Shizukuu,
sleep,
ShizukuStile,
Cmd,
BuscarNogpt,
BaixarNoYt,
ttkdl,
instadl,
METADINHAS,
ANT_LTR_MD_EMJ,
dono1,
dono2,
dono3,
dono4,
dono5,
dono6,
sendImageAsSticker2,
 sendVideoAsSticker2,
 getFileBuffer,
 downloadContentFromMessage,
 prepareWAMessageMedia,
 jidNormalizedUser
} = require("./consts");

async function iniciarBot() {
	
module.exports = async function (conn, upsert) {
  try {
const info = upsert?.messages && upsert?.messages[0];
if (!info) return;
const from = info?.key?.remoteJid;
const isGroup = from.endsWith('@g.us');
const pushname = info?.pushName || await conn?.user?.name || "Usuário";
const content = JSON.stringify(info.message);
const quoted = info.quoted ? info.quoted : info
const sender = jidNormalizedUser(isGroup ? info?.key?.participantPn || 
info?.key?.senderPn || 
await conn?.user?.id || 
info?.key?.participant : info?.key?.senderPn || 
info?.key?.participant ||
info?.key?.remoteJid 
);


const botNumber = jidNormalizedUser(await conn.user.id || await conn.user.lid);
const Numero1 = jidNormalizedUser(`${dono1}@s.whatsapp.net`);
const Numero2 = jidNormalizedUser(`${dono2}@s.whatsapp.net`);
const Numero3 = jidNormalizedUser(`${dono3}@s.whatsapp.net`);
const Numero4 = jidNormalizedUser(`${dono4}@s.whatsapp.net`);
const Numero5 = jidNormalizedUser(`${dono5}@s.whatsapp.net`);
const Numero6 = jidNormalizedUser(`${dono6}@s.whatsapp.net`);
const MeuNumero = jidNormalizedUser(`${NumberDono}@s.whatsapp.net`);
const IsCreator = jpzinhhomi?.includes(sender);
const SoCriador = Shizukuu?.includes(sender);
const SoBot = botNumber?.includes(sender)
const So_Dono = MeuNumero?.includes(sender) || 
Numero1?.includes(sender) ||
Numero2?.includes(sender) || 
Numero3?.includes(sender) ||
Numero4?.includes(sender) ||
Numero5?.includes(sender) ||
Numero6?.includes(sender) ||
SoBot || 
SoCriador ||
IsCreator;

// Bloquear privado — só o dono passa
if (!isGroup && !So_Dono) return;

// Bloquear grupos não autorizados — só o dono passa
const gruposPermitidos = JSON.parse(fs.readFileSync('./dono/grupos-permitidos.json', 'utf-8') || '[]');
if (isGroup && !gruposPermitidos.includes(from) && !So_Dono) return;
	  
const type = baileys.getContentType(info?.message);
let body =
  info?.message?.conversation ||
  info?.message?.extendedTextMessage?.text ||
  info?.message?.imageMessage?.caption ||
  info?.message?.videoMessage?.caption ||
  info?.message?.documentWithCaptionMessage?.message?.documentMessage?.caption ||
  info?.message?.buttonsResponseMessage?.selectedButtonId ||
  info?.message?.templateButtonReplyMessage?.selectedId ||
  info?.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
  info?.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson ||
  info?.text ||
  "";
  
if (info?.message?.listResponseMessage) {
body = info?.message?.listResponseMessage?.singleSelectReply?.selectedRowId;
}
if (info?.message?.interactiveResponseMessage) {
try {const botn = JSON.parse(info?.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson);
if (botn?.id) body = botn?.id;
} catch {}
}

//CONSTS IMPORTANTES
const isImage = type == 'imageMessage'
const isVideo = type == 'videoMessage'
const isVisuU2 = type == 'viewOnceMessageV2'
const isAudio = type == 'audioMessage'
const isSticker = type == 'stickerMessage'
const isContact = type == 'contactMessage'
const isLocation = type == 'locationMessage'
const isProduct = type == 'productMessage'
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage' || type == "viewOnceMessage" || type == "viewOnceMessageV2")
typeMessage = body.substr(0, 50).replace(/\n/g, '')
if(isImage) typeMessage = "Image"
else if(isVideo) typeMessage = "Video"
else if(isAudio) typeMessage = "Audio"
else if(isSticker) typeMessage = "Sticker"
else if(isContact) typeMessage = "Contact"
else if(isLocation) typeMessage = "Location"
else if(isProduct) typeMessage = "Product"

const isQuotedMsg = type === 'extendedTextMessage' && content.includes('conversation')
const isQuotedMsg2 = type === 'extendedTextMessage' && content.includes('text')
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVisuU2 = type === 'extendedTextMessage' && content.includes('viewOnceMessageV2')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
const isQuotedDocW = type === 'extendedTextMessage' && content.includes('documentWithCaptionMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
const isQuotedProduct = type === 'extendedTextMessage' && content.includes('productMessage')

///{ constantes muito importantes}\\
const budy = (type === 'conversation') ? info.message?.conversation : (type === 'extendedTextMessage') ? info.message?.extendedTextMessage?.text : '';
const Procurar_String = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || ""
const PR_String = Procurar_String.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
const budy2 = body.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
const args = body.trim().split(/ +/).slice(1);
const arg = body.trim().split(/ +/).slice(1);
const q = args.join(' ');
const isCmd = body.trim().startsWith(prefix);
const command = isCmd ? budy2.trim().slice(1).split(/ +/).shift().toLocaleLowerCase(): null;

//INFO DE GRUPOS!!
const Infos_Do_Grupo = isGroup ? await conn.groupMetadata(from) : {} || '';
const NomeGrupo = Infos_Do_Grupo?.subject || '';
const DescGp = Infos_Do_Grupo?.desc || '';
const MembrosGP = Infos_Do_Grupo?.participants || [];
const TotalAdmins = MembrosGP[0]?.admin || '';
const TotalMembros = MembrosGP.length || 0;
const Dono_Do_Grupo = Infos_Do_Grupo?.subjectOwnerJid || '';

const So_Admins = isGroup ? getGroupAdmins(MembrosGP) : ''
const somembros = isGroup ? getMembros(MembrosGP) : ''

const dirGroup = `./DATABASE2/GRUPOS/ATIVACOES/${from}.json`

if(isGroup && !fs.existsSync(dirGroup)){
var dataGp2 = [{
name: NomeGrupo,
groupId: from, 
antilinkhard: false, 
So_Admins: false,
bangp: false,
wellcome: [{
bemvindo1: false,
legendabv: "Olá #numerodele#, seja bem vindo(a) ao Grupo: *#nomedogp#*, Shizuku lhe deseja as boas vindas 🕸️",
legendasaiu: "Adeus, #numerodele#, espero que não se arrependa pela sua decisão. "
},
{
bemvindo2: false,
legendabv: "Olá #numerodele#, seja bem vindo(a) ao Grupo: *#nomedogp#*, Shizuku lhe deseja as boas vindas 🕸️",
legendasaiu: "Adeus, #numerodele#, espero que não se arrependa pela sua decisão. "
}],
}]
fs.writeFileSync(dirGroup, JSON.stringify(dataGp2, null, 2) + '\n')
}

const dataGp = isGroup ? JSON.parse(fs.readFileSync(dirGroup)) : undefined 

function setGp(index){
fs.writeFileSync(dirGroup, JSON.stringify(index, null, 2) + '\n')}

const isBemvindo = isGroup ? dataGp[0]?.wellcome[0]?.bemvindo1 : undefined 
const isBemvindo2 = isGroup ? dataGp[0]?.wellcome[1]?.bemvindo2 : undefined
const isAntiLinkHard = isGroup ? dataGp[0]?.antilinkhard : undefined
const SoAdmins = isGroup ? dataGp[0]?.So_Admins : undefined 
const isBanGrupo = isGroup ? dataGp[0]?.bangp : undefined 

const BotOff = Config2.botoff 
const isVerificado = Config2.verificado

//DEFINIÇÕES UTEIS
const selo = Config2.verificado ? {key: {fromMe: false, remoteJid: from, id: "META",
participant: "13135550002@s.whatsapp.net"
}, message: { contactMessage: { displayName: pushname,
 vcard: `BEGIN:VCARD
VERSION:3.0
N:Meta AI;;;;
FN:Meta AI
TEL;waid=13135550002:+1 313 555 0002
END:VCARD`
}
}
} : info


async function reply(texto){
try {
return conn.sendMessage(from, {text: texto, contextInfo: ShizukuStile}, {quoted: selo})
} catch (E) {
return reply("Erro ao enviar msg");
};
};

const reagir = async (idgp, emj) => {
var reactionMessage = {
react: {
text: emj, 
key: info.key
}
} 
conn.sendMessage(idgp, reactionMessage)
}

var isUrl = (url) => {
if(linkfy.find(url)[0]) return true
return false
}

const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? conn.sendMessage(from, {text: teks.trim(), mentions: memberr}) : conn.sendMessage(from, {text: teks.trim(), mentions: memberr})
}
	
const mention = (teks= '', ms = info) => {
memberr = []
vy = teks.includes('\n') ? teks.split('\n') : [teks]
for(vz of vy){ for(zn of vz.split(' ')){
if(zn.includes('@'))memberr.push(parseInt(zn.split('@')[1])+'@s.whatsapp.net')
}}
conn.sendMessage(from, {text: teks.trim(), mentions: memberr}, {quoted: ms}) 
}

const hora2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
if(hora2 > "00:00:00" && hora2 < "05:00:00"){
var tempo = 'Boa noite'
} if(hora2 > "05:00:00" && hora2 < "12:00:00"){
var tempo = 'Bom dia'
} if(hora2 > "12:00:00" && hora2 < "18:00:00"){
var tempo = 'Boa tarde'
} if(hora2 > "18:00:00"){
var tempo = 'Boa noite'
}


const isBotGroupAdmins = So_Admins?.includes(botNumber) || false;
const isGroupAdmins = So_Admins.includes(sender) || false || So_Dono ||SoBot || IsCreator || SoCriador

// FUNÇÕES DE MARCAÇÕES ESSENCIAL \\
//FUNÇÃO BY: NKZIN-DEV, NÃO TIRA OS CRÉDITOS DESGRAÇA!!
let menc_prt = info.message?.extendedTextMessage?.contextInfo?.participant || '';
if (menc_prt.includes('@lid') && Infos_Do_Grupo?.participants) {
menc_prt = Infos_Do_Grupo.participants.find(v => v.lid === menc_prt)?.jid || '';
}
const menc_jid2 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
if (menc_jid2?.[0]?.includes('@lid') && Infos_Do_Grupo?.participants) {
menc_jid2[0] = Infos_Do_Grupo.participants.find(v => v.lid === menc_jid2[0])?.jid || '';
}
const menc_os2 = q.includes("@") ? (Array.isArray(menc_jid2) && menc_jid2.length > 0 ? menc_jid2[0] : null) : menc_prt;
const menc_jid = jidNormalizedUser(menc_os2 || sender);
const sender_ou_n = q.includes("@") ? menc_jid2?.[0] : (menc_prt || sender);
const normalizar = alvo => {
if (alvo?.includes('@lid') && Infos_Do_Grupo?.participants) {
return Infos_Do_Grupo.participants.find(v => v.lid === alvo)?.jid || alvo;
}
return alvo;
};//FUNÇÃO BY: NKZIN-DEV, NÃO TIRA OS CRÉDITOS DESGRAÇA!!
const numClean = txt => txt.replace(/[()+\-\/\s]/g, '') + '@s.whatsapp.net';
const mrc_ou_numero  = q.length > 6  && !q.includes('@') ? numClean(q)  : normalizar(menc_prt);
const marc_tds       = q.includes('@')                 ? normalizar(menc_jid) : q.length > 6  && !q.includes('@') ? numClean(q)  : normalizar(menc_prt);
const menc_prt_nmr   = q.length > 12 && !q.includes('@') ? numClean(q)  : normalizar(menc_prt);
const menc_prt3 = info.message?.extendedTextMessage?.contextInfo?.participant
const menc_jid3 = args?.join(" ").replace("@", "") + "@s.whatsapp.net"
const menc_jid23 = info.message?.extendedTextMessage?.contextInfo?.mentionedJid
const sender_ou_n3 = q.includes("@") ? menc_jid : sender
const mrc_ou_numero3 = q.length > 6 && !q.includes("@") ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` : menc_prt 
const menc_os23 = q.includes("@") ? menc_jid : menc_prt 
const marc_tds3 = q.includes("@") ? menc_jid : q.length > 6 && !q.includes("@") ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` : menc_prt 
const menc_prt_nmr3 = q.length > 12 ? q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` : menc_prt
//============================//
if(BotOff && !So_Dono) return;

if(isGroup && isCmd && SoAdmins && !So_Dono && !isGroupAdmins) return;

if(isGroup && isCmd && isBanGrupo && !So_Dono) return


let tipoMsg = "Texto";

if (info?.message?.imageMessage) tipoMsg = "📸 Imagem";
else if (info?.message?.videoMessage) tipoMsg = "🎥 Vídeo";
else if (info?.message?.audioMessage) tipoMsg = "🎧 Áudio";
else if (info?.message?.stickerMessage) tipoMsg = "🔖 Figurinha";
else if (info?.message?.documentMessage) tipoMsg = "📄 Documento";
else if (info?.message?.buttonsResponseMessage) tipoMsg = "🔘 Botão";
else if (info?.message?.listResponseMessage) tipoMsg = "📋 Lista";
else if (info?.message?.reactionMessage) tipoMsg = "💬 Reação";

function linha(label, value) {
  return `${chalk.gray("│")} ${chalk.hex("#9ca3af")(label)} ${chalk.white(value)}`;
}

if (!isGroup && isCmd) {
  console.log(chalk.hex("#7c3aed")("\n╭────〔 ⚡ COMANDO PRIVADO 〕────╮"));
  console.log(linha("🧠 Comando:", command));
  console.log(linha("👤 Usuário:", pushname));
  console.log(linha("📱 Número:", sender.split("@")[0]));
  console.log(linha("🕒 Hora:", hora2));
  console.log(linha("📆 Data:", data));
  console.log(linha("👑 Dono:", So_Dono ? chalk.green("Sim") : chalk.red("Não")));
  console.log(chalk.hex("#7c3aed")("╰──────────────────────────────╯\n"));
}

if (isGroup && isCmd) {
  console.log(chalk.hex("#2563eb")("\n╭────〔 👥 COMANDO EM GRUPO 〕────╮"));
  console.log(linha("🧠 Comando:", command));
  console.log(linha("👤 Usuário:", pushname));
  console.log(linha("📱 Número:", sender.split("@")[0]));
  console.log(linha("👥 Grupo:", NomeGrupo));
  console.log(linha("🕒 Hora:", hora2));
  console.log(linha("👑 Dono:", So_Dono ? chalk.green("Sim") : chalk.red("Não")));
  console.log(chalk.hex("#2563eb")("╰──────────────────────────────╯\n"));
}

if (isGroup && !isCmd && !info.key.fromMe) {
  console.log(chalk.hex("#06b6d4")("\n╭────〔 💬 MENSAGEM EM GRUPO 〕────╮"));
  console.log(linha("👤 Usuário:", pushname));
  console.log(linha("📱 Número:", sender.split("@")[0]));
  console.log(linha("👥 Grupo:", NomeGrupo));
  console.log(linha("📦 Tipo:", tipoMsg));
  console.log(linha("🕒 Hora:", hora2));
  console.log(linha("📎 Texto:", body?.slice(0, 60) || "—"));
  console.log(chalk.hex("#06b6d4")("╰──────────────────────────────╯\n"));
}

if (info?.message?.reactionMessage) {
  console.log(chalk.hex("#facc15")("\n╭────〔 😂 REAÇÃO DETECTADA 〕────╮"));
  console.log(linha("👤 Usuário:", pushname));
  console.log(linha("📱 Número:", sender.split("@")[0]));
  if (isGroup) console.log(linha("👥 Grupo:", NomeGrupo));
  console.log(linha("😄 Emoji:", info.message.reactionMessage.text));
  console.log(chalk.hex("#facc15")("╰──────────────────────────────╯\n"));
}

//==={ANTI LINK} ===\\
let isTrueFalse = Array('tiktok', 'facebook','instagram','twitter','ytmp3','ytmp4','play', 'playmix', 'play2', 'play3', 'playvid', 'playvid2').some(item => item === command)

if(isUrl(PR_String) && isAntiLinkHard && !isGroupAdmins && isBotGroupAdmins && !info.key.fromMe) {
if(Procurar_String.includes("chat.whatsapp.com")) {
link_dgp = await conn.groupInviteCode(from)
if(Procurar_String.match(link_dgp)) return reply('Link do nosso grupo, não irei remover.. ') 
}
if(isCmd && isTrueFalse) return reply("o Erro ta aq")
setTimeout(() => {
conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: info.key.id, participant: sender}})
}, 1200);
conn.groupSettingUpdate(from, 'announcement')
setTimeout(() => {
conn.groupSettingUpdate(from, 'not_announcement')
}, 1200)
if(!JSON.stringify(MembrosGP).includes(sender)) return
conn.groupParticipantsUpdate(from, [sender], 'remove')
}//FIM


//EVAL E EXECUÇÕES 
if(body.startsWith('π')){
try {
if(info.key.fromMe) return 
if(!So_Dono) return
console.log('[', colors.cyan('EVAL'),']', colors.yellow(moment(info.messageTimestamp * 1000).format('DD/MM HH:mm:ss')), colors.green(budy))
return conn.sendMessage(from, {text: JSON.stringify(eval(budy.slice(2)),null,'\t')}).catch(e => {
return reply(String(e))
})
} catch (e){
return reply(String(e))
}
}

if(body.startsWith(':)')){
try {
if(info.key.fromMe) return   
if(!So_Dono) return 
var konsol = budy.slice(3)
Return = (sul) => {
var sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if(sat == undefined){
bang = util.format(sul)
}
return conn.sendMessage(from, {text: bang}, {quoted: info})
}

conn.sendMessage(from, {text: util.format(eval(`;(async () => { ${konsol} })()`))}).catch(e => { 
return reply(String(e))
})
console.log('\x1b[1;37m>', '[', '\x1b[1;32mEXEC\x1b[1;37m', ']', hora, colors.green(">"), 'from', colors.green(sender.split('@')[0]), 'args :', colors.green(args.length))
} catch(e) {
return reply(String(e))
console.log(e)
}
}

//EXECUÇÕES EVAL
if(body.startsWith('¥')) {
if(info.key.fromMe) return 
if(!So_Dono) return 
exec(q, (err, stdout) => {
if(err) return reply(`${err}`)
if(stdout) {
reply(stdout)
}
})
}//FIM

const MSG = Cmd(command, NomeGrupo, prefix);
const SoLink = q?.includes("http:") || q?.includes("https:");

if(budy2.startsWith("prefixo")){
await reply(`*_Aqui esta o meu prefixo: ${prefix}_*`);
}

if(budy.startsWith(tempo)) {
await reply(`Ola, ${tempo} ${pushname}, Como você está? 😄`);
}

//==COMANDOS COM PREFIXO ABAIXO 
if (!isCmd) return;// ISSO AQUI VAI PARA SE VIER SÓ MENSAGEM SEM PREFIXO, OK?

switch (command) {

//COMANDOS DE ADMIN'S!!
case 'rebaixar':  case 'promover':
if (!isGroupAdmins) return reply(msg.SoAdmin);
if (!isBotGroupAdmins) return reply(msg.BotAdmin)
if (!menc_os2 || menc_jid2.length > 1) return reply("Marque a mensagem do usuário ou mencione apenas um @.");
 if (!JSON.stringify(MembrosGP).includes(menc_os2)) return reply("Este usuário foi removido do grupo ou saiu, não será possível rebaixar.");
 if (botNumber.includes(menc_os2)) return reply('Não sou besta de rebaixar eu mesmo né 🙁, mas estou decepcionado com você.');
if(command === 'rebaixar') {
await conn.groupParticipantsUpdate(from, [menc_os2], "demote");
await conn.sendMessage(from, { 
 text: `@${menc_os2.split("@")[0]} foi rebaixado para *"MEMBRO COMUM"*`,
mentions: [menc_os2] 
});
} else if(command === 'promover') {
await conn.groupParticipantsUpdate(from, [menc_os2], "promote");
await conn.sendMessage(from, {text: `@${menc_os2.split("@")[0]} foi promovido(a) para o cargo de administrador`,
mentions: [menc_os2]
});
}
break;

case 'ban': case 'banir': case 'kick': case 'avadakedavra':
if (!isGroupAdmins && !SoDono) return reply(msg.SoAdmin);
if (!isBotGroupAdmins) return reply(msg.BotAdmin);
try {

if (!menc_os2 || menc_jid2[1]) 
return reply("Marque a mensagem do usuário ou mencione o @ dele. Apenas um usuário por vez.");
if (!JSON.stringify(MembrosGP).includes(menc_os2)) return reply("Este usuário foi removido do grupo ou saiu, não será possível rebaixar.");
 
if (botNumber.includes(menc_os2)) {
await conn.groupParticipantsUpdate(from, [sender], "demote");
return reply("Você tentou me banir! Agora perdeu o cargo de administrador.");
}

if (NumberDono.includes(menc_os2)) {
await conn.groupParticipantsUpdate(from, [sender], "demote");
return reply("Você tentou banir meu dono,  Agora perdeu o cargo de administrador.");
}

await conn.sendMessage(from, {text: `@${menc_os2.split("@")[0]} foi removido(a) com sucesso.`, mentions: [menc_os2] });
await conn.groupParticipantsUpdate(from, [menc_os2], "remove");  
 } catch (e) {
console.error(e);
reply("Ocorreu um erro ao tentar remover o usuário.");
 }
break; // by: shizukuh

case 'antilinkhard':
case 'antilink':
if(!isGroup) return reply(msg.SoEmGrupo)
if(!isGroupAdmins) return reply(msg.SoAdmin)
if(!isBotGroupAdmins) return reply(msg.BotAdmin)
if(args.length < 1) return reply('1 pra ligar / 0 pra desligar')
if(Number(args[0]) === 1) {
if(isAntiLinkHard) return reply('O recurso de antilink hardcore já está ativado.')
dataGp[0].antilinkhard = true
setGp(dataGp)
reply(MSG.Ativado)
} else if(Number(args[0]) === 0) {
if(!isAntiLinkHard) return reply('O recurso de antilink hardcore já está desativado.')
dataGp[0].antilinkhard = false
setGp(dataGp)
reply(MSG.Desativado)
} else {
reply('1 para ativar, 0 para desativar')
}
break

case 'bemvindo':
case 'welcome':
if(!isGroup) return reply(msg.SoEmGrupo)
if(!isGroupAdmins && !SoDono) return reply(msg.SoAdmin)
if(!isBotGroupAdmins) return reply(msg.BotAdmin)
if(args.length < 1) return reply('1 pra ligar / 0 pra desligar')
if(Number(args[0]) === 1) {
if(isBemvindo) return reply('Ja esta ativo')
dataGp[0].wellcome[0].bemvindo1 = true
setGp(dataGp)
reply(MSG.Ativado)
} else if(Number(args[0]) === 0) {
if(!isBemvindo) return reply('Ja esta Desativado')
dataGp[0].wellcome[0].bemvindo1 = false
setGp(dataGp)
reply(MSG.Desativado)
} else {
reply('1 para ativar, 0 para desativar')
}
break

case 'legendabv':  
if(!isGroup) return reply(msg.SoEmGrupo)
if(!isGroupAdmins) return reply(msg.SoAdmin)
if(args.length < 1) return reply('*Escreva a mensagem de boas-vindas*')
teks = body.slice(11)
if(isBemvindo) {
dataGp[0].wellcome[0].legendabv = teks
setGp(dataGp)
reply('*Mensagem de boas vindas definida com sucesso!*')
} else {
reply(`Ative o ${prefix}bemvindo 1`)
}
break

case 'legendasaiu':
if(!isGroup) return reply(enviar.msg.grupo)
if(!isGroupAdmins) return reply(enviar.msg.adm)
if(args.length < 1) return reply('*Escreva a mensagem de saída*')
teks = body.slice(13)
if(isBemvindo) {
dataGp[0].wellcome[0].legendasaiu = teks
setGp(dataGp)
reply('*Mensagem de saída definida com sucesso!*')
} else {
reply(`Ative o ${prefix}bemvindo 1`
)
}
break

case 'welcome2':
case 'bemvindo2':  
if(!isGroup) return reply(msg.SoEmGrupo)
if(!isGroupAdmins && !So_Dono) return reply(msg.SoDono)
if(args.length < 1) return reply(`Digite da forma correta:\nComando: ${prefix + command} 1 para ativar `)
if(Number(args[0]) === 1) {
if(isBemvindo2) return reply('O recurso já está ativado no grupo.')
dataGp[0].wellcome[1].bemvindo2 = true
setGp(dataGp)
reply(MSG.Ativado)
} else if(Number(args[0]) === 0) {
if(!isBemvindo2) return reply('O recurso não está ativado no grupo.')
dataGp[0].wellcome[1].bemvindo2 = false
setGp(dataGp)
reply(MSG.Desativado)
} else {
reply(`Digite da forma correta, ${prefix + command} 1, para ativar e 0 para desativar`)
}
break

case 'legendabv2':  
if(!isGroup) return reply(msg.SoEmGrupo)
if(!isGroupAdmins) return reply(msg.SoAdmin)
if(args.length < 1) return reply('*Escreva a mensagem de boas-vindas*')
teks = body.slice(11)
if(isBemvindo2) {
dataGp[0].wellcome[1].legendabv = teks
setGp(dataGp)
reply('*Mensagem de boas vindas definida com sucesso!*')
} else {
reply(`Ative o ${prefix}bemvindo 1`)
}
break

case 'legendasaiu2':
if(!isGroup) return reply(msg.SoEmGrupo)
if(!isGroupAdmins) return reply(msg.SoAdmin)
if(args.length < 1) return reply('*Escreva a mensagem de saída*')
teks = body.slice(13)
if(isBemvindo2) {
dataGp[0].wellcome[1].legendasaiu = teks
setGp(dataGp)
reply('*Mensagem de saída definida com sucesso!*')
} else {
reply(`Ative o ${prefix}bemvindo 1`
)
}
break

case 'linkgp':
if(!isGroupAdmins) return reply(msg.SoAdmins);
if(!isGroup) return reply(msg.SoEmGrupos)
if(!isBotGroupAdmins) return reply(msg.BotAdmin);
linkgc = await conn.groupInviteCode(from)
reply('https://chat.whatsapp.com/'+linkgc)
break

case 'so_adm':
if(!isGroup) return reply(msg.SoEmGrupo)
if(!isGroupAdmins) return reply(msg.SoAdmins)
if(!isBotGroupAdmins) return reply(msg.BotAdmin)
if(args.length < 1) return reply('1 pra ligar / 0 pra desligar')
if(Number(args[0]) === 1) {
if(SoAdmins) return reply('Ja esta ativo')
dataGp[0].So_Admins = true
setGp(dataGp)
reply('Ativou com sucesso o recurso de só adm utilizar comandos neste grupo.')
} else if(Number(args[0]) === 0) {
if(!SoAdmins) return reply('Ja esta Desativado')
dataGp[0].So_Admins = false
setGp(dataGp)
reply('Desativou o recurso de só adm utilizar comandos neste grupo.️')
} else {
reply('1 para ativar, 0 para desativar')
}
break

//COMANDOS PARA GRUPOS
case 'dono':
case 'bot':{
if(command === 'bot') {
await reagir(from, "💖");
await reply(`Bot: ${NomeBot}\n\nContato: wa.me/${botNumber.split("@")[0]}`);
} else if(command === 'dono') {
await reagir(from, "👑");
await reply(`Dono: ${NickDono}\n\nContato: wa.me/${NumberDono}`);
}
}
break;

case 'menu': case 'm': {
  try {
    await reagir(from, "💖");

    const media = await prepareWAMessageMedia(
      { image: FotoMenu },
      { upload: conn.waUploadToServer }
    );

    const txtt = `╔•• 𝗕𝗘𝗠 𝗩𝗜𝗡𝗗𝗢(𝗔) 𝗔𝗢 𝗠𝗘𝗡𝗨 ••╗
        ♥️‍🔥 ${NomeBot}
╚════════•••✦•••═══════╝

┏━━━━◇◆◇━━━━┓
┃ ▸ 🕷️ 𝘽𝙤𝙩: ${NomeBot}
┃ ▸ 🌙 𝙑𝙚𝙧𝙨𝙖̃𝙤: 1.0
┃ ▸ 🩸 𝙋𝙧𝙚𝙛𝙞𝙭𝙤: ${prefix}
┗━━━━◇◆◇━━━━┛

┏━━━━♡◆♡━━━━┓
┃ ▸ 🖤 𝙐𝙨𝙪𝙖́𝙧𝙞𝙤: ${pushname}
┃ ▸ 🔪 𝘿𝙤𝙣𝙤: ${NickDono}
┃ ▸ ☎️ 𝘾𝙤𝙣𝙩𝙖𝙩𝙤: wa.me/${NumberDono}
┗━━━━♡◆♡━━━━┛ `.trim();

    const botoes = [
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: "Menu de Opções",
          sections: [
            {
              title: "Escolha uma opção abaixo:",
              rows: [
                { header: "Menu", title: "• Abrir Menu Principal", id: `${prefix}Menu_menu` },
                { header: "Downloads", title: "• Abrir menu downloads", id: `${prefix}menudown` },
                { header: "Menu do Dono", title: "• Abrir Menu do Dono", id: `${prefix}Menudono`},
                { header: "Menu de Admins", title: "• Abrir Menu de Admins", id: `${prefix}Menuadm`},
                { header: "Menu Stickers", title: "• Abrir Menu Stickers", id: `${prefix}Menufig`},
                { header: "Menu +18", title: "• Abrir menu adultos", id: `${prefix}Menu18`}   
              ]
            }
          ]
        })
      }
    ];

    const carouselMessage = {
      cards: [
        {
          header: {
            hasMediaAttachment: true,
            imageMessage: media.imageMessage
          },
          headerType: "IMAGE",

          body: { 
            text: txtt
          }, mentions: [sender, info?.key?.remoteJid],

          footer: { text: "Selecione abaixo:" },
          nativeFlowMessage: { buttons: botoes }
        }
      ]
    };

    await conn.relayMessage(
      from,
      {
        interactiveMessage: {
          contextInfo: {
            participant: sender,
            quotedMessage: {
              extendedTextMessage: { text: "Opções disponíveis" }
            },
            mentions: [sender, info?.key?.remoteJid]
          },
          body: { 
            text: "✨ Clique abaixo para abrir a lista!",
            mentions: [sender, info?.key?.remoteJid] 
          },
          carouselMessage
        },mentions: [sender]
      }, 
      {quoted: selo}
    );

  } catch (e) {
    console.log(e);
    reply("Erro ao enviar.");
  }
}
break;

case 'menu_menu': { await reagir(from, "❤️‍🔥")
await conn.sendMessage(from, {image: FotoMenu, caption: menus?.menu(prefix, sender, NickDono, NomeBot, data, hora, NumberDono, version), mentions: [sender, info?.key?.remoteJid], contextInfo: ShizukuStile}, {quoted: info});
}break;

case 'menufigurinhas': case 'menufig': { await reagir(from, "💖");
await conn.sendMessage(from, {image: FotoMenu, caption: menus?.menuStickers(prefix, sender), mentions: [sender, info?.key?.remoteJid], contextInfo: ShizukuStile}, {quoted: info});
} break 

case 'menuadm':{ await reagir(from, "👑")
await conn.sendMessage(from, {image: FotoMenu, caption: menus?.menuadm(prefix, sender), mentions: [sender, info?.key?.remoteJid], contextInfo: ShizukuStile}, {quoted: info});
} break;

case 'menu18':{ await reagir(from, "🔞")
await conn.sendMessage(from, {image: FotoMenu, caption: menus?.menu18(prefix, sender), mentions: [sender, info?.key?.remoteJid], contextInfo: ShizukuStile}, {quoted: info});
} break;

case 'menudono':{ await reagir(from, "🤴")
await conn.sendMessage(from, {image: FotoMenu, caption: menus?.menuDono(prefix, sender), mentions: [sender, info?.key?.remoteJid], contextInfo: ShizukuStile}, {quoted: info});
} break;

case 'menudown':{ await reagir(from, "🎶")
await conn.sendMessage(from, {image: FotoMenu, caption: menus?.menuDown(prefix, sender), mentions: [sender, info?.key?.remoteJid], contextInfo: ShizukuStile}, {quoted: info});
} break;

//COMAMDOS DE IA
case 'chatgpt': case 'gpt':{
if(!q.trim()) return reply("Falta a question!");
await reagir(from, "👀");
let resposta = await BuscarNogpt(q, SHIZUKU_SITE, SHIZUKU_KEY);
await reply(resposta);
}
break;

case 'play': {
try {if (!q) return reply("Digite o nome da música.");
await reagir(from, "🎵");
const pesquisa = await ytSearch(q?.trim());
const i = pesquisa?.videos?.[0];
if (!i?.url) return reply("Não encontrei resultados.");

const texto = 
`🎶 *${i?.title}*
📺 *${i?.author?.name}*
⏳ *${i?.timestamp}*
👀 *${i?.views}*
📅 *${i?.ago}*
🔗 *${i?.url}*

Escolha uma opção abaixo:`;

const media = await prepareWAMessageMedia(
      { image: { url: i?.thumbnail } },
      { upload: conn.waUploadToServer }
    );

    const botoes = [
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "🎧 Baixar Áudio",
          id: `${prefix}play_audio ${q}`
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "🎬 Baixar Vídeo",
          id: `${prefix}play_video ${q}`
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "📤 Baixar Doc",
          id: `${prefix}pdoc ${i?.url}`
        })
      }
      
    ];

    const card = {
      header: {
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      },
      headerType: "IMAGE",
      body: { text: texto },
      footer: { text: "Shizuku Base — v1.0" },
      nativeFlowMessage: { buttons: botoes }
    };

    await conn.relayMessage(
      from,
      {
        interactiveMessage: {
          contextInfo: {
            participant: sender,
            quotedMessage: {
              documentMessage: { contactVcard: true, quoted: info }
            }
          },
          carouselMessage: { cards: [card] },
          body: { text: "Resultado encontrado 🎧" }
        }
      },
      {quoted: selo}
    );

  } catch (e) {
    console.log("Erro no playteste:", e);
    reply("Erro ao buscar música.");
  }
}
break;

case 'pdoc':
try {
if(!q?.trim()) return reply("Por favor adicione um link do YouTube!")
await reagir(from, "📤");
const audiobct = await getBuffer(`${SHIZUKU_SITE}/download/ytmp3?&link=${encodeURIComponent(q?.trim())}&apitoken=${SHIZUKU_KEY}`)
await conn.sendMessage(from, {document: audiobct,
mimetype: "audio/mpeg", fileName: "audio.mp3", ptt: false, contextInfo: ShizukuStile}, {quoted: info});
} catch (e) {
reply("Error...") 
} break 



//DOWNLOADS
case 'play_audio': 
case 'play2':{
try {if(!q) return reply('cade o parâmetro nome da música?') 
await reagir(from, "⌛") ;
if(command === 'play2') {
let Shizuku_Api = await fetchJson(`${SHIZUKU_SITE}/download/play?&nome=${encodeURIComponent(q)}&apitoken=${SHIZUKU_KEY}`);
let I_E = Shizuku_Api?.resultado;
if(!I_E?.url) { reagir(from, "❌"), reply("Erro na resposta da api")
return;
}
let I_F = "undefined";
const TITULO = I_E?.titulo || I_F;
const ID = I_E?.videoId || I_F;
const DATA = I_E?.postagem || I_F;
const CANAL = I_E?.canal || I_F;
const VIZU = I_E?.views || I_F;
const DURACAO = I_E?.duracao || I_F;
const DESC = I_E?.descricao || I_F;
const LINK = I_E?.url || I_F;
const NOMEMUSICA = I_E?.filename || I_F;
const AUDIO = I_E?.download || I_F;
const IMAGE = I_E?.thumb || fundo1;
const TIPO = Shizuku_Api?.tipo || "audio/mpeg";

const TXT = `°✫🎵 *Título:* ${TITULO}
°✫⌛ *Duração:* ${DURACAO}
°✫👀 *Visualizações:* ${VIZU}
°✫📅 *Postado:* ${DATA}
°✫📺 *Canal:* ${CANAL}
°✫🔗 *Url:* ${LINK}
°✫📝 *Descrição:* ${DESC}
`;
await conn.sendMessage(from, {image: {url: IMAGE}, caption: TXT}, {quoted: info});
await conn.sendMessage(from, {audio: {url: AUDIO}, mimetype: TIPO, fileName: NOMEMUSICA, ptt: false, contextInfo: ShizukuStile}, {quoted: info});
} else if(command === 'play_audio') {
const resultAudio = await BaixarYtLocalmente(q, 'mp3');
if (!resultAudio) return reply("❌ Não consegui baixar o áudio.");
await conn.sendMessage(from, {audio: {url: resultAudio.arquivo}, mimetype: "audio/mpeg", contextInfo: ShizukuStile, ptt: false}, {quoted: info})
}
await reagir(from, "✅");

} catch (Er) {
reply("Erro ao baixar audio, tente com os outros plays"), reagir(from, '❌')
console.log(" Error: " +Er);
} 
};
break; 

case 'play_video':
if(!q.trim()) return reply("coloca o nome da música kpt");
await reply(msg.Download);
try {
const resultVideo = await BaixarYtLocalmente(q, 'mp4');
if (!resultVideo) return reply("❌ Não consegui baixar o vídeo.");
await conn.sendMessage(from, {video: {url: resultVideo.arquivo}, mimetype: "video/mp4", contextInfo: ShizukuStile, ptt: false}, {quoted: info})
} catch (e) {
reply(`${e}`)
} break;



case 'ttkdl': case 'tiktokdl': {
try {
if(!q?.trim()) { 
return reply("*_Cade o url do video?_*") 
}
if(!SoLink)  return reply("*_Apenas links_*") 
await reply(msg.Download)
await ttkdl(q, conn, from, info, quoted, ShizukuStile, SHIZUKU_SITE, SHIZUKU_KEY);
await reagir(from, "✅");
} catch (e) {
reply("Erro") 
}
}break;

case 'instadl': {
try {
if(!q.trim()) {
return reply("*_Cade o link do vídeo do Instagram?_*")
} 
if(!SoLink) return reply("*_Apenas links_*");
await reply(msg.Download);
await instadl(q, conn, from, info, quoted, ShizukuStile, SHIZUKU_SITE, SHIZUKU_KEY) 
await reagir(from, "✅");
} catch (e) {
await reply("Erro ao buscar resultados");
}
}
break;

//METADINHAS
case 'metadinhas': {await reagir(from, "🧑‍🤝‍🧑");
try {await METADINHAS(conn, from, info,quoted, SHIZUKU_KEY, SHIZUKU_SITE);
} catch (e) {reply("Error..") }
} break 

//COMANDOS DE DONO!!
case 'setprefix':
if (!So_Dono) return reply(msg.SoDono);
if (!q) return reply("Digite o novo prefixo. Ex: *!setprefix .*");
const novoPrefix = q.trim();
Config.prefix = novoPrefix;
fs.writeFileSync("./dono/dono.json", JSON.stringify(Config, null, 4));
reply(`✔ Prefixo alterado para: *${novoPrefix}*`);
break;

case 'nick-dono':
if (!So_Dono) return reply(msg.SoDono);
const novaNick = q.trim();
Config.NickDono = novaNick;
fs.writeFileSync("./dono/dono.json", JSON.stringify(Config, null, 4));
reply(`✔ Nick do dono alterado para: *${novaNick}*`);
break;

case 'nome-bot':
if (!So_Dono) return reply(msg.SoDono);
const novoNome = q.trim();
Config.NomeBot = novoNome;
fs.writeFileSync("./dono/dono.json", JSON.stringify(Config, null, 4));
reply(`✔ Nome do bot alterado para: *${novoNome}*`);
break;

case 'novo-dono':
if (!So_Dono) return reply(msg.SoDono);
if (!q && !menc_os2) return reply("Digite o novo número do dono. Ex: *!setdono 551199999999*");
const novoDn = q.split("@")[0] || menc_os2.split("@")[0];
if (novoDn.length < 10) return reply("Número inválido.");
const novoDono = novoDn;
Config.NumberDono = novoDono;
fs.writeFileSync("./dono/dono.json", JSON.stringify(Config, null, 4));
reply(`✔ *Número do dono atualizado!*\nNovo dono: wa.me/${novoDono}`);
break;

case 'dono1':
if (!So_Dono) return reply(msg.SoDono);
if (!q && !menc_os2) return reply("Digite o novo número do dono. Ex: *!dono1 551199999999*");
const novodn1 = q.split("@")[0] || menc_os2.split("@")[0];
if (novodn1.length < 10) return reply("Número inválido.");
const Dono1 = novodn1;
Config2.dono1 = Dono1;
fs.writeFileSync("./dono/dados-donos.json", JSON.stringify(Config2, null, 4));
reply(`✔ *Pronto mestre!*\n${NomeBot} agora tem um novo dono!\n\n👑 Dono 1: wa.me/${Dono1}`);
break;


case 'dono2':
if (!So_Dono) return reply(msg.SoDono);
if (!q && !menc_os2) return reply("Digite o novo número do dono. Ex: *!dono2 551199999999*");
const novodn2 = q.split("@")[0] || menc_os2.split("@")[0];
if (novodn2.length < 10) return reply("Número inválido.");
const Dono2 = novodn2;
Config2.dono2 = Dono2;
fs.writeFileSync("./dono/dados-donos.json", JSON.stringify(Config2, null, 4));
reply(`✔ *Número do dono atualizado!*\n\n👑 Dono 2: wa.me/${Dono2}`);
break;


case 'dono3':
if (!So_Dono) return reply(msg.SoDono);
if (!q && !menc_os2) return reply("Digite o novo número do dono. Ex: *!dono3 551199999999*");
const novodn3 = q.split("@")[0] || menc_os2.split("@")[0];
if (novodn3.length < 10) return reply("Número inválido.");
const Dono3 = novodn3;
Config2.dono3 = Dono3;
fs.writeFileSync("./dono/dados-donos.json", JSON.stringify(Config2, null, 4));
reply(`✔ *Número do dono atualizado!*\n\n👑 Dono 3: wa.me/${Dono3}`);
break;


case 'dono4':
if (!So_Dono) return reply(msg.SoDono);
if (!q && !menc_os2) return reply("Digite o novo número do dono. Ex: *!dono4 551199999999*");
const novodn4 = q.split("@")[0] || menc_os2.split("@")[0];
if (novodn4.length < 10) return reply("Número inválido.");
const Dono4 = novodn4;
Config2.dono4 = Dono4;
fs.writeFileSync("./dono/dados-donos.json", JSON.stringify(Config2, null, 4));
reply(`✔ *Número do dono atualizado!*\n\n👑 Dono 4: wa.me/${Dono4}`);
break;


case 'dono5':
if (!So_Dono) return reply(msg.SoDono);
if (!q && !menc_os2) return reply("Digite o novo número do dono. Ex: *!dono5 551199999999*");
const novodn5 = q.split("@")[0] || menc_os2.split("@")[0];
if (novodn5.length < 10) return reply("Número inválido.");
const Dono5 = novodn5;
Config2.dono5 = Dono5;
fs.writeFileSync("./dono/dados-donos.json", JSON.stringify(Config2, null, 4));
reply(`✔ *Número do dono atualizado!*\n\n👑 Dono 5: wa.me/${Dono5}`);
break;


case 'dono6':
if (!So_Dono) return reply(msg.SoDono);
if (!q && !menc_os2) return reply("Digite o novo número do dono. Ex: *!dono6 551199999999*");
const novodn6 = q.split("@")[0] || menc_os2.split("@")[0];
if (novodn6.length < 10) return reply("Número inválido.");
const Dono6 = novodn6;
Config2.dono6 = Dono6;
fs.writeFileSync("./dono/dados-donos.json", JSON.stringify(Config2, null, 4));
reply(`✔ *Número do dono atualizado!*\n\n👑 Dono 6: wa.me/${Dono6}`);
break;

case 'botoff':
case 'boton': {
if(!So_Dono) return reply(msg.SoDono);
if(command === 'botoff') {
if (BotOff === true) return reply(`❌ *${NomeBot} já está DESLIGADO, mestre...*`);
Config2.botoff = true;
fs.writeFileSync("./dono/dados-donos.json", JSON.stringify(Config2, null, 4));
return reply(
`⛔ *SISTEMA DESATIVADO*

✅ Somente você poderá usar meus comandos agora.
🕸️ *Shizuku entrou no modo silencioso...*`);
}
if(command === 'boton') {
if(BotOff === false) return reply(`⚠️ *${NomeBot} já está ATIVO, mestre!*`);
Config2.botoff = false;
fs.writeFileSync("./dono/dados-donos.json", JSON.stringify(Config2, null, 4));
return reply(
`✅ *SISTEMA REATIVADO*

💖 Todos os usuários agora podem usar meus comandos novamente.
🔥 *Shizuku voltou ao combate!*`);
}
}
break;

case 'bangp':
case 'unbangp':
if(!isGroup) return reply(msg.SoEmGrupo)
if(!So_Dono) return reply(msg.SoDono)
if(command == 'bangp'){
if(isBanGrupo) return reply(`Este grupo já está banido.`)
dataGp[0].bangp = true
setGp(dataGp)
reply(`Grupo banido com sucesso`)
} else {
if(!isBanGrupo) return reply(`Este grupo não está mais banido.`)
dataGp[0].bangp = false
setGp(dataGp)
reply(`Grupo desbanido...`)
}
break

case 'reiniciar': case 'r':{
if(!So_Dono) return reply(msg.SoDono)
setTimeout(async () => {
reply("Reiniciando...")
setTimeout(async () => {
process.exit()
}, 1200)
}, 1000)
}
break

case 'donos':
case 'listadonos': {
let texto = `🎄 *LISTA OFICIAL DE DONOS — ${NomeBot}* ❄️

🎅 *Dono Principal*
👑 ${NickDono}
📞 wa.me/${NumberDono}

━━━━━━━━━━━━━━━━━━

🤶 *Donos Adicionais:*`;

let donos = [
  Config2?.dono1,
  Config2?.dono2,
  Config2?.dono3,
  Config2?.dono4,
  Config2?.dono5,
  Config2?.dono6
];

donos.forEach((dono, i) => {
  if(dono && dono !== "undefined" && dono !== "") {
    texto += `\n🎁 Dono ${i+1}: wa.me/${dono}`;
  }
});

texto += `

━━━━━━━━━━━━━━━━━━
✨ *${NomeBot} deseja um Feliz Natal!* 🎄
🎆 Que sua jornada com o bot seja mágica!
`;

conn?.sendMessage(from, {image: FotoMenu, caption: texto, contextInfo: ShizukuStile}, {quoted: info});
}
break;

case 'verificado':
if(!So_Dono) return reply(msg.SoDono)
if(!isVerificado) {
Config2.verificado = true
fs.writeFileSync("./dono/dados-donos.json", JSON.stringify(Config2, null, 4));
reply(`O verificado foi Ativado`)
} else if(isVerificado) {
Config2.verificado = false
fs.writeFileSync("./dono/dados-donos.json", JSON.stringify(Config2, null, 4));
reply(`O verificado foi Desativado`)
}
break

case 'totalcases':
try {
const fileContent = fs.readFileSync("index.js").toString();
const caseNames = fileContent.match(/case\s+'(.+?)'/g);
const cont = caseNames.length;
await reply(`${cont}`)
} catch (error) {
console.log(error)
reply("Erro ao obter o total de comandos");
}
break;

case 'cases':
if(!So_Dono) return reply("Você não é dono para utilizar este comando...")
try {
const listCases = () => {
const fileContent = fs.readFileSync("index.js").toString();
const caseNames = fileContent.match(/case\s+'(.+?)'/g);
if (caseNames) {
return caseNames.map((caseName, index) => `${index + 1}. ${caseName.match(/'(.+?)'/)[1]}`).join('\n');
} else {
reply("Nenhuma case encontrada.") } }
conn.sendMessage(from, { text: listCases() }, { quoted: info });
} catch (e) {
console.log(e)
reply('Ocorreu um erro ao obter as cases.') }
break

//OUTROS COMANDOS INFORMATIVOS 
case 'ping': {
  try {

    const uptime = process.uptime();
    const r = (Date.now() / 1000) - info.messageTimestamp;

    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const usedPercent = (usedMem / totalMem) * 100;

    const totalRamGB = (totalMem / 1024 / 1024 / 1024).toFixed(2);
    const freeRamGB = (freeMem / 1024 / 1024 / 1024).toFixed(2);
    const usedRamGB = (usedMem / 1024 / 1024 / 1024).toFixed(2);

    const texto = `- *🏓 | STATUS PING - SHIZUKU BASE*
> ${tempo}, ${pushname}!!
•
- *⏳ | ${NomeBot} está ativa por:* 
- → ${kyun(uptime)}
- *⚡ | velocidade:* → ${r.toFixed(3)}s
- *📊 | Ram Total:* → ${totalRamGB}GB
- *📉 | Ram usada:* → ${usedRamGB}GB
- *📈 | Ram Disponível:* → ${freeRamGB}GB
- *🧾 | processo:* → ${usedPercent.toFixed(1)}%`;

    // === FOTO LOCAL ===
    const media = await prepareWAMessageMedia(
      { image: FotoMenu },
      { upload: conn.waUploadToServer }
    );

    // === BOTÕES ===
    const botoes = [
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "🔁 Atualizar",
          id: `${prefix}ping`
        })
      },
      {
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: "📋 Menu",
          id: `${prefix}menu`
        })
      }
    ];

    // === CARD ===
    const card = {
      header: {
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      },
      headerType: "IMAGE",
      body: { text: texto },
      footer: { text: "Shizuku Base — v1.0" },
      nativeFlowMessage: { buttons: botoes }
    };

    // === ENVIO ===
    await conn.relayMessage(
      from,
      {
        interactiveMessage: {
          contextInfo: {
            participant: sender,
            quotedMessage: {
              extendedTextMessage: { text: "STATUS ATUAL" }
            }
          },
          body: { text: "🏓 Status do bot" },
          carouselMessage: { cards: [card] }
        }
      },
      {quoted: selo}
    );

  } catch (e) {
    console.log(e);
    reply("Erro ao mostrar ping.");
  }
}
break;

//PLAQUINHAS 
case 'plaq1':
case 'plaq2':
case 'plaq3':
case 'plaq4':
case 'plaq5':
case 'plaq6':
case 'plaq7':
case 'plaq8':
case 'plaq9':
case 'plaq10':
case 'plaq11':
try {
if(!q.trim()) return reply(`ex: ${prefix+command} Jpzinh`);
await reply(isGroup ? "*_Enviando plaquinha no seu pv_*." : "*_Enviando.._*")

const Imagem = await getBuffer(`${SHIZUKU_SITE}/api/${command}?query=${encodeURIComponent(q.trim())}&apitoken=${SHIZUKU_KEY}`)

await conn.sendMessage(sender, {image: Imagem, caption: "Plaquinha criada com sucesso!"}, {quoted: info});
} catch (e) {
reply("Erro ao criar plaquinha")
} break;

//FIGURINHAS 
case 'figu_raiva': case 'figu_roblox': case 'figu_engracada':
case 'figu_memes': case 'figu_anime': case 'figu_coreana': case 'figu_bebe': case 'figu_desenho': case 'figu_animais':
case 'figu_flork': case 'figu_emoji':{
if (!Number(q)) return reply(`Digite a quantidade de figurinhas\nExemplo: ${prefix+command} 20`)
if (q >= 20) return reply("Coloque abaixo de 20..")
await reply(isGroup ? `⌛ | *_Estou enviando ${q} figurinhas no seu PV, águarde..._*` : `⌛ | *_Enviando..._*`)
await conn.sendMessage(from, {react: {text: "💖", key: info?.key}})         
async function figu_figura() {
const figura = await getBuffer(`${SHIZUKU_SITE}/sticker/${command}?apitoken=${SHIZUKU_KEY}`)
conn.sendMessage(sender, {sticker: figura, contextInfo: ShizukuStile}, {quoted: info})
}
for (i = 0; i < q; i++) {
await sleep(1000)
figu_figura()
}
break
}

case 'figurinhas': case 'figuale':{
if (!Number(q)) return reply(`Digite a quantidade de figurinhas\nExemplo: ${prefix+command} 20`)
if (q >= 20) return reply("Coloque abaixo de 20..")
await reply(isGroup ? `⌛ | *_Estou enviando ${q} figurinhas no seu PV, águarde..._*` : `⌛ | *_Enviando..._*`)
await conn.sendMessage(from, {react: {text: "💖", key: info?.key}})         
async function figu_Jpzinh() {
var rnd = Math.floor(Math.random() * 8051)
const figura = await getBuffer(`${SHIZUKU_SITE}/sticker/aleatorio?apitoken=${SHIZUKU_KEY}`);
conn.sendMessage(sender, {sticker: figura, contextInfo: ShizukuStile}, {quoted: info})
}
for (i = 0; i < q; i++) {
await sleep(1000)
figu_Jpzinh()
}
break
};

case 'gerarnick':
case 'fazernick': {
try {
const nick = args.join(" ");
if (!nick) return reply(`✍️ Escreva um nome para gerar nicks.\n\nEx: ${prefix + command} jpzinh`);
if(ANT_LTR_MD_EMJ(nick))
return reply("⚠️ Use apenas letras normais, sem emojis ou caracteres modificados!");
await reply("*_GERANDO NICKS, AGUARDE..._*");
const { data } = await axios.get(`${SHIZUKU_SITE}/geradores/fazernick?nome=${encodeURIComponent(nick)}&apitoken=${SHIZUKU_KEY}`);
const resultados = data.result || data || [];

if(!Array.isArray(resultados) || resultados.length === 0) return reply("❌ Não consegui gerar nicks. Tente outro nome!");

const txt = `
💈 *NICKS GERADOS — ${NomeBot}* 💈

Escolha um Nick abaixo para copiar:
`.trim();

const media = await prepareWAMessageMedia(
 { image: { url: "https://files.catbox.moe/jw3rx5.jpg" } },
 { upload: conn.waUploadToServer }
 );

const botoes = resultados.slice(0, 25).map((r, i) => ({
name: "cta_copy",
buttonParamsJson: JSON.stringify({
display_text: `${r?.result || r}`,
copy_code: r.result || r
})
}));

const card = {
header: {
hasMediaAttachment: true,
imageMessage: media.imageMessage
},
headerType: "IMAGE",
body: {
text: txt
  },

nativeFlowMessage: {
buttons: botoes
},

footer: {
text: "Shizuku Base — v1.0"
}
};

 await conn.relayMessage(from,
      {
        interactiveMessage: {
          contextInfo: {
            participant: from,
            quotedMessage: {
              extendedTextMessage: { text: "Gerando Nick…" }
            }
          },
          carouselMessage: { cards: [card] }
        }
      },
      {}
    );

  } catch (err) {
    console.error("Erro no gerarnick:", err);
    reply("❌ Ocorreu um erro ao gerar os nicks.");
  }
}
break;


case 'ativar': {
if(!isGroupAdmins || !So_Dono) return reply(msg.SoAdmins);
  try {
const fotogp = await conn.profilePictureUrl(from, 'image')
const fotogpt = await getBuffer(fotogp).catch(_ => FotoMenu)

    const media = await prepareWAMessageMedia(
      { image: fotogpt },
      { upload: conn.waUploadToServer }
    );

    const texto = `*SISTEMAS DO GRUPO*

Selecione o sistema que deseja ativar:`

    const botoes = [
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: "Gerenciar Sistemas",
          sections: [
            {
              title: "Funções",
              rows: [
                { title: "Anti - link", id: `${prefix}antilink 1` },
                { title: "Bem - vindo 1", id: `${prefix}bemvindo 1` },
                { title: "Bem - vindo 2", id: `${prefix}bemvindo2 1`},
                { title: "So Admins", id: `${prefix}so_adm 1`}
              ]
            }
          ]
        })
      }
    ];

    const card = {
      header: {
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      },
      headerType: "IMAGE",
      body: { text: texto },
      footer: { text: "Shizuku - Base" },
      nativeFlowMessage: { buttons: botoes }
    };

    await conn.relayMessage(from, {
      interactiveMessage: {
        carouselMessage: { cards: [card] },
        body: { text: "Escolha um sistema 👇" }
      }
    }, {})

  } catch (e) {
    console.log(e)
    reply("Erro ao mostrar sistemas.")
  }
}
break;

case 'desativar': {
if(!isGroupAdmins || !So_Dono) return reply(msg.SoAdmins);
  try {
const fotogp = await conn.profilePictureUrl(from, 'image')
const fotogpt = await getBuffer(fotogp).catch(_ => FotoMenu)

 const media = await prepareWAMessageMedia(
      { image: fotogpt },
      { upload: conn.waUploadToServer }
    );

    const texto = `*SISTEMAS DO GRUPO*

Selecione o sistema que deseja desativar:`

    const botoes = [
      {
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: "Gerenciar Sistemas",
          sections: [
            {
              title: "Funções",
              rows: [
                { title: "Anti - link", id: `${prefix}antilink 0` },
                { title: "Bem - vindo 1", id: `${prefix}bemvindo 0` },
                { title: "Bem - vindo 2", id: `${prefix}bemvindo2 0`},
                { title: "So Admins", id: `${prefix}so_adm 0`}
              ]
            }
          ]
        })
      }
    ];

    const card = {
      header: {
        hasMediaAttachment: true,
        imageMessage: media.imageMessage
      },
      headerType: "IMAGE",
      body: { text: texto },
      footer: { text: "Shizuku - Base" },
      nativeFlowMessage: { buttons: botoes }
    };

    await conn.relayMessage(from, {
      interactiveMessage: {
        carouselMessage: { cards: [card] },
        body: { text: "Escolha um sistema 👇" }
      }
    }, {})

  } catch (e) {
    console.log(e)
    reply("Erro ao mostrar sistemas.")
  }
}
break;

case 'st':
case 'stk':
case 'sticker':
case 's':
await conn.sendMessage(from, {react: {text: `⌛`, key: info.key}})
var RSM = info.message?.extendedTextMessage?.contextInfo?.quotedMessage
var boij2 = RSM?.imageMessage || info.message?.imageMessage || RSM?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessageV2?.message?.imageMessage || info.message?.viewOnceMessage?.message?.imageMessage || RSM?.viewOnceMessage?.message?.imageMessage
var boij = RSM?.videoMessage || info.message?.videoMessage || RSM?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessageV2?.message?.videoMessage || info.message?.viewOnceMessage?.message?.videoMessage || RSM?.viewOnceMessage?.message?.videoMessage
if(boij2){
var pack = ` ➲ ꜱᴏʟɪᴄɪᴛᴀᴅᴏ ᴩᴏʀ  ➠\n ➲ ɴᴏᴍᴇ ᴅᴏ ʙᴏᴛ ➠\n ➲ ɴɪᴄᴋ ᴅᴏɴᴏ ➠`
var author2 = ` 「 ${pushname} 」 \n「 ${NomeBot} 」\n「 ${NickDono} 」`
owgi = await getFileBuffer(boij2, 'image')
let encmediaa = await sendImageAsSticker2(conn, from, owgi, selo, { packname:pack, author:author2})
await DLT_FL(encmediaa)
} else if(boij && boij.seconds < 11){
var pack = `➲ꜱᴏʟɪᴄɪᴛᴀᴅᴏ ᴩᴏʀ➠`
var author2 = ` ${pushname}`
owgi = await getFileBuffer(boij, 'video')
let encmedia = await sendVideoAsSticker2(conn, from, owgi, selo, { packname:pack, author:author2})
await DLT_FL(encmedia)
} else {
return reply(`Marque uma imagem, ou um vídeo de ate 9.9 segundos, ou uma visualização única, para fazer figurinha, com o comando ${prefix+command}`)
}
break

case 'toimg':
if(!isQuotedSticker) return reply('Por favor, *mencione um sticker* para executar o comando.')
try {
reply(msg.Download)
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, 'sticker')
conn.sendMessage(from, {image: buff}, {quoted: selo}).catch(e => {
console.log(e);
reply('Ocorreu um erro ao converter o *sticker para imagem.*')
})
} catch {
reply("Erro, tente mais tarde!")
}
break

//FINAL DE COMANDOS 
default:

const CmdSimilar = ListaComandos(command);
const txt = CmdSimilar.similarity > 0 
    ? `${prefix + CmdSimilar.command}`
    : `Nenhum!`;

const sem = `${(CmdSimilar.similarity || 0).toFixed(1)}%`;

await conn.sendMessage(from, {
text: `*🛠️ | Comando:* [ ${prefix + command} ]
- --------------------
*⚖️ | Semelhante:* 「 ${txt} 」
- --------------------
*🪫 | Porcentagem:*[ ${sem} ]
- --------------------
> ⚙️ → Use: *"!Menu"* pra ver meus comandos.
- ${NomeBot}`
, contextInfo: ShizukuStile}, {quoted: info});
break;

}
}catch (e) {
console.log("Erro geral no index:", e);

if (String(e).includes(SHIZUKU_KEY)) {
console.log("A API caiu ou não foi possível executar esta ação.");
}

 if (String(e).includes("aborted")) {
let file = require.resolve("./connect");
delete require.cache[file];
require(file);
}
}
};
}

let file2 = require.resolve(__filename)
fs.watchFile(file2, () => {
fs.unwatchFile(file2)
console.log(colors.red(`Alterações salvas - '${__filename}'`))
delete require.cache[file2]
require(file2)
})

iniciarBot().catch(async(e) => {
console.log(colors.red("Erro apresentado no arquivo: './index' - Error: "+e))
})
