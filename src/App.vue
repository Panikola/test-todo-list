<template lang="pug">
  div#app
    div#nav
      router-link(:to="{name: routeName}") {{ text }}
    router-view
</template>
<script>
export default {
  name: "App",
  computed: {
    route() {
      return this.$route.path;
    },
    routeName() {
      return this.route === "/" ? "create" : "home";
    },
    text() {
      return this.route === "/" ? "Создать задачу" : "Вернутся к списку";
    }
  }
};
</script>
<style lang="sass">
//global styles
@import "sass/variables"
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

#nav
  padding: 30px 0

a
  font-weight: bold
  color: #2c3e50

input, button, textarea, select
  font-family: inherit
  color: inherit
</style>
