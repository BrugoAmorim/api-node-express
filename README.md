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
