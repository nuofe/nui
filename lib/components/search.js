/**
 * @author Aniu[2017-12-23 16:50]
 * @update Aniu[2018-01-31 11:54]
 * @version 1.0.3
 * @description 搜索
 */

Nui.define(function(require, imports){
    imports('../assets/components/search/index');
    
    var component = require('../core/component');
    var util = require('../core/util');
    var request = require('../core/request');

    var Search = this.extend(component, {
        _static:{
            _init:function(){
                var self = this, timer = null;
                Nui.win.resize(function(){
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        Nui.each(self.__instances, function(obj){
                            if(obj._showed){
                                obj.resize()
                            }
                        })
                    }, 100)
                })
            },
            /**
             * @func 将tag数据转为html模版
             * @param data <Object>
             * {
             *     text:'',
             *     fields:{
             *         field1:value1,
             *         field2:value2,
             *         ...
             *     }
             * }
             * @param data <Array>
             * [{
             *     text:'',
             *     fields:{
             *         field1:value1,
             *         field2:value2,
             *         ...
             *     }
             * }
             * @param option <Object> 
             * {
             *     title:true,
             *     close:'×',
             *     type:'gray'
             * }
             */
            data2html:function(data, option){
                if(data && typeof data === 'object'){
                    if(!option){
                        option = {}
                    }
                    return Search._tpl2html.call(Search, 'tags', {
                        data:[].concat(data),
                        title:option.title === undefined ? true : option.title,
                        close:option.close||'×',
                        type:option.type ? [].concat(option.type) : false
                    })
                }
                return ''
            }
        },
        _options:{
            /**
             * @func 请求url
             * @type <String>
             */
            url:'',
            /**
             * @func 查询参数
             * @type <String>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param value <String> 文本框输入值
             * @return <Object> 查询参数对象集合
             */
            query:'keyword',
            /**
             * @func 设置层级
             * @type <Number>
             * @desc 若style中已经设置，则不使用该值
             */
            zIndex:19920604,
            /**
             * @func 定义列表模版
             * @type <String>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <String> 返回列表模版
             * @desc 模版中可以使用<%$data%>获取当前行数据，<%$index%>获取当前行索引
             * @desc 配合选项参数selected方法在模版中类名中加入<%selected($data)%>可以设置当前行是否选中
             * @desc 模版中有效列表类名必须包含con-search-item以及data-index="<%$index%>"属性
             */
            item:'',
            /**
             * @func 定义空数据模版
             * @type <String>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <String> 返回空数据时模版
             * @desc 模版中可以使用<%value%>获取当前输入值
             */
            empty:'',
            /**
             * @func 定义输入时有结果返回提示模版
             * @type <String>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <String> 返回提示模版
             */
            prompt:'',
            /**
             * @func 定义底部模版
             * @type <String>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <String> 返回底部模版
             */
            foot:'',
            /**
             * @func 设置列表展示内容字段名
             * @type <String>
             * @desc 在展示列表时如果未使用item参数，将会展示该值内容
             */
            field:'',
            /**
             * @func 是否在文本获取焦点时展示下拉
             * @type <Boolean>
             * @desc 设置true后组件内部会绑定focus事件，因此不建议手动绑定focus事件调用组件的同时将该参数设置为true，那样会导致事件重复绑定
             */
            focus:false,
            /**
             * @func 是否允许文本框内容为空时展示下拉
             * @type <Boolean> 
             */
            nullable:false,
            /**
             * @func 搜索时是否缓存数据
             * @type <Boolean>
             * @desc 设置为true后，如果输入之前已经查询过的数据，那么不再执行查询，直接返回该数据
             */
            cache:false,
            /**
             * @func 展示内容显示容器
             * @type <String> 字符串选择器
             * @type <Object> dom、jQuery对象
             * @type <Function> 
             * @param self <Object> 组件实例对象
             * @return <String, Object> 返回选择器或者元素对象
             * @desc 如果设置为body，创建的元素会基于搜索输入框进行定位，如果不是则基于该值定义的元素进行定位
             */
            container:'body',
            /**
             * @func 下拉列表的数量，超过出现滚动条
             * @type <Number>
             */
            limit:6,
            /**
             * @func 为展示元素增加高宽
             * @type <Object>
             */
            size:null,
            /**
             * @func 设置展示元素的偏移值
             * @type <Object>
             */
            offset:null,
            /**
             * @func 设置展示元素样式
             * @type <Object>
             */
            style:null,
            /**
             * @func jQuery ajax配置
             * @type <Object>
             */
            ajax:null,
            /**
             * @func 自定义列表数据
             * @type <Array>
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @return <Array> 返回自定义数据
             */
            data:null,
            /**
             * @func 展示标签配置项
             * @type <Object>
             */
            tag:{
                /**
                 * @func 标签类型
                 * @type <String>
                 * @type <Array>
                 * @desc 设置后会增加ui-tag-{type}类名
                 */
                type:'',
                /**
                 * @func 关闭按钮内容
                 * @type <String>
                 */
                close:'×',
                /**
                 * @func 是否多选
                 * @type <Boolean>
                 */
                multiple:false,
                /**
                 * @func 是否可以用退格键删除标签
                 * @type <Boolean>
                 */
                backspace:false,
                /**
                 * @func 点击叉号删除标签时是否使输入框获取焦点
                 * @type <Boolean>
                 */
                focus:false,
                /**
                 * @func 选择完是否清空输入框
                 * @type <Boolean>
                 */
                clear:false,
                /**
                 * @func 鼠标悬停在标签上是否有提示
                 * @type <Boolean>
                 */
                title:true,
                /**
                 * @func 标签填充容器
                 * @type <DOM, jQuery Object, Selector>
                 */
                container:null,
                /**
                 * @func 设置滚动容器
                 * @type <DOM, jQuery Object, Selector>
                 * @desc 如果未设置将取container作为滚动容器
                 */
                scroll:null,
                /**
                 * @func 设置标签数据
                 * @type <Function>
                 * @param self <Object> 组件实例对象
                 * @param elem <jQuery Object> 标签元素对象
                 * @return 返回数据对象
                 */
                getData:null,
                /**
                 * @func 检测是否可以删除标签
                 * @type <Function>
                 * @param self <Object> 组件实例对象
                 * @param data <Object> 需要添加为标签的数据对象
                 * @param tag <Object> 已存在的标签对象
                 * @return <Boolean> 返回true表示需要添加的数据已存在与标签中，需删除； 返回true或者null表示不会被添加为标签
                 */
                deleteMatch:null
            },
            /**
             * @func 设置多菜单
             * @type <Array>
             * [{
             *     title:'',
             *     content:'',
             *     active:true,
             *     onShow:function(){
             * 
             *     }
             * }]
             */
            tabs:null,
            /**
             * @func 
             * @type <Object>
             * {
             *     field:'name',
             *     like:/^\d/
             * }
             * @type <Array>
             * [{
             *     field:'name',
             *     like:/^\d/,
             *     like:'^{value}',
             *     like:function(data, value){
             *          return data.indexOf(value) !== -1
             *     }
             * }]
             */
            match:null,
            /**
             * @func 定义搜索列表选中数据
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> 当前选中数据
             * @return <String> 返回自定义填充值
             * @desc 未设置该值时，默认取field中的数据
             */
            setValue:null,
            /**
             * @func 列表渲染时判断某一行是否被选中
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> 列表选中数据
             * @return <Boolean> 
             */
            selected:null,
            /**
             * @func 过滤数据
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> 列表数据
             * @param value <String> 输入框中的值
             * @return <Array> 返回过滤后的数组
             */
            filter:null,
            /**
             * @func 输入框失去焦点时校验内容是否存在
             * @type <Boolean> 为true时默认取field参数对应的字段
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> 遍历的一行数据
             * @param value <String> 输入框中的值
             * @return <Boolean> 返回true则表示数据匹配
             * @desc 仅在单选功能才会启用
             */
            exist:null,
            /**
             * @func 请求返回数据时触发回调
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Anything> 接口返回数据
             * @return <Array> 返回列表数据
             */
            onResponse:null,
            /**
             * @func 选中列表前触发回调
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> 选中项数据
             * @param event <Object> 事件对象
             * @param elem <jQuery Object> 选中项对象
             * @return <Boolean> 返回false则不会触发setValue以及onSelect
             */
            onSelectBefore:null,
            /**
             * @func 选中列表后触发回调
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> 选中项数据
             * @param event <Object> 事件对象
             * @param elem <jQuery Object> 选中项对象
             */
            onSelect:null,
            /**
             * @func 输入框失焦后触发
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param data <Object> exist参数启用时该参数才存在，表示已选中数据
             */
            onBlur:null,
            /**
             * @func 改变选中值后触发回调
             * @type <Function>
             * @param self <Object> 组件实例对象
             * @param event <Event Object> 当删除标签时才会有该参数
             */
            onChange:null
        },
        _template:{
            wrap:
                '<div class="<% className %>"<%if style%> style="<%include \'style\'%>"<%/if%>>'+
                    '<div class="con-search-body<%if tabs.length > 1%> con-search-body-tab<%/if%>">'+
                        '<%include "tabs"%>'+
                        '<div class="con-search-inner">'+
                            '<%each tabs%>'+
                                '<div class="con-search-content<%if $index === 0%> con-search-result<%/if%>" style="display:none;"></div>'+
                            '<%/each%>'+
                        '</div>'+
                    '</div>'+
                    '<%include "foot"%>'+
                '</div>',
            result:
                '<%var count = 0%>'+
                '<%if data && (count = data.length)%>'+
                    '<%if prompt && value%>'+
                        '<%include "prompt"%>'+
                    '<%/if%>'+
                    '<%include "list"%>'+
                '<%elseif value%>'+
                    '<%include "empty"%>'+
                '<%/if%>',
            list:
                '<ul class="con-search-list">'+
                    '<%each data $data $index%>'+
                        '<%include "item"%>'+
                    '<%/each%>'+
                '</ul>',
            tabs:
                '<%if tabs.length > 1%>'+
                    '<div class="con-search-tab">'+
                        '<%each tabs tab%>'+
                            '<span class="con-search-tab-nav"<%if typeof tab.style === "object" && tab.style%> style="<%each tab.style%><%$index%>:<%$value%>;<%/each%>"<%/if%>>'+
                                '<%tab.title%>'+
                            '</span>'+
                        '<%/each%>'+
                    '</div>'+
                '<%/if%>',
            tags:
                '<%each data $data k%>'+
                    '<%if $data && $data.text%>'+
                    '<span class="ui-tag<%if type%><%each type v i%> ui-tag-<%v%><%/each%><%/if%>">'+
                        '<em class="con-tag-text"<%if title%> title="<%$data.text%>"<%/if%>><%$data.text%></em>'+
                        '<%if close%>'+
                        '<b class="con-tag-close"><%close%></b>'+
                        '<%/if%>'+
                        '<%if $data.fields?? && $data.fields%>'+
                            '<%each $data.fields%>'+
                                '<%if $value !== undefined%>'+
                                '<input type="hidden" name="<%$index%>" value="<%$value%>">'+
                                '<%/if%>'+
                            '<%/each%>'+
                        '<%/if%>'+
                    '</span>'+
                    '<%/if%>'+
                '<%/each%>'
        },
        _events:{
            'mouseenter':'_mouseover',
            'mouseleave':'_mouseout',
            'mouseenter .con-search-result .con-search-item':'_mouseover _itemActive',
            'mouseleave .con-search-result .con-search-item':'_itemCancelActive',
            'click .con-search-result .con-search-item':'_select',
            'click .con-search-tab-nav':'_toggle'
        },
        _toggle:function(e, elem){
            var self = this, opts = self._options, index = elem.index();
            if(index < 0){
                index = 0
            }
            var data = self._elemData[index];
            var container = data.$container;
            if(!container.is(':visible')){
                if(index !== 0){
                    if(container.is(':empty') && data.content){
                        var content = '';
                        if(typeof data.content === 'function'){
                            content = data.content.call(opts, self, elem, container)
                        }
                        else{
                            content = data.content
                        }
                        if(content === false){
                            return
                        }
                        else if(typeof content === 'string'){
                            container.html(content)
                        }
                    }
                    self._selectTab = data;
                }
                elem.addClass('s-crt');
                container.show();
                Nui.each(self._elemData, function(v, i){
                    if(i !== index){
                        v.$elem.removeClass('s-crt')
                        v.$container.hide()
                    }
                })
                self.activeTab = data;
                if(typeof data.onShow === 'function'){
                    data.onShow.call(opts, self, elem, container)
                }
            }
        },
        _mouseover:function(e, elem){
            this._hover = true
        },
        _mouseout:function(e, elem){
            delete this._hover;
        },
        _itemActive:function(e, elem){
            var active = this._activeItem;
            if(!e && active){
                active.removeClass('s-hover');
                delete this._activeItem;
            }
            active = this._activeItem = elem.addClass('s-hover');
            if(e){
                this._activeIndex = active.data('index');
            }
        },
        _itemCancelActive:function(e, elem){
            delete this._activeItem;
            elem.removeClass('s-hover')
        },
        _select:function(e){
            var self = this, opts = self._options, data = self.queryData[self._activeIndex], elem = this._activeItem, value = '';
            if(data === undefined || !elem){
                return
            }
            
            self._selectData = data;

            if(self._callback('SelectBefore', [data, e, elem]) === false){
                return
            }

            if(typeof opts.setValue === 'function'){
                value = opts.setValue.call(opts, self, data)
            }
            else if(opts.field){
                value = data[opts.field]
            }

            self.value(value);
            self.hide();
            self._callback('Select', [data, e, elem]);
        },
        _match:function(data){
            var self = this, opts = self._options, match = false;
            Nui.each(self._matchs, function(val){
                var field = val.field, like = val.like, fieldValue;
                if(field && like && (fieldValue = data[field])){
                    if(Nui.type(like, 'RegExp') && fieldValue.match(like)){
                        match = true
                    }
                    else if(typeof like === 'string'){
                        like = like.replace(/\{value\}/g, self.val);
                        if(fieldValue.match(new RegExp(like))){
                            match = true
                        }
                    }
                    else if(typeof like === 'function'){
                        match = !!like(fieldValue, self.val)
                    }
                    if(match){
                        return false
                    }
                }
            })
            return match
        },
        _storage:function(data){
            var self = this, opts = self._options;
            if(!Nui.type(data, 'Array')){
                data = []
            }
            if(opts.cache === true){
                self._caches[self.val] = data
            }
            self.queryData = data;
            self._show(true)
        },
        _exist:function(){
            var self = this, opts = self._options, exist = false, data = self.queryData;
            if(data.length && self.val){
                Nui.each(data, function(val){
                    if(self._existCheck.call(opts, val, self.val) === true){
                        exist = val;
                        return false
                    }
                })
            }
            return exist
        },
        _filter:function(){
            var self = this, opts = self._options, data = [], _data = self._setData();
            if(typeof opts.filter === 'function'){
                data = opts.filter.call(opts, self, _data, self.val);
            }
            else if(_data.length && self._matchs && self._matchs.length){
                Nui.each(_data, function(val){
                    if(self._match(val)){
                        data.push(val)
                    }
                })
            }
            else{
                data = _data
            }
            self._storage(data)
        },
        _request:function(){
            var self = this, opts = self._options, data = {}, value = self.val;
            if(opts.query && typeof opts.query === 'string'){
                data[opts.query] = value
            }
            else if(typeof opts.query === 'function'){
                var ret = opts.query.call(opts, self, value);
                if(ret){
                    if(typeof ret === 'object'){
                        data = ret
                    }
                    else if(typeof ret === 'string'){
                        data[ret] = value
                    }
                }
                else{
                    return
                }
            }
            
            var success;
            if(typeof opts.ajax === 'function'){
                success = opts.ajax.success;
                delete opts.ajax.success
            }

            clearTimeout(self._timer);

            if(self._ajax){
                self._ajax.abort()
            }

            self._timer = setTimeout(function(){
                self._ajax = request(jQuery.extend(true, {
                    url:opts.url,
                    data:data,
                    type:'get',
                    dataType:'json',
                    cache:false,
                    async:true,
                    success:function(res, status, xhr){
                        var _data = res;
                        if(typeof success === 'function'){
                            success.call(this, res, status, xhr)
                        }
                        if(typeof opts.onResponse === 'function'){
                            _data = opts.onResponse.call(opts, self, res)
                        }
                        self._storage(_data);
                    }
                }, opts.ajax||{}), null)
            }, 50)
        },
        _setActiveItem:function(code){
            if(this._items){
                var $elem = this._items[this._activeIndex];
                if($elem){
                    this._itemActive(null, $elem);
                    var stop = this['_scroll' + code]($elem.position().top);
                    if(stop !== undefined){
                        this.$list.animate({'scrollTop':stop}, 200)
                    }
                }
            }
        },
        _setDefault:function(){
            var self = this, opts = self._options;
            if(opts.nullable === true){
                if(!opts.url){
                    self.queryData = self._setData()
                }
                else{
                    self.queryData = []
                }
            }
        },
        //向下滚动
        _scroll38:function(top){
            var $list = this.$list, height = this._listHeight, stop;
            if(top > height){
                stop = top
            }
            else if(top < 0){
                stop = '-=' + height
            }
            return stop
        },
        //向上滚动
        _scroll40:function(top){
            var $list = this.$list, height = this._listHeight, stop;
            if(top < 0){
                stop = 0
            }
            else if(top >= height){
                stop = '+=' + top
            }
            return stop
        },
        //按上
        _code38:function(){
            var len = this.queryData.length;
            if(len){
                if(this._activeIndex === undefined || this._activeIndex <= 0){
                    this._activeIndex = len
                }
                this._activeIndex -= 1;
                this._setActiveItem(38);
            }
        },
        //按下
        _code40:function(){
            var len = this.queryData.length;
            if(len){
                if(this._activeIndex === undefined || this._activeIndex === len - 1){
                    this._activeIndex = -1
                }
                this._activeIndex += 1;
                this._setActiveItem(40);
                
            }
        },
        //回车
        _code13:function(e){
            this._select(e)
        },
        //退格键删除
        _backspace:function(e){
            var self = this;
            //光标位置在输入框起始处时删除末尾的标签
            if(self._tag.backspace === true){
                var tagSize = 0;
                if(self.tagData && (tagSize = self.tagData.length) && !util.getFocusIndex(self.target.get(0))){
                    self.tagData[tagSize - 1].$elem.remove();
                    self._change(e)
                }
            }
        },
        _allow:function(condition){
            if(this.activeTab !== this._selectTab && condition){
                return true
            }
        },
        //无效的按键
        _invalid:function(code){
            //tab 回车 上 下 左 右
            return /^(9|13|37|38|39|40)$/.test(code);
        },
        _bindEvent:function(){
            var self = this, opts = self._options, storeKeycode = [];

            var show = function(callback){
                self._show();
                self._hover = true;
                //部分浏览器不会获得焦点
                setTimeout(function(){
                    self.target.focus();
                    callback && callback()
                })
            }

            self._on('keyup', self.target, function(e, elem){
                var code = e.keyCode;
                //部分用户的IE6-IE8（不清楚会不会有其它浏览器），在列表出来后，如果鼠标拖动下拉框会触发keydown、keyup事件，
                //按键keyCode分别是17和67，也就是Ctrl+C，不同的时keydown事件时先C后Ctrl，keyup事件时先Ctrl后C，
                //创建一个数组，在keydown事件时存储keyCode，如果这个bug存在，那么最终数组值肯定是[17, 67]，
                //在keyup事件中判断如果数组值等于[17, 67]，则不执行后续操作，等这个bug流程走完后清空数组即可
                if(storeKeycode[0] === 17 && storeKeycode[1] === 67){
                    if(code === 17){
                        storeKeycode = []
                    }
                    return
                }
                
                if(self._invalid(code)){
                    if(self._allow(code === 40 || code === 38)){
                        if(self._showed === true){
                            self['_code'+code](e)
                        }
                        else{
                            self._show()
                        }
                    }
                    return
                }

                if(self.val = Nui.trim(elem.val())){
                    var cache;
                    if(self.val && opts.cache === true && (cache = self._caches[self.val])){
                        self._storage(cache);
                    }
                    else if(opts.url){
                        self._request()
                    }
                    else{
                        self._filter()
                    }
                }
                else{
                    self._setDefault();
                    self._show(true)
                }
            })

            //悬停在组件相关的元素上，则不允许失去焦点
            self._on('blur', self.target, function(e, elem){
                if(!self._hover){
                    var data, args;
                    if(self._existCheck){
                        args = [self._selectData];
                        if((data = self._exist()) === false){
                            self.value(null)
                        }
                        else if(self._showed && data !== self._selectData){
                            args = [data];
                            self._code40();
                            self._select(e);
                        }
                    }
                    self._callback('Blur', args)
                    self.hide()
                }
                else{
                    show()
                }
            })

            self._on('click', self.target, function(e, elem){
                if(!self._showed){
                    elem.focus()
                }
            })

            if(opts.focus === true){
                self._on('focus', self.target, function(e, elem){
                    self._show()
                })
            }

            self._on('keydown', self.target, function(e, elem){
                var code = e.keyCode;
                if(self._allow(code === 40 || code === 38)){
                    e.preventDefault()
                }
                if(code !== 67){
                    storeKeycode = []
                }
                storeKeycode.push(code)
                if(self._allow(code === 13)){
                    self['_code'+code](e)
                }
                else if(code === 8){
                    self._backspace(e)
                }
            })

            var $tagContainer = self.$tagContainer;
            var $tagScroll = self.$tagScroll;
            var tag = opts.tag;
            if($tagContainer){
                self._on('click', $tagContainer, '.ui-tag > .con-tag-close', function(e, elem){
                    if(self._disabled()){
                        return
                    }
                    elem.closest('.ui-tag').remove();
                    delete self._hover;
                    if(tag.focus === true){
                        show(function(){
                            self._change(e)
                        })
                    }
                    else{
                        self._change(e);
                    }
                })

                if($tagScroll && $tagScroll.find(self.target).length){
                    //关闭标签时隐藏组件
                    if(tag.focus !== true){
                        self._on('mouseenter', $tagContainer, '.ui-tag', function(){
                            delete self._hover
                        })
                    }
                    self._on('mouseenter', $tagScroll , function(){
                        self._mouseover()
                    })
                    self._on('mouseleave', $tagScroll , function(){
                        self._mouseout()
                    })
                    self._on('click', $tagContainer, '.ui-tag', function(){
                        self._tag_event = true;
                    })
                    self._on('click', $tagScroll , function(e){
                        if(!self._tag_event && !self._showed){
                            delete self._hover;
                            show(function(){
                                self.resize()
                            })
                        }
                        else{
                            delete self._tag_event
                        }
                    })
                }
                else if(tag.focus === true){
                    self._on('mouseenter', $tagContainer, '.ui-tag', function(){
                        self._mouseover()
                    })
                    self._on('mouseleave', $tagContainer, '.ui-tag', function(){
                        self._mouseout()
                    })
                }
            }
        },
        _create:function(){
            var self = this, data = self._tplData(), opts = self._options;
            data.style = opts.style || {};
            data.style.display = 'none';
            if(data.style['z-index'] === undefined){
                data.style['z-index'] = opts.zIndex || 0
            }
            self._elemData = [{
                title:'结果',
                style:{
                    display:'none'
                }
            }];
            if(Nui.isArray(opts.tabs) && opts.tabs.length){
                self._isTab = true;
                self._elemData = self._elemData.concat(opts.tabs);
            }
            data.tabs = self._elemData;
            self.element = $(self._tpl2html('wrap', data)).appendTo(self.container);
            self._setElemData();

            self.$body = self.element.children();
            self.$inner = self.$body.children('.con-search-inner');
            self.$result = self.$inner.children('.con-search-result');

            self._elemData[0].$elem = $();
            self._elemData[0].$container = self.$result;
            
            if(self._isTab){
                var tabs = self.$body.children('.con-search-tab').children();
                var containers = self.$inner.children();
                Nui.each(self._elemData, function(v, i){
                    v.$elem = tabs.eq(i);
                    v.$container = containers.eq(i);
                    if(!self._defaultTab && v.active === true){
                        self._defaultTab = v
                    }
                })
                //没有设置默认显示标签则取第一个
                if(!self._defaultTab){
                    self._defaultTab = self._elemData[1]
                }
            }
            
            self._event()
        },
        _initTemplate:function(name){
            var self = this, opts = self._options, content = opts[name];
            if(typeof content === 'function'){
                content = content.call(opts, self)
            }

            if(!content || typeof content !== 'string'){
                if(name === 'item' && opts.field){
                    content = '<li class="con-search-item<%selected($data)%>" data-index="<%$index%>"><%$data["'+ opts.field +'"]??%></li>'
                }
                else{
                    content = ''
                }
            }

            if(name !== 'item' && content){
                content = '<div class="con-search-'+ name +'">'+ content +'</div>'
            }

            self._template[name] = content;
        },
        _setData:function(){
            var self = this, opts = self._options, data = opts.data;
            if(typeof opts.data === 'function'){
                data = opts.data.call(opts, self)
            }

            if(!Nui.type(data, 'Array')){
                data = []
            }

            return self.data = data
        },
        _setElemData:function(){
            var self = this, elem = self.element, _class = self.constructor;
            self._elementData = {
                btbWidth:_class._getSize(elem, 'tb', 'border'),
                blrWidth:_class._getSize(elem, 'lr', 'border'),
                ptbWidth:_class._getSize(elem, 'tb', 'padding'),
                plrWidth:_class._getSize(elem, 'lr', 'padding')
            }
        },
        _setTargetData:function(){
            var self = this, target = self.target, _class = self.constructor;
            if(self.container[0].nodeName !== 'BODY'){
                self._container_body = false;
                target = self.container;
                var pos = self.container.css('position');
                if('absolute relative fixed'.indexOf(pos) === -1){
                    self.container.css('position', 'relative')
                }
            }
            else{
                self._container_body = true
            }
            self._targetData = {
                width:target.width(),
                height:target.height(),
                oWidth:target.outerWidth(),
                oHeight:target.outerHeight(),
                blWidth:_class._getSize(target, 'l', 'border'),
                brWidth:_class._getSize(target, 'r', 'border'),
                btWidth:_class._getSize(target, 't', 'border'),
                bbWidth:_class._getSize(target, 'b', 'border')
            }
        },
        _getTagData:function($elem){
            var self = this, opts = self._options, data = {};
            if(typeof self._tag.getData === 'function'){
                data = self._tag.getData.call(opts, self, $elem) || {}
            }
            else{
                data.text = $elem.children('.con-tag-text').text();
            }
            data.$elem = $elem;
            return data
        },
        _setTagsData:function(){
            var self = this, opts = self._options;
            self.$tags = self.$tagContainer.children('.ui-tag');
            self.tagData = [];
            self.$tags.each(function(){
                self.tagData.push(self._getTagData($(this)))
            })
        },
        _initTag:function(){
            var self = this, opts = self._options;
            self._tag = opts.tag;
            if(typeof self._tag !== 'object'){
                self._tag = {}
            }
            self.$tagContainer = self._jquery(self._tag.container);
            self.$tagScroll = self._jquery(self._tag.scroll);
            if(!self.$tagScroll){
                self.$tagScroll = self.$tagContainer
            }
        },
        _initData:function(){
            var self = this, opts = self._options, data = opts.data, match = opts.match, target = self.target;
            self._caches = {};

            self.queryData = [];

            self.data = [];

            self._size = opts.size || {};

            self._offset = opts.offset || {};

            self._isTab = false;

            self._defaultTab = null;

            self._listHeight = 0;

            self._multiple = target.prop('multiple') || opts.tag.multiple;

            self._setTargetData();

            self._initTag();

            Nui.each(['item', 'empty', 'prompt', 'foot'], function(name){
                self._initTemplate(name);
            })

            if(match && Nui.type(match, 'Object')){
                match = [match]
            }

            if(Nui.type(match, 'Array')){
                self._matchs = match
            }

            if(self._multiple !== true){
                if(opts.exist === true && opts.field){
                    self._existCheck = function(val){
                        return val[opts.field] === self.val
                    }
                }
                else if(typeof opts.exist === 'function'){
                    self._existCheck = opts.exist
                }
            }
        },
        _getSelected:function(){
            var self = this, opts = self._options;
            var selected = function(){
                return '';
            }
            if(typeof opts.selected === 'function'){
                selected = function(data){
                    if(opts.selected.call(opts, self, data) === true){
                        return ' s-crt'
                    }
                    return ''
                }
            }
            else if(opts.field){
                selected = function(data){
                    var cls = '';
                    if(self.tagData){
                        Nui.each(self.tagData, function(v){
                            if(data[opts.field] === v.text){
                                cls = ' s-crt';
                                return false
                            }
                        })
                    }
                    else if(self.val && data[opts.field] === self.val){
                        cls = ' s-crt'
                    }
                    return cls;
                }
            }
            return selected
        },
        _setHeight:function(input){
            var self = this, opts = self._options, len = self.queryData.length;
            if(len > 0 && opts.limit > 0){
                var height = 0;
                var selectedIndex;
                self.$list = self.$result.children('.con-search-list');
                self._items = [];
                self.$list.children('.con-search-item').each(function(i){
                    var $elem = $(this);
                    self._items.push($elem);
                    if(!self._isTab && !input && selectedIndex === undefined && $elem.hasClass('s-crt')){
                        self._selectData = self.queryData[i];
                        selectedIndex = i;
                    }
                })
                if(!self._itemHeight){
                    if(self._items.length){
                        self._itemHeight = height = self._items[0].outerHeight()
                    }
                }
                else{
                    height = self._itemHeight
                }
                if(height){
                    if(len > opts.limit){
                        height *= opts.limit
                    }
                    else{
                        height *= len
                    }
                    self.$list.height(self._listHeight = height);
                }
                self._activeIndex = selectedIndex;
            }
            else{
                delete self.$list;
                delete self._items;
            }
        },
        _scrollto:function(){
            if(this._activeIndex !== undefined && !this._isTab && this.$list){
                this.$list.scrollTop(this._activeIndex * this._itemHeight)
            }
        },
        _render:function(input){
            var self = this, opts = self._options, _class = self.constructor, result = self._elemData[0];
            result.$elem.hide();
            result.$container.hide();
            _class._active = self;
            //输入的时候才会显示
            if((self._isTab && self.val && input) || !self._isTab){
                self.$result.html(self._tpl2html('result', {
                    data:self.queryData,
                    value:self.val,
                    selected:self._getSelected(),
                    prompt:!!self._template.prompt
                }));
                result.$elem.show();
                if(self._defaultTab){
                    self._defaultTab.$elem.hide()
                }
                self._toggle(null, result.$elem);
                self._setHeight(input);
            }
            else if(self._selectTab){
                self._defaultTab.$elem.show();
                self._toggle(null, self._selectTab.$elem)
            }
            else if(self._defaultTab){
                self._toggle(null, self._defaultTab.$elem.show())
            }
            self.element.show();
            self._showed = true;
            self._scrollto();
            self.resize()
        },
        _change:function(e){
            var self = this, opts = self._options;
            self._setTagsData();
            if(self.element){
                self.resize()
                self._callback('Change', [e])
            }
        },
        _data2html:function(data){
            return this.constructor.data2html(data, this._tag)
        },
        _exec:function(){
            var self = this, opts = self._options;
            if(self._getTarget() && (self.container = self._jquery(opts.container))){
                self._initData();
                self._bindEvent();
            }
        },
        /**
         * @param input <Boolean> 正在输入操作
         */
        _show:function(input){
            var self = this, opts = self._options, _class = self.constructor;
            self.val = Nui.trim(this.target.val());
            if(self._disabled() || (self._hover && !input)){
                return
            }
            //页面中只能存在一个显示的组件
            if(_class._active && _class._active !== self){
                _class._active.hide()
            }
            //输入框值为空不允许展示下拉
            else if(opts.nullable !== true && !self.val){
                self.hide()
            }
            else{
                if(!self.element){
                    self._create()
                }
                if(!self._showed && self.$tagContainer){
                    self._setTagsData()
                }
                //不论输入框是否有值，获得焦点时显示完整列表
                if(!input){
                    self._setDefault()
                }
                self._render(input);
                this._callback('Show');
            }
        },
        resize:function(){

            if(!this.element){
                return
            }

            var self = this, opts = self._options, target = self.target, elem = self.element, targetData = self._targetData, elemData = self._elementData,
            oWidth = elem.outerWidth(), oHeight = elem.outerHeight(), offset = target.offset(), otop = offset.top, oleft = offset.left,
            _class = self.constructor, wWidth = Nui.win.width(), wHeight = Nui.win.height(), notbody = !self._container_body;

            if(notbody){
                offset = self.container.offset();
                otop = offset.top;
                oleft = offset.left;
                targetData.oWidth = self.container.outerWidth();
                targetData.oHeight = self.container.outerHeight();
            }

            var width = targetData.oWidth - elemData.blrWidth - elemData.plrWidth + (self._size.width || 0);
            var top = otop + targetData.oHeight - targetData.bbWidth + (self._offset.top||0);
            var left = oleft + (self._offset.left||0);

            //内容在可视区域底部显示不全，则在输入框上方显示
            var diff = wHeight - top - oHeight;
            if(diff < 0){
                var _top = otop - oHeight - (self._offset.top||0) + targetData.btWidth;
                if(_top >= 0){
                    top = _top
                }
            }

            //内容在可视区域右侧显示不全，则与输入框居右对齐
            diff = wWidth - left - targetData.oWidth - (self._size.width || 0);
            if(diff < 0){
                diff = targetData.oWidth + (self._size.width || 0) - targetData.oWidth;
                if(diff > 0){
                    var _left = oleft - diff;
                    if(_left >= 0){
                        left = _left
                    }
                }
            }

            if(notbody){
                top -= otop + targetData.bbWidth;
                left -= oleft + targetData.blWidth;
            }

            self.element.css({
                top:top,
                left:left,
                width:width
            })
        },
        /**
         * @func 显示组件
         */
        show:function(){
            this._show();
        },
        /**
         * @func 隐藏组件
         */
        hide:function(){
            var self = this, _class = self.constructor;
            delete self._hover;
            delete self._showed;
            delete self._itemHeight;
            delete self._selectTab;
            if(_class._active === self){
                delete _class._active
            }
            if(self.element){
                self.element.hide()
            }
            self._callback('Hide')
        },
        /**
         * @func 销毁组件
         */
        destroy:function(){
            this.hide();
            component.exports.destroy.call(this);
        },
        /**
         * @func 填充文本框内容或者添加tag标签，添加tag必须是对象或者数组类型
         * @param data <String> 设置文本框内容
         * @param data <Object> 添加tag标签，对象必须包含text属性，如果需要给标签添加隐藏域则必须包含fields属性；值为null时会清空标签或者文本框内容
         * {
         *     text:'',
         *     fields:{
         *         field1:value1,
         *         field2:value2,
         *         ...
         *     }
         * }
         * @param data <Array>
         * [{
         *     text:'',
         *     fields:{
         *         field1:value1,
         *         field2:value2,
         *         ...
         *     }
         * }
         * @param add <Boolean> 是否可以添加标签，设置为false则不能新增
         */
        value:function(data, add){
            var self = this, target = self.target, opts = self._options, 
                _class = self.constructor, name = _class.__component_name
                $tagContainer = self.$tagContainer;
            if($tagContainer && typeof data === 'object'){
                if(data !== null){
                    var array = [], html;
                    if(Nui.type(data, 'Array')){
                        array = array.concat(data)
                    }
                    else if(typeof data === 'object'){
                        if(data.text){
                            data.text = Nui.trim(data.text);
                        }
                        array.push(data)
                    }
                    if(self._multiple === true){
                        var deleteMatch = self._tag.deleteMatch;
                        var isMethod = typeof deleteMatch === 'function';
                        var $last;
                        Nui.each(self.tagData, function(tag){
                            var $elem = tag.$elem, del = false;
                            Nui.each(array, function(data, i){
                                if(data && data.text){
                                    if(isMethod){
                                        del = deleteMatch.call(opts, self, data, tag)
                                    }
                                    else{
                                        del = data.text === tag.text
                                    }
                                    if(del === true || del === null){
                                        delete array[i];
                                        return false
                                    }
                                }
                            })
                            if(del === true){
                                $elem.remove()
                            }
                            else{
                                $last = $elem
                            }
                        })
                    }
                    else{
                        self.$tags.remove()
                    }

                    if(add !== false && (html = self._data2html(array))){
                        //插入到最后一个标签后面
                        if($last){
                            $last.after(html)
                        }
                        else{
                            $tagContainer.prepend(html)
                        }
                        //如果滚动容器有滚动条，添加标签滚动到底部
                        self.$tagScroll.scrollTop(19920604)
                    }
                }
                else if(self.$tags){
                    self.$tags.remove()
                }

                if(data === null || self._tag.clear !== false){
                    self.value('')
                }

                self._change()
            }
            else if(target){
                var dom = target.get(0), obj;
                if(typeof data !== 'string'){
                    data = ''
                }
                else{
                    data = Nui.trim(data)
                }
                self.val = data;
                if(dom && dom.nui){
                    Nui.each(dom.nui, function(v, k){
                        if(k !== name && typeof v.value === 'function' && v._setStyle && v._createRules){
                            obj = v;
                            return false
                        }
                    })
                }
                if(obj){
                    obj.value(data)
                }
                else{
                    target.val(data)
                }
                if(!$tagContainer){
                    self._callback('Change')
                }
            }
        }
    })

    return Search
}); 