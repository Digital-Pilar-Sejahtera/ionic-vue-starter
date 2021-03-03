<template>
  <ion-content>
    <ion-page>
      <form @submit.prevent="handleLogin">
        <ion-grid>
          <ion-row color="primary" class="ion-justify-content-center">
            <ion-col class="ion-align-self-center" size="10">
              <div class="ion-text-center">
                <h2>LOGIN</h2>
              </div>
              <div class="ion-padding">
                <ion-item>
                  <ion-label position="floating">Username</ion-label>
                  <ion-input v-model="form.username" id="username" required></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="floating">Password</ion-label>
                  <ion-input type="password" v-model="form.password" id="password" required></ion-input>
                </ion-item>
              </div>
              <div class="ion-padding">
                <ion-button  size="large" type="submit" expand="block">Sign In <ion-icon slot="end" :icon="logIn"></ion-icon></ion-button>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </ion-page>
  </ion-content>
</template>

<script lang="ts">
import { IonPage, IonContent, IonItem, IonLabel, IonButton, IonInput, alertController, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/vue'
import { logIn, personAdd } from 'ionicons/icons';
import { mapActions, mapGetters } from "vuex"
import { useRouter } from 'vue-router';

export default {
  name: 'SignIn',
  components: { IonPage, IonContent, IonItem, IonLabel, IonButton, IonInput, IonIcon, IonGrid, IonRow, IonCol },
  setup() {
    const router = useRouter();
    return {
      router,
      logIn,
      personAdd
    };
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("auth", [
      "authenticating",
      "authenticationError",
      "authenticationErrorCode"
    ])
  },
  methods: {
    ...mapActions("auth", ["signIn"]),
    async handleLogin() {
      this.signIn(this.form).then(() => {
        this.form.username = ""
        this.form.password = ""
        this.router.push("/tabs/tab1")
      }).catch(async (err: any) => {
        const errorAlert = await alertController
            .create({
              header: 'Failed',
              subHeader: 'Sign in Failed',
              message: err,
              buttons: ['OK'],
            });
        await errorAlert.present()
      })
    }
  }
}
</script>
