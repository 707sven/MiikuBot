const { ButtonBuilder, ActionRowBuilder, Events } = require('discord.js');

const usernameButton = new ButtonBuilder()
    .setCustomId('username')
    .setEmoji('📑')
    .setLabel('Mostrar nombre de usuario')
    .setStyle(1); // Primary (blue)

const avatarButton = new ButtonBuilder()
    .setCustomId('avatar')
    .setEmoji('🖼️')
    .setLabel('Mostrar avatar de usuario')
    .setStyle(2); // Secondary (gray)

module.exports = {
    description: 'Envía dos botones, uno envía el nombre de usuario y el otro la imagen.',
    run: async (message) => {
        const actionRow = new ActionRowBuilder().addComponents(usernameButton, avatarButton);

        // Envía el mensaje con los botones
        const reply = await message.reply({
            content: 'Elige una opción:',
            components: [actionRow],
        });

        // Crea un recolector de componentes de mensaje
        const filter = (interaction) => interaction.user.id === message.author.id && interaction.message.id === reply.id;
        const collector = reply.createMessageComponentCollector({
            filter,
            time: 60 * 1000 // 1 minuto de duración
        });

        // Manejo de interacciones
        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'username') {
                await interaction.update({
                    content: `Tu nombre de usuario es **${message.author.username}**`,
                    components: []
                });
            } else if (interaction.customId === 'avatar') {
                const avatarURL = message.author.displayAvatarURL({ size: 512, dynamic: true });
                await interaction.update({
                    content: 'Tu imagen de perfil es:',
                    files: [avatarURL],
                    components: []
                });
            }
        });

        // Manejo de fin de recolector
        collector.on('end', async () => {
            try {
                await reply.edit({ components: [] });
            } catch (error) {
                console.error('Error al desactivar los botones:', error);
            }
        });
    }
};