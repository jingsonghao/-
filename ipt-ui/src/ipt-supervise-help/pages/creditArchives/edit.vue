<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="edit-link">编辑</h4>
        </div>
        <div class="modal-body row form-control-content">
          <div class="modal-left col-xs-12">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-3 control-label">企业名称</label>
                <div class="col-sm-7">
                  <select type="text" class="form-control" v-model="creditArchives.enterpriseNo" name="enterpriseNo">
                    <option value="">请选择</option>
                    <option value="宁夏X企业">宁夏X企业</option>
                    <option value="xx企业">xx企业</option>
                    <option value="aaa企业">aaa企业</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">企业类型</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control search-01" placeholder="" v-model="creditArchives.enterpriseNo" name="enterpriseNo">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">行为类型</label>
                <div class="col-sm-7">
                  <select type="text" class="form-control" v-model="creditArchives.hlType" name="hlType"
                          v-validate="'required'" :class="{'is-danger': errors.has('hlType') }">
                    <option value="">请选择</option>
                    <!--<option v-for="option in hlTypes" :value="option.id">{{ option.htName }}</option>-->
                    <!--<option value="宁夏X企业">宁夏X企业</option>-->
                    <!--<option value="xx企业">xx企业</option>-->
                    <!--<option value="aaa企业">aaa企业</option>-->
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">行为描述</label>
                <div class="col-sm-7">
                  <textarea type="text" class="form-control" v-model="creditArchives.describe" name="describe"></textarea>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">加减分</label>
                <div class="col-sm-7">
                  <select type="text" class="form-control"  v-model="creditArchives.hrScore" name="hrScore" >
                    <option>请选择</option>
                    <option value="1">+1分</option>
                    <option value="2">-2分</option>
                    <option value="3">+3分</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-reset" data-dismiss="modal">取消</button>
          <button type="button" class="btn  btn-search">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
      props: {
        creditArchives: {}
      }
    }
</script>
