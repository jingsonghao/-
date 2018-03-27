<template>
  <div class="navbar-box">
    <div class="navbar">
      <div class="container-nav">
        <div class="header-top-border"></div>
        <div class="header-l pull-left">
          <img class="pull-left" :src="img.logo" @click="openWindow('http://home.nxipt.ng.oofo.org/')">
          <div class="lw-title pull-left">
            <h1 class="topnavwrite">宁夏回族自治区重要产品追溯区级管理平台</h1>
            <span  class="topnavwrite">NHAR Important Products Traceability District Management Platform</span>
          </div>
        </div>

        <div class="header-r pull-right">
          <div class="zairrt" >
            您好！
            <span class="user-name zairrt" v-if="dialogFormVisible">登录</span>
            <span class="user-name zairrt" v-if="!dialogFormVisible">{{user ? user.name : ''}}</span>
            <!--<span v-if="!dialogFormVisible">【系统管理】</span>-->
            <a href="javascript:;" class="zairrt zairrt-nav" data-toggle="modal" data-target="#js_ipt_trace_window">【追溯导航】</a>
            <a href="javascript:;" @click="jump()" v-if="!dialogFormVisible" class="zairrt user-out" title="用户退出"></a>
            <!--<a href="../../home/index.html">【用户退出】</a>-->
            <div class="lw-time text-right" style="margin-top: 0px;margin-right: 8px;font-size: 32px; text-align: center;">{{nowTime}}<span style="font-size: 18px; margin-left: 15px;">{{nowDate}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="登录"
               :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               :center="true"
               :width="'30%'"
               :top="'25vh'">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" placeholder="请输入您的用户名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password" placeholder="请输入您的密码" auto-complete="off" @keyup.enter.native="login()"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login()" @keyup.enter.native="login()">确 定</el-button>
        <el-button type="primary" @click="jump()">>> 门户</el-button>
      </div>
    </el-dialog>
    <ipt-trace-window id="js_ipt_trace_window"></ipt-trace-window>
    <ipt-record-create id="js_ipt_record_window"></ipt-record-create>
  </div>
</template>
<script type="text/ecmascript-6">
  import logo from '@/assets/img/logo.png'
  import utils from '@/utils'
  import { mapGetters, mapActions } from 'vuex'
  import { setToken, getToken } from '@/utils/auth'
  import IptTraceWindow from "@/components/city-platform/traceWindow"
  import IptRecordCreate from '@/ipt-trace-back/components/filling/node-record/create.vue'

  export default {
    components: {
      IptTraceWindow, IptRecordCreate
    },
    data () {
      return {
        img: {
          logo
        },
        nowTime: '12:00',
        nowDate: '2018.01.01',
        intervalId: undefined,
        form: {
          username: '',
          password: ''
        },
        formLabelWidth: '60px'
      }
    },
    watch: {
      token (curVal) {
        if (curVal) {
          this.setDialogFormVisible(false)
          this.$router.go(0)
        }
      }
    },
    computed: mapGetters({
      token: 'token',
      user: 'loginUser',
      dialogFormVisible: 'dialogFormVisible'
    }),
    methods: {
      openWindow (url) {
        window.open(url)
      },
      renderTime () {
        let self = this
        this.intervalId = setInterval(function () {
          self.nowTime = utils.DateUtil.parseTime(new Date(), '{h}:{i}')
          self.nowDate = utils.DateUtil.parseTime(new Date(), '{y}.{m}.{d}')
        }, 1000)
      },
      ...mapActions({
        removeToken: 'removeToken',
        getToken: 'getToken',
        getLoginUser: 'getLoginUser',
        setDialogFormVisible: 'setDialogFormVisible'
      }),
      logout: function () {
        this.removeToken()
        this.$router.go(0)
      },
      login () {
        this.getToken(this.form)
      },
      jump () {
        window.location.href = 'http://home.nxipt.ng.oofo.org/'
      }
    },
    beforeDestroy () {
      clearInterval(this.intervalId)
    },
    mounted () {
      this.renderTime()
      this.getLoginUser()
      if (this.$route.query.token) {
        setToken(this.$route.query.token)
        this.$router.push('/cityPlatform')
      }
      if (this.token) {
        setToken(this.$route.query.token)
        this.$router.go(0)
      }
      if (!getToken()) {
        this.setDialogFormVisible(true)
      }
    }
  }
  //transform: rotate(30deg);
</script>


<style>
  .topnavwrite {
    color: #fff;
  }
  .zairrt:active {
    border: none ;
  }
  /*.navbar .header-r .lw-time {
    text-shadow: 2px 2px 2px #0a0a0a;
  }*/

  .clock {
    width: 100px;
    z-index: 10000;
    height: 100px;
    /*margin: 100px auto;*/
    background: url(../../assets/img/clock.jpg) no-repeat  center;
    position: relative;
  }

  .clock div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/hour.png) no-repeat center center;
  }

  #m {
    background-image: url(../../assets/img/minute.png);
  }

  #s {
    background-image: url(../../assets/img/second.png);
  }

</style>
