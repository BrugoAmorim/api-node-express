# api-node-express
crud com node express

Fiz esta api apenas para brincar um pouco com o Node express. Aqui eu pretendo descrever como voce pode consumi-lá
  
Está api gerencia os dados de uma farmacia, substituindo todo o trabalho de ter que anotar/registrar no papel. Poderiam ser salvos no banco as informacoes dos medicamentos da farmacia e tambem salvar as informacoes dos funcionarios que trabalham nela.

## Buscar-Medicamentos

Url padrão, nela é utilizado o vergo GET para fazer as consultas. Nao é necessario informar o nome de um medicamento, se voce deixar vazio, lhe é mostrado todos os registros que estão no banco.

<code> localhost:5000/remedios?nome= </code>

O usuario pode colocar o nome do medicamento que deseja achar, se existir, será retornado os dados desse remedio.

<code> localhost:5000/remedios?nome=calmantes </code>

![image](https://user-images.githubusercontent.com/87936511/171179264-7ae089a1-cd51-4602-b16c-9857660c36a3.png)
  
É preciso escrever o nome do medicamento corretamente, caso contrário será mostrado um objeto JSON com a mensagem dizendo que não foi encontrado

![image](https://user-images.githubusercontent.com/87936511/171181359-cfda6f9c-53c6-43db-a3d9-d115b6b08c34.png)

## Cadastrar-Medicamento

Url para a insercao de novos medicamentos. Entra um objeto JSON com as seguintes informacoes: nome do remédio, preço de venda, descrição do medicamento, produtora e seu número de registro.

<code> localhost:5000/novo-remedio </code>

![image](https://user-images.githubusercontent.com/87936511/171864830-133fc0b1-ac66-4275-94e3-11700fcfe8ff.png)

## Atualizar-Medicamento

Url para a atualizacao das informações do medicamento, entra os mesmos parâmetros que a funcionalidade de inserção, porém em sua url é necessário informar o id do registro, caso contrário será retornado um erro dizendo que o método não foi encontrado.

<code> localhost:5000/att-remedio/8 </code>

![image](https://user-images.githubusercontent.com/87936511/171865907-3ed3e725-28b6-4f30-b246-08f86e9fde31.png)

Caso seja informado um ID inválido, o sistema retorna um badrequest dizendo que este registro não foi encontrado.

![image](https://user-images.githubusercontent.com/87936511/171866265-e5b81ffb-496d-4963-8dc1-79cc65c7f524.png)

## Apagar-Medicamento

Url para excluir um medicamento do banco, não é necessário entrar um objeto request, apenas é obrigatorio informar o ID do registro em sua url, se for um ID válido é retornado ao cliente uma mensagem dizendo que a informação foi excluida com êxito. Caso contrário lhe é retornado um codigo 404 dizendo que o registro não foi encontrado

<code> localhost:5000/del-remedio/8 </code>

![image](https://user-images.githubusercontent.com/87936511/171871763-e50a59ec-d1f1-4030-836f-de4e1dd20fc8.png)
