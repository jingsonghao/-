<!--追溯信息查询-->
<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>追溯管理系统</a></li>
      <li><a>追溯信息管理</a></li>
      <li class="active jsh-active">追溯信息查询</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">
          <div class="form-group">
            <label>重要产品类别：</label>
            <el-select v-model="params.businessTypes" name="businessTypes" filterable placeholder="全部">
              <el-option key="" label="全部" :value="businessTypeValues"></el-option>
              <el-option
                v-for="item in businessTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn btn-reset"> 重置 </button>
            <button type="button" class="btn btn-search"> 查询 </button>
          </div>
        </form>
      </div>
    </div>
    <div class="tab-btn-list shadow-boxs">
      <ul class="tab-btn">
        <li :class="{ 'active': activeTabIndex === index }" v-for="(item, index) in nodeTypes">
          <a @click="activeTab(index)">{{ item.nodeTypeName }}</a>
        </li>
      </ul>
    </div>
    <div>
      <div class="col-lg-3">
        <div class="shadow-boxs circulation-list">
          <ul>
            <li v-for="(item, index) in activeDataTypes" @click="activeList(index)">
              <a>{{ item.typeDataName }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-9">
        <div>
          <div class="shadow-boxs">
            <div class="r-search">
              <form class="form form-inline">
                <div class="form-group" v-for="item in searchConfig">
                  <label>{{ item.title }}：</label>
                  <input type="text" class="form-control search-01" placeholder="" v-model="tableParams[item.data]">
                </div>
                <div class="form-group my-group">
                  <button type="button" class="btn btn-reset" @click="reset"> 重置 </button>
                  <button type="button" class="btn btn-search" @click="search"> 查询 </button>
                </div>
              </form>
            </div>
          </div>
          <div class="shadow-boxs">
            <div class="col-lg-12">
              <ipt-table
                :tableData="pageData"
                :tableConfig.sync="tableConfig"
                :params="tableParams"></ipt-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapActions } from 'vuex'
  import IptTable from '@/components/common/table'

  export default {
    components: {
      IptTable
    },
    created () {
      this.getBusinessTypes()
      this.getDataTypes()
    },
    data () {
      return {
        params: {
          businessTypes: ''
        },
        tableParams: { },
        tableConfig: {
          getApi: 'getPageData',
          display: 10,
          pagegroup: 5,
          sequenceShow: true,
          columns: []
        },
        activeTabIndex: 0,
        activeListIndex: 0
      }
    },
    watch: {
      'params.businessTypes': function (curVal) {
        this.activeTabIndex = 0
        this.activeListIndex = 0
        this.getNodeTypes({businessTypes: curVal})
      }
    },
    methods: {
      activeTab (index) {
        this.activeTabIndex = index
        this.activeList(0)
      },
      activeList (index) {
        this.activeListIndex = index
        if (this.activeDataTypes.length > 0) {
          let activeDataType = this.activeDataTypes[index]
          this.tableParams.id = activeDataType.typeDataId
          this.getPageData(this.tableParams)
          this.tableConfig.columns = activeDataType.tableColumnsList || []
        }
      },
      search () {
        this.getPageData(this.tableParams)
      },
      reset () {
        if (this.activeDataTypes.length > 0) {
          let activeDataType = this.activeDataTypes[this.activeListIndex]
          this.tableParams = {
            size: this.tableConfig.display
            , id: activeDataType.typeDataId
          }
          let columnConfig = activeDataType['tableColumnsList']
          if (columnConfig && columnConfig.length > 1) {
            columnConfig.forEach(item => {
              if (item.search) {
                this.tableParams[item.data] = ''
              }
            })
          }
        }
      },
      ...mapActions({
        getBusinessTypes: 'getBusinessTypes',
        getNodeTypes: 'getNodeTypes',
        getDataTypes: 'getDataTypes',
        getPageData: 'getPageData'
      })
    },
    computed: {
      /** yanggang 2018/2/1 产品类别默认全部 */
      businessTypeValues () {
        if (this.businessTypes.length > 0) {
          return this.businessTypes.map(item => item.value).join()
        }
        return ''
      },
      activeNode () {
        return this.nodeTypes ? this.nodeTypes[this.activeTabIndex] : {}
      },
      activeDataTypes () {
        let result = []
        let activeNodeTypeNo = this.activeNode.nodeTypeNo
        if (this.dataTypes.data.length > 0) {
          this.dataTypes.data.forEach(item => {
            if (item.nodeTypeNo === activeNodeTypeNo) {
              result.push(item)
            }
          })
        }
        return result
      },
      searchConfig () {
        let result = []
        if (this.activeDataTypes.length > 0) {
          let activeDataType = this.activeDataTypes[this.activeListIndex]
          this.tableParams = {
            size: this.tableConfig.display
            , id: activeDataType.typeDataId
          }
          let columnConfig = activeDataType['tableColumnsList']
          if (columnConfig && columnConfig.length > 1) {
            columnConfig.forEach(item => {
              if (item.search) {
                this.tableParams[item.data] = ''
                result.push(item)
              }
            })
          }
        }
        return result
      },
      ...mapGetters({
        businessTypes: 'businessTypes',
        nodeTypes: 'nodeTypes',
        dataTypes: 'dataTypes',
        pageData: 'pageData'
      })
    }
  }
</script>

<style>
  .tab-btn-list li.active {
    color: #54d4f1;
  }

  .tab-btn-list li.active a {
    cursor: default;
  }

  .tab-btn-list li:hover {
    color: #54d4f1;
  }

  .circulation-list {
    height: auto;
  }

  .circulation-list li {
    line-height: 44px;
    text-align: center;
    border-bottom: 1px solid #999;
  }

  .circulation-list li:nth-last-child(1) {
    border-bottom: none;
  }

  .circulation-list li:nth-child(2n+1) {
    background-color: #61b8eb;
  }

  .circulation-list li:nth-child(2n) {
    background-color: #84edae;
  }

  .circulation-list li a {
    color: #fff;
  }

  a {
    text-decoration: none;
    color: #000;
  }
</style>
