/**
 * Created by Administrator on 2017/9/1.
 */
//日历选择插件配置 依赖jq-ui
$(function(){
    $( "#plantStartTime1" ).datepicker();
    $( "#plantEndTime1" ).datepicker();
    $( "#plantStartTime2" ).datepicker();
    $( "#plantEndTime2" ).datepicker();
    $( "#plantStartTime3" ).datepicker();
    $( "#plantEndTime3" ).datepicker();
    $( "#plantStartTime4" ).datepicker();
    $( "#plantEndTime4" ).datepicker();
    $( "#plantStartTime5" ).datepicker();
    $( "#plantEndTime5" ).datepicker();

    //search 小箭头动画
    $(".input-prepend input").on("focus",function(){
        $(this).parent().children("i").css("transform","rotate(90deg)");
    })
    $(".input-prepend input").on("blur",function(){
        $(this).parent().children("i").css("transform","rotate(0deg)");
    });
});