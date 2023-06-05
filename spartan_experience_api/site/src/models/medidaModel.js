var database = require("../database/config");

function buscarUltimasMedidas() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(usuario.fkPersonagem) as voto, personagem.nome as personagem from usuario join personagem on personagem.idPersonagem = usuario.fkPersonagem group by usuario.fkPersonagem;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select count(usuario.fkPersonagem) as voto, personagem.nome as personagem from usuario join personagem on personagem.idPersonagem = usuario.fkPersonagem group by usuario.fkPersonagem;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPercentual(idUsuario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select concat('Acertos de ', usuario.nome, ' (%)') as informacao, quiz.percentualAcerto as percentual from usuario join quiz on usuario.idUsuario = quiz.fkUsuario where usuario.idUsuario = ${idUsuario} group by quiz.percentualAcerto, usuario.nome;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select concat('Acertos de ', usuario.nome, ' (%)') as informacao, quiz.percentualAcerto as percentual from usuario join quiz on usuario.idUsuario = quiz.fkUsuario where usuario.idUsuario = ${idUsuario} group by quiz.percentualAcerto, usuario.nome;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarQuiz(idUsuario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(fkUsuario) as verificacao, idQuiz from quiz join usuario on idUsuario = fkUsuario where idUsuario = ${idUsuario} group by idQuiz;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select count(fkUsuario) as verificacao, idQuiz from quiz join usuario on idUsuario = fkUsuario where idUsuario = ${idUsuario} group by idQuiz;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarPercentual,
    verificarQuiz
}
