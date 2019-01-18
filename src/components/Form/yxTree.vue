<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <div class="treeHolder">
    <el-tree
      ref="tree"
      :data="config.options"
      :props="config.props || defaultProps"
      :node-key="config.nodeKey || 'value'"
      :default-checked-keys="form.props[prop]"
      show-checkbox
      @check-change="handleCheckChange"/>
  </div>
</template>

<script>
export default {
  name: 'YxTree',
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    prop: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: function() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleCheckChange() {
      this.form.props[this.prop] = this.$refs.tree.getCheckedKeys(true)
    }
  }
}
</script>
<style type="text/css" scoped>
    .treeHolder {
        padding-top: 6px;
        max-height: 300px;
        overflow: auto;
    }
</style>
