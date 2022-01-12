<template>
  <div class="container-fluid">
    <div class="row header bg-dark border-botton">
            <div class="col-lg-2  col-0">  
            </div>
            <div class="col-lg-8  col-12">
              <nav class=" navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-light bg-dark">
                <div class="container-fluid">
                <a class="navbar-brand text-light" href="https://www.izichtl.com/" target="_blank">NODEJS CRUD</a>
                  <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                      <ul class="navbar-nav">
                        <li class="nav-item">
                        <router-link  class="nav-link active text-light"  to="/"> Documentação </router-link>
                        </li>
                        <li class="nav-item">
                        <router-link class="nav-link active text-light" to="/cadastro"> Cadastro </router-link>
                        </li>
                      </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div class="col-lg-2 col-0">
            </div>
    </div>
    <router-view/>
  </div>
</template>
<style>
.header{
    margin-bottom: 40px;
}

</style>
