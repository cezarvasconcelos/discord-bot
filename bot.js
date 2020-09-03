const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Bot iniciado!');
});
// Outro teste de commit, agora sem ser por linha de comando
// Fica ativo e à cada mensagem ele é executado
client.on('message', async msg => {

	// Toda informação, vem no 'message' = msg
	console.log(msg.content);
	// Se a mensagem não começar com o prefixo definido ou originar de um outro bot, cai fora.
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	// Usa regEx para ignorar espaços extras informados
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();


	// Confere se existe o comando ou aliases que o usuario enviou.
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	console.log("Conteúdo do args: ", args);
	console.log("qq tem dentro do commandName: ", commandName);
	console.log("qq tem dentro do command: ", command);

	if (!command) return;

	let msgRetorno = `Você não usou o comando de forma correta. ${msg.author}`;

	// executar o comando fora de um servidor do Discord, avisa o user.
	if (command.guildOnly && msg.channel.type === 'dm') {
		return msg.reply('Você precisa estar em um servidor para executar esse comando.');
	}

	// Mostra o uso correto do comando, quando necessário.
	if (command.args == true && !args.length) {
		if (command.usage) {
			msgRetorno += `, o uso correto é: ${prefix}${commandName} ${command.usage}`;
		}
		return msg.channel.send(msgRetorno);
	}

	// Ativa um cooldown para não ter spam de comandos
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldonw || 3) * 1000;

	if (timestamps.has(msg.author.id)) {
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return msg.reply(`, tu é precoce hein, espera mais uns ${timeLeft.toFixed(1)} segundos antes de utilizar o comando \`${command.name}\` novamente.`);
		}
	}
	else {
		timestamps.set(msg.author.id, now);
		setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
	}

	try {
		command.execute(msg, args);
	}
	catch (error) {
		console.log(error);
		msg.reply('foi mal ai, deu erro, não sei se a culpa foi minha ou sua.');
	}

});
client.login(token);