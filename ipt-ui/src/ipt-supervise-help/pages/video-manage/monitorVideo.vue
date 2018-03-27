<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>视频集中管理</a></li>
      <li class="active jsh-active">监控视频</li>
    </ol>
    <div class="col-lg-4">
      <!--树形菜单-->
      <div class="shadow-boxs">
        <tree-menu :treeMenuData="treeMenuData" @on-change="getVideo($event)"></tree-menu>
      </div>
      <!--树形菜单 end-->
    </div>
    <div class="col-lg-8">
      <div class="shadow-boxs">
        <div class="col-lg-12">
          <!--表格标题部分-->
          <div class="table-title-box">
            <h3>监控视频</h3>
          </div>
          <div class="video-main">
            <div class="videos">
              <ul class="video-box">
                <!--"src": "http://static.qa.dppc.org/test/lw/video/movie.mp4",-->
                <li v-for="(source, index) in videoListData.sources">
                  <p class="video-name">{{ source.name }}</p>
                  <video width="100%" controls>
                    <source :src="source.src" type="video/mp4">
                    您的浏览器不支持Video标签。
                  </video>
                </li>
              </ul>
            </div>
          </div>
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapActions} from 'vuex'
  import IptTable from "@/components/common/table"
  import TreeMenu from "@/components/common/treeMenu"
  import IptPlay from "./play"
  /*import Api from '@/ipt-supervise-help/api'*/

  export default {
    components: {
      IptTable, TreeMenu, IptPlay
    },
    data() {
      return {
        params: {
          deviceType: 3,
          modelNumberType: 0,
          enterpriseName: ''
        },
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
        },
        OptionConfig: {
          isShow: true,
          showBtn: {
            isShow: true
          },
          deleteBtn: {
            isShow: false,
            getApi: ''
          },
          updateBtn: {
            isShow: false,
            getApi: ''
          }
        },
        treeMenuData: [
          {
            type: "种植(养殖)企业",
            treeLists: [
              {
                id: 1,
                name: "黄金篮"
              },
              {
                id: 2,
                name: "名利蔬菜"
              },
              {
                id: 3,
                name: "康源蔬菜"
              }
            ]
          },
          {
            type: "超市单位",
            treeLists: [
              {
                id: 11,
                name: "家家悦"
              },
              {
                id: 12,
                name: "营昊超市"
              },
              {
                id: 13,
                name: "煤机超市(凤城西大街)"
              },
              {
                id: 14,
                name: "大润发(宁夏店)"
              }
            ]
          },
          {
            type: "团消单位",
            treeLists: [
              {
                id: 21,
                name: "金鼎配送中心"
              }
            ]
          },
          {
            type: "特色企业",
            treeLists: [
              {
                id: 21,
                name: "宁夏圣雨节水灌溉设备有限公司"
              },
              {
                id: 22,
                name: "宁夏圣雨节水灌溉设备有限公司"
              },
              {
                id: 23,
                name: "宁夏收获机械制造有限公司"
              },
              {
                id: 24,
                name: "宁夏迪甲商贸有限公司"
              }
            ]
          }
        ]
      }
    },
    computed: mapGetters({
      monitorVideoTableData: 'monitorVideoTableData',
      videoListData: 'videoListData'
    }),
    created() {
      this.init()
    },
    methods: {
      init() {
        this.getVideoListData(1)
        this.getMonitorVideoTableData(this.params)
      },
      //点击左侧菜单获取视频
      getVideo(listId) {
        this.getVideoListData(listId)
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
        getVideoListData: 'getVideoListData',
        getMonitorVideoTableData: 'getMonitorVideoTableData'
      })
    }
  }
</script>

<style>
  .videos {
    height: 460px;

  }

  .video-main {
    overflow-x: hidden;
    overflow-y: scroll;

  }

  .video-box {

    overflow: hidden;
  }

  .video-box li {
    width: 50%;
    padding: 0 20px 20px;
    float: left;
  }

  .video-name {
    margin: 0;
    color: #444;
    line-height: 30px;
    background-color: #ddd;
    padding-left: 10px;
  }

  @media screen and (min-width: 1500px) {
    .video-box li {
      width: 33.333%;
    }
  }
</style>




