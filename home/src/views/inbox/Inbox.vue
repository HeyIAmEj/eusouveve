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

        <IonContent :fullscreen="true" color="success">
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
import { defineComponent } from 'vue';


export default defineComponent({
    name: "Inbox",
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

        return {

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