const venom = require("venom-bot");
const XLSX = require("xlsx");
const fs = require("fs");

venom.create({
  session: "session1",
  multidevice: true,
  headless: false,
  useChrome: true,
  browserArgs: ["--no-sandbox"],
  folderNameToken: 'tokens',
})
  .then((client) => {
    log("Sessão criada. Aguardando conexão real...");
    esperarClientPronto(client);
    
    // Encerra e limpa quando fechar o bot (Ctrl+C)
    process.on('SIGINT', async () => {
      log("Bot encerrado manualmente.");
      limparExcelComCabecalho('candidatos.xlsx');
      process.exit();
    });
    
  })
  .catch((erro) => {
    logErro("Erro ao iniciar o Venom: " + erro);
  });

async function esperarClientPronto(client) {
  let tentativas = 0;
  const maxTentativas = 10;

  while (tentativas < maxTentativas) {
    const state = await client.getConnectionState();
    log(`Estado da conexão (${tentativas + 1}/${maxTentativas}): ${state}`);

    if (state === "CONNECTED") {
      log("Bot conectado e pronto para uso!");
      start(client);
      return;
    }

    tentativas++;
    await new Promise((res) => setTimeout(res, 3000));
  }

  logErro("Não foi possível conectar completamente após várias tentativas.");
}

async function start(client) {
  let workbook;
  try {
    workbook = XLSX.readFile('candidatos.xlsx');
  } catch (err) {
    logErro("Erro ao ler o arquivo candidatos.xlsx: " + err);
    return;
  }

  const sheet_name = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name]);

  let mensagemBase;
  try {
    mensagemBase = fs.readFileSync('config.txt', 'utf8').trim();
  } catch (err) {
    logErro("Erro ao ler o config.txt: " + err);
    return;
  }

  log(`\n${data.length} contatos carregados.`);

  for (let i = 0; i < data.length; i++) {
    const contato = data[i];

    if (!contato.Nome || !contato.Numero || !contato.Vaga || !contato.Link) {
      logErro(`Dados incompletos na linha ${i + 2}. Verifique Nome, Numero, Vaga, Link.`);
      continue;
    }

    const nome = contato.Nome;
    const numero = contato.Numero;
    const vaga = contato.Vaga;
    const link = contato.Link;

    const mensagem = mensagemBase
      .replace(/{nome}/g, nome)
      .replace(/{vaga}/g, vaga)
      .replace(/{link}/g, link);

    const chatId = numero + '@c.us';

    try {
      log(`Enviando mensagem para ${nome} (${numero})...`);
      const resultado = await client.sendText(chatId, mensagem);
      log(` Mensagem enviada para ${nome}: ${resultado}`);
    } catch (err) {
      logErro(` Erro ao enviar para ${numero}: ${err}`);
    }

    await delay(5000);
  }

  log("\n Todas as mensagens foram enviadas!");

  // Limpar Excel após o envio completo
  limparExcelComCabecalho('candidatos.xlsx');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(msg) {
  console.log(msg);
  fs.appendFileSync('log.txt', msg + "\n");
}

function logErro(msg) {
  console.error(msg);
  fs.appendFileSync('erros.txt', msg + "\n");
}

// Função para limpar mantendo o cabeçalho
function limparExcelComCabecalho(nomeArquivo) {
  const cabecalho = [{ Nome: "", Numero: "", Vaga: "", Link: "" }];
  const ws = XLSX.utils.json_to_sheet(cabecalho);
  const wb = XLSX.utils.book_new();
  
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, nomeArquivo);
  
  log(` Arquivo ${nomeArquivo} limpo (cabeçalho mantido).`);
}
