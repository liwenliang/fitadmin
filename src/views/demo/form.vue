<template>
  <div style="padding: 20px;">
    <yxform
      ref="demoForm"
      :emit-validate="form.emitValidate"
      :emit-reset="form.emitReset"
      :form="form"/>
    <pre class="codeList">
        {{ JSON.stringify(form.props, true, '    ') }}
    </pre>
  </div>
</template>

<script>
import yxform from '@/components/Form/index.vue'

export default {
  components: {
    yxform
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        emitValidate: false,
        emitReset: false,
        validateSuccess: this.validateSuccess,
        validateFaild: this.validateFaild,
        inline: false,
        style: 'width: 500px',
        labelWidth: '120px',
        labelPosition: 'right',
        props: {
          name: '一下科技',
          sex: '1',
          age: 7,
          birthday: '',
          hobby: ['2', '3'],
          likeColor: '#000000',
          city: 'Beijing',
          dateRange: []
        },
        attributes: [
          {
            type: 'yxDatePicker',
            prop: 'dateRange',
            label: '日期范围',
            config: {
              type: 'daterange',
              format: 'yyyy 年 MM 月 dd 日',
              valueFormat: 'yyyy-MM-dd',
              startPlaceholder: '开始日期',
              endPlaceholder: '结束日期'
            }
          },
          {
            type: 'yxInput',
            prop: 'name',
            label: '姓名',
            rules: ['required'],
            config: {
              type: 'input',
              placeholder: '请输入姓名',
              disabled: false,
              style: 'width: 220px;'
            }
          },
          {
            type: 'yxSelect',
            prop: 'sex',
            label: '性别',
            rules: ['required'],
            config: {
              disabled: false,
              style: 'width: 220px;',
              options: []
            }
          },
          {
            type: 'yxInputNumber',
            prop: 'age',
            label: '年龄',
            rules: ['required', 'int'],
            config: {
              type: 'input',
              min: 0,
              max: 10,
              disabled: false,
              style: 'width: 220px;'
            }
          },
          {
            type: 'yxDatePicker',
            prop: 'birthday',
            label: '生日',
            rules: ['required'],
            config: {
              type: 'date',
              format: 'yyyy 年 MM 月 dd 日',
              valueFormat: 'timestamp',
              placeholder: '请输入生日',
              disabled: false
            }
          },
          {
            type: 'yxColorPicker',
            prop: 'likeColor',
            label: '颜色',
            rules: ['required'],
            config: {
              placeholder: '请输入颜色值',
              alpha: false,
              disabled: false
            }
          },
          {
            type: 'yxGroupSelect',
            prop: 'city',
            label: '城市',
            rules: ['required'],
            config: {
              style: 'width: 220px;',
              options: [
                {
                  label: '热门城市',
                  options: [
                    {
                      value: 'Shanghai',
                      label: '上海'
                    }, {
                      value: 'Beijing',
                      label: '北京'
                    }]
                }, {
                  label: '城市名',
                  options: [
                    {
                      value: 'Chengdu',
                      label: '成都'
                    }, {
                      value: 'Shenzhen',
                      label: '深圳'
                    }, {
                      value: 'Guangzhou',
                      label: '广州'
                    }, {
                      value: 'Dalian',
                      label: '大连'
                    }]
                }]
            }
          },
          {
            type: 'yxCheckboxGroup',
            prop: 'hobby',
            label: '爱好',
            rules: ['required'],
            config: {
              disabled: false,
              options: [
                {
                  label: '足球',
                  value: '0',
                  disabled: false
                },
                {
                  label: '篮球',
                  value: '1',
                  disabled: false
                },
                {
                  label: '排球',
                  value: '2',
                  disabled: false
                },
                {
                  label: '乒乓球',
                  value: '3',
                  disabled: false
                }
              ]
            }
          },
          {
            type: 'yxButton',
            config: {
              options: [
                {
                  label: '提交',
                  type: 'primary',
                  onclick: this.onsubmit
                },
                {
                  label: '重置',
                  type: 'danger',
                  onclick: this.onreset
                }
              ]
            }
          }
        ]
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.demoForm.setOptions('sex', [
        {
          label: '男',
          value: '0',
          disabled: false
        },
        {
          label: '女',
          value: '1',
          disabled: false
        }
      ])
    }, 0)
  },
  methods: {
    onsubmit() {
      this.form.emitValidate = !this.form.emitValidate
    },
    onreset() {
      this.form.emitReset = !this.form.emitReset
    },
    validateSuccess() {
      console.log('----------------')
      console.log('validateSuccess')
      console.log('----------------')
    },
    validateFaild() {
      console.log('----------------')
      console.log('validateFaild')
      console.log('----------------')
    },
    handleCheckChange() {
      console.log('----------------')
      console.log(this.$refs.tree.getCheckedKeys(true))
      console.log('----------------')
    }
  }
}
</script>

<style scoped>
    .codeList {
        background: grey;
        padding: 10px;
    }
</style>
