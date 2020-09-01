module.exports = {
	name: 'kick',
	description: 'Expulsar alguém',
	guildOnly: true,
	execute(msg, args) {
		const taggedUser = msg.mentions.users.first();

		if (!msg.mentions.users.size) {
			return msg.reply('quer que eu kicke quem carai? \nPrecisa marcar alguém se não essa porra não funciona!');
		}
		else {
			msg.channel.send(`Você mandou embora o: ${taggedUser.username}`);
		}
	},
};
