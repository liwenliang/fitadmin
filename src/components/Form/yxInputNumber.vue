<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-input-number
    v-model="form.props[prop]"
    :style="config.style"
    :min="config.min"
    :max="config.max"
    :size="config.size"
    :disabled="config.disabled"
    controls-position="right">
    @change="onChange"
    @keyup.native.enter="onEnter"
  </el-input-number>
</template>

<script>
export default {
  name: 'YxInputNumber',
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
    onEnter(env) {
      this.config.onEnter && this.config.onEnter.call(null, env)
    },
    onChange(changedVal) {
      this.config.onChange && this.config.onChange.call(null, changedVal)
    }
  }
}
</script>
