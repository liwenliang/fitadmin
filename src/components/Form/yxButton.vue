<!-- 我们把ele组件常用属性放在这里，如果会用到更多其他属性可以进行扩展 -->
<template>
  <div :style="config.style">
    <el-button
      v-for="opt in config.options"
      :key="opt.label+Math.random()"
      :type="opt.type"
      :size="opt.size"
      :style="opt.style"
      :icon="opt.icon"
      @click="opt.onclick">{{ opt.label }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'YxButton',
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
