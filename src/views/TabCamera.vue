<template>
  <base-layout page-title="Camera">
    <div class="ion-padding">
      <ion-card>
        <ion-card-header>
          <h2>Camera</h2>
        </ion-card-header>
        <ion-card-content>
          <div>Using Capacitor Camera plugin</div>
          <div class="ion-padding">
            <img :src="imageUrl ? imageUrl : null" />
          </div>
          <ion-toolbar>
            <ion-button slot="start" @click="takePicture()">Ambil Gambar</ion-button>
          </ion-toolbar>
        </ion-card-content>
      </ion-card>

    </div>
  </base-layout>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonButton, IonToolbar } from '@ionic/vue';
import { Plugins, CameraSource, CameraResultType } from "@capacitor/core";
const { Camera } = Plugins;
import { defineComponent, ref } from "vue";
import BaseLayout from '@/components/BaseLayout.vue';

export default defineComponent({
  name: "TabCamera",
  components: {
    BaseLayout, IonCard, IonCardContent, IonCardHeader, IonButton, IonToolbar
  },
  setup() {
    const imageUrl = ref<string | null>();

    const takePicture = async () => {
      // Otherwise, make the call:
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Prompt,
        });
        console.log("image", image);
        // image.base64_data will contain the base64 encoded result as a JPEG, with the data-uri prefix added
        imageUrl.value = image.dataUrl;
        // can be set to the src of an image now
        console.log(image);
      } catch (e) {
        console.log("error", e);
      }
    };
    return {
      takePicture,
      imageUrl,
    };
  },
});
</script>