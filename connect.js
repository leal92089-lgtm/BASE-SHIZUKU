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

const { banner2, banner3 } = require("./consts");
const { prefix } = require("./dono/dono");

async function Bot() {
    const pastaAuth = "./auth";

    const { state, saveCreds } = await useMultiFileAuthState(pastaAuth);
    const { version } = await fetchLatestBaileysVersion();

    const phoneNumber = (process.env.PHONE_NUMBER || "").trim();

    const conn = makeWASocket({
        version,
        auth: state,
        logger: P({ level: "info" }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Safari"),
        markOnlineOnConnect: true,
    });

    // ================== CONEXÃO / LOGIN ==================
    if (!state.creds.registered) {
        console.log(colors.yellow("\n[!] Nenhuma sessão encontrada. Iniciando conexão...\n"));

        if (!phoneNumber) {
            console.log(colors.red("❌ Defina PHONE_NUMBER no ambiente (ex: 244954414977)"));
            process.exit(1);
        }

        try {
            console.log(colors.gray("Gerando código de pareamento...\n"));

            await new Promise(r => setTimeout(r, 8000));

            console.log(
                colors.cyan("\n📲 CÓDIGO DE PAREAMENTO:\n") +
                colors.white.bold(code) +
                "\n"
            );

            console.log(colors.yellow("Vá ao WhatsApp → Dispositivos conectados → Inserir código"));
        } catch (err) {
            console.log(colors.red("❌ Erro ao gerar código de pareamento:"), err);
        }
    } else {
        console.log(colors.green("\n[✓] Sessão encontrada. Conectando...\n"));
    }

    // ================== EVENTOS ==================
    conn.ev.on("creds.update", saveCreds);

    conn.ev.on("messages.upsert", async (m) => {
        require("./index.js")(conn, m);
    });

    conn.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "close") {
            const statusCode = lastDisconnect?.error?.output?.statusCode;

            const shouldReconnect =
                statusCode !== DisconnectReason.loggedOut;

            console.log(colors.red("Conexão fechada. Reconectando..."));

            if (shouldReconnect) {
                setTimeout(() => Bot(), 3000);
            }
        }

        if (connection === "open") {
            console.log(banner3?.string || "");
            console.log(banner2?.string || "");
            console.log(colors.green("〔 BOT CONECTADO COM SUCESSO 〕"));
        }
    });

    return conn;
}

module.exports = Bot;

// START
Bot().catch((e) => {
    console.log(colors.red("❌ ERRO GERAL: " + e));
});
