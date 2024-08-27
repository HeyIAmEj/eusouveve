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

    <IonContent :fullscreen="true" color="light" class="ion-padding">
      <div class="ion-padding">
        <q-timeline color="secondary">
          <q-timeline-entry heading>
            Sobre mim
          </q-timeline-entry>

          <q-timeline-entry>
            <template v-slot:title>
              Introdução
            </template>
            <template v-slot:subtitle>
              Introdução
            </template>

            <div>
              Olá, me chamo Everton Rufino, também conhecido como Veve, sinta-se a vontade para me chamar como quiser.
            </div>
            <div>
              Resolvi falar um pouco sobre mim, na pegada timeline. Então se prepare que lá vem história.
            </div>
          </q-timeline-entry>

          <q-timeline-entry>
            <template v-slot:title>
              Tópicos
            </template>
            <template v-slot:subtitle>
              Tópicos
            </template>

            <div>
              <ol>
                <li v-for="items in listOfItems">{{ items.title }}</li>
              </ol>
            </div>
          </q-timeline-entry>

          <q-timeline-entry heading>
            Vamos lá!
          </q-timeline-entry>

          <q-timeline-entry v-for="items in listOfItems">
            <template v-slot:title>
              {{ items.title }}
            </template>
            <template v-slot:subtitle>
              {{ items.date }}
            </template>

            <div v-html="items.content">

            </div>
          </q-timeline-entry>
        </q-timeline>
      </div>
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
  IonText
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "About",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonIcon,
    IonText
  },
  props: [],
  setup(props) {
    const currentSlide = ref('webBackJava');

    const listOfItems = [
      { id: 1, title: "Meu primeiro computador", date: "Desconhecido", content: "" },
      { id: 2, title: "Minha primeira linguagem backend", date: "Desconhecido", content: "" },
      { id: 3, title: "IoT", date: "Desconhecido", content: "" },
      { id: 4, title: "App Mobile Season 1", date: "Desconhecido", content: "" },
      { id: 5, title: "Python Boy?", date: "Desconhecido", content: "" },
      { id: 6, title: "Java Boy!", date: "Desconhecido", content: "" },
      { id: 7, title: "Backend only please!", date: "Desconhecido", content: "" },
      { id: 8, title: "Ih, até que frontend é legal...", date: "Desconhecido", content: "" },
      { id: 9, title: "Vou explorar mais...", date: "Desconhecido", content: "" },
      { id: 10, title: "App Mobile Season 2", date: "Desconhecido", content: "" },
      { id: 11, title: "DevOps?!", date: "Desconhecido", content: "" },
    ];
    listOfItems[0].content = `[História do meu primeiro computador]`;
    listOfItems[1].content = `[História da minha primeira linguagem backend]`;
    listOfItems[2].content = `[História do IoT]`;
    listOfItems[3].content = `[História do App Mobile Season 1]`;
    listOfItems[4].content = `[História do Python Boy]`;
    listOfItems[5].content = `[História do Java Boy]`;
    listOfItems[6].content = `[História do Backend only please!]`;
    listOfItems[7].content = `[História do Ih, até que frontend é legal.]`;
    listOfItems[8].content = `[História do Vou explorar mais...]`;
    listOfItems[9].content = `[História do App Mobile Season 2...]`;
    listOfItems[10].content = `[História do DevOps?!...]`;

    return {
      listOfItems,
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
