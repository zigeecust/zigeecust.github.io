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
