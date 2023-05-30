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

select count(usuario.fkPersonagem) as voto, personagem.nome as personagem from usuario join personagem on personagem.idPersonagem = usuario.fkPersonagem group by usuario.fkPersonagem;