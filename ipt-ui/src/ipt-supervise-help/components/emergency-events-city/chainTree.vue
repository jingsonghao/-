<template>
  <li>
    <span>
      <b class="tree-icon" :class="chainData.icon">
        <i>{{chainData.tradeDate}}</i><br>
        <i>{{chainData.productName}} - {{chainData.amount}}{{chainData.unit}}</i>
      </b>
      <div class="explain row">
        <div class="col-xs-6 r">环节名称：</div><div class="col-xs-6">{{chainData.tacheName}}</div>
        <div class="col-xs-6 r">商品名称：</div><div class="col-xs-6">{{chainData.productName}}</div>
        <div class="col-xs-6 r">交易时间：</div><div class="col-xs-6">{{chainData.tradeDate}}</div>
        <div class="col-xs-6 r">重 量：</div><div class="col-xs-6">{{chainData.amount}}{{chainData.unit}}</div>
        <div class="col-xs-4"></div>
        <!--<a class="col-xs-4 btn btn-xs" data-toggle="modal" data-target=".bs-example-modal-lg">查看更多>></a>-->
      </div>
    </span>
    <ul v-if="chainData.child.length != 0">
      <li></li>
      <ipt-chain-tree :key="index" v-for="(child, index) in chainData.child" :chainData="child"></ipt-chain-tree>

    </ul>
  </li>
</template>
<script>
  import $ from 'jquery'

  export default {
    name: 'ipt-chain-tree',
    props: {
      chainData: {
        tacheName: '',
        productName: '',
        tradeDate: '',
        amount: '',
        unit: '',
        icon: '',
        child: []
      }
    },
    watch: {
      chainData() {
      }
    },
    updated() {
      this.openTree()
    },
    methods: {
      openTree() {
        (function($) {
          $.fn.treemenu = function(options) {
            options = options || {}
            options.delay = options.delay || 0
            options.openActive = options.openActive || false
            options.activeSelector = options.activeSelector || ""
            this.addClass("treemenu")
            this.find("> li").each(function() {
              var e = $(this)
              var subtree = e.find('> ul')
              var button = e.find('span').eq(0).addClass('toggler')
              if (button.length === 0) {
                button = $('<span>')
                button.addClass('toggler')
                e.prepend(button)
              } else {
                button.addClass('toggler')
              }
              if (subtree.length > 0) {
                subtree.hide()
                e.addClass('tree-closed')
                e.find(button).click(function() {
                  var li = $(this).parent('li')
                  li.find('> ul').slideToggle(options.delay)
                  li.toggleClass('tree-opened')
                  li.toggleClass('tree-closed')
                  li.toggleClass(options.activeSelector)
                })
                $(this).find('> ul').treemenu(options)
              } else {
                $(this).addClass('tree-empty')
              }
            })
            if (options.openActive) {
              this.openActive(options.activeSelector)
            }
            return this
          }
          //后    （【展开】 .active 的所有父级）
          $.fn.openActive = function(activeSel) {
            activeSel = activeSel || ".active"
            var c = this.attr("class")
            this.find(activeSel).each(function() {
              var el = $(this).parent()
              while (el.attr("class") !== c) {
                if (el.prop("tagName") === 'UL') {
                  el.show()
                } else if (el.prop("tagName") === 'LI') {
                  el.removeClass('tree-closed')
                  el.addClass("tree-opened")
                }
                el = el.parent()
              }
            })
            return this
          }
        })($)
        $(function () {
          //ul ul的margin-left自适应  线的left也自适应 上边横线宽自适应
          (function () {
            var lefts = $(".box").width() / 6
            $(".tree ul").css('margin-left', (lefts) + 'px')//左边距
            $(".tree li::before, .tree li::after").css('left', (lefts) + 'px')//左边线的距离
            $(".tree .tree-icon").css('width', (lefts - 40) + 'px')//icon图标的宽自适应【达到居中】
          })()
          $(window).resize(function () {
            var lefts = $(".box").width() / 6
            $(".tree ul").css('margin-left', (lefts) + 'px')
            $(".tree li::before, .tree li::after").css('left', (lefts) + 'px')
            $(".tree .tree-icon").css('width', (lefts - 40) + 'px')
          })
          // 树形动画调用
          $(".tree").treemenu({delay: 0}).openActive()
          $('.tree-closed').addClass('tree-opened').removeClass('tree-closed')
          $('.treemenu').show()
          //      my-链条动画
          $(".tree li b").off("mouseover").on("mouseover", function() {
            var that = $(this)
            //图片更换  【没做父级更换】
            if (that.hasClass("tree-icon1")) {
              that.removeClass("tree-icon1")
              that.addClass("tree-icon11")
            } else if (that.hasClass("tree-icon2")) {
              that.removeClass("tree-icon2")
              that.addClass("tree-icon22")
            } else if (that.hasClass("tree-icon3")) {
              that.removeClass("tree-icon3")
              that.addClass("tree-icon33")
            } else if (that.hasClass("tree-icon4")) {
              that.removeClass("tree-icon4")
              that.addClass("tree-icon44")
            } else if (that.hasClass("tree-icon5")) {
              that.removeClass("tree-icon5")
              that.addClass("tree-icon55")
            } else if (that.hasClass("tree-icon6")) {
              that.removeClass("tree-icon6")
              that.addClass("tree-icon66")
            }
            var uuls = $(".uul")
            var llis = $(".lli")
            var llis2 = $(".lli2")
            $(".tree").find(".explain").stop().fadeOut(400)
            that.next().stop().fadeIn(0)
            if (uuls.length > 0) {
              uuls.attr('class', function (i, cls) { return cls.replace("uul", '') })
            }
            if (llis.length > 0) {
              llis.attr('class', function (i, cls) { return cls.replace("lli", '') })
            }
            if (llis2.length > 0) {
              llis2.attr('class', function (i, cls) { return cls.replace("lli2", '') })
            }
            while (that.parent().parent().parent().parent().parent("ul").length === 1) {
              var that2 = that.parent().parent().prev().addClass("lli")
              while (that2.length === 1) {
                that2.prev().addClass("lli2")
                that2 = that2.prev()
              }
              that.parent().parent().parent().addClass("uul")
              that = that.parent().parent().parent().prev().children("b")
            }
          })
          $(".tree li b").off("mouseout").on("mouseout", function() {
            var that = $(this)
            $(".tree").find(".explain").stop().fadeOut(400)
            if (that.hasClass("tree-icon11")) {
              that.removeClass("tree-icon11")
              that.addClass("tree-icon1")
            } else if (that.hasClass("tree-icon22")) {
              that.removeClass("tree-icon22")
              that.addClass("tree-icon2")
            } else if (that.hasClass("tree-icon33")) {
              that.removeClass("tree-icon33")
              that.addClass("tree-icon3")
            } else if (that.hasClass("tree-icon44")) {
              that.removeClass("tree-icon44")
              that.addClass("tree-icon4")
            } else if (that.hasClass("tree-icon55")) {
              that.removeClass("tree-icon55")
              that.addClass("tree-icon5")
            } else if (that.hasClass("tree-icon66")) {
              that.removeClass("tree-icon66")
              that.addClass("tree-icon6")
            }
          })
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/run-report.css"
  @import "~assets/css/jquery.treemenu.css"
  .tree
    li
      b
        color #0C6492
</style>
