const querystring = require('querystring');
const fetch = require('node-fetch');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
const Discord = require('discord.js');

module.exports = {
	name: 'urban',
	description: 'Pesquisar significados e uso de palavras, em inglês apenas.',
	aliases: ['ub', 'word'],
	args: true,
	usage: '`<palavra a ser pesquisada>`',
	async execute(msg, args) {
		if (!args.length) {
			msg.reply('Você precisa colocar junto o que quer pesquisar.');
		}
		else {
			const query = querystring.stringify({ term: args.join(' ') });
			const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

			if (!list.length) {
				return msg.channel.send(`No results found for **${args.join(' ')}**.`);
			}

			const [answer] = list;
			console.log(answer);
			const embed = new Discord.MessageEmbed()
				.setColor('#4AFF03')
				.setTitle(answer.word)
				.setURL(answer.permalink)
				.addFields(
					{ name: 'Definition', value: trim(answer.definition, 1024) },
					{ name: 'Exemple', value: trim(answer.example, 1024) },
					{ name: 'Rating', value: `${answer.thumbs_up} joinhas. ${answer.thumbs_down} não joinhas.` }
				);
			msg.channel.send(embed);
		}
	},
};