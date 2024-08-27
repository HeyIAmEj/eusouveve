<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title></ion-title>
        <ion-buttons slot="end">
          <ion-icon color="primary"></ion-icon>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light">
      <q-carousel
      v-model="currentSlide"
      swipeable
      animated
      horizontal
      infinite
      arrows
      navigation
      :navigation-position="'bottom'"
      height="100%"
      class="text-white rounded-borders"
    >
      <q-carousel-slide name="webBackJava" class="bg-primary column no-wrap flex-center">
        <q-icon name="style" size="56px" />
        <div class="text-center">
          <h4>Java</h4>
          <IonText>
            Descrição
          </IonText>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="webBackPhp" class="bg-secondary column no-wrap flex-center">
        <q-icon name="live_tv" size="56px" />
        <div class="q-mt-md text-center">
          <h4>PHP</h4>
          <IonText>
            Descrição
          </IonText>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="webVue" class="bg-primary column no-wrap flex-center">
        <q-icon name="layers" size="56px" />
        <div class="q-mt-md text-center">
          <h4>Vue</h4>
          <IonText>
            Descrição
          </IonText>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="webReact" class="bg-secondary column no-wrap flex-center">
        <q-icon name="terrain" size="56px" />
        <div class="q-mt-md text-center">
          <h4>React</h4>
          <IonText>
            Descrição
          </IonText>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="mobileAndroidJava" class="bg-primary column no-wrap flex-center">
        <q-icon name="terrain" size="56px" />
        <div class="q-mt-md text-center">
          <h4>Android - Java</h4>
          <IonText>
            Descrição
          </IonText>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="mobileIonic" class="bg-secondary column no-wrap flex-center">
        <q-icon name="terrain" size="56px" />
        <div class="q-mt-md text-center">
          <h4>Ionic</h4>
          <IonText>
            Descrição
          </IonText>
        </div>
      </q-carousel-slide>
    </q-carousel>
    </ion-content>
  </ion-page>
</template>


<script lang="ts" setup>
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonText,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from '@ionic/vue';
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

const pageName = "Veve - Página Inicial";
const router = useRouter();

const user = {id: 1, name: "Veve"};

const currentSlide = ref('webBackJava');
const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.';
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

.q-carousel__slide, .q-carousel .q-carousel--padding{
  padding: 0px!important;
}
</style>
