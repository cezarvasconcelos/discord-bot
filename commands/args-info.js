module.exports = {
	name: 'args-info',
	description: 'Informações Argumentos de comandos!',
	args: true,
	usage: '<palavra foo>',
	execute(msg, args) {
		if (args[0] === 'foo') {
			return msg.channel.send('bar');
		}
		// msg.channel.send(`Command aqui: ${command}\nArguments: ${args}`);
		msg.channel.send(`O primeiro argumento é: ${args[0]}`);
	},
};
