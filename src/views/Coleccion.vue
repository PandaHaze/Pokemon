<template>
<v-app>
    <Navbar />
    <v-row>
        <v-col cols="12">
            <v-img src="pokedex.png" 
            max-height="40%"
            max-width="20%"
            contain
            class="mx-auto d-flex mt-8">
        </v-img>
            <v-card flat color="#EDE7F6" class="mx-auto rounded-xl card-container-wrapper custom-size">
          <v-img src="Daco.png"
            max-height="90%"
            max-width="20%"
            contain
            class="mx-auto d-flex margin_image">
        </v-img>
  <Coleccion />
</v-card>
</v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <Footer />
        </v-col>
    </v-row>
</v-app>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Coleccion from '../components/Coleccion.vue'
import Footer from '../components/Footer.vue'

export default{
    name: 'coleccion',
    data:()=>({

    }),
    components:{
        Navbar,
        Coleccion,
        Footer
    }
}
</script>

<style>
.custom-size{
  width: 95%; 
}
.card-container-wrapper {
  position: relative;
  margin-top: 20px;
}
.margin_image{
}
</style>