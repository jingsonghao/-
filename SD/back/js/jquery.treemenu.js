/*
 lsh 链条页的js
 树形图方法的封装
 */
(function($){
    //先,并返回this
    $.fn.treemenu = function(options) {
        options = options || {};
        options.delay = options.delay || 0; //此时==300
        options.openActive = options.openActive || false;
        options.activeSelector = options.activeSelector || "";

        this.addClass("treemenu");//调用后 首先添加类treemenu
        this.find("> li").each(function() { //搜索下面的li 每个执行如下操做
            e = $(this); //保存当前 li
            var subtree = e.find('> ul');//下面有ul的 ul

            var button = e.find('span').eq(0).addClass('toggler'); //span 并添加toggler类

            if( button.length == 0) {
                var button = $('<span>');
                button.addClass('toggler');
                e.prepend(button);
            } else {
                button.addClass('toggler');
            }

            if(subtree.length > 0) {
                subtree.hide(); //内部有ul 就隐藏

                e.addClass('tree-closed'); //并添加 类(表示被隐藏了)

                e.find(button).click(function() { //  搜索span【【【点击】】】
                    var li = $(this).parent('li'); //span 的父级（li）
                    li.find('> ul').slideToggle(options.delay); //内部有 ul列表 就300ms切换显示/隐藏

                    li.toggleClass('tree-opened');//开
                    li.toggleClass('tree-closed');//关
                    li.toggleClass(options.activeSelector);
                });

                $(this).find('> ul').treemenu(options); //内部ul 继续调用此函数
            } else {
                $(this).addClass('tree-empty');
            }
        });

        if (options.openActive) {
            this.openActive(options.activeSelector);
        }

        return this;
    }
    //后    （【展开】 .active 的所有父级）
    $.fn.openActive = function(activeSel) {
        activeSel = activeSel || ".active";

        var c = this.attr("class");

        this.find(activeSel).each(function(){
            var el = $(this).parent();
            while (el.attr("class") !== c) {
                if(el.prop("tagName") === 'UL') {
                    el.show();
                } else if (el.prop("tagName") === 'LI') {
                    el.removeClass('tree-closed');
                    el.addClass("tree-opened");
                }

                el = el.parent();
            }
        });

        return this;
    }

})(jQuery);
//调用+边线
$(function () {
    //ul ul的margin-left自适应  线的left也自适应 上边横线宽自适应
    (function () {
        var lefts = $(".box").width() / 5;
        $(".tree ul").css('margin-left', (lefts) + 'px');//左边距
        $(".tree li::before, .tree li::after").css('left', (lefts) + 'px');//左边线的距离
        $(".tree .tree-icon").css('width', (lefts-40) + 'px');//icon图标的宽自适应【达到居中】
    })();
    $(window).resize(function () {
        var lefts = $(".box").width() / 5;
        $(".tree ul").css('margin-left', (lefts) + 'px');
        $(".tree li::before, .tree li::after").css('left', (lefts) + 'px');
        $(".tree .tree-icon").css('width', (lefts-40) + 'px');
    });
    // 树形动画调用
    $(".tree").treemenu({delay: 30}).openActive();

    //      my-链条动画
    $(".tree li b").on("mouseover",function(){
        var that =$(this);
        //图片更换  【没做父级更换】
        if(that.hasClass("tree-icon1")){
            that.removeClass("tree-icon1");
            that.addClass("tree-icon11")
        }else if(that.hasClass("tree-icon2")){
            that.removeClass("tree-icon2");
            that.addClass("tree-icon22")
        }else if(that.hasClass("tree-icon3")){
            that.removeClass("tree-icon3");
            that.addClass("tree-icon33")
        }else if(that.hasClass("tree-icon4")){
            that.removeClass("tree-icon4");
            that.addClass("tree-icon44")
        }else if(that.hasClass("tree-icon5")){
            that.removeClass("tree-icon5");
            that.addClass("tree-icon55")
        }else if(that.hasClass("tree-icon6")){
            that.removeClass("tree-icon6");
            that.addClass("tree-icon66")
        }
        var uuls = $(".uul");
        var llis = $(".lli");
        var llis2 = $(".lli2")
        //1.鼠标进入this(或者介绍框) 介绍框显示 【添加:1、其他的介绍框隐藏 2、其他的红线隐藏】
        $(".tree").find(".explain").stop().fadeOut(400);//[介绍框排他]
        that.next().stop().fadeIn(0);
        if(uuls.length>0){
            //获取所有的 .uul 并去掉此类名
            uuls.attr('class', function (i, cls) { return cls.replace("uul", ''); });
        }
        if(llis.length>0){
            //获取所有的 .lli 并去掉此类名
            llis.attr('class', function (i, cls) { return cls.replace("lli", ''); });
        }
        if(llis2.length>0){
            //获取所有的 .lli2 并去掉此类名
            llis2.attr('class', function (i, cls) { return cls.replace("lli2", ''); });
        }
        //2.同时更换边线的背景色【暂时 红色（渐渐的最好）】
        while (that.parent().parent().parent().parent().parent("ul").length==1){
            //循环直到没有父级
            //如果父级有兄弟兄弟就变红但是  去掉.lli::after{ border-bottom:0px }
            var that2 = that.parent().parent().prev().addClass("lli");//竖线+到自己的短线变红
            while (that2.length==1){//有兄弟兄弟就变红
                that2.prev().addClass("lli2");
                that2 = that2.prev();
            }
            that.parent().parent().parent()
                .addClass("uul");//横线变红
            that = that.parent().parent().parent().prev().children("b");
        }

        //3.1 介绍框点击跳转别的详情页
    })

    //-----------------------------------------------------临时换图标
    $(".tree li b").on("mouseout",function(){

        var that =$(this);
        if(that.hasClass("tree-icon11")){
            that.removeClass("tree-icon11");
            that.addClass("tree-icon1")
        }else if(that.hasClass("tree-icon22")){
            that.removeClass("tree-icon22");
            that.addClass("tree-icon2")
        }else if(that.hasClass("tree-icon33")){
            that.removeClass("tree-icon33");
            that.addClass("tree-icon3")
        }else if(that.hasClass("tree-icon44")){
            that.removeClass("tree-icon44");
            that.addClass("tree-icon4")
        }else if(that.hasClass("tree-icon55")){
            that.removeClass("tree-icon55");
            that.addClass("tree-icon5")
        }else if(that.hasClass("tree-icon66")){
            that.removeClass("tree-icon66");
            that.addClass("tree-icon6")
        }
    })



});