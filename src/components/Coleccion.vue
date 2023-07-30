<template>
  <div class="data-table-container">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-text-field v-model="searchQuery" label="Buscar Pokémon"></v-text-field>

        <div v-if="isLoading" class="loading-indicator">
          <p>Cargando...</p>
        </div>

        <v-data-table
          v-else-if="filteredDocumentos.length > 0 || searchQuery === ''"
          class="data-table"
          :headers="headers"
          :items="filteredDocumentos"
        >
          <template v-slot:item.image="{ item }">
            <v-avatar class="data-table-image" size="30">
              <img :src="item.image" alt="Avatar">
            </v-avatar>
          </template>
          <template v-slot:item="{ item }">
            <tr>
              <td><v-avatar size="50" class="data-table-image"><img :src="item.image" alt="Avatar"></v-avatar></td>
              <td class="small-name">{{ item.name ? item.name.toUpperCase() : '' }}</td>
            </tr>
          </template>
        </v-data-table>

        <p v-else-if="searchQuery !== ''">No se encontraron resultados.</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  data() {
    return {
      documentos: [],
      filteredDocumentos: [],
      headers: [
        { text: 'Imagen', value: 'image' },
        { text: 'Nombre', value: 'name' },
      ],
      searchQuery: '',
      isLoading: true,
      searchQuery: '',

    };
  },
  created() {
    const firebaseConfig = {
  apiKey: "AIzaSyBKCCiL36TlYdh_-QXxRsJw8zm4z2SCRtw",
  authDomain: "pokemon-7bc83.firebaseapp.com",
  projectId: "pokemon-7bc83",
  storageBucket: "pokemon-7bc83.appspot.com",
  messagingSenderId: "291971657926",
  appId: "1:291971657926:web:de2ed95e284bf607c4e7c7"
};
    firebase.initializeApp(firebaseConfig);
    this.fetchPokemon();
  },
  watch: {
    searchQuery(newQuery) {
      this.filterPokemon(newQuery);
    },
  },
  methods: {
    fetchPokemon() {
      const db = firebase.firestore();
      const collectionRef = db.collection('pokemon');

      this.isLoading = true;

      collectionRef.get().then((querySnapshot) => {
        this.documentos = [];

        if (querySnapshot.size === 0) {
          this.isLoading = false;
          return;
        }

        querySnapshot.forEach((doc) => {
          this.documentos.push({
            id: doc.id,
            image: doc.data().image,
            name: doc.data().name,
          });
        });

        this.filterPokemon(this.searchQuery); // Filtrar Pokémon inmediatamente después de cargar

        this.isLoading = false;
      }).catch((error) => {
        console.error('Error al obtener los datos:', error);
        this.isLoading = false;
      });
    },
    filterPokemon(query) {
      if (this.documentos) {
        this.filteredDocumentos = this.documentos.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
      }
    },

  async showDetails(item) {
    this.dialogVisible = true;
    this.selectedPokemon = item;
    this.pokemonDetails = await this.fetchPokemonDetails(item.id);
  },

  async fetchPokemonDetails(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
    const data = await response.json();
    return {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
    };
  },
  },
};
</script>

<style scoped>
.data-table-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  max-height: 500px !important;
  overflow-y: scroll !important;
}

.data-table {
  background: linear-gradient(-45deg, indigo, #F8BBD0, #B388FF , #6200EA);
  background-size: 400% 400%;
  animation: dynamicBackground 10s infinite;
}

@keyframes dynamicBackground {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.data-table-image {
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.data-table td {
  vertical-align: middle;
  color: black;
}

.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  font-size: 18px;
  font-weight: bold;
}
.small-name {
font-size: 12px;
}
</style>