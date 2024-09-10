// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

const { Client, Events, GatewayIntentBits } = require('discord.js');

// Crear nuevo cliente de Discord con intents necesarios
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,              // Necesario para eventos del servidor
        GatewayIntentBits.GuildMessages,       // Necesario para recibir mensajes en servidores
        GatewayIntentBits.MessageContent,      // Necesario para acceder al contenido de los mensajes
        GatewayIntentBits.GuildMembers         // Necesario para recibir eventos de miembros
    ]
});

// Evento: Bot conectado
client.on(Events.ClientReady, () => {
    console.log(`Conectado como ${client.user.username}!`);
});

// Responder a mensajes
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return; // Ignorar mensajes de otros bots

    // Respuesta si el mensaje es "hola"
    if (message.content.toLowerCase() === "hola") {
        message.reply("Holis, como va todo? (≧∇≦)ﾉ✨");
        return;
    }

    // Verificar si el mensaje empieza con "!"
    if (!message.content.startsWith('!')) return; 

    const args = message.content.slice(1).split(' ')[0]; // Obtener el comando después del prefijo '!'

    // Respuesta para el comando "!help"
    if (args === "help") {
        message.reply("Puedes recibir ayuda abriendo un ticket de soporte ಠ_ಠ❓\n(aún no tenemos)");
        return;
    }

    // Manejador de otros comandos
    try {
        const command = require(`./commands/${args}`);
        command.run(message);
    } catch (error) {
        console.log(`Ha ocurrido un error al utilizar el comando !${args}:`, error.message);
    }
});

// Evento: Cuando un usuario se une al servidor
client.on(Events.GuildMemberAdd, async (member) => {
    console.log(`Nuevo miembro detectado: ${member.user.tag}`);
    
    const welcomeChannelId = '1277334005787918427'; // Verifica si este ID es correcto para tu canal de bienvenida
    try {
        const channel = await client.channels.fetch(welcomeChannelId);
        
        if (!channel) {
            console.error('Canal de bienvenida no encontrado.');
            return;
        }

        await channel.send(`**<@${member.user.id}>, bienvenid@ a la comunidad! (≧∇≦)ﾉ**✨`);
        console.log('Mensaje de bienvenida enviado.');

    } catch (error) {
        console.error('Error al enviar el mensaje de bienvenida:', error);
    }
});

// Conectar el cliente de Discord usando el token desde el archivo .env
client.login(process.env.DISCORD_TOKEN);
