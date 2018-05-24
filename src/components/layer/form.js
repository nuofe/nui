Nui.define(function(require){
    var layer = require('./layer');
    var util = require('../../core/util');
    var loading = require('./loading');
    var request = require('../../core/request');
    var validate = require('../validate');

    return function(options){
        var onInit = options.onInit;
        delete options.onInit;
        var valid = options.valid;
        var def = layer.config('button');
        var button = options.button;
        if(!button){
            var confirm = {
                id:'confirm',
                name:'normal',
                text:'保存'
            }
            var cancel = {
                id:'cancel',
                text:'关闭'
            }
            if(def && def[0] && def[0].id === 'confirm'){
                button = [confirm, cancel]
            }
            else{
                button = [cancel, confirm]
            }
        }
        var btns = Nui.extend(true, [], button)

        Nui.each(btns, function(val, i){
            if(val.id === 'confirm' && !val.callback){
                btns[i].callback = function(self, e){
                    self.main.find('form').submit()
                }
                return false
            }
        })

        delete options.button;
        var formLayer = layer(Nui.extend(true, {
            scrollbar:false,
            id:'form',
            button:btns,
            onInit:function(self){
                var main = self.main;
                var elems = main.find('[name!=""][data-rule]');
                var form = main.find('form:visible');
                var rules = {};
                var messages = {};
                var setting = form.data('setting');
                elems.each(function(){
                    var elem = $(this);
                    var name = elem.attr('name');
                    var data = elem.data();
                    var rule = eval('('+ data.rule +')');
                    rules[name] = rule;
                    if(typeof data.message !== 'undefined'){
                        var message = eval('('+ data.message +')');
                        $.each(message, function(key, msg){
                            if(typeof self._options.messageFilter === 'function'){
                                message[key] = self._options.messageFilter.call(self._options, name, msg)||''
                            }
                        })
                        messages[name] = message;
                    } 
                });
                var opts = {
                    rules:rules,
                    messages:messages,
                    errorClass:'s-err',
					onkeyup:false,
					focusInvalid:false,
                    onfocusout:false,
					focusCleanup:true,
                    ignore:'',
                    success:function(error, element) {
						error.remove();
						$(element).addClass('s-succ');
					},
					errorPlacement:function(error, element) {
						element.removeClass('s-succ');
						if(error.text()){
							element.closest(self._options.itemWrap||'.ui-item').find(self._options.errorWrap||'.ui-err').html(error);
						}
					},
                    submitHandler:function(){
                        var param = {};
                        if(typeof self._options.getData === 'function'){
                        	param = self._options.getData.call(self._options, self, form)
                        }
                        else{
                            param = util.getData(form, '').result;
                        }

                        if(typeof self._options.onBeforeSubmit === 'function'){
                        	param = self._options.onBeforeSubmit.call(self._options, self, param);
                            if(param === false){
                                return false
                            }
                        }

                        var _loading = loading({
                            content:self._options.loading||'正在保存数据...',
                            under:self
                        });
                        
                        request($.extend({
                            url:form.attr('action'),
                            dataType:'json',
                            type:'POST',
                            data:param,
                            success:function(res, xhr){
                                _loading.hide();
                                if(typeof self._options.onSuccess === 'function'){
                                    self._options.onSuccess.call(self._options, self, res, xhr, param)
                                }
                            },
                            error:function(xhr){
                                _loading.hide();
                                if(typeof self._options.onError === 'function'){
                                    self._options.onError.call(self._options, self, xhr, param)
                                }
                            }
                        }, self._options.ajax||{}), null)
                    }
                }
                self.validator = form.validate(Nui.extend(true, opts, setting||{}, valid||{}));
                typeof onInit === 'function' && onInit.call(self._options, self)
            }
        }, options||{}))
        return formLayer
    }
})