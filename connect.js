const {
    makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    Browsers,
    DisconnectReason,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");
const colors = require("colors");
const P = require("pino");
const fs = require("fs-extra");
const { banner2, banner3 } = require("./consts");

async function Bot() {
    const pastaAuth = "./auth";
    const { state, saveCreds } = await useMultiFileAuthState(pastaAuth);
    const { version } = await fetchLatestBaileysVersion();
    const phoneNumber = (process.env.PHONE_NUMBER || "").trim();

    const conn = makeWASocket({
        version,
        auth: state,
        logger: P({ level: "silent" }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Safari"),
        markOnlineOnConnect: true,
        // ✅ CORRECÇÃO: permite desencriptar mensagens de visualização única
        getMessage: async (key) => {
            return { conversation: "" };
        },
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {}
                            },
                            ...message
                        }
                    }
                };
            }
            return message;
        }
    });

    // ================== LOGIN ==================
    if (!state.creds.registered) {
        console.log(colors.yellow("\n[!] Nenhuma sessão encontrada. Iniciando conexão...\n"));
        if (!phoneNumber) {
            console.log(colors.red("❌ Defina PHONE_NUMBER no ambiente (ex: 244954414977)"));
            process.exit(1);
        }
        console.log(colors.gray("Aguardando conexão do WhatsApp...\n"));
        await new Promise(r => setTimeout(r, 10000));
        try {
            const pairingCode = await conn.requestPairingCode(phoneNumber);
            console.log(colors.cyan("\n📲 CÓDIGO DE PAREAMENTO:\n"));
            console.log(colors.white.bold(pairingCode));
            console.log(colors.yellow("\nVá ao WhatsApp → Dispositivos conectados → Inserir código\n"));
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

    // ✅ SAIR DO GRUPO SE FOR REMOVIDO
    conn.ev.on("group-participants.update", async (update) => {
        try {
            const { id, participants, action } = update;
            if (action === "remove") {
                const botId = jidNormalizedUser(conn.user.id);
                if (participants.map(p => jidNormalizedUser(p)).includes(botId)) {
                    await conn.groupLeave(id);
                    // Remove da lista de grupos permitidos
                    const caminho = "./dono/grupos-permitidos.json";
                    if (fs.existsSync(caminho)) {
                        let lista = JSON.parse(fs.readFileSync(caminho, "utf-8") || "[]");
                        lista = lista.filter(g => g !== id);
                        fs.writeFileSync(caminho, JSON.stringify(lista, null, 2));
                    }
                }
            }
        } catch (e) {
            console.log(colors.red("Erro ao sair do grupo: " + e));
        }
    });

    conn.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
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
