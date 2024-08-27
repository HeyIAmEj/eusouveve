<script>
import Navbar from '/src/components/Navbar.vue';
export default {
name: 'App',
components: {
  Navbar
},
setup(){

},
};

</script>

<template>
<Navbar msg="Vite + Vue" />
<div class="container d-flex justify-content-center">
<h1>This is Vue :)</h1>
</div>
</template>

<style>
#app {
  margin: 0px!important;
  padding: 0px!important;
  height: 100vh!important;
  width: 100vw!important;

}
</style>