<template>
<div class="container-fluid">
        <div class="row body">
            <div class="col-lg-2 col-0">
            </div>
            <div class="col-lg-8 col-12">
                <div class="jumbotron bg-white">

                <h1>Api Rest - NodeJs</h1>
                <hr class="my-3">
                <h3>Stack: Vue, Bootstrap, Express, Postgres</h3>
                <p class="lead">
                 Host: Heroku | Database: ElephantSQL
                </p>
                <hr class="my-1">
                <h3>Instalação</h3>
                <hr class="my-1">
                <br>     
                <h5>Código fonte:</h5>     
                <code class="code" v-pre>git clone https://github.com/izichtl/crudNodejsTeste.git</code>   
                <br>   
                <br>      
                <h5>Instale as dependências:</h5>  
                <code class="code" v-pre>npm install</code>   
                <br>      
                <br>      
                <h5>Crie e configure o bando de dados:</h5>     
                <code class="code" v-pre>siga os passos listados abaixo</code>   
                <br>      
                <br>      
                <h5>Teste as rotas de usuário:</h5>     
                <code class="code" v-pre>npm test</code>   
                <br>      
                <br>      
                <h5>Rode a aplicação:</h5>     
                <code class="code" v-pre>npm start</code>   
                <br>      
                <br>      
                <h4>Configuração do banco de dados - ElephantSQL</h4>
                <hr class="my-1">
                <br>
                <h5>Cadastre-se ==> <small class="text-muted"> www.elephantsql.com</small></h5>     
                <br>
                <h5>Crie uma database ==> <small class="text-muted"> /Instance</small></h5>     
                <br>
                <h5>Crie a tablela users ==>  <small class="text-muted"> /SQLBrowser </small></h5>     
                <code class="text-break" v-pre>CREATE TABLE users ( user_id serial PRIMARY KEY, user_name VARCHAR(255) NOT NULL, user_email VARCHAR(255) UNIQUE NOT NULL);</code>
                <br>
                <br>
                <h5><small class="text-muted"> Copie URL de conexão do Postgres e subistitua no arquivo .env </small></h5>   
                <br>
                <h3>Rotas</h3>
                <hr class="my-1">
                <br>
                <h5>GET  /user <small class="text-muted"> Retorna todos os usuários.</small></h5>     
                <br>
                <h5>POST  /user <small class="text-muted"> Cadastra usuário.</small></h5>     
                <br>
                <h5>PUT  /user/:user_id <small class="text-muted"> Atualiza usuário</small></h5>     
                <br>
                <h5>DELETE  /user/:user_id  <small class="text-muted"> Remove usuário pelo id.</small></h5>     
                 
                <h3>Padrão JSON</h3>
                <hr class="my-1">
                <h6>user_name<small class="text-muted"> Deve conter apenas letras</small></h6>     
                <h6>user_email<small class="text-muted"> Deve ser um padrão válido de email</small></h6>     
                <pre>
                  <code v-pre>{</code>
                  <code v-pre>  "user_name": "Nome do Usuário",</code>
                  <code v-pre>  "user_email": "Email do Usuário"</code>
                  <code v-pre>}</code>
                </pre>
                <br>
                <br>
                <hr class="my-2">
                <p class="lead">
                 Desenvolvido por iZichtl - izichtl@gmail.com
                </p>
                <br>
              

                </div>      
            </div>
            <div class="col-lg-2 col-0">
            </div>
        </div>
        
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Apidoc{
  padding: 40px;
  text-align: left;
}
.texto{
  width: 80%;
  margin: auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.code{
  padding: 10px;
}
</style>
