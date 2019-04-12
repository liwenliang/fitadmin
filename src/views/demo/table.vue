<template>
  <div style="padding: 20px;">
    <yxtable ref="demoTable" :table="table"/>
  </div>
</template>

<script>
import yxtable from '@/components/Table/index.vue'
import { cityMaps } from '@/utils/cities'

export default {
  components: {
    yxtable
  },
  data() {
    return {
      table: {
        data: [
          {
            id: '000001',
            status: '1',
            name: '张三',
            sex: '0',
            bought: '1',
            photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
            datetime: 1487695862000,
            tags: ['1', '2', '3', '4'],
            areaCode: [130100, 130400],
            progress: 50
          },
          {
            id: '000002',
            status: '2',
            name: '李四',
            sex: '1',
            bought: '0',
            photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
            datetime: 1487692862000,
            tags: ['1', '2', '3', '4'],
            areaCode: [130100, 130400],
            progress: 40
          },
          {
            id: '000003',
            status: '1',
            name: '王五',
            sex: '0',
            bought: '1',
            photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
            datetime: 1487693862000,
            tags: ['1', '2', '3', '4'],
            areaCode: [140100, 140300, 140400],
            progress: 30
          },
          {
            id: '000004',
            status: '1',
            name: '赵六',
            sex: '0',
            bought: '0',
            photo: '//i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
            datetime: 1487694862000,
            tags: ['1', '2', '3', '4'],
            areaCode: [130100, 130400],
            progress: 90
          }
        ],
        sortChange: function() {},
        select: {
          isSelectable: true,
          selectChange: this.onSelectChange,
          selectable: function(row, index) {
            if (row.sex === '0') {
              return false
            } else {
              return true
            }
          }
        },
        attributes: [
          {
            prop: '',
            type: 'index',
            label: 'index',
            fixed: 'left',
            width: '100'
          },
          {
            prop: 'sex',
            type: 'select',
            label: 'select',
            sortable: true,
            disabled: false,
            onChage: this.onChage,
            width: '100',
            options: [
              {
                value: '0',
                label: '男'
              },
              {
                value: '1',
                label: '女'
              }
            ]
          },
          {
            prop: 'areaCode',
            type: 'tags',
            label: '屏蔽地域',
            options: cityMaps
          },
          {
            prop: 'name',
            type: 'edit',
            label: 'edit',
            sortable: true,
            width: '100',
            onEdit: this.onEdit
          },
          {
            prop: 'id',
            type: 'default',
            label: 'default || ""',
            sortable: true,
            width: '120'
          },
          {
            prop: 'name',
            label: 'tooltip',
            width: '100',
            type: 'tooltip',
            sortable: true,
            style: 'cursor:pointer;color:blue;font-weight:bold;',
            template: '<img src="http://api.app.letv.com/getqr?w=100&txt=ITEM_PROP"/>',
            onClick: this.onClick
          },
          {
            prop: 'status',
            label: 'mapList',
            type: 'mapList',
            width: '100',
            options: [
              {
                value: '1',
                label: '已购买',
                style: 'color:red;'
              },
              {
                value: '2',
                label: '未购买',
                style: 'color:brown;'
              }
            ]
          },
          {
            prop: '',
            label: 'buttons',
            type: 'buttons',
            fixed: 'right',
            width: '200',
            options: [
              {
                title: 'btn1',
                type: 'primary',
                onClick: this.onClick
              },
              {
                title: 'btn2',
                type: 'text',
                onClick: this.onClick
              },
              {
                title: 'btn3',
                type: 'danger',
                onClick: this.onClick
              }
            ]
          },
          {
            prop: '',
            label: 'val2btn',
            type: 'val2btn',
            width: '250',
            options: [
              {
                prop: 'status',
                value: ['1'],
                title: '已买',
                onClick: this.onClick
              },
              {
                prop: 'status',
                value: ['1'],
                title: '再次购买',
                type: 'primary',
                onClick: this.buyAgain
              },
              {
                prop: 'status',
                value: ['1'],
                title: '评价',
                type: 'warn',
                onClick: this.discuss
              },
              {
                prop: 'status',
                value: ['2'],
                title: '未购买,点击购买',
                type: 'primary',
                onClick: this.onClick
              }
            ]
          },
          {
            prop: 'photo',
            label: 'photo',
            type: 'photo',
            width: '200',
            photoWidth: 40,
            photoHeight: 40
          },
          {
            prop: 'tags',
            label: 'tags',
            type: 'tags',
            width: '280',
            options: [
              {
                value: '1',
                label: 'web'
              },
              {
                value: '2',
                label: 'phone'
              },
              {
                value: '3',
                label: '超级手机'
              },
              {
                value: '4',
                label: 'pad'
              }
            ]
          },
          {
            prop: 'datetime',
            label: 'datetime',
            type: 'datetime',
            width: '160'
          },
          {
            prop: 'progress',
            label: 'customFilter',
            type: 'customFilter',
            width: '110',
            filter: function(val, row) {
              return `<h3 style="text-align: center;">${val}%</h3>`
            }
          },
          {
            prop: 'progress',
            label: 'progress',
            type: 'progress',
            width: '150'
          }
        ]
      }
    }
  },
  methods: {
    /**
       * list列表中下拉选择行为触发事件
       * @param $index        当前行的索引
       * @param row           当前行的数据
       * @param prop          当前值得属性字段
       * @param value         当前属性字段的值
       */
    onChage($index, row, prop, value) {
      console.log('$index', $index)
      console.log('row', row)
      console.log('prop', prop)
      console.log('value', value)
    },

    onClick($index, row) {
      console.log('click')
      console.log('$index', $index)
      console.log('row', row)
    },

    discuss() {
      console.log('discuss')
    },

    buyAgain() {
      console.log('buyAgain')
    },

    onEdit($index, row, prop, value) {
      console.log('$index', $index)
      console.log('row', row)
      console.log('prop', prop)
      console.log('value', value)
    },

    /**
       * 带复选框列表复选时触发的事件
       */
    onSelectChange(dataArray) {
      console.log(JSON.stringify(dataArray, true, '  '))
    }
  }
}
</script>
