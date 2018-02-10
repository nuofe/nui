/**
 * @author Aniu[2017-03-02 08:44]
 * @update Aniu[2017-03-02 08:44]
 * @version 1.0.1
 * @description xml语法高亮组件
 */

Nui.define(['./javascript', './style'],function(js, css){
    return this.extend('./highlight', {
        _title:'xml',
        _getCode:function(){
            var self = this;
            var code = self.code;
            var _class = self.constructor;
            var str = '';
            code = code.replace(/&lt;\s*![^!]+-\s*&gt;/g, function(res){
                return res.replace(/&lt;/g, '<<').replace(/&gt;/g, '>>')
            });
            Nui.each(code.split('&lt;'), function(v1){
                v1 = v1.split('&gt;');
                var length = v1.length;
                Nui.each(v1, function(v2, k2){
                    if(Nui.trim(v2)){
                        if(k2 == 0){
                            var istag = false;
                            if(/^\s*\//.test(v2)){
                                v2 = v2.replace(/([^\r\n\/]+)/g, _class._getcode('tag', '$1'))
                                       .replace(/^(\s*\/+)/, _class._getcode('symbol', '$1'))
                            }
                            else{
                                var preBlank = v2.match(/^\s+/)||'';
                                if(/\=\s*['"]$/.test(v2)){
                                    istag = true
                                }
                                v2 = v2.replace(/^\s+/, '')
                                       .replace(/(\s+)([^'"\/\s\=]+)((\s*=\s*)(['"]?[^'"]*['"]?))?/g, '$1'+_class._getcode('attr', '$2')+_class._getcode('symbol', '$4')+_class._getcode('string', '$5'))
                                       .replace(/<code class="\w+">(\s*((<<\s*![-\s]+)|([-\s]+>>))?)<\/code>/g, '$1')
                                       .replace(/^([^\s]+)/, _class._getcode('tag', '$1'))
                                       .replace(/(\/+\s*)$/, _class._getcode('symbol', '$1'))
                                v2 = preBlank + v2;
                            }
                            v2 = _class._getcode('symbol', '&lt;') + v2;
                            if(!istag){
                                v2 += _class._getcode('symbol', '&gt;');
                            }
                        }
                        else{
                            //闭合标签
                            if(length === 3 && k2 === 1 && /\s*['"]\s*/.test(v2)){
                                v2 = v2.replace(/(\s*['"]\s*)/, _class._getcode('symbol', '$1')) + _class._getcode('symbol', '&gt;');
                            }
                            //内容
                            else{
                                var tagname = Nui.trim(v1[0]).toLowerCase().split(/\s+/)[0];
                                if(tagname == 'style'){
                                    v2 = css.exports._getCode.call(self, v2)
                                }
                                else if(tagname == 'script'){
                                    v2 = js.exports._getCode.call(self, v2)
                                }
                                else{
                                    v2 = v2.replace(/(.+)/g, _class._getcode('text', '$1'))
                                }
                            }
                        }
                        //注释
                        v2 = v2.replace(/<<\s*![^!]+-\s*>>/g, function(res){
                            return res.replace(/([^\r\n]+)/g, _class._getcode('comment', '$1')).replace(/<</g, '&lt;').replace(/>>/g, '&gt;')
                        })
                    }
                    str += v2
                })
            })

            return str
        }
    })
})
