<template>
    <v-footer dark padless>
    <v-card flat tile class="black white--text py-12 px-5" width="100%">
    <v-row>
    <v-col cols="12" xs="12" sm="6" md="4" class="pa-16">
        <v-toolbar color="transparent" flat>
        <v-badge color="#D5F0DB" dot>
    <v-img src="pokedex.png" contain width="100"></v-img>
        </v-badge>
        </v-toolbar>
        <v-card-text class="pt-0">
            <v-btn v-for="icon in icons" :key="icon" class="mx-1 white--text" icon fab outlined small>
            <v-icon size="20px">
                {{ icon }}
            </v-icon>
            </v-btn>
        </v-card-text>
    </v-col>
    <v-col cols="12" xs="12" sm="6" md="2">
        <v-card-text class="white--text pt-0">
            <h3>Acerca de </h3>
        </v-card-text>
        <v-card-text class="grey--text">Como funciona</v-card-text>
        <v-card-text class="grey--text mt-n4">Nuestros Programas</v-card-text>
        <v-card-text class="grey--text">Promocion</v-card-text>
        <v-card-text class="grey--text">Referi a un amigo</v-card-text>
    </v-col>
    <v-col cols="12" xs="12" sm="6" md="2">
        <v-card-text class="white--text pt-0">
            <h3> Pokemones </h3>
        </v-card-text>
        <v-card-text class="grey--text mt-n4">Metodos de pago</v-card-text>
        <v-card-text class="grey--text">Promociones</v-card-text>
        <v-card-text class="grey--text">Devoluciones</v-card-text>
    </v-col>
    <v-col cols="12" xs="12" sm="6" md="2">
        <v-card-text class="white--text pt-0">
            <h3>Contacto </h3>
        </v-card-text>
        <v-card-text class="grey--text">pokemon@gmail.com</v-card-text>
        <v-card-text class="grey--text mt-n4">011-1525351941</v-card-text>
    </v-col>
    </v-row>
    </v-card>
    </v-footer>
    </template>
    
    <script>
    
    
    export default{
        data: () =>({
            icons:[
           "fab fa-apple",
           "fab fa-google-plus-g",
           "fab fa-twitter",
           "fab fa-facebook-f"
            ]
        }),
    }
    </script>
    