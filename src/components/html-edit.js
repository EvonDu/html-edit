Vue.component('html-edit', {
    template:'<div :id="id" class="page-body">' +
        '<div v-for="element in elements" class="page-element" ' +
                'v-bind:style="{width:element.width + \'px\',height:element.height + \'px\',left:element.left + \'px\',top:element.top + \'px\',zIndex:element.zIndex}" ' +
                'v-on:mousedown="changeing($event,element)" ' +
                'v-on:click="select(element)" ' +
                'v-on:dblclick="dblselect(element)">' +
            '<div class="title"><span v-on:click="remove(element)">X</span></div>' +
            '<div class="content"><div v-if="element.data && element.data.type">{{element.data.type}}</div></div>' +
        '</div>' +
    '</div>',
    model: { prop: 'value', event: 'change'},
    props:{
        'elements':{ type: Array, default: function(){return[
            {width:100,height:100,left:0,top:0,zIndex:0}
        ];}}
    },
    watch: {
        //利用侦听属性监控
        elements: function (val) {
            //刷新插件渲染
            this.renovate();
        }
    },
    data: function(){
        return {
            id:"edit"+Math.ceil(Math.random()*9999),
            element:null
        };
    },
    mounted:function(){
        //刷新插件渲染
        this.renovate();
    },
    methods: {
        //选择元素
        select:function(element){
            //选择元素
            this.element = element;
            //触发事件:选择完毕
            this.$emit('selected', element);
        },
        //添加元素
        add:function(){
            //添加到列表
            this.elements.push({
                width:"100",
                height:"100",
                left:0,
                top:0,
                zIndex:0
            });
        },
        //删除元素
        remove:function(element){
            //删除元素
            var index = this.getIndex(element);
            this.elements.splice(index,1);
            //触发事件:选择完毕
            this.$emit('removed', element);
        },
        //移除元素
        getIndex:function(element){
            //定义索引
            var index = null;
            //获取索引
            for(var i=0;i<this.elements.length;i++){
                if(this.elements[i] === element)
                    index = i;
            }
            //返回索引
            return index;
        },
        //刷新插件渲染
        renovate:function(){
            //设置this
            var _this = this;
            //设置v-for渲染结束事件
            this.$nextTick(function(){
                //插件开始构成
                $(function(){
                    $("#"+_this.id).pageEdit({
                        scope:"#"+_this.id,
                        draw:".coor"
                    });
                });
            })
        },
        //元素改变中
        changeing:function(e,source){
            //定义元素
            var element = $(e.target).closest(".page-element");
            //注册一次性事件修改元素属性
            $(document).one("mouseup",function(e){
                //获取高度和宽度
                var width = $(element).outerWidth();
                var height = $(element).outerHeight();
                var left = $(element).position().left;
                var top = $(element).position().top;

                //修改高度和宽度
                source.width = width;
                source.height = height;
                source.left = left;
                source.top = top;
            })
        },
        //双击元素
        dblselect:function(element){
            this.$emit('dblselected', element);
        },
    }
});