<template>
  <v-app-bar app color="red" flat>
    <!-- PARA DISPOSITIVOS PEQUEŃOS, MUESTRA EL BOTON-->
    <v-menu v-if="$vuetify.breakpoint.xsOnly" left>
      <template v-slot:activator="{ on }">
        <v-btn class="white--text" icon v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list color="#E53935" exact>
        <v-list-item :to="{ name: 'home' }" exact>
          <v-list-item-title class="white--text">Inicio</v-list-item-title>
          <v-list-item-icon class="white--text">
            <span class="material-symbols-outlined">home</span>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item :to="{ name: 'coleccion' }" exact>
          <v-list-item-title class="white--text">Colección</v-list-item-title>
          <v-list-item-icon class="white--text">
            <span class="material-symbols-outlined">favorite</span>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item :to="{ name: 'tienda' }" exact>
          <v-list-item-title class="white--text">Juego</v-list-item-title>
          <v-list-item-icon class="white--text">
            <span class="material-symbols-outlined">playing_cards</span>

          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- PARA DISPOSITIVOS GRANDES, NO APARECE EL BOTON -->
    <v-toolbar-items class="mr-auto" v-else>
      <v-btn class="white--text" text :to="{ name: 'home' }" exact>
        Inicio
        <span class="material-symbols-outlined">home</span>
      </v-btn>
      <v-btn class="white--text" text :to="{ name: 'coleccion' }" exact>
        Colección
        <span class="material-symbols-outlined">favorite</span>
      </v-btn>
      <v-btn class="white--text" text :to="{ name: 'tienda' }" exact>
        Juego
        <span class="material-symbols-outlined">playing_cards</span>
      </v-btn>
    </v-toolbar-items>

    <!-- Coins and Image Wrapper -->
    <div class="d-flex align-center ml-auto"> <!-- ml-auto class pushes content to the right -->
      <ul>
        <li class="card-textt mr-1">{{ userCoins }}</li>
      </ul>
      <img class="responsive-image" src="pokecoin.png" />
    </div>
  </v-app-bar>
</template>

<script>
import PokemonList from './Tienda.vue';

export default {
  components: {
    PokemonList,
  },
  data: () => ({
    userCoins: 100,
  }),
  created() {
    this.$root.$on('user-coins-updated', this.updateUserCoins);
  },
  computed:{
    coinClass() {
      if (this.userCoins >= 100) {
        return 'coin-high';
      } else if (this.userCoins >= 50) {
        return 'coin-medium';
      } else {
        return 'coin-low';
      }
    },
  },
  methods: {
    updateUserCoins(coins) {
      this.userCoins = coins;
    },
    incrementCoins(progress) {
      const targetCoins = 150;
      const increment = Math.ceil((targetCoins - this.coins) / progress);
      let currentCoins = this.coins;
      const interval = setInterval(() => {
        currentCoins += increment;
        if (currentCoins >= targetCoins) {
          currentCoins = targetCoins;
          clearInterval(interval);
        }
        this.userCoins = currentCoins;
      }, 100);
    },
  },
  };
</script>

<style scoped>
    .card-textt {
    font-size: 20px;
    list-style-type: none; 
    color: white;
  }

  .responsive-image {
  max-width: 100%;
  height: auto;
  max-height: 50px; /* Adjust this value to control the maximum height of the image */
  width: auto;
}

</style>