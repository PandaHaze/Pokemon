<template>
 <v-app-bar app color="red" flat>
      <v-toolbar-items class="mr-auto">
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
      <ul>
      <li class="card-textt mr-4" :class="coinClass">{{ userCoins }}</li>
    </ul>
      <img
        class="custom-image"
        src="pokecoin.png"
        height="50"
      />
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
 .coin-high {
      color: #FFEA00;
    }
  
    .coin-medium {
      color: #424242;
    }
  
    .coin-low {
      color: black;
    }
    .card-textt {
    font-size: 25px;
    list-style-type: none; 
  }
</style>