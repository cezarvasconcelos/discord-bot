module.exports = {
	name: 'avatar',
	description: 'Mostrar o avatar das pessoas marcadas.',
	aliases: ['avt', 'icon'],
	execute(msg, args) {
		if (!msg.mentions.users.size) {
			return msg.reply(`your avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: "true" })}>`);
		}
		const avatarList = msg.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: "true" })}> `;
		});

		msg.channel.send(avatarList);
	},
};
