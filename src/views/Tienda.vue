<template>
  <v-app>
    <Navbar />
    <v-row>
      <v-col>
        <v-card
          :style="{
            background: 'url(https://img.freepik.com/vetores-gratis/fundo-roxo-do-ceu-nublado-com-grupo-de-cumulos-e-nuvens-cirros-ilustracao-plana-dos-desenhos-animados_1284-62768.jpg?w=1380&t=st=1690692939~exp=1690693539~hmac=5d9ac2f34d625f7249804498941a103f954e28d85a348d369cd6713dcbf727a8) no-repeat center center fixed',
            backgroundSize: 'cover'
          }"
        >
          <v-toolbar flat color="transparent" class="mb-4">
            <v-container fluid>
            </v-container>
          </v-toolbar>
          <Game />
        </v-card>
      </v-col>
    </v-row>
    <Footer />
  </v-app>
</template>

  
  <script> 
  import Navbar from '../components/Navbar.vue'
  import Game from '../components/Game.vue'
  import Footer from '../components/Footer.vue'
  
  export default {
    name: 'tienda',
    components:{
      Navbar,
      Game,
      Footer,
    }
  }
  </script>

  <style scoped>
  
  </style>
  