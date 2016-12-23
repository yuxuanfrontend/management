<style lang="scss">
</style>

<template lang="html">
  <div>
    <div class="vm-vertical-block">
      <button type="button" class="button is-primary">新单据</button>
      <button type="button" class="button is-primary" @click="selectBoxes">选择总仓箱号</button>
      <button type="button" class="button is-primary">保存</button>
      <button type="button" class="button is-primary">打印提货单</button>
    </div>

    <div class="columns is-multiline">
      <div class="control column is-1">
        <label class="label">调拨单号</label>
        <input type="text" class="input">
      </div>
      <div class="control column is-1">
        <label class="label">提货车牌号</label>
        <input type="text" class="input">
      </div>
      <div class="control column is-1">
        <label class="label">交接人</label>
        <input type="text" class="input">
      </div>
      <div class="control column is-1">
        <label class="label">提货人</label>
        <input type="text" class="input">
      </div>
      <div class="control column is-1">
        <label class="label">登记日期</label>
        <input type="text" class="input">
      </div>
      <div class="control column is-1">
        <label class="label">车辆铅封条</label>
        <input type="text" class="input">
      </div>
      <div class="control column is-1">
        <label class="label">出仓仓库</label>
        <div class="select is-fullwidth">
          <select class="">
            <option>仓库1</option>
            <option>仓库2</option>
          </select>
        </div>
      </div>
    </div>

    <table-editable class="box" :titles="tableTitles" :data="boxes" :editable-key="editableKey"></table-editable>

    <storage-out-dialog></storage-out-dialog>
  </div>
</template>

<script>

import storageOutDialog from './storage-out-dialog'

import tableEditable from '../../components/table-editable'

export default {
  name: 'storage-out',
  data() {
    return {
      boxes: [
        {
          boxId: '001',
          tranformId: '001',
          collectionCode: '001',
          collectionName: 1,
          amount: 111,
          isTaken: true,
        },
        {
          boxId: '001',
          tranformId: '001',
          collectionCode: '001',
          collectionName: 1,
          amount: 111,
          isTaken: true,
        },
        {
          boxId: '001',
          tranformId: '001',
          collectionCode: '001',
          collectionName: 1,
          amount: 111,
          isTaken: true,
        },
        {
          boxId: '001',
          tranformId: '001',
          collectionCode: '001',
          collectionName: 1,
          amount: 111,
          isTaken: true,
        },
        {
          boxId: '001',
          tranformId: '001',
          collectionCode: '001',
          collectionName: 1,
          amount: 111,
          isTaken: true,
        },
      ],

      tableTitles: ['箱号', '流转单号', '藏品代码', '藏品名称', '件数', '提货'],
      editableKey: ['collectionName', 'amount']
    }
  },

  mounted() {
  },

  methods: {
    selectBoxes() {
      this.$store.commit('toggleSelectBoxesDialog')
    },
  },

  components: {
    storageOutDialog,
    tableEditable
  }
}
</script>
