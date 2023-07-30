<template>
  <v-container fluid>
    <v-row justify="center" class="cards-row" :class="{ 'show-all-cards': showAllCards }">
      <v-col v-for="(card, index) in cards" :key="index" cols="4" sm="3" md="2">
        <v-card :class="['found-card', 'flat-card', 'transparent-card', {'flipped': card.flipped}]" @click="flipCard(index)" class="mb-9">
          <div class="card-front"><span class="material-symbols-outlined">playing_cards</span></div>
          <div class="card-back" :style="{ backgroundImage: `url(${card.image})` }"></div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VContainer, VRow, VCol, VCard, VBtn } from 'vuetify/lib';

export default {
  components: {
    VContainer,
    VRow,
    VCol,
    VCard,
    VBtn,
  },
  data() {
    return {
      cards: [],
      flippedCards: [],
      showAllCards: true,
      userCoins: 100,
    };
  },
  created() {
    this.fetchPokemons();
    this.$root.$on('user-coins-updated', coins => {
      this.userCoins = coins;
    });
  },
  methods: {
    fetchPokemons() {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=8') // Fetch data for 8 Pokémon
        .then(response => response.json())
        .then(data => {
          const pokemons = data.results;
          this.cards = pokemons.flatMap(pokemon => [
            {
              name: pokemon.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
              found: false,
              flipped: true, 
            },
            {
              name: pokemon.name,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
              found: false,
              flipped: true, 
            }
          ]);
          this.shuffleCards();

          // Remove the last four cards from the `cards` array
          this.cards.splice(-4);

          setTimeout(() => {
            this.flipAllCards(); 
            setTimeout(() => {
              this.flipAllCards(); 
            }, 911110000000); 
          }, 3000); 
        })
        .catch(error => console.log(error));
    },
    flipAllCards() {
      this.cards.forEach(card => {
        card.flipped = !this.showAllCards;
      });
      this.showAllCards = !this.showAllCards;
    },
    shuffleCards() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    },
      flipCard(index) {
        if (this.flippedCards.length === 2 || this.cards[index].found) {
          return;
        }
        if (!this.flippedCards.includes(index)) {
          this.flippedCards.push(index);
        }
        this.cards[index].flipped = true;
        if (this.flippedCards.length === 2) {
          const [card1Index, card2Index] = this.flippedCards;
          const card1 = this.cards[card1Index];
          const card2 = this.cards[card2Index];
          if (card1.name === card2.name) {
            card1.found = true;
            card2.found = true;
            this.$root.$emit('user-coins-updated', this.userCoins + 50); // Incrementa 50 monedas, puedes ajustar esto según tus preferencias
        this.resetFlippedCards();
          } else {
            setTimeout(() => {
              this.unflipCards(card1Index, card2Index);
              this.resetFlippedCards();
            }, 1000);
          }
        }
      },
      unflipCards(card1Index, card2Index) {
        this.cards[card1Index].flipped = false;
        this.cards[card2Index].flipped = false;
      },
      resetFlippedCards() {
        this.flippedCards = [];
      },
      updateCoins(coins) {
      this.$root.$emit('user-coins-updated', coins);
    },
    },
  }
  </script>

  <style>
  .center{
    margin-left: 500px;
  }
 .flat-card {
  padding: 0 !important; 
}

.card-front,
.card-back {
  width: 100%;
  height: 150px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 4px;
  transition: transform 0.3s;
}

.card-front {
  position: absolute;
  transform: rotateY(0);
  backface-visibility: hidden;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0));
  text-align: center;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 420px; 
  transform-style: preserve-3d;
}
.card-front .material-symbols-outlined {

  transform: scale(2); 
}

.card-back {
  transform: rotateY(180deg);
  backface-visibility: hidden;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0));
  transform-style: preserve-3d;
  background-size: cover;
}

.transparent-card {
  background-color: transparent !important;
}

.flipped .card-front {
  transform: rotateY(180deg);
}

.flipped .card-back {
  transform: rotateY(0);
  background-size: cover;
 

}

.cards-row {
  display: flex;
  justify-content: center;
}

.signo {
  font-size: 90px;
}
.show-all-cards .card-front {
  transform: rotateY(180deg);
}

.show-all-cards .card-back {
  transform: rotateY(0);
}

</style>