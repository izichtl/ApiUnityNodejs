<template>
<div class="container-fluid">
        <div class="row body">
            <div class="col-lg-2 col-0"></div>
            <div class="col-lg-8 col-12">

                <div class="jumbotron bg-white">
                    <h1 class="display-6 text-black">Cadastro de Usuário</h1>
                    <hr class="my-3">
                    <form action="." @submit.prevent="cadastrar" method="post">
                      <div class="form-group">
                        <div class="mb-3">
                          <label for="userName" class="form-label">Nome</label>
                          <input type="text" class="form-control" id="userName" placeholder="Seu nome" v-model="user.user_name" required>
                        </div>
                        <div class="mb-3">
                          <label for="userEmail" class="form-label">Email</label>
                          <input type="email" class="form-control" id="userEmail" placeholder="seuemail@example.com" v-model="user.user_email" required>
                        </div>
                      </div>  
                      <button type="submit" class="btn btn-info">Cadastrar / Atualizar</button>
                    </form>
                    
                    <hr class="my-3">
                    <h2 class="display-6 text-black">Usuários Cadastrados</h2>
                    <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user of users" :key="user.user_id"> 
                        <th scope="row">{{user.user_id}}</th>
                        <td>{{user.user_name}}</td>
                        <td class="text-break">{{user.user_email}}</td>
                        <td><button @click="editar(user)" class="btn-sm btn-warning"><font-awesome-icon :icon="['fas', 'wrench']" /></button></td>
                        <td><button @click="deletar(user)" class="btn-sm btn-danger"><font-awesome-icon :icon="['fas', 'trash']" /></button></td>
                      </tr>
                    </tbody>
                  </table>
                    
                  </div>
            </div>
            <div class="col-lg-2 col-0"></div>
        </div>
        
</div>
</template>

<script>
import Users from '../services/users';
export default {
  data(){
    return{
      users: [],
      user: {
        user_id: '',
        user_name: '',
        user_email: ''
      }
    }
  },
  mounted(){
    this.listar();

  },
  methods:{

    listar(){
      Users.listar().then(resposta => {
      
      this.users = this.sortedArray(resposta.data)
      
    })
    },
    cadastrar(){
      //CADASTRAUSUÁRIO
      if(!this.user.user_id){
        
        Users.cadastrar(this.user).then(resposta => {
        this.user = {};
        console.log(resposta)
        alert(`Usuário ${resposta.data[0].user_name} Cadastrado`);
        this.listar();
      }).catch( error => {
        
        if(error.response.data.code == 23505){
          alert(`Email já cadastrado.`);
        }
        if(error.response.data.code == 3141){
          alert(`O nome deve conter apenas letras.`);
        }
        
      })
      }
        //CADASTRAUSUÁRIO
      else{
        Users.atualizar(this.user).then(resposta => {
          this.user = {};
        alert(`Usuário ${resposta.data[0].user_name} Atualizado`);
        this.listar();
      }).catch( error => {
        
        if(error.response.data.code == 23505){
          alert(`Email já cadastrado.`);
        }
        if(error.response.data.code == 3141){
          alert(`O nome deve conter apenas letras.`);
        }
        
      })
      }
    },

    //HABILITA USUARIO PARA EDIÇÃO
    editar(user){
      this.user = user
    },
    //DELETA USUARIO PARA EDIÇÃO
    deletar(user){
      Users.deletar(user).then(resposta => {
        console.log(resposta)
        alert(`Usuário ${user.user_name} Deletado`)
        this.listar();
      })
    },

    //ORGANIZA POR ID
    sortedArray(array) {
    function compare(a, b) {
      if (a.user_id < b.user_id)
        return -1;
      if (a.user_id > b.user_id)
        return 1;
      return 0;
    }
    return array.sort(compare);
  }

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

</style>
