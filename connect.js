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

const {
    makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    Browsers,
    DisconnectReason
} = require("@whiskeysockets/baileys");
const colors = require("colors");
const P = require("pino");
const { banner2, banner3, data, hora } = require("./consts");
const { prefix } = require("./dono/dono");

const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

async function Bot() {
    const pastaAuth = "./database/qr-code";
    const { state, saveCreds } = await useMultiFileAuthState(pastaAuth);
    const { version } = await fetchLatestBaileysVersion();

    const phoneNumber = process.env.PHONE_NUMBER || ""; // Pegar do Railway

    const conn = makeWASocket({
        version,
        auth: state,
        logger: P({ level: "silent" }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Safari"),
        pairingCode: true,           // Ativado
        phoneNumber: phoneNumber,    // Número vindo da variável
        markOnlineOnConnect: true,
    });

    if (conn.authState?.creds?.registered) {
        console.log(colors.green("\n[✓] Sessão ativa detectada! Conectando...\n"));
    } else {
        console.log(colors.cyan("\nNenhuma sessão encontrada. Vamos conectar seu número.\n"));
        
        if (!phoneNumber) {
            console.log(colors.red("❌ Erro: Defina a variável PHONE_NUMBER no Railway com seu número!"));
            console.log(colors.yellow("Exemplo: 5511999999999"));
            process.exit(1);
        }

        console.log(colors.gray("\nGerando código de pareamento...\n"));
        try {
            const code = await conn.requestPairingCode(phoneNumber);
            console.log(colors.cyan(`📲 Seu código de pareamento:\n\n ${colors.white.bold(code)}\n`));
            console.log(colors.yellow("Digite esse código no WhatsApp → Dispositivos Vinculados"));
        } catch (err) {
            console.log(colors.red("\n❌ Erro ao gerar código de pareamento:\n"), err);
        }
    }

    // =================== EVENTOS ===================
    conn.ev.process(async (events) => {
        if (events["messages.upsert"]) {
            const upsert = events["messages.upsert"];
            require("./index.js")(conn, upsert);
        }

        if (events["creds.update"]) {
            await saveCreds();
        }
    });

    conn.ev.on("connection.update", ({ connection, lastDisconnect }) => {
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode;

        switch (connection) {
            case 'close':
                if (shouldReconnect !== DisconnectReason.loggedOut) {
                    setTimeout(() => Bot(), 2000);
                }
                break;
            case 'open':
                console.log(banner3?.string || "");
                console.log(banner2?.string || "");
                console.log(colors.green(`〔 CONECTADA COM SUCESSO... 〕`));
                break;
        }
    });

    return conn;
}

module.exports = Bot;
Bot().catch(e => console.log(colors.red("• ERROR: " + e)));
