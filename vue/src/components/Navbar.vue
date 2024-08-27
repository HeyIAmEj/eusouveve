<script setup>
import { ref } from 'vue'

defineProps({
msg: String,
})

const count = ref(0)
</script>

<template>
<nav class="navbar navbar-expand-lg bg-secondary" data-bs-theme="dark" >
<div class="container-fluid">
<a class="navbar-brand" href="http://eusouveve.com.br">
<a href="http://eusouveve.com.br" >
<img src="./../assets/vue.svg" class="logo vue" />
</a>
</a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
<ul class="navbar-nav me-auto mb-2 mb-lg-0">
<li class="nav-item">
<a class="nav-link active" aria-current="page" href="#">Inicio</a>
</li>
<li class="nav-item">
<a class="nav-link" href="#">Sobre mim</a>
</li>
<li class="nav-item dropdown">
<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
Projetos
</a>
<ul class="dropdown-menu">
<li><a class="dropdown-item" href="#">Projeto A</a></li>
<li><a class="dropdown-item" href="#">Projeto B</a></li>
<li><a class="dropdown-item" href="#">Projeto C</a></li>
<li><hr class="dropdown-divider"></li>
<li><a class="dropdown-item" href="#">Projeto D - (Deprecated)</a></li>
</ul>
</li>
</ul>
<div class="navbar-nav">
<div class="dropdown">
<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
Projetos
</a> 
<ul class="dropdown-menu">
<li><a class="dropdown-item" href="#">Projeto A</a></li>
<li><a class="dropdown-item" href="#">Projeto B</a></li>
<li><a class="dropdown-item" href="#">Projeto C</a></li>
<li><hr class="dropdown-divider"></li>
<li><a class="dropdown-item" href="#">Projeto D - (Deprecated)</a></li>
</ul>
</div>
</div>
</div>
</div>
</nav>
</template>

<style scoped>

</style>