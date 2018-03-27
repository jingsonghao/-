<template>
  <div class="sidebar">
    <div class="sidebar-collapse">
      <div class="navbar-actions">
        <a href="javascript:void(0);" class="open-close-menu" id="main-menu-toggle"></a>
      </div>
      <div class="sidebar-over-hidden">
        <div class="sidebar-menu">
          <nav id="menu" role="navigation">
            <ul class="nav nav-sidebar">
              <li v-for="menuOne in menuList" :class="menuOne.childrens.length !== 0 ? 'nav-parent':''">
                <template v-if="menuOne.childrens.length === 0">
                  <router-link :to="menuOne.menuUrl">
                  <i class="fa" :class="menuOne.icon" aria-hidden="true"></i><span>{{menuOne.menuName}}</span>
                  </router-link>
                  <!--<a :href="menuOne.menuUrl"><i class="fa" :class="menuOne.icon"aria-hidden="true"></i><span>{{menuOne.menuName}}</span></a>-->
                </template>
                <template v-else>
                  <a><i class="fa" :class="menuOne.icon" aria-hidden="true"></i><span>{{menuOne.menuName}}</span></a>
                </template>
                <ul v-if="menuOne.childrens.length != 0" class="nav">
                  <li v-for="menuTwo in menuOne.childrens" :class="menuTwo.childrens.length != 0 ? 'nav-parent': ''">
                    <template v-if="menuTwo.childrens.length === 0">
                      <router-link :to="menuTwo.menuUrl">
                      <span>{{menuTwo.menuName}}</span>
                      </router-link>
                      <!--<a :href="menuTwo.menuUrl"><span class="text">{{menuTwo.menuName}}</span></a>-->
                    </template>
                    <template v-else>
                      <a><span>{{menuTwo.menuName}}</span></a>
                    </template>
                    <ul v-if="menuTwo.childrens.length != 0">
                      <li v-for="menuThree in menuTwo.childrens">
                        <template v-if="menuThree.childrens.length === 0">
                          <router-link :to="menuThree.menuUrl">
                          <span class="text">{{menuThree.menuName}}</span>
                          </router-link>
                          <!--<a :href="menuThree.menuUrl"><span class="text">{{menuThree.menuName}}</span></a>-->
                        </template>
                        <template v-else>
                          <a><span class="text">{{menuThree.menuName}}</span></a>
                        </template>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import $ from 'jquery'

  export default {
    props: ['menuList'],
    updated() {
      this.$nextTick(function () {
        $(document).ready(function (e) {
          widthFunctions()
          //当前状态
          $.each($('ul.nav-sidebar').find('a'), function (i, adom) {
            var LOCATION_URL = window.location.pathname
            // 后台管理系统 用户管理 部门管理
            if (LOCATION_URL === '/manageSystem/orgManage/departmentManage') {
              LOCATION_URL = '/manageSystem/orgManage/userManage'
            }
            var CURRENT_URL = adom.pathname
            if (CURRENT_URL && (LOCATION_URL === CURRENT_URL || (LOCATION_URL + '/').startsWith(CURRENT_URL + '/'))) {
              $(adom).parent().addClass('active').addClass('opened')
              $(adom).parents('ul').each(function () {
                $(this).show().parent().addClass('opened')
              })
            }
          })
          //导航动画
          $('.nav-sidebar a').on('click', function () {
            if ($(this).parent().find('ul').size() !== 0) {
              $(this).parent().siblings().find('ul').slideUp('slow')
              $(this).parent().siblings().removeClass('opened').find('ul').slideUp('slow')
              $(this).parent().siblings().find('li').removeClass('opened')
              $(this).parent().hasClass('opened') ? $(this).parent().removeClass('opened') : $(this).parent().addClass('opened')
              $(this).parent().find('ul').first().finish().slideToggle()
              $(this).parent().parent().parent().hasClass('opened') || $('.nav a').not(this).parent().find('ul').slideUp('slow', function () {
                $(this).parent().removeClass('opened')
              })
            } else {
              $('.active').each(function () {
                $(this).removeClass('opened').removeClass('active')
              })
              $(this).parent().addClass('opened').addClass('active').parent().parent().hasClass('opened') || $('.nav a').not(this).parent().find('ul').slideUp('slow', function () {
                $(this).parent().removeClass('opened')
              })
            }
          })
        })

        function widthFunctions() {
          var r = $(window).height()
          /*菜单高于可是窗时外部盒子的高度*/
          $('.sidebar-menu').css('height', r - 221)
          $('.sidebar').css('height', r - 219)
        }

        $(window).bind('resize', widthFunctions)

        //隱藏和显示左侧菜单
        $('#main-menu-toggle').on('mouseover', function (event) {
          event.stopPropagation()
          $('.sidebar').hasClass('sidebar-hidel') ? $('.sidebar').removeClass('sidebar-hidel') : $('.sidebar').addClass('sidebar-hidel')
          //同时主体内容向右移动 L1
//          $('.index-content').hasClass('content-hidel') ? $('.index-content').removeClass('content-hidel') : $('.index-content').addClass('content-hidel')
        })

        function reSidebarhidel() {
          $('.sidebar').removeClass('sidebar-hidel')
//          L2
//          $('.index-content').removeClass('content-hidel')
        }
//          L3
//        $('.sidebar a[href]').bind("click", reSidebarhidel)
        $('html').bind("click", reSidebarhidel)
        $('.sidebar').mouseenter(function () {
          $('html').unbind("click")
        })
        $('.sidebar').mouseleave(function () {
          $('html').bind("click", reSidebarhidel)
        })
      })
    }
  }
</script>
<style>
  span{
    font-size: 16px;
  }
</style>
