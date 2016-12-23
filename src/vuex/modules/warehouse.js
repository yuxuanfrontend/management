import _ from 'lodash'

export default {
  state: {
    isDialogActive: false,
    selectedBoxTable: []
  },

  mutations: {
    toggleSelectBoxesDialog(state) {
      state.isDialogActive = !state.isDialogActive
    },

    appendSelectedBoxTable(state, value) {
      state.selectedBoxTable = _.concat(state.selectedBoxTable, value)
    },

    removeSelectedBoxTable(state, indexes) {
      _.each(indexes, (index) => {
        console.log(index);
        state.selectedBoxTable.splice(index, 1)
      })
    },

    clearSelectedBoxTable(state) {
      state.selectedBoxTable = []
    }
  }
}
