const fetch = require('node-fetch');
module.exports = {
	name: 'gatenho',
	description: 'Imagem de gatinho fofamente felinos, ou nem sempre.',
	aliases: ['cat', 'kitten', 'gatinho'],
	args: false,
	usage: '<teste> <qq tu quer saber>',
	async execute(msg, args) {
		const { file } = await fetch("http://aws.random.cat/meow").then(response => (response.json()));
		msg.channel.send(file);
	},
};
