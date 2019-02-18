<template>
  <el-form
    ref="leform"
    :model="form.props"
    :inline="form.inline"
    :label-position="form.labelPosition"
    :label-width="form.labelWidth">
    <template>
      <!-- 默认情况就是输入框 -->
      <el-form-item
        v-for="item in form.attributes"
        v-if="!item.isHide"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :rules="getRules(item.rules)"
        :style="form.style">
        <component :is="item.type" :form="form" :prop="item.prop" :config="item.config" :value="form.props[item.prop]"/>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import components from './index.js'
const isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export default {
  name: 'Yxform',
  components: components,
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    emitValidate: {
      type: Boolean,
      default: false
    },
    emitReset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      required: { required: true, message: '此处为必填值' },
      email: { type: 'email', message: '请输入正确的邮箱地址' },
      phone: {
        validator: function(rule, value, callback) {
          const regex = /^1\d{10}$/g
          if (regex.test(value) || value === '' || value === null) {
            callback()
          } else {
            callback(new Error('请正确填写手机号'))
          }
        }
      },
      password: {
        validator: function(rule, value, callback) {
          const regex = /^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/
          if (regex.test(value) || value === '' || value === null) {
            callback()
          } else {
            callback(new Error('密码必须包含字母和数字，且为8-20个字符!'))
          }
        }
      },
      number: {
        validator: function(rule, value, callback) {
          if (isNumeric(value) || value === '' || value === null) {
            callback()
          } else {
            callback(new Error('该项须填写数字类型值'))
          }
        }
      },
      int: {
        validator: function(rule, value, callback) {
          if (parseInt(value, 10) === value || value === '' || value === undefined) {
            callback()
          } else {
            callback(new Error('请输入整数类型值'))
          }
        }
      },
      url: { type: 'url', message: '请输入正确网址类型值' }
    }
  },
  watch: {
    // 监听到该属性的变化则进行表单验证
    emitValidate() {
      this.$refs['leform'].validate((valid) => {
        if (valid) {
          this.form.validateSuccess()
        } else {
          this.form.validateFaild()
        }
      })
    },
    // 监听到该属性的变化则进行表单重置
    emitReset() {
      this.$refs['leform'].resetFields()
    }
  },
  methods: {
    getRules(ruleArr) {
      if (!ruleArr) {
        return []
      }
      var rules = []
      for (var i = 0; i < ruleArr.length; i++) {
        var item = ruleArr[i]
        if (typeof item === 'string' && this[item]) {
          rules.push(this[item])
        } else if (typeof item === 'object') {
          rules.push(item)
        }
      }
      return rules
    },

    /**
     * 可以通过使用this.$refs.xxx.setOptions设置某项的options
     * 规定options在config下
     * 例如下拉选择框的选项是异步获取的，这时候可以在mounted后执行该组件方法
     * @param prop 表单项对应的prop
     * @param options 表单项config下的options，label value形式
     */
    setOptions(prop, options) {
      for (var i = 0; i < this.form.attributes.length; i++) {
        const item = this.form.attributes[i]
        if (item.prop === prop) {
          item.config.options = options
        }
      }
    }
  }
}
</script>
