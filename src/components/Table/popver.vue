<template>
  <el-popover v-model="visible" :disabled="item.disabledFunc && item.disabledFunc(scope.row)">
    <el-input
      v-model="scope.row[item.prop]"
      :placeholder="item.placeholder||'请输入新值,并点击确定'"
      size="mini"
      @keyup.native.enter="onEdit"/>
    <div style="text-align: right; margin: 5px 0;">
      <el-button size="mini" type="text" @click="onCancel">取消</el-button>
      <el-button type="primary" size="mini" @click="onEdit">确定</el-button>
    </div>
    <span slot="reference">
      <el-tag :type="item.disabledFunc && item.disabledFunc(scope.row) ? 'warning' : 'success'">{{ scope.row[item.prop] }}</el-tag>
    </span>
  </el-popover>
</template>

<script>
export default {
  name: 'Popver',
  props: {
    scope: {
      type: Object,
      default() {
        return {}
      }
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data: function() {
    return {
      visible: false,
      value: this.scope.row[this.item.prop]
    }
  },

  methods: {
    /**
       * 点击取消，关闭弹框，重置数据
       */
    onCancel: function() {
      this.visible = false
      this.emitReset()
    },

    /**
     * 提交数据，关闭弹框，遇到输入不合法，重置数据
     * return false  则不进行数据调整，这里可以增加验证逻辑
     */
    onEdit: function() {
      var changeSuccess = this.item.onEdit(this.scope.$index, this.scope.row, this.item.prop,
        this.scope.row[this.item.prop])
      if (!changeSuccess && typeof changeSuccess !== 'undefined') {
        this.emitReset()
      } else {
        this.value = this.scope.row[this.item.prop]
        this.visible = false
      }
    },

    emitReset: function() {
      this.scope.row[this.item.prop] = this.value
    }
  }
}
</script>

<style scoped>

</style>
