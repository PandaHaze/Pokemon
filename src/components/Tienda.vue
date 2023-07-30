<template>
  <div class="card-container mx-auto mt-3">
    <div v-if="loading" class="loader-container">
      <v-progress-circular :size="70" color="#FFEA00" indeterminate></v-progress-circular>
    </div>

    <div v-else>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="pokemon in pokemonList"
            :key="pokemon.id"
          >
            <v-card
              class="animated-background card-color-animation"
              :class="getCardTypeClass(pokemon)"
            >
              <v-img
                :src="getPokemonImageUrl(pokemon)"
                :alt="pokemon.name"
                class="card-image"
                :aspect-ratio="1"
                contain
              ></v-img>
              <v-card-text :class="getCardTypeClass(pokemon)">
                <h5 class="card-title">{{ pokemon.name }}</h5>
                <p class="card-text">Tipo: {{ pokemon.types.join(', ') }}</p>
                <p class="card-text">Precio: {{ pokemon.price }} coins</p>
                <div class="text-center d-flex align-center justify-space-around">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn class="add-to-collection-button" @click="showModal(pokemon)" v-on="on">
                        <span class="material-symbols-outlined">tips_and_updates</span>
                      </v-btn>
                    </template>
                    <span>Información del Pokémon</span>
                  </v-tooltip>
                  <v-btn
                    class="buy-button"
                    @click="buyPokemon(pokemon)"
                    :disabled="pokemon.price > userCoins || purchasedPokemon.has(pokemon.id)"
                  >
                    Comprar
                  </v-btn>
                </div>
              </v-card-text>

              <!-- Agregar el v-alert específico para cada Pokémon -->
              <v-alert
                v-if="pokemon.showAlert"
                :value="pokemon.showAlert"
                :type="pokemon.alertType"
                dismissible
                @input="pokemon.showAlert = false"
              >
                {{ pokemon.alertMessage }}
              </v-alert>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>


    <v-dialog v-if="selectedPokemon" v-model="dialog" max-width="500px">
  <v-card :class="getCardTypeClass(selectedPokemon)">
    <div class="modal-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <p class="mt-5 ml-2 text-uppercase"><b>Habilidad:</b> {{ selectedPokemon.hability }}</p>
            <p class="ml-2 mt-2 text-uppercase"><b>HP:</b> {{ selectedPokemon.hp }}</p>
            <p class="ml-2 mt-2 text-uppercase"><b>Attack:</b> {{ selectedPokemon.attack }}</p>
            <p class="ml-2 mt-2 text-uppercase"><b>Defense:</b> {{ selectedPokemon.defense }}</p>
          </div>
          <div class="col-md-6 mt-5">
            <h4 class="text-uppercase ml-11">{{ selectedPokemon.name }}</h4>
            <v-img :src="selectedPokemon.image" max-width="70%" height="auto"></v-img>
          </div>
        </div>
        <v-btn class="buy-button mb-2 ml-2" text @click="dialog = false">Cerrar</v-btn>
      </div>
    </div>
  </v-card>
</v-dialog>

  </div>
</template>

  
  
  <script>
  import { db } from '../main';
  
  
  export default {
  data() {
    return {
      loading: true,
      pokemonList: [],
      selectedPokemon: null,
      showPokemonInfo: false,
      types: ['grass', 'poison', 'fire', 'flying', 'water', 'ice', 'psychic', 'bug', 'electric', 'steel', 'ground', 'fighting', 'rock', 'fairy', 'normal', 'ghost'],
      selectedTypes: [], 
      userCoins: 100,
      dialog: false,
      purchasedPokemon: new Set(),
      
    };
  },
  computed: {
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
  mounted() {
  this.fetchPokemon();
  this.$root.$on('user-coins-updated', this.updateUserCoins); 
},
  methods: {
    updateUserCoins(coins) {
    this.userCoins = coins;
  },
  showModal(pokemon) {
      this.selectedPokemon = pokemon;
      this.dialog = true;
      this.show = false
    },
    fetchPokemon() {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then((response) => response.json())
    .then((data) => {
      const promises = data.results.map((pokemon) => {
        const pokemonId = pokemon.url.split('/')[6];
        return fetch(pokemon.url)
          .then((response) => response.json())
          .then((data) => ({
            id: pokemonId, 
            name: data.name,
            types: data.types.map((type) => type.type.name),
            hp: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
            attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
            defense: data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`, // Usar el ID para obtener la imagen
            position: { x: 0, y: 0 },
            price: Math.floor(Math.random() * 100) + 1,
          }));
      });
      return Promise.all(promises);
    })
    .then((pokemonList) => {
      this.pokemonList = pokemonList;
      this.loading = false;
    })
    .catch((error) => {
      console.error(error);
      this.loading = false;
    });
},
    getPokemonImageUrl(pokemon) {
      return pokemon.image;
    },
    zoomIn(event) {
      event.currentTarget.classList.add('zoomed');
    },
    zoomOut(event) {
      event.currentTarget.classList.remove('zoomed');
    },
    getCardTypeClass(pokemon) {
      if (pokemon && pokemon.types) {
        const types = pokemon.types;
      if (types.includes('grass') && types.includes('poison')) {
        return 'card-type-grass-poison card-wave-animation';
      } else if (types.includes('fire') && types.includes('flying')) {
        return 'card-type-fire-flying card-wave-animation';
      } else if (types.includes('fire')) {
        return 'card-type-fire card-wave-animation';
      } else if (types.includes('water')) {
        if (types.includes('ice')) {
          return 'card-type-water-ice card-wave-animation';
        } else if (types.includes('psychic')) {
          return 'card-type-water-psychic card-wave-animation';
        } else {
          return 'card-type-water card-wave-animation';
        }
      } else if (types.includes('bug') && types.includes('poison')) {
        return 'card-type-bug-poison card-wave-animation';
      } else if (types.includes('electric')) {
        if (types.includes('steel')) {
          return 'card-type-electric-steel card-wave-animation';
        } else {
          return 'card-type-electric card-wave-animation';
        }
      } else if (types.includes('poison')) {
        return 'card-type-poison card-wave-animation';
      } else if (types.includes('ground')) {
        return 'card-type-ground card-wave-animation';
      } else if (types.includes('psychic')) {
        return 'card-type-psychic card-wave-animation';
      } else if (types.includes('fighting')) {
        return 'card-type-fighting card-wave-animation';
      } else if (types.includes('rock') && types.includes('ground')) {
        return 'card-type-rock-ground card-wave-animation';
      } else if (types.includes('fairy')) {
        return 'card-type-fairy card-wave-animation';
      } else if (types.includes('normal') && types.includes('flying')) {
        return 'card-type-normal-flying card-wave-animation';
      } else if (types.includes('ghost') && types.includes('poison')) {
        return 'card-type-ghost-poison card-wave-animation';
      } else if (types.includes('bug')) {
        return 'card-type-bug card-wave-animation';
      } else if (types.includes('normal')) {
        return 'card-type-normal card-wave-animation';
      } else {
        return '';
      }
    }
    },
    openPokemonInfo(pokemon) {
      this.selectedPokemon = pokemon;
      this.showPokemonInfo = true;
    },
    buyPokemon(pokemon) {
      if (pokemon.price <= this.userCoins) {
        db.collection('pokemon')
          .add({
            name: pokemon.name,
            types: pokemon.types,
            image: pokemon.image,
          })
          .then(() => {
            // Agregar propiedades showAlert, alertType, y alertMessage al Pokémon comprado
            pokemon.showAlert = true;
            pokemon.alertMessage = 'Compra Exitosa!';
            pokemon.alertType = 'success';

            this.userCoins -= pokemon.price;
            this.purchasedPokemon.add(pokemon.id);
            this.$root.$emit('user-coins-updated', this.userCoins);
          })
          .catch((error) => {
            console.error('Error al guardar el Pokémon en Firestore:', error);
          });
      } else {
        // Agregar propiedades showAlert, alertType, y alertMessage al Pokémon que no se pudo comprar
        pokemon.showAlert = true;
        pokemon.alertMessage = 'No tienes suficientes monedas para comprar este Pokémon.';
        pokemon.alertType = 'error';
      }
},
    showAlert(message, type) {
      this.alertMessage = message;
      this.alertType = type;
      this.alertVisible = true;
    },
    showModal(pokemon) {
      this.selectedPokemon = pokemon;
      this.selectedPokemonType = this.getCardTypeClass(pokemon);
      this.dialog = true;
      this.show = false;
    },
  },
};
  </script> 
  
    <style>
    .card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive grid with a minimum of 250px per column */
  gap: 1rem;
  justify-items: center;
  background: linear-gradient(to bottom, #F2F2F2, #D9D9D9);
  max-height: 1020px; 
  overflow-y: auto;
}
    .card {
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: 0.3s ease;
      cursor: pointer;
      margin-top: 25px;
      margin-left: 15px;
      margin-right: 15px;
      position: relative;
      transform-style: preserve-3d;
      transition: background-color 0.3s;
    }
  
    .card.zoomed {
      transform: scale(1.1);
    }
  
    .card-image {
      width: 100%;
      height: 300px; 
      object-fit: cover;
    }
  
    .card-body {
      padding: 1rem;
      animation: waveAnimation 2s linear infinite;
    }
  
    .card-title {
      font-size: 20px;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      color: white;
    }
  
    .card-text {
      font-size: 12px;
      text-transform: uppercase;
      color: white;
    }
  
    .card-type-grass-poison {
      background: linear-gradient(to bottom right, black, lightgreen);
      animation: gradientAnimation 5s linear infinite;
    }
  
    .card-type-fire {
      background: linear-gradient(to bottom right, red, orange);
    }
  
    .card-type-fire-flying {
      background: linear-gradient(to bottom right, red, white);
    }
  
    .card-type-water {
      background: linear-gradient(to bottom right, #90CAF9, #E3F2FD);
    }
  
    .card-type-water-ice {
      background: linear-gradient(to bottom right, #b3e0ff, white);
    }
  
    .card-type-water-psychic {
      background: linear-gradient(to bottom right, #56b4ff, #6f1490);
    }
  
    .card-type-bug-poison {
      background: linear-gradient(to bottom right, lightgreen, indigo);
    }
  
    .card-type-electric {
      background: linear-gradient(to bottom right, #2b298c, white);
    }
  
    .card-type-electric-steel {
      background: linear-gradient(to bottom right, #2b298c, gray);
    }
  
    .card-type-poison {
      background: linear-gradient(to bottom right, indigo, lightgreen);
    }
  
    .card-type-ground {
      background: linear-gradient(to bottom right, grey, #795548);
    }
  
    .card-type-psychic {
      background: linear-gradient(to bottom right, #2b298c, #00E676);
    }
  
    .card-type-fighting {
      background: linear-gradient(to bottom right, red, blue);
    }
  
    .card-type-rock-ground {
      background: linear-gradient(to bottom right, #795548, gray);
    }
  
    .card-type-fairy {
      background: linear-gradient(to bottom right, #FF4081, pink);
    }
  
    .card-type-normal-flying {
      background: linear-gradient(to bottom right, grey, white);
    }
  
    .card-type-ghost-poison {
      background: linear-gradient(to bottom right, purple, indigo);
    }
  
    .card-type-bug {
      background: linear-gradient(to bottom right, lightgreen, #8BC34A);
    }
  
    .card-type-normal {
      background: linear-gradient(to bottom right, grey, #424242);
    }
  
    .loader-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      margin-top: 200px;
    }
  
    .add-to-collection-button {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      color: white;
    }
  
    .buy-button {
      margin-top: 10px;
      background-color: white;
      border: none;
      color: #000;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-right: 70px;
    }
  
    .pokemon-info-container {
      position: fixed;
      top: 50%;
      left: 49%;
      transform: translate(-50%, -50%);
      padding: 90px;
      border: 1px solid #000;
      border-radius: 10px;
      margin: 20px;
  
    }
  
    .pokemon-info-container h3 {
      font-size: 24px;
      margin-bottom: 10px;
    text-transform: uppercase;
    }
  
    .pokemon-info-container p {
      font-size: 18px;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
  
    .pokemon-info-container .pokemonImage {
      width: 200px;
      height: 200px;
      object-fit: cover;
      margin-bottom: 10px;
      align-items: center;
    }
  
    .close-button {
      border: none;
      color: #000;
      font-size: 16px;
      cursor: pointer;
      padding: 10px 15px;
      border-radius: 5px;
      margin-top: 50px;
    }
  
    .card:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%);
      background-size: 50px 50px;
      z-index: -1;
      pointer-events: none;
      opacity: 0;
      animation: animateWater 10s linear infinite;
    }
  
    @keyframes animateWater {
      0% {
        background-position: 0 0;
        opacity: 1;
      }
      40%, 60% {
        background-position: 50px 50px;
        opacity: 0;
      }
      100% {
        background-position: 0 0;
        opacity: 1;
      }
    }
    .card:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%);
      background-size: 200% 200%; /* Aumenta el tamaño del fondo */
      z-index: -1;
      pointer-events: none;
      opacity: 0;
    }
  
    @keyframes animateWater {
      0% {
        background-position: 0 0;
        opacity: 1;
      }
      40%, 60% {
        background-position: 200% 200%; 
        opacity: 0;
      }
    }
    .card-textt{
      font-size: 18px;
      text-transform: uppercase;
      margin-top: 7px;
  
    }
  
    .add-to-collection-button:hover .tooltip-text {
      visibility: visible;
      opacity: 1;
    }
    .custom-alert {
  position: fixed;
  top: 20px;
  right: 20px;
  max-width: 200px; 
}
.card-container-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh; 
}
.custom-size{
  width: 90%; 
}
.card-image {
  width: 100%;
  height: 200px; /* Set the desired height for the cards' images */
  object-fit: cover;
}

</style>

