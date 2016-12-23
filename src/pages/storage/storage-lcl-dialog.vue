<style lang="css">
</style>

<template lang="html">
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background" @click="closeDialog"></div>
    <div class="modal-content">
      <div class="box">
        <div class="columns">
          <div class="column control">
            <input type="text" class="input" ref="startdate" v-model="startDate" @input="queryBoxes">
          </div>
          <div class="column control">
            <input type="text" class="input" ref="enddate" v-model="endDate" @input="queryBoxes">
          </div>
        </div>
        <table-editable :titles="tableTitles" :data="boxes" :is-select="true" @confirm-select="tableSelect"></table-editable>
      </div>
    </div>
    <button class="modal-close" @click="closeDialog"></button>
  </div>
</template>

<script>

import _ from 'lodash'
import moment from 'moment'
import Flatpickr from 'flatpickr'
import datePickerZh from 'flatpickr/dist/l10n/zh'

import tableEditable from '../../components/table-editable'

Flatpickr.localize(datePickerZh.zh)

export default {
  name: 'storage-dialog',

  components: {
    tableEditable
  },

  data() {
    return {
      boxes: [],

      tableTitles: ['箱号', '流转单号', '藏品代码', '藏品名称', '件数', '提货'],

      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    }
  },

  computed: {
    isActive() {
      return this.$store.state.warehouse.isDialogActive
    }
  },

  mounted() {
    new Flatpickr(this.$refs.startdate)
    new Flatpickr(this.$refs.enddate)

    this.queryBoxes()
  },

  methods: {
    closeDialog() {
      this.$store.commit('toggleSelectBoxesDialog')
    },

    queryBoxes() {
      if (this.startDate === '' || this.endDate === '') {
        return false
      }

      this.ajaxBoxes()
    },

    ajaxBoxes() {
      this.$request('get', 'warehouse-inrpc/warehouse/tinventory/query')
        .query({
          startDate: this.startDate,
          endDate: this.endDate
        })
        .then((res) => {
          this.boxes = res.body.dto
        })
    },

    tableSelect(selectedIndexes) {
      let selectedData = _.filter(this.boxes, (item, index) => {
        if (_.indexOf(selectedIndexes, index) >= 0) {
          return true
        }
      })
      this.$store.commit('toggleSelectBoxesDialog')
      this.$store.commit('appendSelectedBoxTable', selectedData)
    }
  }
}
</script>
