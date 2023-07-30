<template>
    <v-app>
  <Navbar />
  <v-card flat color="#f44335" class="rounded-xl mt-6">
  <v-toolbar flat color="transparent" class="mb-4">
    <v-toolbar-title class="text-h6 mt-5">Tus Pokemónes</v-toolbar-title> 
  </v-toolbar>
  <Game />
</v-card>
    </v-app>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default{
    name: 'sorpresa',
    data:()=>({

    }),
    components:{
        Navbar,
    }
}
</script>