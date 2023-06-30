# Sistema cursos

Este projeto visa ser uma introdução ao desenvolvimento backend com NodeJS e 
Sequelize.

## Criando um model com sequelize-cli

No exemplo abaixo vamos criar uma entidade pessoa com os atributos nome 
(String), ativo (boolean), email (String) e role (String). Para isso usamos
o seguinte comando no terminal:

npx sequelize-cli model:create --name Pessoas --attributes 
nome:string,ativo:boolean,email:string,role:string

Após isso o próprio sequelize criará os arquivos necessários nas pastas
models e migrations e a coluna id será gerada automaticamente como uma PK

## O próximo passo será fazer as migrations

Para fazer as migrations usamos o seguinte comando:

npx sequelize-cli db:migrate

E se correr tudo bem, veremos esse resultado:

Sequelize CLI [Node: 18.16.0, CLI: 6.6.1, ORM: 6.32.0]

Loaded configuration file "api/config/config.json".
Using environment "development".
== 20230622111250-create-pessoas: migrating =======
== 20230622111250-create-pessoas: migrated (0.032s)

## Opcionalmente podemos gerar seeds no banco para popular. 

Para isso, 
inicialmente deve criar um arquivo seeder com o seguinte comando:

npx sequelize-cli seed:generate --name demo-pessoas

Após isso o sequelize criará um arquivo seeder dentro da pasta seeders
no projeto e dentro desse arquivo podemos preencher com dados 
(em forma de objetos JS) conforme a nossa necessidade

Com o arquivo preenchido usamos o seguinte comando para de fato popular
as tabelas:

npx sequelize-cli db:seed:all

## Para desfazer migrações usamos o seguinte comando:

npx sequelize-cli db:migrate:undo

Esse comando irá desfazer somente a última migração feita. Podemos desfazer
migrações até desfazer a que quisermos ou podemos desfazer uma migração específica
com o comando:

db:migrate:undo --name [data-hora]-create-[nome-da-tabela].js

Porém, nesse último caso, só irá funcionar se 
não tiver nenhuma outra tabela relacionada a ela!

## Podemos também desfazer seeds com os comandos:

npx sequelize db:seed:undo

Para desfazer o último seed feito.

npx sequelize-cli db:seed:undo --seed nome-do-arquivo

Para desfazer seeds de uma tabela específica.

npx sequelize-cli db:seed:undo:all

Para desfazer todos os seeds feitos.

## Importante:

Ao contrário das migrações, não existe nenhum recurso de “versionamento” 
de seeds, só é possível incluir no banco e desfazer a operação 
(o que vai deletar os registros do banco).

Se rodar o :undo em uma tabela e quiser mais tarde utilizar 
os seeds novamente na mesma tabela, os IDs deles serão outros, por conta
do autoincrement.

Os registros terão novos IDs, pois uma vez deletado o ID nunca é 
reutilizado. Se você estiver migrando/seedando tabelas relacionadas, 
é sempre bom conferir os IDs de todas, do contrário o Sequelize vai 
lançar um erro de relação.

## Criando novas tabelas e relacionamentos

Como regra para criação de novas tabelas do modelo, deve-se criar,
primeiramente, tabelas que não possuam chaves estrangeiras (FK).

Vamos inicialmente criar a tabela Niveis:

npx sequelize-cli model:create --name Niveis --attributes 
descr_nivel:string

Como a tabela Matriculas recebe informacoes da tabela Turmas,
vamos criar primeiro a tabela Turmas:

npx sequelize-cli model:create --name Turmas --attributes 
data_inicio:dateonly

Obs.: nesse primeiro momento não precisamos criar chaves 
estrangeiras

Por fim vamos criar a tabela Matriculas:

npx sequelize-cli model:create --name Matriculas --attributes
status:string

## Fazendo associações

Para criar associações devemos editar os arquivos models
correspondentes às entidades associadas. Exemplo: Pessoas
está associado de um para muitos com Turmas e Matrículas.
Assim, dentro do método associate do model Pessoas, adicionamos
as seguintes linhas.

Pessoas.hasMany(models.Turmas, {
    foreignKey: 'mestre_id'
});
Pessoas.hasMany(models.Matriculas, {
    foreignKey: 'estudante_id'
});

Essas associações permitirão buscar quais turmas e quais Matriculas
aquela Pessoa possui/está associada.

Após fazer todas as associações podemos adicionar as associações
inversas. Exemplo, Turmas está associada com Pessoas, então
dentro do model Turmas podemos adicionar a seguinte instrução

Turmas.belongsTo(models.Pessoas, {
    foreignKey: 'mestre_id'
});

O uso do belongsTo permitirá a busca inversa daquelas entidades.
Ou seja, permitirá buscar qual Pessoa pertence a uma determinada Turma.

Feitas as associações, o passo final é adicionar as colunas de FK
nos arquivos de migração dos modelos correspondentes.

Exemplos:

mestre_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: { model: 'Pessoas', key: 'id'}
},
nivel_id: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: { model: 'Niveis', key: 'id'}
}

Após essas instruções o passo seguinte é criar as migrações:

npx sequelize-cli db:migrate 