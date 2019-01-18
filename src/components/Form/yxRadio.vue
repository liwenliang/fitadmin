<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-radio-group
    v-model="form.props[prop]"
    :disabled="config.disabled"
    @change="onSelectChange">
    <el-radio
      v-for="opt in config.options"
      :key="opt.value"
      :disabled="opt.disabled"
      :label="opt.value">
      {{ opt.label }}
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'YxInput',
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
