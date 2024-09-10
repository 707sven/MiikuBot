// comando !say
module.exports = {
    description: 'Repite los argumentos dados.',
    run: async (message) => {
        // Especifica el nombre o el ID del rol permitido
        const allowedRoleID = '1277962903210692703'; // Puedes usar el nombre del rol o su ID

        // Verificar si el miembro que ejecuta el comando tiene el rol requerido
        const member = message.guild.members.cache.get(message.author.id);
        const hasRole = member.roles.cache.some(role => role.name === allowedRoleID || role.id === allowedRoleID);

        // Si no tiene el rol, enviar un mensaje de advertencia
        if (!hasRole) {
            return message.reply("No tienes permiso para usar este comando.");
        }

        // Obtener los argumentos (el mensaje después del comando !say)
        const args = message.content.split(' ').slice(1).join(' ');

        // Verificar si se dieron argumentos
        if (args.length < 1) {
            return message.reply('Provee un argumento válido.');
        }

        // Eliminar el mensaje original y enviar el texto
        await message.delete(); // Elimina el mensaje del comando

        // Enviar el mensaje del usuario en el canal
        message.channel.send(args);
    }
};
