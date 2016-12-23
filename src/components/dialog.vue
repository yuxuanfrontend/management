<style lang="css">
</style>

<template lang="html">
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background" @click="closeDialog"></div>
    <div class="modal-content">
      <div class="box">
        <slot></slot>
      </div>
    </div>
    <button class="modal-close" @click="closeDialog"></button>
  </div>
</template>

<script>
export default {
  name: 'dialog',

  data() {
    return {
    }
  },

  props: {
    isActive: {
      type: Boolean,
      required: true,
    }
  },

  methods: {
    closeDialog() {
      this.$emit('dialog-close')
    }
  }
}
</script>
