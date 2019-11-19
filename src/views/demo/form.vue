<template>
  <div style="padding: 20px;">
    <yxform
      ref="demoForm"
      :emit-validate="form.emitValidate"
      :emit-reset="form.emitReset"
      :form="form"
    />
    <pre class="codeList">
        {{ JSON.stringify(form.props, true, '    ') }}
    </pre>
  </div>
</template>

<script>
import { cities } from '@/utils/cities.js'

const defaultTime = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

export default {
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
        // style: 'width: 500px',
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
          dateRange: [],
          timeRange: ['00:00', '23:59'],
          timePeriod: defaultTime,
          cascader: 'dingbudaohang'
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
            type: 'yxTimePicker',
            prop: 'timeRange',
            label: '时间范围',
            config: {
              isRange: true,
              format: 'HH:mm',
              valueFormat: 'HH:mm',
              startPlaceholder: '开始时间',
              endPlaceholder: '结束时间'
            }
          },
          {
            type: 'yxInput',
            prop: 'name',
            label: '姓名',
            rules: ['required'],
            config: {
              type: 'text',
              placeholder: '请输入姓名',
              disabled: false,
              style: 'width: 220px;'
            }
          },
          {
            type: 'yxWeekTimeSelect',
            prop: 'timePeriod',
            label: '屏蔽时间段'
          },
          {
            type: 'yxTree',
            prop: 'areaCode',
            label: '屏蔽地域',
            config: {
              options: cities
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
              options: [
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
              ]
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
            type: 'yxCascader',
            prop: 'cascader',
            label: '爱好',
            config: {
              placeholder: '请选择爱好',
              showAllLevels: false,
              props: {
                emitPath: false
              },
              options: [
                {
                  value: 'zhinan',
                  label: '指南',
                  children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                      value: 'yizhi',
                      label: '一致'
                    }, {
                      value: 'fankui',
                      label: '反馈'
                    }, {
                      value: 'xiaolv',
                      label: '效率'
                    }, {
                      value: 'kekong',
                      label: '可控'
                    }]
                  }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                      value: 'cexiangdaohang',
                      label: '侧向导航'
                    }, {
                      value: 'dingbudaohang',
                      label: '顶部导航'
                    }]
                  }]
                },
                {
                  value: 'zujian',
                  label: '组件',
                  children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                      value: 'layout',
                      label: 'Layout 布局'
                    }, {
                      value: 'color',
                      label: 'Color 色彩'
                    }, {
                      value: 'typography',
                      label: 'Typography 字体'
                    }, {
                      value: 'icon',
                      label: 'Icon 图标'
                    }, {
                      value: 'button',
                      label: 'Button 按钮'
                    }]
                  }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                      value: 'radio',
                      label: 'Radio 单选框'
                    }, {
                      value: 'checkbox',
                      label: 'Checkbox 多选框'
                    }, {
                      value: 'input',
                      label: 'Input 输入框'
                    }, {
                      value: 'input-number',
                      label: 'InputNumber 计数器'
                    }, {
                      value: 'select',
                      label: 'Select 选择器'
                    }, {
                      value: 'cascader',
                      label: 'Cascader 级联选择器'
                    }, {
                      value: 'switch',
                      label: 'Switch 开关'
                    }, {
                      value: 'slider',
                      label: 'Slider 滑块'
                    }, {
                      value: 'time-picker',
                      label: 'TimePicker 时间选择器'
                    }, {
                      value: 'date-picker',
                      label: 'DatePicker 日期选择器'
                    }, {
                      value: 'datetime-picker',
                      label: 'DateTimePicker 日期时间选择器'
                    }, {
                      value: 'upload',
                      label: 'Upload 上传'
                    }, {
                      value: 'rate',
                      label: 'Rate 评分'
                    }, {
                      value: 'form',
                      label: 'Form 表单'
                    }]
                  }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                      value: 'table',
                      label: 'Table 表格'
                    }, {
                      value: 'tag',
                      label: 'Tag 标签'
                    }, {
                      value: 'progress',
                      label: 'Progress 进度条'
                    }, {
                      value: 'tree',
                      label: 'Tree 树形控件'
                    }, {
                      value: 'pagination',
                      label: 'Pagination 分页'
                    }, {
                      value: 'badge',
                      label: 'Badge 标记'
                    }]
                  }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                      value: 'alert',
                      label: 'Alert 警告'
                    }, {
                      value: 'loading',
                      label: 'Loading 加载'
                    }, {
                      value: 'message',
                      label: 'Message 消息提示'
                    }, {
                      value: 'message-box',
                      label: 'MessageBox 弹框'
                    }, {
                      value: 'notification',
                      label: 'Notification 通知'
                    }]
                  }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                      value: 'menu',
                      label: 'NavMenu 导航菜单'
                    }, {
                      value: 'tabs',
                      label: 'Tabs 标签页'
                    }, {
                      value: 'breadcrumb',
                      label: 'Breadcrumb 面包屑'
                    }, {
                      value: 'dropdown',
                      label: 'Dropdown 下拉菜单'
                    }, {
                      value: 'steps',
                      label: 'Steps 步骤条'
                    }]
                  }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                      value: 'dialog',
                      label: 'Dialog 对话框'
                    }, {
                      value: 'tooltip',
                      label: 'Tooltip 文字提示'
                    }, {
                      value: 'popover',
                      label: 'Popover 弹出框'
                    }, {
                      value: 'card',
                      label: 'Card 卡片'
                    }, {
                      value: 'carousel',
                      label: 'Carousel 走马灯'
                    }, {
                      value: 'collapse',
                      label: 'Collapse 折叠面板'
                    }]
                  }]
                }, {
                  value: 'ziyuan',
                  label: '资源',
                  children: [{
                    value: 'axure',
                    label: 'Axure Components'
                  }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                  }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                  }]
                }]
            }
          },
          {
            type: 'yxButton',
            config: {
              options: [
                {
                  label: '提交',
                  type: 'primary',
                  onClick: this.onsubmit
                },
                {
                  label: '重置',
                  type: 'danger',
                  onClick: this.onreset
                }
              ]
            }
          }
        ]
      }
    }
  },
  mounted() {
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
