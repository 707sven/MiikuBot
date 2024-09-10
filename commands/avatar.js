// Declaraciones de la biblioteca 'discord.js'
const { EmbedBuilder } = require('discord.js');

module.exports = {
    description: 'Muestra el avatar del usuario mencionado.',
    run: async (message) => {
        // Obtener el primer usuario mencionado
        const target = message.mentions.users.first();

        // Verificar si se mencionó un usuario
        if (!target) {
            return message.reply("Por favor menciona a un usuario válido.");
        }

        try {
            // Obtener la información del miembro en el servidor
            const member = await message.guild.members.fetch(target.id);

            // Obtener el URL del avatar
            const avatar = member.user.displayAvatarURL({ size: 512, dynamic: true });

            // Crear un embed con el avatar
            const embed = new EmbedBuilder()
                .setColor('Blurple')
                .setTitle(`✨ Avatar de ${member.user.tag}`)
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
