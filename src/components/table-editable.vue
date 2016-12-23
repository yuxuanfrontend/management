<style lang="scss" scoped>
.vm-table-wrap {
  max-height: 500px;
  overflow-y: auto;
}
.vm-table {
  text-align: center;

  td, th {
    text-align: center;
  }

  input {
    width: 100%;
    border: 0;
    outline: 0;
    background-color: transparent;
    text-align: center;
  }

  .vm-checkbox {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
}
</style>

<template lang="html">
  <div>
    <div class="vm-table-wrap">
      <table class="table is-bordered is-striped vm-table has-text-centered">
        <thead>
          <tr>
            <th style="width: 50px;" class="control">
              <input type="checkbox" class="checkbox vm-checkbox" v-model="checkboxAll" @change="chooseAll">
            </th>
            <th v-for="title in titles">{{title}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in myData">
            <td class="control"><input type="checkbox" class="checkbox vm-checkbox" :checked="checkboxes[index]" @change="toggleCheckbox($event, index)"></td>
            <td v-if="isEditable" v-for="(item, key) in data" class="control"><input type="text" v-model="data[key]" @focus="focus"></td>
            <td v-if="!isEditable" v-for="item in data">{{item}}</td>
          </tr>
        </tbody>
        <tfoot v-if="isCaculate">
          <tr>
            <td>合计</td>
            <td v-if="isCaculate" v-for="sum in sums">{{sum}}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="vm-vertical-block">
      <button type="button" class="button is-warning" v-if="isDelete" :class="{'is-disabled': !isLineSelected}" @click="deleteLine">删除行</button>
      <button type="button" class="button is-warning" v-if="isSelect" :class="{'is-disabled': !isLineSelected}" @click="confirmSelect">选择</button>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'

export default {
  data() {
    return {
      myData: this.data.concat(),
      checkboxAll: false,
      checkboxes: Array(this.data.length),
    }
  },

  props: {
    isCaculate: {
      type: Boolean,
      default: false,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
    editableKey: {
      type: Array,
    },
    data: {
      type: Array,
      required: true
    },
    titles: {
      type: Array,
      required: true
    },
    caculatedPrecision: {
      type: Number,
      default: 0
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    isSelect: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    data(newVal) {
      this.myData = newVal.concat()

      this.checkboxes  = _.map(newVal, (item) => {
        return false
      })
    }
  },

  computed: {
    // myData() {
    //   return this.data.concat()
    // },

    // checkboxes: {
    //   get() {
    //     return _.map(this.myData, (item) => {
    //       return false
    //     })
    //   },
    //   // set() {
    //   //   console.log(222);
    //   //   this.isLineDeletable = this.checkboxes.some((item) => item)
    //   // }
    // },

    sums() {
      let result = {}

      // 计算出需要合计的列
      _.each(this.myData, (item, index) => {
        _.each(item, (value, key) => {
            if (result[key] === undefined) {
              result[key] = _.indexOf(this.editableKey, key) >= 0 ? 0 : '--'
            }

            if (_.indexOf(this.editableKey, key) >= 0) {
              result[key] += Number(value)
            }
        })
      })

      // 设置计算精度
      _.each(result, (value, key) => {
        if (typeof value === 'number') {
          result[key] = value.toFixed(this.caculatedPrecision)
        }
      })

      return result
    },

    isLineSelected() {
      return this.checkboxes.some((item) => item)
    },
  },

  created() {

  },

  methods: {
    focus(event) {
      event.target.select()
    },

    chooseAll() {
      let isAllChecked = _.every(this.checkboxes, (item) => {
        return item === true
      })

      if (isAllChecked) {
        _.each(this.checkboxes, (item, index) => {
          this.$set(this.checkboxes, index, false)
        })
      } else {
        _.each(this.checkboxes, (item, index) => {
          this.$set(this.checkboxes, index, true)
        })
      }
    },

    deleteLine() {
      let indexes = []

      _.eachRight(this.checkboxes, (item, index) => {
        if (item === true) {
          // this.myData.splice(index, 1)
          indexes.push(index)
          this.checkboxes.splice(index, 1)
        }
      })

      this.$emit('delete-line', indexes)
    },

    confirmSelect() {
      let selectedIndexes = []

      _.each(this.checkboxes, (item, index) => {
        if (item) {
          selectedIndexes.push(index)
        }
      })

      this.$emit('confirm-select', selectedIndexes)
    },

    toggleCheckbox(event, index) {
      this.$set(this.checkboxes, index, event.target.checked)
    }
  }
}
</script>
