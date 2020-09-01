module.exports = {
	name: 'delete',
	description: 'Apaga até 100 mensagens por vez, e que não sejam mais antigas do que 2 semanas.',
	execute(msg, args) {
		const amount = parseInt(args[0]) + 1;
		if (isNaN(amount)) {
			return msg.reply('isso aí não parece ser um número não, acho melhor você refazer a pré escola.');
		}
		else if (amount <= 1 || amount >= 99) {
			return msg.reply('se tu não colocar um número entre 1 e 99 eu não posso fazer nada carai.');
		}
		msg.channel.bulkDelete(amount, true).catch(err => {
			console.log(err);
			msg.channel.reply('foi mal ai, mas tem alguma coisa que deu erro, e não consigo deletar essas mensagens.');
		});
	},
};
