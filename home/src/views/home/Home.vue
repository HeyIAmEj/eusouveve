<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton color="primary"></IonMenuButton>
        </IonButtons>
        <IonTitle></IonTitle>
        <IonButtons slot="end">
          <IonIcon color="primary"></IonIcon>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" color="light">
      <q-carousel v-model="currentSlide" swipeable animated horizontal infinite arrows navigation
        :navigation-position="'bottom'" height="100%" class="text-white rounded-borders">
        <q-carousel-slide name="webBackJava" class="bg-primary column no-wrap flex-center">
          <q-icon name="coffee" size="56px" />
          <div class="text-center">
            <h4>Java</h4>
            <IonButton color="light">
              Ver projetos
            </IonButton>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="webBackPhp" class="bg-secondary column no-wrap flex-center">
          <q-icon name="php" size="56px" />
          <div class="q-mt-md text-center">
            <h4>PHP</h4>
            <IonButton color="light">
              Ver projetos
            </IonButton>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="webVue" class="bg-primary column no-wrap flex-center">
          <ion-icon :icon="icons.logoVue" style="font-size:56px!important;"></ion-icon>
          <div class="q-mt-md text-center">
            <h4>Vue</h4>
            <IonButton color="light">
              Ver projetos
            </IonButton>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="webReact" class="bg-secondary column no-wrap flex-center">
          <ion-icon :icon="icons.logoReact" style="font-size:56px!important;"></ion-icon>
          <div class="q-mt-md text-center">
            <h4>React</h4>
            <IonButton color="light">
              Ver projetos
            </IonButton>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="mobile" class="bg-primary column no-wrap flex-center">
          <q-icon name="phone_iphone" size="56px"></q-icon>
          <div class="q-mt-md text-center">
            <h4>Mobile</h4>
            <IonButton color="light">
              Ver projetos
            </IonButton>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="iot" class="bg-secondary column no-wrap flex-center">
          <q-icon name="cloud_sync" size="56px" />
          <div class="q-mt-md text-center">
            <h4>IoT</h4>
            <IonButton color="light">
              Ver projetos
            </IonButton>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </IonContent>
  </IonPage>
</template>


<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonText,
  IonButton
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import * as icons from 'ionicons/icons';

export default defineComponent({
  name: "Home",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonIcon,
    IonText,
    IonButton
  },
  props: [],
  setup(props) {
    const currentSlide = ref('webBackJava');

    return {
      icons,
      currentSlide
    }
  },
  methods: {

  },
  mounted() {

  },
  created() {

  }
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.q-carousel__slide,
.q-carousel .q-carousel--padding {
  padding: 0px !important;
}
</style>
