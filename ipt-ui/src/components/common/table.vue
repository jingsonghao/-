<template>
  <div>
    <div class="table-title-box" v-if="tableConfig.title">
      <h3>{{tableConfig.title}}</h3>
    </div>
    <!--表格插件-->
    <div class="table-container">
      <div class="thead-bg"></div>
      <div class="col-xs-12 table-box">
        <table class="table table-condensed">
          <thead>
          <tr>
            <slot name="beforeTitle"></slot>
            <th v-if="tableConfig.sequenceShow" :title="'序号'">序号</th>
            <th v-for="item in headerLists" :title="item">{{ item }}</th>
            <slot name="afterTitle"></slot>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(itemTr, index) in tableData.data">
            <slot name="beforeBody" :index="index" :columnData="itemTr"></slot>
            <td v-if="tableConfig.sequenceShow" v-text="getSeq(index)"></td>
            <td class="js_clipboard" v-for="(key, index) in dataKeys" v-if="index <= headerLists.length - 1"
                :title="getRowData(key, itemTr)"
                v-clipboard="getRowData(key, itemTr)"
                @success="onCopy"
            >
                {{getRowData(key, itemTr) ? getRowData(key, itemTr) : '-'}}
            </td>
            <slot name="afterBody" :index="index" :columnData="itemTr"></slot>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--分頁組件-->
    <div v-if="!pagerShow" style="height: 15px;"></div>
    <boot-page v-if="pagerShow" :pageConfig="pageConfig" :params="params"></boot-page>
  </div>
</template>
<script type="text/ecmascript-6">
  import BootPage from './bootPage'

  export default {
    components: {
      BootPage
    },
    data () {
      return {}
    },
    created () {
      if (this.params) {
        this.$emit('update:params', Object.assign(this.params, {size: this.tableConfig.display}))
      }
    },
    props: {
      pagerShow: {
        type: Boolean,
        default: true
      },
      params: {},
      tableConfig: {
        type: Object,
        default () {
          return {
            getApi: '',
            title: '',
            display: 10,
            pagegroup: 5,
            sequenceShow: false,
            columns: [
              {title: '', data: ''}
            ]
          }
        }
      },
      tableData: {
        type: Object,
        default () {
          return {
            totalRecords: 0, // 总条数
            currentPage: 1, // 当前页
            totalPages: 1, // 总页数
            data: []
          }
        }
      }
    },
    computed: {
      headerLists () {
        return this.tableConfig.columns.map(column => column.title)
      },
      dataKeys () {
        return this.tableConfig.columns.map(column => column.data)
      },
      pageConfig () {
        return {
          totalRecords: this.tableData.totalRecords || 0,
          currentPage: this.tableData.currentPage || 1,
          totalPages: this.tableData.totalPages || 1,
          getApi: this.tableConfig.getApi,
          display: this.tableConfig.display || 10,
          pagegroup: this.tableConfig.pagegroup || 5
        }
      },
      rowStart () {
        return ((this.tableData.currentPage || 1) - 1) * (this.tableConfig.display || 10) + 1
      }
    },
    methods: {
      getSeq (index) {
        return this.rowStart + parseInt(index)
      },
      getRowData (key, row) {
        let split = key.split('.')
        let data = row
        split.forEach(element => {
          if (!data) {
            return ''
          }
          data = data[element]
        })
        return data
      },
      onCopy: function () {
        this.$notify({
          title: '数据已拷贝！',
          duration: 1500
        })
      }
    }
  }
</script>
<style>
  .el-notification {
    width: 260px!important;
  }
  .el-notification h2 {
    color: #297199!important;
  }
</style>
