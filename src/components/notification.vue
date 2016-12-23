<style lang="scss">
  .notification {
    width: 60%;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 9999;
  }
</style>

<template lang="html">
  <div class="notification" :class="[status]" v-if="isShow">
    {{content}}
  </div>
</template>

<script>
export default {
  computed: {
    content() {
      return this.$store.state.notification.content
    },

    isShow() {
      return this.$store.state.notification.isShow
    },

    status() {
      return this.$store.state.notification.status
    }
  }
}
</script>
