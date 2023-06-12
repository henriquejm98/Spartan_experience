CREATE DATABASE spartan_experience;

USE spartan_experience;

CREATE TABLE usuario (
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(50),
senha varchar(50),
fkPersonagem int,
constraint fkPersonagem foreign key (fkPersonagem) references personagem(idPersonagem)
);

CREATE TABLE personagem (
idPersonagem int primary key auto_increment,
nome varchar(45)
);

INSERT INTO personagem (nome) VALUES 
('Kratos'),
('Ares'),
('Zeus'),
('Atena'),
('Atreus'),
('Freya'),
('Brok'),
('Sindri'),
('Thor'),
('Odin');

CREATE TABLE quiz (
idQuiz int auto_increment,
percentualAcerto float,
fkUsuario int,
constraint fkUsuario foreign key (fkUsuario) references usuario(idUsuario),
constraint pkQuiz primary key (idQuiz, fkUsuario)
);

select * from usuario;
select * from personagem;
truncate table usuario;
select * from quiz;

UPDATE quiz SET percentualAcerto = 100 where idQuiz = 1;

select count(fkUsuario) as verificacao, idQuiz from quiz join usuario on idUsuario = fkUsuario where idUsuario = 1 group by idQuiz;
select count(usuario.fkPersonagem) as voto, personagem.nome as personagem from usuario join personagem on personagem.idPersonagem = usuario.fkPersonagem group by usuario.fkPersonagem;
select concat('Acertos de ', usuario.nome, ' (%)') as informacao, quiz.percentualAcerto as percentual from usuario join quiz on usuario.idUsuario = quiz.fkUsuario where usuario.idUsuario = 1 group by quiz.percentualAcerto, usuario.nome;

create user 'cruduser'@'localhost' identified by 'urubu2020';
grant insert, select, delete, update on spartan_experience.* to 'cruduser'@'localhost';
flush privileges;