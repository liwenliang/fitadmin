<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-select
    :style="config.style || ''"
    v-model="form.props[prop]"
    :multiple="config.multiple"
    :filterable="config.filterable"
    :reserve-keyword="!!config.filterable"
    :allow-create="config.allowCreate"
    :multiple-limit="config.limit || 0"
    :placeholder="config.placeholder"
    :size="config.size"
    :clearable="config.clearable"
    :disabled="config.disabled"
    @change="onSelectChange">
    <el-option
      v-for="opt in config.options"
      :key="opt.value"
      :disabled="opt.disabled"
      :label="opt.label"
      :value="opt.value"/>
  </el-select>
</template>

<script>
export default {
  name: 'YxSelect',
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
    return {}
  },
  methods: {
    onSelectChange(val) {
      this.config.onChange && this.config.onChange.call(null, val)
    }
  }
}
</script>
