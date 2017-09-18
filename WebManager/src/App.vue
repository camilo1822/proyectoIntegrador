<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import FooterBar from '@/components/FooterBar'
export default {
  name: 'app',
  components: { Navbar, FooterBar }
}
</script>

<style>

</style>
