<template>
  <div class="weekday--wrapper">
    <el-row class="content">
      <el-table
        :data="tableData"
        stripe
        border
        size="mini"
        style="width: 100%"
        @cell-click="cellClick"
        @header-click="headerClick"
        @mousedown.native="mousedown"
        @mouseup.native="mouseup"
        @mousemove.native="mousemove">
        <el-table-column
          prop="date"
          label="日期|时间"
          width="83"
        >
          <template slot-scope="scope">
            <span class="cursor-pointer">{{ weekMap[scope.row.date] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(value,key) in hourMap"
          :key="value"
          :label="value"
          :prop="`${key*2}_${key*2+1}`"
        >
          <el-table-column v-for="i in [0,1]" :key="i" :prop="`${key*2+i}`" width="18">
            <template slot-scope="scope">
              <div
                :data-idx="`${scope.row.date}_${key*2+i}`"
                :class="getClass(scope.row.data[key*2+i])"
                class="cellDiv"/>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'YxInput',
  props: {
    value: {
      type: String,
      default: ''
    },
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
    const hourMap = {}
    const weekMap = {
      0: '星期一', 1: '星期二', 2: '星期三', 3: '星期四', 4: '星期五', 5: '星期六', 6: '星期日'
    }
    const tableData = []
    for (let i = 0; i < 24; i++) {
      hourMap[i] = `${(100 + i + '').slice(1)}～${(101 + i + '').slice(1)}`
    }
    Object.keys(weekMap).forEach(week => {
      const item = {
        date: week,
        data: {}
      }
      for (let i = 0; i < 48; i++) {
        item.data[i] = 0
      }
      tableData.push(item)
    })
    return {
      tagName: '',
      tagNameShow: true,
      onMove: false,
      client: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
      },
      weekMap,
      hourMap,
      tableData: tableData
    }
  },
  computed: {
    hexadecimal() {
      let b = ''
      let hes = ''
      this.tableData.forEach(item => {
        Object.keys(item.data).forEach(key => {
          b += item.data[key]
          if (b.length === 4) {
            hes += parseInt(b, 2).toString(16)
            b = ''
          }
        })
      })
      return hes
    }
  },
  watch: {
    value(val) {
      this.hexToArray(val)
    }
  },
  created() {
    this.hexToArray(this.form.props[this.prop])
  },
  methods: {
    getClass(value) {
      if (value === 2 || value === 3) {
        return 'hover'
      } else if (value === 1) {
        return 'select'
      } else {
        return ''
      }
    },
    hexToArray(val) {
      if (Array.isArray(val)) {
        this.tableData = val
      } else if (val !== '' && (val !== this.hexadecimal)) {
        let b = ''
        const ha = val.split('')
        ha.forEach(i => {
          b += (10000 + parseInt(i, 16).toString(2) * 1).toString().slice(1)
        })
        b = b.split('')
        const tableData = []
        Object.keys(this.weekMap).forEach(week => {
          const item = {
            date: week,
            data: {}
          }
          for (let i = 0; i < 48; i++) {
            item.data[i] = b[week * 48 + i * 1] * 1 || 0
          }
          tableData.push(item)
        })
        this.tableData = tableData
      }
    },
    mouseup(event) {
      this.onMove = false
      Object.keys(this.client).forEach(key => {
        this.client[key] = 0
      })
      this.resetDataArea()
      this.form.props[this.prop] = this.hexadecimal
    },
    mousedown(...event) {
      const evt = Array.isArray(event) ? event[0] : event
      if (evt.target.dataset.idx) {
        this.onMove = true
        this.client.startX = evt.target.dataset.idx.split('_')[1]
        this.client.startY = evt.target.dataset.idx.split('_')[0]
      }
    },
    mousemove(...event) {
      if (this.onMove) {
        const evt = Array.isArray(event) ? event[0] : event
        if (evt.target.dataset.idx) {
          this.client.endX = evt.target.dataset.idx.split('_')[1]
          this.client.endY = evt.target.dataset.idx.split('_')[0]
        }
        this.setDataArea()
      }
    },
    resetDataArea(isFromSet) {
      for (var i = 0; i < this.tableData.length; i++) {
        var item = this.tableData[i]
        for (var j = 0; j < 48; j++) {
          if (item.data[j] === 2) {
            item.data[j] = 1 // 针对2的数据赋值1
            if (isFromSet) {
              item.data[j] = 0
            }
          } else if (item.data[j] === 3) {
            item.data[j] = 0 // 针对3的数据赋值0
            if (isFromSet) {
              item.data[j] = 1
            }
          }
        }
      }
    },
    setDataArea() {
      const { startX, startY, endX, endY } = this.client
      const minX = Math.min(startX, endX)
      const minY = Math.min(startY, endY)
      const maxX = Math.max(startX, endX)
      const maxY = Math.max(startY, endY)
      this.resetDataArea(true)
      for (var i = minY; i <= maxY; i++) {
        var item = this.tableData[i]
        for (var j = minX; j <= maxX; j++) {
          if (item.data[j] === 0) {
            item.data[j] = 2 // 针对0的数据赋值2
          } else if (item.data[j] === 1) {
            item.data[j] = 3 // 针对1的数据赋值3
          }
        }
      }
    },
    nodeListIndexOf(nodeList, dom) {
      for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i] === dom) {
          return i
        }
      }
      return -1
    },
    headerClick(column, event) {
      if (column.property !== 'date') {
        let bool = 0
        const [x, y] = column.property.split('_')
        for (let i = 0; i < 7; i++) {
          if (this.tableData[i].data[x] === 0 || this.tableData[i].data[y] === 0) {
            bool = 1
            break
          }
        }
        for (let i = 0; i < 7; i++) {
          this.tableData[i].data[x] = this.tableData[i].data[y] = bool
        }
      }
      this.form.props[this.prop] = this.hexadecimal
    },
    cellClick(row, column, cell, event) {
      if (column.property === 'date') {
        let bool = 0
        for (let i = 0; i < 48; i++) {
          if (row.data[i] === 0) {
            bool = 1
            break
          }
        }
        Object.keys(row.data).forEach(key => {
          row.data[key] = bool
        })
      } else {
        row.data[column.property] = row.data[column.property] === 1 ? 0 : 1
      }
      this.form.props[this.prop] = this.hexadecimal
    }
  }
}
</script>

<style lang="scss">
  .weekday--wrapper {
    .el-table th, .el-table td {
      padding: 3px 0;
      user-select: none;
      cursor: pointer;
    }
    .el-table th {
      background: #e1e7ee;
    }
    .el-table__header-wrapper tr:last-child {
      display: none;
    }
    .cell {
      .cellDiv {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .select {
        background: rgba(90, 200, 250, 0.59);
      }
      .hover {
        background: rgba(39, 141, 250, 0.59);
      }
    }
    .content {
      height: 335px;
      margin-top: 10px;
    }
  }
</style>
