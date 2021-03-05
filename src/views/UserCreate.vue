<template>
  <base-layout page-title="Create User">
    <h1>Create New User</h1>
    <form @submit.prevent="submitForm">
      <div class="ion-padding">
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="form.name" id="name" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Username</ion-label>
          <ion-input v-model="form.username" id="username" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="form.email" id="email" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Phone</ion-label>
          <ion-input v-model="form.phone" id="phone" required></ion-input>
        </ion-item>
        <ion-button type="submit" size="large" color="secondary"> SIMPAN </ion-button>
      </div>
    </form>
  </base-layout>
</template>

<script>
import { useRouter } from 'vue-router';
import { IonItem, IonInput, IonLabel, IonButton, alertController } from '@ionic/vue';
import BaseLayout from '../components/BaseLayout';
import axios from 'axios';
export default {
 name: 'UserCreate',
 components: {
   IonItem, IonInput, IonLabel, IonButton, BaseLayout
 },
 data() {
   return {
     form: {
       name: "",
       username: "",
       email: "",
       phone: "",
     }
   }
 },
 methods: {
   async submitForm() {
     console.log('isi dari form', this.form);

     const response = await axios.post('https://jsonplaceholder.typicode.com/users', this.form)
     if (response.status > 200) {
       const successAlert = await alertController
            .create({
              header: 'Success',
              subHeader: 'Create user success!',
              buttons: ['OK'],
            });
        await successAlert.present();
        const router = useRouter();
        router.push("/tabs/user");
     } else {
        const errorAlert = await alertController
            .create({
              header: 'Failed',
              subHeader: 'Create user error!',
              buttons: ['OK'],
            });
        await errorAlert.present();
     }
   }
 }
}
</script>

<style>

</style>