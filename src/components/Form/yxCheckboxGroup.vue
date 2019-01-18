<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-checkbox-group v-model="form.props[prop]">
    <el-checkbox
      v-for="opt in config.options"
      :key="opt.label+Math.random()"
      :label="opt.value"
      :disabled="config.disabled || opt.disabled">{{ opt.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'YxCheckboxGroup',
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
