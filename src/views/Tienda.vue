<template>
  <v-app>
    <Navbar />
    <v-row>
      <v-col>
        <v-card
          :style="{
            background: 'url(https://img.freepik.com/vetores-gratis/fundo-roxo-do-ceu-nublado-com-grupo-de-cumulos-e-nuvens-cirros-ilustracao-plana-dos-desenhos-animados_1284-62768.jpg?w=1060&t=st=1690652565~exp=1690653165~hmac=d5e997bb1c06735858cd548b2904e88a97ac3c204ce89b49f45aae562ea2095b) no-repeat center center fixed',
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
  