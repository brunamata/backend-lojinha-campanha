# backend-lojinha-campanha
Backend em node.js com conexão em banco de dados para gerenciamento de estoque da lojinha da Campanha

## Endpoints

### Products
* GET /products

parâmetros: nenhum \
retorno: \
200: todos os produtos na base \
404: produtos não encontrados \
500: erro no servidor

* POST /products

parâmetros: 
``` 
{
    nome: <String, required>,
    descricao: <String>,
    preco: <Number, required>,
    quantidade_estoque: <Number>,
    eh_combo: <Boolean, required>,
    combo_products: <Array>[
        {
            nome: <String, required>,
            quantidade: <Number, required>
        }
    ]
}
```
retorno: \
200: novo produto na base \
400: parametro inválido \
500: erro no servidor


* PUT /products

parâmetros: 

```
{
    nome: <String, required>,
    + campos que quer atualizar
}
```
retorno: \
200: produto atualizado \
400: parametro inválido \
500: erro no servidor


* DELETE /products

parâmetros: 

```
{
    nome: <String, required>
}
```

obs.: ao remover um produto, todos os combos associados a ele serão removidos também.

retorno: \
200: mensagem de sucesso + combos deletados junto \
400: parametro inválido \
500: erro no servidor

### Sales

* GET /sales

parâmetros: nenhum \
retorno: \
200: todos as vendas na base, ordenadas pela data_hora \
404: vendas não encontradas \
500: erro no servidor

* POST /sales

parâmetros: 
``` 
{
    preco_total: <Number, required>,
    produtos: <Array, required>[
        {
            nome: <String, required>,
            preco: <Number, required>,
            quantidade: <Number, required>
        }
    ]
}
```
retorno: \
200: nova venda na base \
400: parametro inválido \
500: erro no servidor

## Como baixar o projeto

1.  Garanta que você tem as seguintes tecnologias instaladas: 
    * VS Code
    * Node.JS
    * npm

2. Crie uma pasta, abra o terminal e digite `git clone https://github.com/brunamata/backend-lojinha-campanha.git`

3. Em seguida, instale as dependências com `npm i` 

4. Para as credenciais de acesso ao banco, crie na pasta raiz do github, `backend-lojinha-campanha`, o arquivo .env, pegue as credenciais com algum contribuinte no projeto e preencha (é essencial para conectar no banco): 
``` 
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_DATABASE=
```

5. Rode o projeto digitando no terminal `node api/index.js` ou usando o Vercel CLI, digitando `vercel dev`


## Informações Técnicas

Esse projeto foi feito para a utilização de um aplicativo mobile, feito para a matéria de Desenvolvimento Web e Mobile, dentro do curso de Sistemas de Informação na USP, e será destinado para uso da Campanha USP do Agasalho na lojinha de itens. 

O projeto está hospedado na plataforma [vercel](vercel.com) e utiliza [mongo.db](mongodb.com) como banco de dados.

O projeto foi desenvolvido em node.js com utilização da biblioteca express e outras dependências que auxiliaram no desenvolvimento.