<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>大数据分析系统</a></li>
      <li class="active jsh-active">大数据挖掘展示</li>
    </ol>
    <div class="shadow-boxs">
      <div class="r-search">
        <form class="form form-inline">

          <div class="form-group">
            <label>展示类型</label>
            <select class="form-control search-01">
              <option>区域</option>
              <option>行业</option>
            </select>
          </div>
          <div class="form-group">
            <label>市</label>
            <input type="text" class="form-control search-01" value="宁夏">
          </div>
          <div class="form-group">
            <label>县/区</label>
            <input type="text" class="form-control search-01" value="钢城区" >
          </div>
          <div class="form-group my-group">
            <button type="button" class="btn  btn-search"> 查询 </button>
          </div>
        </form>
      </div>
    </div>
    <tab-btn-list :tabList="tabList"></tab-btn-list>
    <div class="col-lg-6">
      <div class="shadow-boxs">
        <div class="col-lg-12">
          <!--表格标题部分-->
          <div class="table-title-box">
            <h3>价格统计分布</h3>
          </div>
          <div class="col-lg-12">
              <el-amap ref="map" vid="amap1" style="height: 498px;" class="amap-default"></el-amap>
          </div>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script type="text/ecmascript-6">
  import TabBtnList from "@/components/common/tabBtnList"
  export default {
    components: { TabBtnList },
    data() {
      return {
        tabList: [
          {name: '价格走势', path: 'priceTrend'},
          {name: '价格预测', path: 'priceForecast'},
          {name: '宁夏追溯产品价格比对', path: 'priceComparison'}
        ],
        show: true
      }
    }
  }
</script>

<style>
  #myTab .tab1{
    width: 30px;
    margin: 20px auto;
    padding: 3px;
    background: #1b6d85;
    color: #fff;
    border-radius: 3px;
  }
</style>
