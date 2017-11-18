$(function(){
    //vue构造器
    var vue = new Vue({
        el:"#app",
        data: {
            element:null,
            elements:[
                {width:100,height:100,left:0,top:0,zIndex:0},
                {width:100,height:100,left:0,top:0,zIndex:0}
            ],
            page:{
                width:760,
                height:600
            },
            input:{
                element_width:100,
                element_height:100,
            },
            componentEdit:{
                type:"",
                params:{}
            },
            components:{}
        },
        created:function() {
            //定义this
            var _this = this;

            //加载组件列表
            $.ajax({
                type:"get",
                dataType:"JSON",
                url:"components/config.json",
                success:function(result){
                    _this.components = result;
                }
            })
        },
        mounted:function(){
            //刷新插件渲染
            this.renovate();
        },
        methods: {
            //选择元素
            select(element){
                this.element = element;
            },
            //添加元素
            add(){
                //添加到列表
                this.elements.push({
                    width:this.input.element_width,
                    height:this.input.element_height,
                    left:0,
                    top:0,
                    zIndex:0
                });

                //刷新插件渲染
                this.renovate();
            },
            //删除元素
            del(element){
                var index = this.getIndex(element);
                this.elements.splice(index,1);
            },
            //移除元素
            getIndex(element){
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
            renovate(){
                //设置this
                var _this = this;
                //设置v-for渲染结束事件
                this.$nextTick(function(){
                    //插件开始构成
                    $("#page-body").pageEdit({
                        scope:"#page-body",
                        draw:".coor"
                    });
                })
            },
            //元素改变中
            changeing(e,source){
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
            //编辑元素
            openEdit(element){
                //检测元素有无data没有则构建
                if(this.element.data != undefined) {
                    this.componentEdit.type = this.element.data.type;
                    this.componentEdit.params = $.extend(true,{}, this.element.data.params);//深拷贝
                }
                else{
                    this.componentEdit.type = [];
                    this.componentEdit.params = {};
                }

                //弹出窗口
                $('#modal-edit').modal('show')
            },
            //选择则兼
            confirmEdit(){
                //更新数据
                this.element.data = {
                    "type":this.componentEdit.type,
                    "params":this.componentEdit.params
                }
                //刷新渲染
                var index = this.getIndex(this.element);
                Vue.set(this.elements, index, this.element)
            },
            //预览
            preview(){
                alert("请查看console");
                console.log(this.elements);
                console.log(JSON.stringify(this.elements));
            }
        }
    })
})