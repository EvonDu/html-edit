$.fn.pageEdit = function (options) {
    //元素
    var panel = this;

    //随机颜色列表
    var colors = [
        "#1ABC9C",
        "#16A085",
        "#2ECC71",
        "#27AE60",
        "#3498DB",
        "#2980B9",
        "#9B59B6",
        "#8E44AD",
        "#34495E",
        "#2C3E50",
        "#F1C40F",
        "#F39C12",
        "#E67E22",
        "#D35400",
        "#E74C3C",
        "#C0392B",
        "#BDC3C7",
        "#95A5A6",
        "#7F8C8D"
    ];

    //拖动刷新
    function renovate(){
        //遍历成员分配颜色
        $(panel).find(".page-element").each(function(){
            //如果还没有颜色则随机分配颜色
            if($(this).css("background-color") == "rgba(0, 0, 0, 0)"){
                //获取随机颜色
                var range = colors.length;
                var rand = Math.random();
                var colornum = Math.round(rand * range);
                var color = colors[colornum];
                $(this).css("background-color",color);
            }

            //构造这个成员的拖动
            $(this).Edrag({
                scope:options.scope,
                //disable:true,//禁止拖拽
            });
        })
    }

    //拉动刷新
    function renovate2() {
        //设置为可拖拉成员
        $(panel).find(".page-element").Edraw({
            scope:options.scope,
            draw:"draw",                  //设置拉伸按钮属性
            sizeChange:sizeChange
        });

        //设置拖拉时禁止移动
        $(panel).find(".draw").mousedown(function(e){
            //获取元素
            var element = $(this).closest(".page-element");

            //启用禁止拖动
            //$.disable_cloose();
            $(element).Edrag({disable:true});
            //设置恢复拖动事件(一次性)
            $(document).one("mouseup",function(){
                //取消禁止拖动
                //$.disable_open();
                $(element).Edrag({disable:false});
            });
        });
    }

    //事件：尺寸改变
    function sizeChange(element,width,height){
        if(typeof(options.sizeChange) == "function") {
            options.sizeChange(element,width,height);
        }
    }

    //执行刷新
    renovate(options);
    renovate2(options);
}