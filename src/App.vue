<style lang="scss">

</style>

<template>
  <div id="app" class="">
    <!-- <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><router-link :to="{path: '/authenticate'}">托管鉴定</router-link></li>
            <li><router-link :to="{path: '/storage-out'}">发运出库</router-link></li>
          </ul>
        </div>
      </div>
    </nav> -->
    <nav class="nav has-shadow vm-nav-container">
      <div class="nav-left">
        <router-link class="nav-item" :to="{path: '/authenticate'}">托管鉴定</router-link>
        <router-link class="nav-item" :to="{path: '/storage-lcl'}">拼箱入库</router-link>
      </div>
    </nav>

    <section class="section">
      <router-view></router-view>

    </section>

    <notification></notification>

  </div>
</template>

<script>

import notification from './components/notification'

export default {
  name: 'app',
  components: {
    notification
  },
}
</script>
