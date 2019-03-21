<template>
  <mu-container>
    <mu-form ref="form" :model="validateForm">
      <mu-form-item :rules="mobileRules" label="手机号" prop="mobile">
        <mu-text-field v-model="validateForm.mobile" placeholder="11位手机号" type="number" prop="mobile"/>
      </mu-form-item>
      <mu-form-item :rules="passwordRules" label="密码" prop="password">
        <mu-text-field v-model="validateForm.password" placeholder="3~10位密码" type="password" prop="password"/>
      </mu-form-item>
      <mu-form-item :rules="argeeRules" prop="isAgree">
        <mu-checkbox v-model="validateForm.isAgree" label="同意用户协议"/>
      </mu-form-item>
      <mu-form-item>
        <mu-button color="primary" @click="submit">提交</mu-button>
        <mu-button @click="clear">重置</mu-button>
      </mu-form-item>
    </mu-form>
  </mu-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      mobileRules: [
        { validate: (val) => !!val, message: '必须填写手机号' },
        { validate: (val) => val.length === 11, message: '请输入正确手机号' }
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10' }
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议' }],
      validateForm: {
        mobile: '',
        password: '',
        isAgree: false
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this.$store.dispatch('user/Login', this.validateForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
          })
        } else {
          // 这里使用的是apicloud提供的API
          window.api && window.api.toast({
            msg: '账号密码验证错误',
            duration: 2000,
            location: 'top'
          })
        }
      })
    },
    clear() {
      this.$refs.form.clear()
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      }
    }
  }
}
</script>
