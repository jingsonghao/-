// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // https://cn.vuejs.org/v2/api/
import Vuex from 'vuex' // https://vuex.vuejs.org/zh-cn/
import App from './App'
import axios from 'axios' // https://github.com/axios/axios
import store from './store'
import router from './router' // https://router.vuejs.org/zh-cn/
// import zhLan from 'vee-validate/dist/locale/zh_CN'
import VeeValidate from 'vee-validate'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'
import AMap from 'vue-amap' // https://elemefe.github.io/vue-amap/#/zh-cn/examples/base/amap
import ElementUI from 'element-ui' // http://element-cn.eleme.io/#/zh-CN
import VueCookie from 'vue-cookie' // https://github.com/alfhen/vue-cookie
import 'babel-polyfill'
import Constant from '@/constant'
import VueClipboard from 'vue-clipboards'
import VueCodemirror from 'vue-codemirror'
// language
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
// theme css
import 'codemirror/theme/mbo.css'
// styleSelectedText
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/selection/mark-selection.js'
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/match-highlighter.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'

import scroll from 'vue-seamless-scroll'
// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
import customDirectives from '@/utils/customDirectives'

Vue.use(scroll)
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VeeValidate)
Vue.use(ElementUI)
Vue.use(AMap)
Vue.use(VueCookie)
Vue.use(VueClipboard)
Vue.use(VueCodemirror)

// 修改原型链，方便使用
Vue.prototype.$http = axios
Vue.prototype.$msgbox = ElementUI.MessageBox
Vue.prototype.$alert = ElementUI.MessageBox.alert
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$prompt = ElementUI.MessageBox.prompt
Vue.prototype.$message = ElementUI.Message

AMap.initAMapApiLoader({
  key: '264e220b8b55b6e7fcc5d13ac14fb1a7',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

customDirectives(Vue)

/* eslint-disable no-new */
Constant.VUE_INSTANCE.instance = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
