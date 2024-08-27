<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-avatar>
              <img alt="Foto do seu perfil" src="../assets/veve.jpg"/>
            </ion-avatar>
            <ion-list-header>Veve</ion-list-header>
            <ion-note>dev.evertonrufino@gmail.com</ion-note>

            <ion-menu-toggle v-for="(p, i) in appPages" :key="i" :auto-hide="false">
              <ion-item :class="{ selected: selectedIndex === i }" :detail="false" :router-link="p.url" class="hydrated"
                        lines="none" router-direction="root" @click="selectedIndex = i">
                <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon" aria-hidden="true"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="labels-list">
            <ion-list-header>Usuários Online</ion-list-header>

            <ion-item v-for="(user, index) in userList" :key="index" lines="none">
              <ion-icon slot="start" :ios="bookmarkOutline" :md="bookmarkSharp" aria-hidden="true"></ion-icon>
              <ion-label>{{ user.name }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts" setup>
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonAvatar,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import {ref} from 'vue';
import {
  bookmarkOutline,
  bookmarkSharp,
  flameOutline,
  flameSharp,
  homeOutline,
  homeSharp,
  mailOutline,
  mailSharp,
  starOutline,
  starSharp
} from 'ionicons/icons';
import {User} from "@/classes/User";

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Início',
    url: '/',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: 'Mensagens',
    url: '/inbox',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: 'Novidades',
    url: '/news',
    iosIcon: flameOutline,
    mdIcon: flameSharp,
  },
  {
    title: 'Favoritos',
    url: '/favs',
    iosIcon: starOutline,
    mdIcon: starSharp,
  },
];
const userList = [] as User[];

const path = window.location.pathname.split('/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}


</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
