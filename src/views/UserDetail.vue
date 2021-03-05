<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button>Back</ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h2>Ini Halaman user detail</h2>
      <hr/>
      <ion-text color="danger">
        <h3>Name: {{ user.name }}</h3>
      </ion-text>
      
      <ion-text color="primary">
        <h3>Username: {{ user.username }}</h3>
      </ion-text>

      <ion-text color="secondary">
        <h3>Email: {{ user.email }}</h3>
      </ion-text>

      <ion-text color="dark">
        <h3>Phone: {{ user.phone }}</h3>
      </ion-text>
      <ion-back-button></ion-back-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonText, IonPage, IonBackButton, IonHeader, IonToolbar, IonButtons } from '@ionic/vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'UserDetail',
  components: {
    IonText, IonPage, IonBackButton
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    ionViewDidEnter() {
      const route = useRoute();
      const { id } = route.params;
      console.log(route);
      console.log('id user adalah', id);
      this.getUser(id)
    },
    async getUser(id) {
      console.log('getuser')
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/' + id)
      this.user = response.data;
    }
  }
  
}
</script>

<style>

</style>