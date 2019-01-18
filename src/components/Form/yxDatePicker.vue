<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-date-picker
    v-model="form.props[prop]"
    :style="config.style"
    :type="config.type"
    :placeholder="config.placeholder"
    :start-placeholder="config.startPlaceholder || ''"
    :end-placeholder="config.endPlaceholder || ''"
    :picker-options="config.pickerOptions"
    :disabled="config.disabled"
    :format="config.format"
    :size="config.size"
    :value-format="config.valueFormat"
  />
</template>

<script>
export default {
  name: 'YxDatePicker',
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
  data() {
    return {}
  }
}
</script>
