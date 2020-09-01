module.exports = {
	name: 'server',
	description: 'Servidor!',
	execute(msg, args) {
		msg.channel.send(`O nome do servidor que você está é: ${msg.guild.name}\nContém atualmente ${msg.guild.memberCount} membros`);
	},
};
