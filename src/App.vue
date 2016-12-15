<style lang="scss">

</style>

<template>
  <div id="app" class="container">
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><router-link :to="{path: '/authenticate'}">托管鉴定</router-link></li>
            <li><a href="">Link</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
}
</script>
