<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="user" href="/tabs/user">
          <ion-icon :icon="person" />
          <ion-label>User</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/camera">
          <ion-icon :icon="camera" />
          <ion-label>Camera</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/geolocation">
          <ion-icon :icon="map" />
          <ion-label>Geolocation</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="account" href="/tabs/account">
          <ion-icon :icon="settings" />
          <ion-label>Setting</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { camera, map, person, settings } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      camera, 
      map, 
      person,
      settings,
    }
  }
}
</script>
