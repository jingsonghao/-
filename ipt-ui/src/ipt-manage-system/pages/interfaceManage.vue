<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>后台管理系统</a></li>
      <li class="active jsh-active">接口管理</li>
    </ol>
    <div class="shadow-boxs">
      <div class="col-lg-9 from-top">
        <form class="form-horizontal form-control-content">
          <div class="form-group">
            <label class="col-sm-3 control-label">请求格式：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="charset=utf-8">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">返回格式：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" placeholder="charset=utf-8">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">提交方式：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="POST">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">访问地址：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="/anoc/rel/index">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">客户端ID：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="/anoc/rel/index">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">客户端ID：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="86786adsf876asd876das">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">客户端Secret：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="SDF986789">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">客户端授权地址：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" placeholder="授权地址（可选），默认当前地址">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">dreverNo：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="DY875687">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">carNo：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="C122342">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">enterpriseNo：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="E122342234">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">driveName：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="xxx">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">longitude：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="1245.6865">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">speed：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="55">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">carStatus：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="0">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">crateTimeSAtr：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="0">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">searalNum：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" placeholder="searalNum">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">template[0]:searalNum：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="-">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">template[0]:temperature：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="0">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">template[0]:humidity：</label>
            <div class="col-sm-7">
              <input type="text" class="form-control" value="20">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">temperature：</label>
            <div class="col-sm-7">
              <input class="btn btn-default btn-primary" type="button" value="添加temperature">
            </div>
          </div>
          <div class="form-group ">
            <label class="col-sm-3 control-label"></label>
            <div class="col-sm-7">
              <input class="btn btn-default btn-danger" type="submit" value="立即提交">
            </div>
          </div>
        </form>
      </div>
      <div class="col-lg-3 from-top">
        <form class="form-horizontal form-control-content">
          <div class="form-group">
            <label class="col-sm-4 control-label">请求参数：</label>
            <div class="col-sm-12">
              <textarea class="form-control" rows="3">2345vsrfge456evrgdfy45ew45t345</textarea>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label">返回参数：</label>
            <div class="col-sm-12">
              <textarea class="form-control" rows="3">23asdfew5q34245e45t</textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  //  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {}
    }
  }
</script>
<style>
  .from-top {
    margin-top: 10px;
  }
</style>
