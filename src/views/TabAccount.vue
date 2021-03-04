<template>
  <base-layout page-title="User">
    <div class="ion-padding">
      
      <h2>Hi, {{ user?.name }}</h2>
      <ion-button color="secondary" @click="handleSignOut">
        Logout <ion-icon slot="end" :icon="logOut" />
      </ion-button>
    </div>
  </base-layout>
</template>

<script lang="ts">
import { IonIcon, IonButton } from '@ionic/vue';
import { logOut } from 'ionicons/icons';
import BaseLayout from '@/components/BaseLayout.vue';
import {mapActions, mapGetters} from "vuex";
import { useRouter } from 'vue-router';

export default  {
  name: 'TabAccount',
  components: { BaseLayout, IonIcon, IonButton },
  setup() {
    const router = useRouter();
    return {
      router,
      logOut
    };
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    async handleSignOut() {
      await this.signOut().then(() => {
        this.router.push("/login");
      });
    }
  },
  computed: {
    ...mapGetters("auth", [
      'user'
    ])
  }
}
</script>
