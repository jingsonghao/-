<template>

    <div id="zmsp">
      <ol class="breadcrumb">
        <li><a>监管辅助系统</a></li>
        <li><a>问题发现管理</a></li>
        <li class="active jsh-active">问题信息统计</li>
      </ol>
       <div class="main">
         <div class="col-lg-6">
           <div class="col-lg-12">
             <div class="shadow-boxs">
               <div class="col-lg-12">

                 <!--表格标题部分-->
                 <div class="table-title-box">
                   <h3>种植（养殖）企业错误数据统计分析</h3>
                   <select name=""  class="form-control search-02">
                     <option value="">日</option>
                     <option value="" selected>月</option>
                     <option value="">季</option>
                     <option value="">年</option>
                   </select>
                 </div>
                 <!--考核评价图标-->
                 <ipt-echart :echartData="tubiao1"></ipt-echart>
               </div>
             </div>
           </div>
           <div class="col-lg-12">
             <div class="shadow-boxs">
               <div class="col-lg-12">

                 <!--表格标题部分-->
                 <div class="table-title-box">
                   <h3>团消单位错误数据统计分析</h3>
                   <select name=""  class="form-control search-02">
                     <option value="">日</option>
                     <option value="" selected>月</option>
                     <option value="">季</option>
                     <option value="">年</option>
                   </select>
                 </div>
                 <!--考核评价图标-->
                 <ipt-echart :echartData="tubiao2"></ipt-echart>
               </div>
             </div>
           </div>
           <div class="col-lg-12">
               <div class="shadow-boxs ">
                 <div class="col-lg-12">
                   <!--表格标题部分-->
                   <div class="table-title-box">
                     <h3>企业类型错误数据占比</h3>
                     <select name=""  class="form-control search-02">
                       <option value="">日</option>
                       <option value="" selected>月</option>
                       <option value="">季</option>
                       <option value="">年</option>
                     </select>
                   </div>
                   <!--考核评价图标-->
                   <ipt-echart :echartData="tubiao5"></ipt-echart>
                 </div>
               </div>
           </div>
         </div>
         <div class="col-lg-6">
           <div class="col-lg-12">
             <div class="shadow-boxs ">
               <div class="col-lg-12">
                 <!--表格标题部分-->
                 <div class="table-title-box">
                   <h3>超市错误数据统计分析</h3>
                   <select name=""  class="form-control search-02">
                     <option value="">日</option>
                     <option value="" selected>月</option>
                     <option value="">季</option>
                     <option value="">年</option>
                   </select>
                 </div>
                 <!--考核评价图标-->
                 <ipt-echart :echartData="tubiao3"></ipt-echart>
               </div>
             </div>
           </div>
           <div class="col-lg-12">
             <div class="shadow-boxs ">
               <div class="col-lg-12">
                 <!--表格标题部分-->
                 <div class="table-title-box">
                   <h3>特色企业错误数据统计分析</h3>
                   <select name=""  class="form-control search-02">
                     <option value="">日</option>
                     <option value="" selected>月</option>
                     <option value="">季</option>
                     <option value="">年</option>
                   </select>
                 </div>
                 <!--考核评价图标-->
                 <ipt-echart :echartData="tubiao4"></ipt-echart>
                 </div>
               </div>
             </div>
           <div class="col-lg-12">
             <div class="shadow-boxs">
               <div class="col-lg-12" style="padding: 0;">
                 <div id="zmap" style="height:370px;">
                   <el-amap
                     vid="amap-3"
                     :zoom="zoom"
                     :center="center"
                     :events="events"
                     class="amap-default">
                     <el-amap-marker
                       v-for="(marker, key) in markers"
                       :position="marker.position"
                       :events="marker.events"
                       :visible="marker.visible"
                       :draggable="marker.draggable"
                       :key="key"
                       :vid="key">
                     </el-amap-marker>
                     <el-amap-info-window
                       :position="contentWindow.position"
                       :content="contentWindow.content"
                       :events="contentWindow.events">
                     </el-amap-info-window>
                   </el-amap>
                 </div>
               </div>
             </div>
           </div>
         </div>

       </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import IptEchart from '@/components/common/echart'
  import Utils from "@/utils"
    export default {
      created() {
        this.addMarker()
      },
      methods: {
        removeMarker(marker) {
          if (marker) {
            Utils.ArrayUtil.remove(this.markers, marker)
          }
          if (!this.markers.length) {
            return
          }
          this.markers.splice(this.markers.length - 1, 1)
        },
        addMarker() {
          let marker = {
            position: [117.735457, 36.107954]
          }
          this.removeMarker()
          this.markers.push(marker)
        }
      },
      data() {
        return {
          current: 1,
          contentWindow: {
            position: [117.746457, 36.118954],
            content: '企业名称：新泰有限公司 问题数据：1000条',
            visible: true,
            events: {
              close() {
                console.log('close infowindow')
              }
            }
          },
          point: {},
          markers: [],
          zoom: 10,
          center: [106.226806, 38.492294],
          events: {
            click(e) {
              self.enterpriseEdit.longitude = e.lnglat.lng
              self.enterpriseEdit.latitude = e.lnglat.lat
              self.addMarker(e.lnglat)
              self.$nextTick()
            }
          },
          plugin: [
            {
              pName: 'Scale',
              events: {
                init(instance) {
                  console.log(instance)
                }
              }
            },
            {
              pName: 'ToolBar',
              events: {
                init(instance) {
                  console.log(instance)
                }
              }
            }
          ],
          tubiao1: {
          id: 'main1',
          height: '300',
          option: {
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['错误数据数量']
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '8%',
              containLabel: true
            },
            xAxis : {
              type : 'category',
              name: '',
              data: [
                '大峰食品',
                '万兴食品',
                '大千农牧',
                '赢泰有机农业',
                '仙弄业园蔬牧业',
                '润百禾',
                '泰顺斋',
                '朗野蜂业',
                '玉林农产品',
                '五福茶叶'
              ],
              axisTick: {
                alignWithLabel: true
              },
              axisLabel:{
                interval:0,
                rotate:15,
                textStyle:{
                  color:'#000'
                }
              },
              axisLine:{
                lineStyle:{
                  color:'rgb(51,51,51)',
                  width:1
                }
              }
            },
            yAxis: {
              type: 'value',
              name:'错误数据数量',
              splitLine: {
                lineStyle: {
                }
              },
              axisLine:{
                lineStyle:{
                  color: 'rgb(51,51,51)',
                  width: 1
                }
              },
              axisLabel:{
                textStyle:{
                  color:'#000'
                }
              }
            }
            ,
            series : [
              {
                name:'错误数据数量',
                type:'bar',
                barWidth: '30%',
                data: [150, 87, 208, 156, 84, 219, 334, 121, 235, 334],
                itemStyle:{
                  normal:{
                    color:'#61b8eb'
                  }
                }
              }
            ]
            }
          },
          tubiao2: {
            id: 'main2',
            height: '300',
            option: {
              color: ['#3398DB'],
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: ['错误数据数量']
              },
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '8%',
                containLabel: true
              },
              xAxis: {
                type : 'category',
                name:'',
                data: [
                  '大峰食品',
                  '万兴食品',
                  '大千农牧',
                  '赢泰有机农业',
                  '仙弄业园蔬牧业',
                  '润百禾',
                  '泰顺斋',
                  '朗野蜂业',
                  '玉林农产品',
                  '五福茶叶'
                ],
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel:{
                  interval:0,
                  rotate:15,
                  textStyle:{
                    color:'#000'
                  }
                },
                axisLine:{
                  lineStyle:{
                    color: 'rgb(51,51,51)',
                    width: 1
                  }
                }
              },
              yAxis : {
                type : 'value',
                name:'错误数据数量',
                splitLine: {
                  lineStyle: {
                    // 使用深浅的间隔色
                  }
                },
                nameTextStyle: {
                  color: ['rgb(255,255,255)']
                },
                axisLine:{
                  lineStyle:{
                    width: 1
                  }
                },
                axisLabel:{
                  textStyle:{
                    color:'#000'
                  }
                }
              }
              ,
              series : [
                {
                  name:'错误数据数量',
                  type:'bar',
                  barWidth: '30%',
                  data: [150, 84, 219, 334, 121, 235, 334, 87, 208, 156],
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                  itemStyle:{
                    normal:{
                      color:'#84edae'
                    }
                  }
                }
              ]
            }
          },
          tubiao3: {
            id: 'main3',
            height: '300',
            option: {
              color: ['#3398DB'],
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: ['错误数据数量']
              },
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '8%',
                containLabel: true
              },
              xAxis : {
                type : 'category',
                name:'',
                data: [
                  '大峰食品',
                  '万兴食品',
                  '大千农牧',
                  '赢泰有机农业',
                  '仙弄业园蔬牧业',
                  '润百禾',
                  '泰顺斋',
                  '朗野蜂业',
                  '玉林农产品',
                  '五福茶叶'
                ],
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel:{
                  interval:0,
                  rotate:15,
                  textStyle:{
                    color:'#000'
                  }
                },
                axisLine:{
                  lineStyle:{
                    color:'rgb(51,51,51)',
                    width: 1
                  }
                }
              }
              ,
              yAxis : {
                type : 'value',
                name:'错误数据数量',
                splitLine: {
                  lineStyle: {
                    // 使用深浅的间隔色
                  }
                },
                nameTextStyle: {
                },
                axisLine:{
                  lineStyle:{
                    color:'rgb(51,51,51)',
                    width: 1
                  }
                },
                axisLabel:{
                  textStyle:{
                    color:'#000'
                  }
                }
              }
              ,
              series : [
                {
                  name:'错误数据数量',
                  type:'bar',
                  barWidth: '30%',
                  data: [150, 84, 219, 235, 334, 334, 121, 87, 208, 156],
                  itemStyle:{
                    normal:{
                      color:'#ebca6a'
                    }
                  }
                }
              ]
            }
          },
          tubiao4: {
            id: 'mian4',
            height: '300',
            option: {
              color: ['#3398DB'],
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: ['错误数据数量']
              },
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '8%',
                containLabel: true
              },
              xAxis: {
                type : 'category',
                name:'',
                data: [
                  '大峰食品',
                  '万兴食品',
                  '大千农牧',
                  '赢泰有机农业',
                  '仙弄业园蔬牧业',
                  '润百禾',
                  '泰顺斋',
                  '朗野蜂业',
                  '玉林农产品',
                  '五福茶叶'
                ],
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel:{
                  interval:0,
                  rotate:15,
                  textStyle:{
                    color:'#000'
                  }
                },
                axisLine:{
                  lineStyle:{
                    color:'rgb(51,51,51)',
                    width:1
                  }
                }
              },
              yAxis: {
                type : 'value',
                name:'错误数据数量',
                splitLine: {
                  lineStyle: {
                    // 使用深浅的间隔色
                  }
                },
                nameTextStyle: {
                },
                axisLine:{
                  lineStyle:{
                    color:'rgb(51,51,51)',
                    width: 1
                  }
                },
                axisLabel:{
                  textStyle:{
                    color:'#000'
                  }
                }
              },
              series : [
                {
                  name:'错误数据数量',
                  type:'bar',
                  barWidth: '30%',
                  data: [208, 156, 219, 150, 84, 235, 334, 121, 334, 87],
                  itemStyle:{
                    normal:{
                      color:'#4c8eba'
                    }
                  }
                }
              ]
            }
          },
          tubiao5: {
            id: 'mian5',
            height: '300',
            option: {
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"

              },
              color:['#61b8eb', '#84edae', '#ebca6a', '#4c8fb5', '#e78f48'],
              legend: {
                orient: 'vertical',
                left: 'left',
                data : ['种植（养殖）企业', '超市单位', '团消单位', '特色企业'],
                textStyle:{    //图例文字的样式
                  color:'#000',
                  fontSize:12
                }
              },
              series: [{
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                  value: 310,
                  name: '种植（养殖）企业'
                },
                  {
                    value: 210,
                    name: '超市单位'

                  },
                  {
                    value: 310,
                    name: '团消单位'

                  },
                  {
                    value: 100,
                    name: '特色企业'

                  }
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(155, 0, 0, 0.9)'
                  }
                }
              }]
            }
          }
        }
      },
      components: {
        IptEchart
      }
    }
</script>

<style>
  #zmsp .el-vue-amap-container {
    height: 370px !important;
  }
</style>
