<template>
  <div class="main">
    <ol class="breadcrumb">
      <li><a>监管辅助系统</a></li>
      <li><a>工作考核管理</a></li>
      <li class="active jsh-active">考核指标类型管理</li>
    </ol>
    <div class="table-container">
      <div class="thead-bg"></div>
      <div class="col-xs-12 table-box">
        <table class="table table-condensed form-control-content">
          <thead>
          <tr>
            <th>
              <span>显示序号</span>
            </th>
            <th>
              考核指标类别
            </th>
            <th>
              操作
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in assessTypeList" :key="uuids[index]">
            <td>
              <input type="text" :value="index+1" class="form-control" disabled>
            </td>
            <td>
              <input type="text" v-model="item.etName" class="form-control"
                     :name="'etName' + uuids[index]" v-validate="'required'"
                     :class="{'is-danger': errors.has('etName' + uuids[index])}">
              <span v-show="errors.firstByRule('etName' + uuids[index], 'required')"
                    class="help is-danger">请填写指标类别</span>
            </td>
            <td>
              <button type="button" class="btn btn-reset" @click="deleteBtn(index)">x</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="form-group my-group save_add">
      <button type="button" class="btn btn-reset" @click="addBtn()">+</button>
      <button type="button" class="btn btn-search" @click="saveBtn()">保存</button>
    </div>
  </div>
</template>

<script>
  import Api from '@/ipt-supervise-help/api'
  export default {
    created() {
      this.init()
    },
    components: {
      Api
    },
    data() {
      return {
        assessTypeList: [],
        uuids: []
      }
    },
    methods: {
      init() {
        Api.ExamineType.getExamineTypeAll().then(data => {
          let obj = this
          obj.assessTypeList = data.data
          obj.assessTypeList.forEach(element => {
            this.uuids.push(window.uuidV4())
          })
        })
      },
      deleteBtn(index) {
        let obj = this
        obj.assessTypeList.splice(index, 1)
        obj.uuids.splice(index, 1)
      },
      addBtn() {
        let obj = this
        let size = obj.assessTypeList.length
        obj.assessTypeList.splice(size, 0, {
          createDate: "",
          etName: "",
          id: null,
          weighing: ""
        })
        obj.uuids.splice(size, 0, window.uuidV4())
      },
      saveBtn() {
        let obj = this
        obj.$validator.validateAll().then((result) => {
          if (result) {
            Api.ExamineType.saveExamineType(obj.assessTypeList).then(data => {
                obj.$alert(data.msg, '提示', {
                  confirmButtonText: '确定'
                })
              this.init()
            })
          }
        })
      }
    }
  }
</script>


<style>
  .save_add {
    margin-top: 2%;
    margin-right: 13%;
  }

  .is-danger {
    border-color: #EF5350;
  }

  label.is-danger, .help.is-danger {
    color: #EF5350;
  }
</style>
