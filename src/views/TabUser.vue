<template>
  <base-layout page-title="User">
    <ion-fab vertical="top" horizontal="end" slot="fixed">
      <ion-fab-button href="/user/create">
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <div class="ion-padding">
      
      <h2>All User</h2>
      <ion-button @click="getUsers">Reload <ion-icon :icon="refresh" /></ion-button>

      <ion-card v-for="user in users" :key="user.id">
        <ion-item>
          <ion-icon :icon="pin" slot="start"></ion-icon>
          <ion-label>Nama: {{ user.name }}</ion-label>
          <ion-button fill="outline" slot="end" :href="'/user/detail/' + user.id">View</ion-button>
        </ion-item>

        <ion-card-content>
          {{ user.email }}
          <br/>
          {{ user.company.name }}
          <ion-icon :icon="barChartOutline" slot="start"></ion-icon>
        </ion-card-content>
      </ion-card>
    </div>
  </base-layout>
</template>

<script>
import { IonIcon, IonButton, IonCard, IonItem, IonLabel, IonCardContent, IonFab, IonFabButton } from '@ionic/vue';
import { refresh, pin, barChartOutline, add } from 'ionicons/icons';
import BaseLayout from '@/components/BaseLayout.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default  {
  name: 'TabUser',
  components: { BaseLayout, IonIcon, IonButton, IonCard, IonItem, IonLabel, IonCardContent, IonFab, IonFabButton },
  setup() {
    const router = useRouter();
    return {
      router,
      refresh,
      pin,
      barChartOutline,
      add
    };
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    ionViewDidEnter() {
      this.getUsers()
    },
    // ionViewDidLeave() {
    //   console.log('Home page did leave');
    // },
    // ionViewWillEnter() {
    //   console.log('Home page will enter');
    // },
    // ionViewWillLeave() {
    //   console.log('Home page will leave');
    // },
    async getUsers() {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      this.users = response.data;
    }
  }
}
</script>
