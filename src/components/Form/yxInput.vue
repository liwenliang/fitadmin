<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <el-input
    v-model="form.props[prop]"
    :style="config.style || ''"
    :type="config.type"
    :placeholder="config.placeholder"
    :disabled="config.disabled"
    :size="config.size"
    :rows="config.rows"
    :suffix-icon="config.icon"
    clearable
    @keyup.native.enter="onEnter"
    @blur="trimValue"/>
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
    onEnter(env) {
      this.config.onEnter && this.config.onEnter.call(null, env)
    },

    // 当输入框失去焦点时，要去掉字符两端的空格
    trimValue() {
      this.form.props[this.prop] = this.form.props[this.prop].trim()
      if (this.config.onBlur && typeof this.config.onBlur === 'function') {
        this.form.props[this.config.prop] = this.config.onBlur(this.config.props[this.prop])
      }
    }
  }
}
</script>
