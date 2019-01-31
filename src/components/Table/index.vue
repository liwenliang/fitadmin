<template>
  <el-table
    v-loading="loading"
    :data="table.data"
    element-loading-text="加载中"
    border
    stripe
    style="width:100%;"
    size="small"
    @sort-change="table.sortChange"
    @selection-change="table.select && table.select.selectChange">
    <el-table-column
      v-if="table.select && table.select.isSelectable"
      :selectable="table.select.selectable"
      type="selection"
      width="40"/>
    <el-table-column
      v-for="item in table.attributes"
      v-if="!item.isHide"
      :key="item.label"
      :width="item.width"
      :fixed="item.fixed"
      :prop="item.prop"
      :label="item.label"
      :sortable="item.sortable"
      :sort-method="item.sortMethod"
      :formatter="item.formatter">
      <template slot="header" slot-scope="scope">
        {{ item.label }}
        <el-tooltip v-if="item.tooltip" :content="item.tooltip" class="item" effect="dark" placement="top">
          <i style="cursor: pointer" class="el-icon-info"/>
        </el-tooltip>
      </template>
      <template slot-scope="scope">
        <template v-if="item.type==='index'">
          {{ scope.$index+1 }}
        </template>
        <template v-else-if="item.type==='select'">
          <el-select
            :disabled="item.disabled"
            v-model="scope.row[item.prop]"
            placeholder="请选择"
            @change="item.onChage(scope.$index, scope.row, item.prop, scope.row[item.prop])">
            <el-option
              v-for="opt in item.options"
              :key="opt.label"
              :label="opt.label"
              :value="opt.value"/>
          </el-select>
        </template>
        <template v-else-if="item.type==='edit'">
          <lepopver :scope="scope" :item="item"/>
        </template>
        <template v-else-if="item.type==='tooltip'">
          <letooltip :scope="scope" :item="item"/>
        </template>
        <template v-else-if="item.type==='mapList'">
          <span :style="scope.row[item.prop] | filterOperation(item.options,1)">{{ scope.row[item.prop] | filterOperation(item.options) }}</span>
          <el-tooltip v-if="item.getToolTip && item.getToolTip(scope.row)" :open-delay="300" placement="top">
            <div slot="content" v-html="item.getToolTip(scope.row)"/>
            <svg-icon style="cursor: pointer" icon-class="reson"/>
          </el-tooltip>
        </template>
        <template v-else-if="item.type==='buttons'">
          <el-tooltip
            v-for="(opt, idx) in item.options"
            :disabled="!opt.tipTitle"
            :key="idx"
            :open-delay="300"
            :content="opt.tipTitle"
            placement="top">
            <el-button
              :style="opt.style||''"
              :key="opt.title"
              :disabled="opt.disabled || (opt.disabledFunc && opt.disabledFunc(scope.row))"
              :type="opt.type||'default'"
              :plain="opt.plain"
              :icon="opt.icon"
              :circle="opt.circle"
              size="small"
              @click="opt.onClick(scope.$index, scope.row)">
              {{ opt.title }}
            </el-button>
          </el-tooltip>
        </template>
        <template v-else-if="item.type==='val2btn'">
          <el-button
            v-for="(opt, idx) in item.options"
            v-if="opt.isNot ? (opt.value && opt.value.indexOf(scope.row[opt.prop])===-1) : (opt.value && opt.value.indexOf(scope.row[opt.prop])>-1)"
            :key="idx"
            :disabled="opt.disabled"
            :plain="opt.plain"
            :style="opt.style"
            :type="opt.type||'default'"
            size="small"
            @click="opt.onClick(scope.$index, scope.row)">{{ opt.title }}
          </el-button>
        </template>
        <div v-else-if="item.type==='photo'" style="text-align:center;">
          <img
            :width="item.photoWidth || 50"
            :height="item.photoHeight || 50"
            :src="scope.row[item.prop]"
            style="vertical-align:middle;margin: 5px auto;border: 1px solid gray;">
        </div>
        <template v-else-if="item.type==='tags'">
          <el-tag
            v-for="tag in scope.row[item.prop]"
            :key="tag"
            style="margin-right:5px;"
            type="success">{{ tag | filterOperation(item.options) }}
          </el-tag>
          <span v-if="scope.row[item.prop].length===0">暂无</span>
        </template>
        <template v-else-if="item.type==='datetime'">
          {{ scope.row[item.prop] | setDateTime(item.prop) }}
        </template>
        <template v-else-if="item.type==='customFilter'">
          <div
            @click="item.onClick && item.onClick(scope.$index, scope.row, $event)"
            v-html="customFilter(scope.row[item.prop], item, scope.row, scope.$index)"/>
        </template>
        <template v-else-if="item.type==='progress'">
          <el-progress :percentage="getCurrentProp(scope.row, item.prop)"/>
        </template>
        <template v-else>
          <div :style="item.style">{{ getCurrentProp(scope.row, item.prop) }}</div>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import lepopver from './popver'
import letooltip from './tooltip'

export default {
  name: 'Yxtable',
  filters: {
    /**
       * 过滤器,对应有值与title对应关系的数据进行映射
       * @param map
       * @param val
       * @returns {*}
       */
    filterOperation(val, map, style) {
      for (var i = 0; i < map.length; i++) {
        var cur = map[i]
        if (cur.value.toString() === val.toString()) {
          if (style) {
            return cur.style
          }
          return cur.label
        }
      }
      return '暂无'
    },
    /*
              *
              * 过滤器，将时间戳转成时间格式 2017-02-09 20:22:14
              *
              * */
    setDateTime(val) {
      var newdate = ''
      if (val) {
        var date = new Date(val)
        if (!date) {
          return ''
        }
        var YYYY = date.getFullYear()
        var mm = date.getMonth() + 1 > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))
        var dd = date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())
        var hh = date.getHours() > 9 ? date.getHours() : ('0' + date.getHours())
        var MM = date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())
        var ss = date.getSeconds() > 9 ? date.getSeconds() : ('0' + date.getSeconds())
        newdate = YYYY + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss
      }
      return newdate
    }
  },

  components: {
    lepopver: lepopver,
    letooltip: letooltip
  },
  props: {
    table: {
      type: Object,
      default() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
  },

  methods: {
    /**
       * 获取当前属性，如果通过.连接，需要下方属性
       * 目前只支持普通属性的展示使用
       */
    getCurrentProp(row, prop) {
      var resArr = prop.split('.')
      var result = ''
      if (prop.indexOf('.') === -1) {
        return row[prop]
      } else {
        result = row[resArr[0]]
        for (var i = 1; i < resArr.length; i++) {
          result = result && result[resArr[i]]
        }
        return result
      }
    },
    /**
       * 自定义过滤器
       */
    customFilter(val, item, row, idx) {
      if (item && item.filter) {
        return item.filter(val, row, idx)
      } else {
        return val
      }
    }
  }
}
</script>

<style scoped>

</style>
