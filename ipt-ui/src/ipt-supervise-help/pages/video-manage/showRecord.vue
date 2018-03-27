<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">企业监控记录</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <div class="shadow-boxs">
        <div class="col-lg-12">
          <!-- [弹窗]引入添加弹窗，指定id与触发按钮关联 -->
          <ipt-play id="js_play_modal" :videoData="videoData"></ipt-play>
          <ipt-table
            :tableData="monitorVideoTableData"
            :tableConfig="tableDataConfig"
            :params="params">
            <th slot="afterTitle">操作</th>
            <td slot="afterBody" slot-scope="scope">
              <a class="play" @click="playBtn(scope.columnData)" data-toggle="modal" data-target="#js_play_modal">播放</a>
            </td>
          </ipt-table>
        </div>
      </div>
    </template>
  </ipt-modal>
</template>
<script>
  /** 引入弹窗组件 */
  import {mapGetters, mapActions} from 'vuex'
  import IptModal from "@/components/common/modal"
  import IptTable from "@/components/common/table"
  import IptPlay from "./play"

  export default {
    components: {
      IptTable, IptModal, IptPlay
    },
    created() {
      this.init()
    },
    data() {
      return {
        params: {},
        videoData: "",
        tableDataConfig: {
          getApi: 'getMonitorVideoTableData',  // #必须# 数据的的请求Vuex的Action名
          title: "",             // [可选] 表格标题，默认不显示标题
          display: 6,                       // [可选] 每页显示多少条数据，默认10条
          pagegroup: 5,                      // [可选] 分页号码显示个数，默认10条
          sequenceShow: true,                // [可选] 是否显示序号
          columns: [                         // [必须] 表格每列取JSON数据的哪个值
            {title: '设备名称', data: 'deviceName'},
            {title: '通道名称', data: 'channelName'},
            {title: '开始时间', data: 'startTime'},
            {title: '结束时间', data: 'endTime'},
            {title: '文件大小', data: 'fileSize'}
          ]
        }
      }
    },
    computed: mapGetters({
      monitorVideoTableData: 'monitorVideoTableData'
    }),
    methods: {
      init() {
        this.getMonitorVideoTableData()
      },
      playBtn(columnData) {
        this.videoData = {
          "name": columnData.deviceName,
          "src": "http://lwipt.qa.dppc.org/upload/video/supermarket.mp4",
          "type": "video/mp4"
        }
        document.getElementById("myVideo").load()
        /*Api.VideoManage.findVideoById(columnData.id).then((data) => {
         })*/
      },
      ...mapActions({
        getMonitorVideoTableData: 'getMonitorVideoTableData'
      })
    }
  }
</script>
