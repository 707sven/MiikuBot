// Cargar variables de entorno desde el archivo .env
require('dotenv').config();

const { Client, Events } = require('discord.js');

// Crear nuevo cliente de Discord
const client = new Client({
    intents: 53608447
});

// Evento: Bot conectado
client.on(Events.ClientReady, async () => {
    console.log(`Conectado como ${client.user.username}!`);
});

// Responder a mensajes
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return; // Ignorar mensajes de otros bots
    if (!message.content.startsWith('!')) return; // Comprobar si el mensaje empieza con '!'

    const args = message.content.slice(1).split(' ')[0]; // Obtener el comando después del prefijo '!'

    // Manejador de comandos
    try {
        const command = require(`./commands/${args}`);
        command.run(message);
    } catch (error) {
        console.log(`Ha ocurrido un error al utilizar el comando !${args}:`, error.message);
    }
});

// Conectar el cliente de Discord usando el token desde el archivo .env
client.login(process.env.DISCORD_TOKEN);
