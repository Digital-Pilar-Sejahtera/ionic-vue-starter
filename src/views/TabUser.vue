<template>
  <base-layout page-title="User">
    <div class="ion-padding">
      
      <h2>All User</h2>
      <ion-button>Reload <ion-icon :icon="refresh" /></ion-button>
    </div>
  </base-layout>
</template>

<script lang="ts">
import { IonIcon, IonButton } from '@ionic/vue';
import { refresh } from 'ionicons/icons';
import BaseLayout from '@/components/BaseLayout.vue';
import { useRouter } from 'vue-router';

export default  {
  name: 'TabUser',
  components: { BaseLayout, IonIcon, IonButton },
  setup() {
    const router = useRouter();
    return {
      router,
      refresh
    };
  },
  methods: {
    ionViewDidEnter() {
      console.log('Home page did enter');
    },
    ionViewDidLeave() {
      console.log('Home page did leave');
    },
    ionViewWillEnter() {
      console.log('Home page will enter');
    },
    ionViewWillLeave() {
      console.log('Home page will leave');
    },
  }
}
</script>
