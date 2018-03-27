<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">查看指标</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <div class="main">
        <!--search 组件 按考核指标排名详细-->
        <div class=" shadow-boxs">
          <!--search 搜索框 组件-->
          <div class="r-search">
            <form class="form form-inline">
              <div class="form-group">
                <label>流通节点类型</label>
                <select class="form-control search-01" style="width: 150px;" v-model="params.nodeTypeNo">
                  <option value="">全部</option>
                  <option v-for="nodeType in nodeTypes"
                          :value="nodeType.nodeTypeNo">{{nodeType.nodeTypeName}}
                  </option>
                </select>
                <label>指标名称</label>
                <select class="form-control search-01" style="width: 170px;" v-model="params.examineIndexNo">
                  <option value="">全部</option>
                  <option v-for="examineIndex in examineIndexs"
                          :value="examineIndex.eiNo">{{examineIndex.eiName}}
                  </option>
                </select>
                <label>指标类别</label>
                <select class="form-control search-01" v-model="params.examineTypeId">
                  <option value="">全部</option>
                  <option v-for="examineType in examineTypes"
                          :value="examineType.id">{{examineType.etName}}
                  </option>
                </select>
                <label>流通节点</label>
                <input type="text" class="form-control search-01" style="width: 125px;" v-model="params.storeName"
                       placeholder="请输入流通节点名称">
              </div>
              <div class="form-group my-group">
                <button type="button" class="btn btn-reset" @click="reset">重置</button>
                <button type="button" class="btn btn-search" @click.sync="search">查询</button>
              </div>
            </form>
          </div>
        </div>
        <!--table 组件-->
        <ipt-table
          :tableData="showIndex"
          :tableConfig="tableConfig"
          :params="params">
        </ipt-table>
      </div>
    </template>
  </ipt-modal>
</template>
<script type="application/ecmascript">
  /** 引入弹窗组件 */
  import IptModal from "@/components/common/modal"
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import CommonApi from '@/api'
  import Api from '@/ipt-supervise-help/api'

  export default {
    /*    created() {
     },*/
    components: {
      IptModal, IptTable, CommonApi, Api
    },
    data() {
      return {
        params: {
          storeName: '',
          nodeTypeNo: '',
          examineTypeId: '',
          examineIndexNo: '',
          examineDate: '',
          enterpriseNo: ''
        },
        nodeTypes: [], //搜索条件：流通节点类型(下拉菜单)
        examineTypes: [],  //搜索条件：考核类别(下拉菜单)
        examineIndexs: [],  //搜索条件：考核指标(下拉菜单)
        tableConfig: {
          getApi: 'getShowIndex',
          title: false,  //决定表格的标题内容
          display: 10,
          pagegroup: 5,
          sequenceShow: true,
          columns: [
            {title: '流通节点类型', data: 'nodeTypeName'},
            {title: '指标编号', data: 'examineIndexName'},
            {title: '指标名称', data: 'examineIndexName'},
            {title: '指标类别', data: 'etName'},
            {title: '流通节点', data: 'storeName'},
            {title: '指标得分/分', data: 'examineScore'}
          ]
        }
      }
    },
    watch: {  //弹出层带父页面的值为查询条件时调用 当showIndexData的值发生变化启用
      showIndexData(curVal){
        let obj = this
        obj.reset()
        obj.params.enterpriseNo = curVal.enterpriseNo
        obj.params.examineDate = curVal.examineDate
        obj.init()
      }
    },
    computed: mapGetters({
      showIndex: 'showIndex',
      showIndexData: 'showIndexData' //取父页面的值
    }),
    methods: {
      init() {
        let obj = this
        CommonApi.EnumType.getBusinessTypes({}).then(data => {
          CommonApi.EnumType.getNodeTypes({
            businessTypes: data.data.map(item => item.value).join()
          }).then(nestedData => { //流通节点类型
            obj.nodeTypes = nestedData.data
          })
        })
        Api.ExamineType.getExamineTypeAll().then(data => { //考核指标类别
          obj.examineTypes = data.data
        })
        Api.ExamineManage.getExamineIndexAll().then(data => { //考核指标
          obj.examineIndexs = data.data
        })
        obj.getShowIndex(this.params)
      },
      search() {
        this.getShowIndex(this.params)
      },
      reset() {
        Object.assign(this.$data.params, this.$options.data().params)
      },
      ...mapActions({
        getShowIndex: 'getShowIndex'
      })
    }
  }
</script>
