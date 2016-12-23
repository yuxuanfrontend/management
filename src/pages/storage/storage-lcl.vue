<style lang="scss">
</style>

<template lang="html">
  <div>
    <div style="font-size: 28px;">拼箱入库登记</div>
    <div class="vm-vertical-block">
      <button type="button" class="button is-primary" @click="newForm">新单据</button>
      <button type="button" class="button is-primary" @click="selectBoxes">选择总仓箱号</button>
      <button type="button" class="button is-primary" @click="save">保存</button>
      <button type="button" class="button is-primary">打印提货单</button>
    </div>

    <div class="columns is-multiline" v-if="">
      <div class="column is-2">
        <label class="label">拼箱号</label>
        <div class="control has-addons">
          <input type="text" class="input is-expanded" placeholder="查询拼箱号" v-model="lclId">
          <button class="button" @click="queryForm">查询</button>
        </div>
      </div>
      <!-- <div class="control column is-1">
        <label class="label">入库单号</label>
        <input type="text" class="input is-disabled" readonly :value="inWareId">
      </div> -->
      <div class="control column is-1">
        <label class="label">出库单号</label>
        <input type="text" class="input is-disabled" readonly :value="outWareId">
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="control column is-1">
        <label class="label">铅封号1</label>
        <input type="text" class="input" v-model="sealId1">
      </div>
      <div class="control column is-1">
        <label class="label">铅封号2</label>
        <input type="text" class="input" v-model="sealId2">
      </div>
      <div class="control column is-2">
        <label class="label">登记日期</label>
        <input type="text" class="input is-disabled" readonly v-model="registerTime">
      </div>
      <div class="control column is-2">
        <label class="label">入库仓库</label>
        <div class="select is-fullwidth">
          <select v-model="selectWarehouse">
            <option v-for="warehouse in warehouses" :value="warehouse.id">{{warehouse.name}}</option>
          </select>
        </div>
      </div>
      <div class="control column is-1">
        <label class="label">合格数量</label>
        <input type="text" class="input is-disabled" readonly :value="qualifiedAmount">
      </div>
    </div>

    <div class="columns is-multiline">
      <div class="control column is-2">
        <label class="label">艺术品代码</label>
        <div class="control has-addons">
          <input type="text" class="input is-expanded" placeholder="查询艺术品" v-model="artworkCode">
          <button class="button" @click="queryArtwork">查询</button>
        </div>
      </div>
      <div class="control column is-2">
        <label class="label">艺术品名称&最小单位</label>
        <div class="control has-addons">
          <input type="text" class="input is-expanded is-disabled" readonly v-model="artworkName">
          <input type="text" class="input is-disabled" readonly v-model="artworkUnit">
        </div>
      </div>
    </div>

    <table-editable class="box" :titles="tableTitles" :data="boxes" :is-delete="true" @delete-line="deleteBoxes"></table-editable>

    <storage-lcl-dialog></storage-lcl-dialog>
  </div>
</template>

<script>

import _ from 'lodash'
import moment from 'moment'

import storageLclDialog from './storage-lcl-dialog'

import tableEditable from '../../components/table-editable'

export default {
  name: 'storage-lcl',
  data() {
    return {
      formId: null,
      lclId: '',
      inWareId: '',
      outWareId: '',

      sealId1: '1111',
      sealId2: '2222',
      registerTime: '2016-12-13 14:00:00',
      // qualifiedAmount: 100,

      isModify: true,


      tableTitles: ['箱号', '流转单号', '藏品代码', '藏品名称', '件数', '提货'],
      // editableKey: ['collectionName', 'amount'],

      warehouses: [],
      selectWarehouse: 1,
      artworkCode: '',
      artworkName: '',
      artworkUnit: '',
    }
  },

  computed: {
    boxes() {
      return this.$store.state.warehouse.selectedBoxTable
    },

    qualifiedAmount() {
      return _.reduce(this.boxes, (sum, value) => {
        return sum + value.checkAqty
      }, 0)
    }
  },

  mounted() {
    this.$request('get', 'warehouse-inrpc/warehouse/store/query')
    .then((res) => {
      if (res.body.errorCode !== '000') {
        alert('error')
      }

      this.warehouses = res.body.dto
    })
  },

  methods: {
    newForm() {
      this.isModify = false
      this.formId = null
      this.sealId1 = ''
      this.sealId2 = ''
      this.selectWarehouse = '',
      // this.qualifiedAmount = '',
      this.registerTime = moment().format('YYYY-MM-DD HH:mm:ss')
      this.artworkCode = ''
      this.artworkName = ''
      this.artworkUnit = ''

      this.$store.commit('clearSelectedBoxTable')
    },

    selectBoxes() {
      this.$store.commit('toggleSelectBoxesDialog')
    },

    queryArtwork: _.debounce(function() {
      if (this.artworkCode === '') {
        return false
      }
      this.ajaxArtwork()
    }, 500),

    queryForm: _.debounce(function() {
      if (this.lclId === '') {
        return false
      }
      this.ajaxForm()
    }, 500),

    save() {
      this.ajaxSave()
    },

    ajaxArtwork() {
      this.$request('get', 'warehouse-inrpc/warehouse/product/query/' + this.artworkCode)
      .then((res) => {
        this.artworkName = res.body.dto.productName
        this.artworkUnit = res.body.dto.productUnit
      })
    },

    ajaxForm() {
      this.$request('get', 'warehouse-inrpc/warehouse/box/query/' + this.lclId)
      .then((res) => {
        console.log(res);
        this.formId = res.body.dto.id
        this.inWareId = res.body.dto.inInvNo
        this.outWareId = res.body.dto.outInvNo
        this.sealId1 = res.body.dto.sealNo1
        this.sealId2 = res.body.dto.sealNo2
        this.registerTime = moment(res.body.dto.invDate).format('YYYY-MM-DD') + ' ' + res.body.dto.invTime
        this.artworkCode = res.body.dto.product.productNo
        this.artworkName = res.body.dto.product.productName
        this.artworkUnit = res.body.dto.product.productUnit

        this.$store.commit('clearSelectedBoxTable')
        this.$store.commit('appendSelectedBoxTable', res.body.dto.boxDetails)
      })
    },

    ajaxSave() {
      let boxDetails = _.map(this.boxes, (item) => {
        return {
          boxNo: item.boxNo,
          checkNo: item.checkNo,
          checkAqty: item.checkAqty,
          invQty: item.invQty,
        }
      })

      let date = moment(this.registerTime).format('YYYY-MM-DD'),
        time = moment(this.registerTime).format('HH:mm:ss')

      this.$request('post', 'warehouse-inrpc/warehouse/box/add')
        .send({
          id: this.formId,
          sealNo1: this.sealId1,
          sealNo2: this.sealId2,
          invDate: date,
          invTime: time,
          invQty: this.qualifiedAmount,
          product: {
            productNo: this.artworkCode,
          },
          store: {
            id: this.selectWarehouse,
          },
          boxDetails
        })
        .then((res) => {
          if (res.body.errorCode === '000') {
            this.lclId = res.body.dto.boxNo
            this.inWareId = res.body.dto.inInvNo
            this.outWareId = res.body.dto.outInvNo
            this.isModify = true
            this.formId = res.body.dto.id

            this.$store.dispatch('fadeShow', {
              status: 'success',
              content: '保存成功'
            })
          }
        })
    },

    deleteBoxes(indexes) {
      this.$store.commit('removeSelectedBoxTable', indexes)
    }
  },

  components: {
    storageLclDialog,
    tableEditable
  }
}
</script>
