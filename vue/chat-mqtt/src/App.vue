<script lang="ts">
// import HelloWorld from './components/HelloWorld.vue'

import { connect } from "mqtt/mqtt";
import { defineComponent, ref } from "vue";
import mqtt from 'mqtt'


export default defineComponent({
  setup() {
    const connection = {
      host: '138.204.234.10',
      port: 1883,
      endpoint: '/test',
      clean: true,
      connectTimeout: 4000,
      reconnectPeriod: 4000,
      clientId: 'teste',
      username: 'vue',
      password: 'vue',
    };


    const subscription = {
      topic: 'test',
      qos: 0 as 0 | 1 | 2,
    };
    const publish = {
      topic: 'test',
      qos: 0 as 0 | 1 | 2,
      payload: '{ "msg": "Hello, I am browser." }',
    };
    const receiveNews = ref("");
    const qosList = [
      { label: 0, value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
    ];
    const subscribeSuccess = ref(false);
    const client = {
      connected: false,
    };
    return {
      client,
      connection,
      subscription,
      publish,
      receiveNews,
      qosList,
      subscribeSuccess,
    };
  },
  methods: {
    createConnection() {
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`

      try {
        this.client = connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }

      this.client.on('connect', () => {
        console.log('Connection succeeded!')
      })

      this.client.on('error', error => {
        console.log('Connection failed', error)
      })

      this.client.on('message', (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message.toString());
        console.log(`Received message ${message} from topic ${topic}`)
      })
    },
    doSubscribe() {
      const { topic, qos } = this.subscription
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
      })
    },
  }
});

// <img src="/vite.svg" class="logo" alt="Vite logo" />
// <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />


</script>

<template>

</template>

<style scoped></style>
