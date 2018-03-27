<template>
  <div class="main">
    <!--标题部分-->
    <h4 class="search-title">指标权重设置</h4>
    <div class="shadow-boxs">
      <div class="col-lg-12">
        <div class="table-container h-table-container">
          <div class="thead-bg"></div>
          <div class="col-xs-12 table-box">
            <table class="table table-condensed form-control-content">
              <thead>
              <tr>
                <th>
                  指标类别
                </th>
                <th>
                  权重值(%)
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="examineType in examineTypes">
                <td>
                  {{examineType.etName}}
                </td>
                <td>
                  <input type="text" value="10" v-model="examineType.weighing" class="form-control z-form-control">
                </td>
              </tr>
              <tr>
                <td>
                  合计
                </td>
                <td>
                  <input type="text" value="100" class="form-control z-form-control">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--2个 按钮-->
        <div class="form-group my-group">
          <button type="button" class="btn btn-reset" @click="reset"> 恢复</button>
          <button type="button" class="btn btn-search" @click="create"> 保存</button>
        </div>
      </div>
    </div>
    <h4 class="search-title">考核等级设置</h4>
    <div class="shadow-boxs">
      <template>
        <ul class="slider-color-show">
          <li class="slider-red">不达标</li>
          <li class="slider-yellow">达标</li>
          <li class="slider-blue">良好</li>
          <li class="slider-green">优秀</li>
        </ul>
        <div class="slider-container">
          <span class="number-start">{{main}}分</span>
          <div class="slider-01">
            <el-slider
              v-model="sliders[0]['upScore']"
              :step="step"
              :max="max" @change="sliders1(sliders[0]['upScore'])">
            </el-slider>
          </div>
          <div class="slider-02">
            <el-slider
              v-model="sliders[1]['upScore']"
              :step="step"
              :max="max" @change="sliders2(sliders[1]['upScore'])">
            </el-slider>
          </div>
          <div class="slider-03">
            <el-slider
              v-model="sliders[2]['upScore']"
              :step="step"
              :max="max" @change="sliders3(sliders[2]['upScore'])">
            </el-slider>
          </div>
          <span class="number-end">{{max}}分</span>
        </div>

      </template>
      <div class="form-group my-group">
        <button type="button" class="btn btn-reset" @click="reset"> 恢复</button>
        <button type="button" class="btn btn-search" @click="createSliders"> 保存</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/ipt-supervise-help/api'
  import $ from 'jquery'
  /** 引入弹窗组件 */
  import IptModal from "@/components/common/modal"
  export default {
    components: {
      IptModal
    },
    created() {
      this.init()
    },
    data() {
      return {
        examineTypes: [],
        examineLevels: [],
        step: 0.01, //步长
        main: 0, //最少值
        max: 0, //最大值
        sliders: [
          {upScore: 0, downScore: 0}
          , {upScore: 0, downScore: 0}
          , {upScore: 0, downScore: 0}
        ],
        value1: 0,
        value2: 0,
        value3: 0
      }
    },
    methods: {
      init() {
        Api.ExamineType.getExamineTypeAll().then(data => { //考核指标类别
          this.examineTypes = data.data
        })
        Api.ExamineManage.getExamineLevelAll().then(data => { //考核等级
          let obj = this
          obj.examineLevels = data.data
          obj.examineLevels.forEach(element => {
            switch (parseInt(element.id)) {
              case 1:
                obj.max = parseInt(element.upScore)
                break
              case 2:
                obj.sliders[2].upScore = parseFloat(element.upScore)
                obj.sliders[2].downScore = parseFloat(element.downScore)
                obj.value3 = parseFloat(element.upScore)
                break
              case 3:
                obj.sliders[1].upScore = parseFloat(element.upScore)
                obj.sliders[1].downScore = parseFloat(element.downScore)
                obj.value2 = parseFloat(element.upScore)
                break
              case 4:
                obj.sliders[0].upScore = parseFloat(element.upScore)
                obj.sliders[0].downScore = parseFloat(element.downScore)
                obj.value1 = parseFloat(element.upScore)
                obj.main = parseFloat(element.downScore)
                break
            }
          })
        })
      },
      create() {
        var that = this
        /** 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            let examineTypes = that.examineTypes
            let sum = 0
            examineTypes.forEach(element => {
              sum = sum + parseInt(element.weighing)
            })
            if (sum !== 100) {
              this.$alert('权重之和不为100!请重新填写！')
              return false
            }
            Api.ExamineType.saveExamineTypeWeighing(that.examineTypes).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  $('#js_edit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
                }
              })
              /** 更新表格分页数据 */
              that.init()
            })
            return
          }
          this.$alert('保存失败!')
        })
      },
      reset() {
        this.init()
        this.$message('恢复成功!')
      },
      createSliders() {
        let obj = this
        obj.sliders[1].downScore = (obj.sliders[0].upScore + obj.step)
        obj.sliders[2].downScore = (obj.sliders[1].upScore + obj.step)
        obj.examineLevels.forEach(element => {
          switch (parseInt(element.id)) {
            case 1:
              element.downScore = (obj.sliders[2].upScore + obj.step)
              break
            case 2:
              element.upScore = obj.sliders[2].upScore
              element.downScore = obj.sliders[2].downScore
              break
            case 3:
              element.upScore = obj.sliders[1].upScore
              element.downScore = obj.sliders[1].downScore
              break
            case 4:
              element.upScore = obj.sliders[0].upScore
              break
          }
        })
        Api.ExamineManage.saveExamineLevel(obj.examineLevels).then((data) => {
          this.$alert(data.msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              $('#js_edit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
            }
          })
          /** 更新表格分页数据 */
          obj.init()
        })
      },
      sliders1(val) {
        let obj = this
        let value = obj.sliders[1].upScore
        if (value <= val) {
          obj.$msgbox('不达标分数越界，请重新操作!')
          obj.sliders[0].upScore = obj.value1
        }
      },
      sliders2(val) {
        let obj = this
        let value1 = obj.sliders[0].upScore
        let value2 = obj.sliders[2].upScore
        if (value2 <= val) {
          obj.$msgbox('达标分数越界，请重新操作!')
          obj.sliders[1].upScore = obj.value2
          return false
        }
        if (value1 >= val) {
          obj.$msgbox('达标分数越界，请重新操作!')
          obj.sliders[1].upScore = obj.value2
          return false
        }
      },
      sliders3(val) {
        let obj = this
        let value = obj.sliders[1].upScore
        let value1 = 99.99  //良好上线值
        if (value >= val) {
          obj.$msgbox('良好分数越界，请重新操作!')
          obj.sliders[2].upScore = obj.value3
          return false
        }
        if (value1 <= val) {
          obj.$msgbox('良好分数越界，请重新操作!')
          obj.sliders[2].upScore = obj.value3
          return false
        }
      }
    }
  }
</script>

<style>
  .search-title {
    margin-bottom: 8px;
  }

  .h-table-container {
    margin-bottom: 15px;
  }

  .slider-color-show {
    margin: 70px 0 30px 50px;
    overflow: hidden;
  }

  .slider-color-show li {
    float: left;
    margin-right: 20px;

  }

  .slider-color-show li.slider-red:before {
    width: 15px;
    height: 10px;
    margin-right: 5px;
    content: '';
    display: inline-block;
    background-color: #f00;
    border-radius: 3px;
  }

  .slider-color-show li.slider-yellow:before {
    width: 15px;
    height: 10px;
    margin-right: 5px;
    content: '';
    display: inline-block;
    background-color: #f0ad4e;
    border-radius: 3px;
  }

  .slider-color-show li.slider-blue:before {
    width: 15px;
    height: 10px;
    margin-right: 5px;
    content: '';
    display: inline-block;
    background-color: #00b3ee;
    border-radius: 3px;
  }

  .slider-color-show li.slider-green:before {
    width: 15px;
    height: 10px;
    margin-right: 5px;
    content: '';
    display: inline-block;
    background-color: #00bb00;
    border-radius: 3px;
  }

  .slider-container {
    margin-left: 1%;
    width: 80%;
    position: relative;
    height: 58px;
  }

  .number-start {
    position: absolute;
    left: 2%;
    top: 8px;
  }

  .number-end {
    position: absolute;
    left: 86%;
    top: 8px;
  }

  .slider-01, .slider-02, .slider-03 {
    position: absolute;
    top: 0;
    left: 5%;
    width: 80%;
    height: 40px;
  }

  .slider-01 .el-slider__bar {
    background-color: #f00;
    z-index: 4;
  }

  .slider-01 .el-slider__button {
    border: 2px solid #f00;
  }

  .slider-02 .el-slider__bar {
    background-color: #f0ad4e;
    z-index: 3;
  }

  .slider-02 .el-slider__button {
    border: 2px solid #f0ad4e;
  }

  .slider-03 .el-slider__bar {
    background-color: #00b3ee;
    z-index: 2;
  }

  .slider-03 .el-slider__button {
    border: 2px solid #00b3ee;
  }

  .el-slider__runway {
    background-color: #00bb00;
  }
</style>
