Nui.define("highlight",function(){var e=this.renders;return this.extend("component",{static:{_getcode:function(e,t){return'<code class="'+e+'">'+t+"</code>"},_getarr:function(e,t){var i=[];return e?(Nui.each(e,function(e){var s=t.indexOf(e),c=t.substr(0,s);t=t.substr(s+e.length),i.push(c),i.push(e)}),i.push(t)):i.push(t),i},_comment:function(e){return/\/\*/.test(e)?e=e.replace(/(\/\*(.|\s)*?\*\/)/g,this._getcode("comment","$1")):/\/\//.test(e)&&(e=e.replace(/(\/\/.*)$/g,this._getcode("comment","$1"))),e}},options:{isTitle:!1,isLight:!0,isLine:!1},_type:"",_init:function(){this._exec()},_exec:function(){var e=this;if(e.target=e._getTarget(),e.target){var t=e.target.get(0);"SCRIPT"===t.tagName&&"text/highlight"==t.type&&(e.code=e.target.html().replace(/^[\r\n]+|[\r\n]+$/g,"").replace(/</g,"&lt;").replace(/>/g,"&gt;"),e.elem&&e.elem.remove(),e._create(),e.options.isLight&&e._event())}},_tpl:e('<div class="ui-highlight<%if type%> ui-highlight-<%type%><%/if%><%if theme%> t-highlight-<%theme%><%/if%>"><%if isTitle%><div class="title"><em class="type"><%type%></em></div><%/if%><div class="inner"><table><%each list val key%><tr><%if isLine === true%><td class="line" number="<%key+1%>"><%if bsie7%><%key+1%><%/if%></td><%/if%><td class="code"><%val%></td></tr><%/each%></table><div></div>'),_create:function(){var e=this,t=(e.options,$.extend({bsie7:Nui.bsie7,list:e._list(),type:e._type},e.options||{})),i=e._tpl2html.call(e,e._tpl,t);e.elem=$(i).insertAfter(e.target)},_list:function(){var e=this;return e._type?e["_"+e._type](e.code).split("\n"):e.code.split("\n")},_event:function(){var e=this;e.evt=!1,e._on("click",e.elem,"tr",function(t,i){e.evt=!0,i.addClass("s-crt").siblings().removeClass("s-crt")}),e._on("click",e.elem,function(e){e.stopPropagation()}),e._on("click",Nui.doc,function(t){e.evt&&(e.elem.find("tr.s-crt").removeClass("s-crt"),e.evt=!1)})}})}),Nui.define("./style",function(){return this.extend("highlight",{_type:"css",_css:function(e){var t=this,i=t.constructor,s="",c=e.match(/(\/\*(.|\s)*?\*\/)|(\{[^\{\}\/]*\})/g),n=i._getarr(c,e);return Nui.each(n,function(e){Nui.trim(e)&&(e=/^\s*\/\*/.test(e)?e.replace(/(.+)/g,i._getcode("comment","$1")):/\}\s*$/.test(e)?e.replace(/(\s*)([^:;\{\}\/\*]+)(:)([^:;\{\}\/\*]+)/g,"$1"+i._getcode("attr","$2")+"$3"+i._getcode("string","$4")).replace(/([\:\;\{\}])/g,i._getcode("symbol","$1")):e.replace(/([^\:\{\}\@\#\s\.]+)/g,i._getcode("selector","$1")).replace(/([\:\{\}\@\#\.])/g,i._getcode("symbol","$1"))),s+=e}),s}})}),Nui.define("./javascript",function(){return this.extend("highlight",{_type:"js",_js:function(e){var t=this,i=t.constructor,s="",c=e.match(/(\/\/.*)|(\/\*(.|\s)*?\*\/)|('[^']*')|("[^"]*")/g),n=i._getarr(c,e);return Nui.each(n,function(e){$.trim(e)&&(/^\s*\/\//.test(e)?e=i._getcode("comment",e):/^\s*\/\*/.test(e)?e=e.replace(/(.+)/g,i._getcode("comment","$1")):(e=/'|"/.test(e)?e.replace(/(.+)/g,i._getcode("string","$1")):e.replace(new RegExp("(&lt;|&gt;|;|!|%|\\|\\[|\\]|\\(|\\)|\\{|\\}|\\=|\\/|-|\\+|,|\\.|\\:|\\?|~|\\*|&)","g"),i._getcode("symbol","$1")).replace(new RegExp("(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|elseif|each|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|include|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var)(\\s+|\\<code)","g"),i._getcode("keyword","$1")+"$2").replace(/(\/code>\s*)(\d+)/g,"$1"+i._getcode("number","$2")).replace(/(\/code>\s*)?([^<>\s]+)(\s*<code)/g,"$1"+i._getcode("word","$2")+"$3"),e=i._comment(e))),s+=e}),s}})}),Nui.define("{light}/xml",["./javascript","./style"],function(e,t){return this.extend("highlight",{_type:"xml",_xml:function(i){var s=this,c=s.constructor,n="";return i=i.replace(/&lt;\s*![^!]+-\s*&gt;/g,function(e){return e.replace(/&lt;/g,"<<").replace(/&gt;/g,">>")}),Nui.each(i.split("&lt;"),function(i){i=i.split("&gt;");var r=i.length;Nui.each(i,function(o,l){if(Nui.trim(o)){if(0==l){var a=!1;if(/^\s*\//.test(o))o=o.replace(/([^\r\n\/]+)/g,c._getcode("tag","$1")).replace(/^(\s*\/+)/,c._getcode("symbol","$1"));else{var g=o.match(/^\s+/)||"";/\=\s*['"]$/.test(o)&&(a=!0),o=o.replace(/^\s+/,"").replace(/(\s+)([^'"\/\s\=]+)((\s*=\s*)(['"]?[^'"]*['"]?))?/g,"$1"+c._getcode("attr","$2")+c._getcode("symbol","$4")+c._getcode("string","$5")).replace(/<code class="\w+">(\s*((<<\s*![-\s]+)|([-\s]+>>))?)<\/code>/g,"$1").replace(/^([^\s]+)/,c._getcode("tag","$1")).replace(/(\/+\s*)$/,c._getcode("symbol","$1")),o=g+o}o=c._getcode("symbol","&lt;")+o,a||(o+=c._getcode("symbol","&gt;"))}else if(3===r&&1===l&&/\s*['"]\s*/.test(o))o=o.replace(/(\s*['"]\s*)/,c._getcode("symbol","$1"))+c._getcode("symbol","&gt;");else{var p=$.trim(i[0]).toLowerCase();o="style"==p?t.exports._css.call(s,o):"script"==p?e.exports._js.call(s,o):o.replace(/(.+)/g,c._getcode("text","$1"))}o=o.replace(/<<\s*![^!]+-\s*>>/g,function(e){return e.replace(/([^\r\n]+)/g,c._getcode("comment","$1")).replace(/<</g,"&lt;").replace(/>>/g,"&gt;")})}n+=o})}),n}})}),Nui.define("{script}/base",["{light}/xml"],function(e){this.imports("../style/base");var t=location.hash.replace("#",""),i=$(".g-main"),s=i.find("h2"),c=(s.length,$(".m-menu ul"));return{init:function(){this.setYear(),i.find("h2[id]").length&&(this.event(),this.position())},setYear:function(){$("#nowyear").text("-"+(new Date).getFullYear())},position:function(){if(t){var e=$('[id="'+t+'"]');e.length&&i.scrollTop(e.position().top)}},event:function(){i.scroll(function(){var e=i.scrollTop();s.each(function(t){var i=$(this),n=this.id,r=i.position().top-20,o=0,l=s.eq(t+1);if(o=l.length?l.position().top-20:$(".mainbox").outerHeight(),c.find("a.s-crt").removeClass("s-crt"),e>=r&&e<o)return c.find('a[href="#'+n+'"]').addClass("s-crt"),i.removeAttr("id"),location.hash=n,i.attr("id",n),!1})})}}});