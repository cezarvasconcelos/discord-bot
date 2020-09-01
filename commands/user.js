module.exports = {
	name: 'user',
	description: 'Usuário!',
	execute(msg, args) {
		msg.channel.send(`O seu nick é: ${msg.author.username}\nE seu ID é : ${msg.author.id}`);
	},
};
