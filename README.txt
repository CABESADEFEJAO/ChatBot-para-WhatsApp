🤖 Bot de Envio Automático de Mensagens no WhatsApp
✅ Como configurar:

Instale o Node.js:

Baixe todos os arquivos:

bot.js

config.txt → aqui você escreve sua mensagem personalizada.

candidatos.xlsx → com as colunas: Nome, Numero, Vaga, Link.

rodar_bot.bat → para rodar com dois cliques.

Configuração inicial:
→ No terminal da pasta do bot, rode:

npm install venom-bot xlsx


✅ Como usar o BOT de envio de mensagens
Coloque o arquivo candidatos.xlsx na mesma pasta do bot.js.

➡️ A planilha precisa ter as colunas:

Nome

Numero (com DDI, ex: 5511999998888)

Vaga

Link


Edite o arquivo config.txt com a mensagem que você deseja enviar.
➡️ Use os placeholders:

{nome} → Será substituído pelo nome do candidato.

{vaga} → Será substituído pela vaga.

{link} → Será substituído pelo link.

✅ Como executar:
➡️ Método 1: Pelo terminal
Na pasta do bot, rode:

node bot.js

Deixe o celular com internet e escaneie o QRCode.

O bot começará a enviar as mensagens automaticamente.

Após o envio das mensagens o bot excluirá todos os dados do candidatos.xlsx.



➡️ Método 2: Pelo atalho .bat
Basta dar dois cliques no arquivo rodar_bot.bat.

Ele abrirá o terminal automaticamente e executará o bot sem precisar digitar comandos.

Deixe o celular com internet e escaneie o QRCode.

O bot começará a enviar as mensagens automaticamente.

Após o envio das mensagens o bot excluirá todos os dados do candidatos.xlsx.


✅ Como encerrar o bot:
❌ Fechar a aba do bot no Chrome: Caso encerre o bot dessa forma, seus dados de login não serão salvos, sendo necessário escanear o QRCode novamente.

➡️Para encerrar o bot da forma correta é necessário ir no terminal do bot que já esta aberto, e digitar Crtl + C (igual o copiar e colar). 
 Dessa forma o bot é encerrado da forma correta, salvando as informações do seu login. Assim, da próxima vez que for usar o bot, não será necessário escanear novamente o QRCode, basta dar dois cliques o arquivo rodar_bot.bat.


✅ LOGS:
São criados pelo próprio bot. Tem o intuito de registrar as operações

log.txt → Mostra tudo o que foi feito.

erros.txt → Mostra quais candidatos deram erro.

Ambos podem ser excluídos pelo usuário sem problemas. 

