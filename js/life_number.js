jQuery(document).ready(function($){
    var _click_count=0;
    $("body").click(function(e) {
        var $i = $("<span/>").text("+"+(++_click_count)+"s");
        var x = e.pageX, y = e.pageY;
        $i.css({
            "z-index": 99999,
            "top": y-15,
            "left": x,
            "position": "absolute",
            "color": "red"
        });
        $("body").append($i);
        $i.animate(
            {"top":y-180,"opacity":0},
            1500,
            function(){$i.remove();}
        );
        e.stopPropagation();
    });
});
/*
jQuery(document).ready(function($) {
    $("body").click(function(e) {
var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
var x = e.pageX,
        y = e.pageY;
        $i.css({
"z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
"top": y - 20,
"left": x,
"position": "absolute",
"font-weight": "bold",
"color": "#ff6651"
        });
        $("body").append($i);
        $i.animate({
"top": y - 180,
"opacity": 0
        },
        1500,
function() {
            $i.remove();
        });
    });
});*/