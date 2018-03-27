/**
 * Created by Administrato on 2018/3/22.
 */
$(document).ready(function(){
    $(".m-nav li a").each(function(){
        $this = $(this);
        if($this[0].href==String(window.location)){
            $this.addClass("text-red");
        }
    });
});