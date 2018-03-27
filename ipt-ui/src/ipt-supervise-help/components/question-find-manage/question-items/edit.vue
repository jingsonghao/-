<template>
  <ipt-modal>
    <!-- [modalTitle]标题插槽 -->
    <span slot="modalTitle">编辑</span>
    <!-- [modalBody]内容插槽 -->
    <template slot="modalBody">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">问题比例</label>
          <div class="col-sm-7" style="padding-top: 7px;">
            <!--<input type="text" v-model="editQuestionItems.scale" name="scale" class="form-control">-->
            <!--<a class="form-control">{{ editQuestionItems.scale | percentageFormat(0) }}</a>-->
            问题数据数量/上传数据总数量X100%
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">问题级别</label>
          <div class="col-sm-7">
            <ul class="slider-color-show">
              <li class="slider-green">正常</li>
              <li class="slider-blue">一般</li>
              <li class="slider-yellow">严重</li>
              <li class="slider-red">重大</li>
            </ul>
            <!--<el-slider
              v-model="editQuestionItems.scale" :format-tooltip="formatTooltip" :max="1" :step="0.01">
            </el-slider>
            <span style="float: left;">0</span><span style="float: right;">100%</span>-->
            <div class="slider-container">
              <span class="number-start">0</span>
              <div class="slider-01">
                <el-slider
                  v-model="editQuestionItems.normal"
                  :step="step"
                  :format-tooltip="formatTooltip"
                  :max="max" @change="sliders1(editQuestionItems.normal)">
                </el-slider>
              </div>
              <div class="slider-02">
                <el-slider
                  v-model="editQuestionItems.generally"
                  :step="step"
                  :format-tooltip="formatTooltip"
                  :max="max" @change="sliders2(editQuestionItems.generally)">
                </el-slider>
              </div>
              <div class="slider-03">
                <el-slider
                  v-model="editQuestionItems.serious"
                  :step="step"
                  :format-tooltip="formatTooltip"
                  :max="max" @change="sliders3(editQuestionItems.serious)">
                </el-slider>
              </div>
              <span class="number-end">100%</span>
            </div>
          </div>
        </div>
      </form>
    </template>
    <!-- [modalFooter]底部插槽 -->
    <template slot="modalFooter">
      <button type="button" class="btn btn-reset" @click="reset">重置</button>
      <button type="button" class="btn btn-search" @click="create">保存</button>
    </template>
  </ipt-modal>
</template>
<script>
  import $ from 'jquery'
  /** Zhao Yun 2017/11/16 从vuex状态管理中导入获取数据的getter和发送状态请求的action */
  import {mapActions} from 'vuex'
  /** Zhao Yun 2017/11/17 引入API接口 */
  import Api from '@/ipt-supervise-help/api'
  /** Zhao Yun 2017/11/17 引入弹窗组件 */
  import IptModal from "@/components/common/modal"

  export default {
    components: {
      IptModal
    },
    data: function () {
      return {
        editQuestionItems: {},
        editQuestionItemData: [],
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
    props: {
      params: {},
      questionItems: {
        itemId: '',
        name: '',
        indexContent: '',
        normal: '',
        generally: '',
        serious: ''
      }
    },
    created() {
      this.init()
    },
    filters: {
      percentageFormat: require('../filters/percentageFormatter')
    },
    watch: {
      questionItems() {
        this.editQuestionItems = JSON.parse(JSON.stringify(this.questionItems))
        this.editQuestionItemData = this.editQuestionItems
      }
    },
    methods: {
      init() {
        let obj = this
        obj.max = 1
        this.value3 = this.questionItems.serious
        this.value2 = this.questionItems.generally
        this.value1 = this.questionItems.normal
        obj.main = 0
      },
      sliders1(val) {
        let obj = this
        let min = 0
        let max = this.editQuestionItems.generally
        let value1 = this.questionItems.normal
        if (max <= val) {
          obj.$msgbox('正常比例越界，请重新操作!')
          obj.editQuestionItems.normal = value1
          return false
        }
        if (min >= val) {
          obj.$msgbox('正常比例越界，请重新操作!')
          obj.editQuestionItems.normal = value1
          return false
        }
      },
      sliders2(val) {
        let obj = this
        let min = this.editQuestionItems.normal
        let max = this.editQuestionItems.serious
        let value2 = this.questionItems.generally
        if (max <= val) {
          obj.$msgbox('一般比例越界，请重新操作!')
          obj.editQuestionItems.generally = value2
          return false
        }
        if (min >= val) {
          obj.$msgbox('一般比例越界，请重新操作!')
          obj.editQuestionItems.generally = value2
          return false
        }
      },
      sliders3(val) {
        let obj = this
        let value3 = this.questionItems.serious
        let min = this.editQuestionItems.generally
        let max = 1  //良好上线值
        if (min >= val) {
          obj.$msgbox('严重比例越界，请重新操作!')
          obj.editQuestionItems.serious = value3
          return false
        }
        if (max <= val) {
          obj.$msgbox('严重比例越界，请重新操作!')
          obj.editQuestionItems.serious = value3
          return false
        }
      },
      formatTooltip(val) {
        return this.percentageFormat(val, 0)
      },
      percentageFormat(number, digits) {
        var result
        if (digits === null || digits === undefined) {
          digits = 2
        }
        digits = parseInt(digits)
        if (number === null || number === '' || isNaN(number)) {
          result = '-'
        } else {
          result = Math.round(number * Math.pow(10, digits) * 100) / Math.pow(10, digits) + '%'
        }
        /*if (number < 0.20) {
          result = '正常'
        } else if (number < 0.40) {
          result = '一般'
        } else if (number < 0.60) {
          result = '严重'
        } else {
          result = '重大'
        }*/
        return result
      },
      create() {
        var that = this
        /** Zhao Yun 2017/11/17 所有验证通过之后才进行提交 */
        that.$validator.validateAll().then((result) => {
          if (result) {
            Api.QuestionItems.updateQuestionItems(that.editQuestionItems.itemId, that.editQuestionItems).then((data) => {
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  $('#js_edit_modal div.modal-header > button[aria-label="Close"]').trigger('click')
                }
              })
              /** yanggang 2017/12/4 更新表格分页数据 */
              that.getQuestionItemsTableData(that.params)
            })
            return
          }
          this.$alert('Oh NO!')
        })
      },
      reset() {
        this.editQuestionItems = JSON.parse(JSON.stringify(this.questionItems))
      },
      /** Zhao Yun 2017/11/16 获取请求数据的action */
      ...mapActions({
        getQuestionItemsTableData: 'getQuestionItemsTableData'
      })
    }
  }
</script>
<style>
  .form-horizontal .form-group div {
    padding-top: 0;
  }

  .form-horizontal .form-group .el-slider {
    padding-top: 0px !important;
  }
</style>
<style>
  .search-title {
    margin-bottom: 8px;
  }

  .h-table-container {
    margin-bottom: 15px;
  }

  .slider-color-show {
    margin: 30px 0 30px 50px;
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
    width: 100%;
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
    background-color: #00bb00;
    z-index: 4;
  }

  .slider-01 .el-slider__button {
    border: 2px solid #00bb00;
  }

  .slider-02 .el-slider__bar {
    background-color: #00b3ee;
    z-index: 3;
  }

  .slider-02 .el-slider__button {
    border: 2px solid #00b3ee;
  }

  .slider-03 .el-slider__bar {
    background-color: #f0ad4e;
    z-index: 2;
  }

  .slider-03 .el-slider__button {
    border: 2px solid #f0ad4e;
  }

  .el-slider__runway {
    background-color: #f00;
  }
</style>
