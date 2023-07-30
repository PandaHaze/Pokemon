<template>
  <v-app>

    <v-app-bar app color="red" flat>
    <Navbar />
  </v-app-bar>

    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto rounded-xl v-card--tile" flat>
            <v-img
              src="https://www.montselicenciasinfantiles.com/images/stories/virtuemart/manufacturer/68747470733a2f2f6372797374616c2d63646e322e6372797374616c636f6d6d657263652e636f6d2f70686f746f732f363333303536352f73706c61736842616e6e65725f706f6b656d6f6e2e6a7067.jpg"
              max-height="80%"
              max-width="100%"
              contain
              class="mt-2 mx-auto d-flex"
            ></v-img>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card flat class="rounded-xl">
            <v-toolbar flat color="transparent" class="mt-3">
              <v-toolbar-title class="text-h6 title ml-10">
                TIENDA
              </v-toolbar-title>
            </v-toolbar>
            <Tienda />
          </v-card>
        </v-col>
      </v-row>

      <v-toolbar flat color="transparent" class="mt-8">
        <v-toolbar-title class="text-h6 title">
          Nuestros Patrocinadores
        </v-toolbar-title>
      </v-toolbar>
      <Partner />

      <v-card flat color="#212121" class="rounded-xl mtop mbottom mx-10 pa-4">
        <v-row>
        
          <v-col cols="12" xs="12" sm="12" md="5">
<v-card class="rounded-xl mt-n16 ml-16 mobile" outlined flat height="450" width="200">
  <v-img src="https://cdn.ome.lt/v8t4yq9zUqOMISaW3MSZNSTzaHM=/770x0/smart/uploads/conteudo/fotos/pokemon-sleep-snorlax-dorme.png"></v-img>
</v-card>
    </v-col>
    <v-col cols="12" xs="12" sm="6" md="7">
      <h1 class="mt-16 titulo1">Descarga la App</h1>
      <p class="titulo1">
         lorem ipsum dolor sit amet consectetur adispsicing elit.
         Porvident sequi esse tempore maiores  quasi quia non.
         Itaque laboriosam dicta nostrum accusantium assumenda,
         vitae av ut vel tenetur minima natus commodi!
      </p>
<v-btn color="black" dark class="mb-10">
  <v-icon color="white" left>fab fa-apple</v-icon>
  App Store
</v-btn>
<v-btn color="black" dark class="ml-4 mb-10">
  <v-icon color="white" left>fab fa-google-play</v-icon>
  Play Store
</v-btn>
    </v-col>

        </v-row>
      </v-card>
    </v-container>

    <Footer />
  </v-app>
</template>


<script>
import Navbar from '../components/Navbar.vue'
import Tienda from '../components/Tienda.vue'
import Partner from '../components/Partner.vue'
import Footer from '../components/Footer.vue'

  export default {
    name: 'Home',

    components: {
      Navbar,
      Tienda,
      Partner,
      Footer

    },
  }
</script>

<style scoped>

.title{
  font-size: 2.5rem;
font-weight: bold;
color: black;
text-transform: uppercase;
display: flex;
  align-items: center;
  justify-content: center;
}
.marginLeft {
  margin-left: -90px;
}
.mtop{
  margin-top: 100px;
}
.mbottom{
  margin-bottom: 100px;
}
.v-card.borderme{
border: 2px solid green !important;
}
.v-card.borderout{
  border: 1px solid whitesmoke !important;
}
.v-btn:not(.v-btn--round).v-size--default.add{
  min-width: 0px !important;
}
.theme--light.v-sheet--outlined.mobile{
  border: 2px solid black !important;
}
@media only screen and (max-width: 600px){
  h2.title1{
    font-size: 15px;
  }
  h2.title2{
    font-size: 15px;
  }
  .top{
    margin-top: 20px
  }
}
@media only screen and (min-width: 600px){
  .top{
    margin-top: 70px;
  }
}
@media only screen and (min-width: 768px){
  .top{
    margin-top: 120px;
  }
}
.titulo1{
  color: white;
}
</style>