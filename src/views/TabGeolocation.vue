<template>
    <base-layout page-title="Geolocation">
    <div class="ion-padding">
      <ion-card>
        <ion-card-header>
          <h2>Geolocation</h2>
        </ion-card-header>
        <ion-card-content>
          <div>Using Capacitor Geolocation plugin</div>
          <div class="ion-padding">
            <pre v-if="location">{{location.coords.latitude}} : {{location.coords.longitude}}</pre>
          </div>
          <ion-toolbar>
            <ion-button @click="getLocation">Get Current Location</ion-button>
          </ion-toolbar>
        </ion-card-content>
      </ion-card>

    </div>
  </base-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonToolbar } from '@ionic/vue';
import BaseLayout from '@/components/BaseLayout.vue';

export default defineComponent({
  name: "TabGeolocation",
  components: {
    IonButton, BaseLayout, IonCard, IonCardContent, IonCardHeader, IonToolbar
  },
  setup() {
    const location = ref<any | null>(null);
    const getLocation = async () => {
      console.log("got getLocation event");
      location.value = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000,
      });
      console.log("location", location.value.coords);
    };

    return {
      location,
      getLocation,
    };
  },
});
</script>