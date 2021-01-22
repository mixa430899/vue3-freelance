<template>
  <div class="card">
    <h1>404</h1>
    <AppAlert 
      type="danger" 
      title="Страница не найдена" 
      text="На этом сайте не существует страницы с таким URL" 
    />
    <p>Здесь может быть что-то очень креативное, но ладно</p>

    <p>Вернитесь <router-link to="/">на главную</router-link>, она-то точно существует</p>
  </div>
</template>

<script>
import AppAlert from '../components/AppAlert'

export default {
  components: { AppAlert }
}
</script>