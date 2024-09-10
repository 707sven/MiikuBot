// Declaraciones de la biblioteca 'discord.js'
const { EmbedBuilder } = require('discord.js');

module.exports = {
    description: 'Muestra el avatar del usuario mencionado.',
    run: async (message) => {
        // Obtener el primer usuario mencionado o el autor del mensaje si no se menciona a nadie
        const target = message.mentions.users.first() || message.author;

        try {
            // Obtener la información del miembro en el servidor
            const member = await message.guild.members.fetch(target.id);

            // Obtener el URL del avatar
            const avatar = member.user.displayAvatarURL({ size: 512, dynamic: true });

            // Crear un embed con el avatar
            const embed = new EmbedBuilder()
                .setColor('Blurple')  // Puedes cambiar a otro color si prefieres
                .setTitle(`✨ Avatar de ${member.user.displayName} ✨`)
                .setImage(avatar);

            // Enviar el embed como respuesta
            return message.reply({ embeds: [embed] });

        } catch (error) {
            // En caso de error, responder con un mensaje
            console.error(error);
            return message.reply("Hubo un error al obtener el avatar del usuario.");
        }
    }
};
