
create database farmacia;
use farmacia;

create table tb_medicamentos(
id_medicamento int primary key auto_increment,
nm_medicamento varchar(100) not null,
vl_medicamento decimal(15,2) not null,
ds_medicamento varchar(200) not null,
nm_produtora varchar(100) not null,
nr_registro varchar(14) not null
);

create table tb_farmaceuticos(
id_farmaceutico int primary key auto_increment,
nm_farmaceutico varchar(100) not null,
ds_cpf varchar(14) not null,
ds_rg varchar(12) not null,
dt_nascimento datetime not null,
nr_telefone varchar(30) not null
);

select * from tb_medicamentos;
select * from tb_farmaceuticos;

-- inserts na tabela tb_medicamentos

insert into tb_medicamentos(nm_medicamento, vl_medicamento, ds_medicamento, nm_produtora, nr_registro)
values("dipirona", 8.99, "remedio usado para febre e dor de garganta", "ultrafarma", "3124567895");

insert into tb_medicamentos(nm_medicamento, vl_medicamento, ds_medicamento, nm_produtora, nr_registro)
values("ibuprofeno", 17.99, "usado para tratar dores de garganta", "ultrafarma", "5219862465");

insert into tb_medicamentos(nm_medicamento, vl_medicamento, ds_medicamento, nm_produtora, nr_registro)
values("dorflex", 12.99, "usado para tratar dores no corpo", "eurofarma", "0054680897");

insert into tb_medicamentos(nm_medicamento, vl_medicamento, ds_medicamento, nm_produtora, nr_registro)
values("vitaminas", 14.99, "para aumentar o ganho de massa", "ultrafarma", "0034829872");

insert into tb_medicamentos(nm_medicamento, vl_medicamento, ds_medicamento, nm_produtora, nr_registro)
values("calmantes", 17.99, "para pessoas que nao conseguem dormir", "eurofarma", "7658214654");

-- inserts na tabela tb_farmaceuticos

insert into tb_farmaceuticos(nm_farmaceutico, ds_cpf, ds_rg, dt_nascimento, nr_telefone)
values("Luisa Santos", '1234567899-87', '987654312-9', '1998-02-23', '645782356');

insert into tb_farmaceuticos(nm_farmaceutico, ds_cpf, ds_rg, dt_nascimento, nr_telefone)
values("Victor Hugo", '00238898789-96', '003098765-2', '2001-08-04', '955551321');