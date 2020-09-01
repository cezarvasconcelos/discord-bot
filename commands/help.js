const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Lista de todos os comandos, ou informações sobre comandos.',
	aliases: ['commands'],
	usage: ['command name'],
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Aqui está a lista de todos meus comandos:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nVocê pode escrever \`${prefix}help [comando nomeComando]\` para saber detalhes de algum comando específico.`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Te mandei pessoalmente com muito carinho, uma DM com uma lista de todos meus comandos.');
				})
				.catch(error => {
					console.log(`Deu erro ao mandar DS de ajuda para ${message.author.tag}. \n`, error);
					message.reply('parece que tô com problema aqui para te enviar DM, será que as suas DMs estão ativas?');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Esse não é um comando válido.');
		}

		// Monta a mensagem de descrição do comando
		data.push(`**Nome:** ${command.name}`);
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descrição:** ${command.description}`);
		if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} segundo(s) `);

		message.channel.send(data, { split: true });
	},
};