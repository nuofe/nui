!function(t,e,n){if(!t.Nui){var i=t.Nui={type:function(t,e){if(null===t||void 0===t)return!1;if(o(e)){var n=!1;return i.each(e,function(e){if(r(e)(t))return n=!0,!1}),n}return r(e)(t)},each:function(t,e){var n;if(o(t)){var i=t.length;for(n=0;n<i&&!1!==e(t[n],n);n++);}else for(n in t)if(!1===e(t[n],n))break},browser:function(){var t=navigator.userAgent.toLowerCase(),e=/(edge)[ \/]([\w.]+)/.exec(t)||/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[],n=e[1]||"",i=e[2]||"0",r={};return"mozilla"===n&&/trident/.test(t)&&(n="msie",i="11.0"),n&&(r[n]=!0,r.version=i),r.chrome||r.edge?r.webkit=!0:r.webkit&&(r.safari=!0),r}()},r=function(t){return function(e){return{}.toString.call(e)==="[object "+t+"]"}},o=i.isArray=Array.isArray||r("Array");i.each({trim:/^\s+|\s+$/g,trimLeft:/^\s+/g,trimRight:/\s+$/g},function(t,e){i[e]=function(){return String.prototype[e]?function(t){return t[e]()}:function(e){return e.replace(t,"")}}()});var a=function(){};i.bsie6=i.browser.msie&&i.browser.version<=6,i.bsie7=i.browser.msie&&i.browser.version<=7;var s,u,c=function(t){var e=[],n={};return i.each(t,function(t){n[t]||(n[t]=!0,e.push(t))}),e},l=function(){var t,e,n,r,a,s,u=arguments[0]||{},c=1,p=arguments.length,d=!1;for("boolean"==typeof u&&(d=u,u=arguments[1]||{},c=2),"object"==typeof u||i.type(u,"Function")||(u={}),p===c&&(u={},--c);c<p;c++)if(null!=(a=arguments[c]))for(r in a)t=u[r],n=a[r],u!==n&&(d&&n&&(f(n)||(e=o(n)))?(e?(e=!1,s=t&&o(t)?t:[]):s=t&&f(t)?t:{},u[r]=l(d,s,n)):void 0!==n&&(u[r]=n));return u},f=function(t){return!(!t||!i.type(t,"Object")||t.nodeType)},p=function(t){var e;for(e in t)return!1;return!0},d=location.protocol+"//"+location.host,h=function(){var t=(d+location.pathname).replace(/\\/g,"/"),e=t.lastIndexOf("/");return t.substr(0,e+1)}(),m=function(){return"_module_"+ ++y},g=e.head||e.getElementsByTagName("head")[0]||e.documentElement,v="onload"in e.createElement("script"),y=0,_={},b={},N={},x={},j={skin:null,paths:{},alias:{},maps:{}};if(i.browser.msie&&i.browser.version<=9)var $,w=function(){return u||($&&"interactive"===$.readyState?$:(i.each(g.getElementsByTagName("script"),function(t){if("interactive"===t.readyState)return $=t,!1}),$))};t.console=t.console||{log:a,debug:a,error:a,info:a},i.bsie7&&e.execCommand("BackgroundImageCache",!1,!0),"undefined"!=typeof jQuery&&(i.win=jQuery(t),i.doc=jQuery(e));var O=function(t,e){var n=this;n.deps=e||[],n.alldeps=n.deps,n.depmodules={},n.id=t[0],n.name=t[1],n.version="",n.suffix=t[2],n.uri=n.id.substr(0,n.id.lastIndexOf("/")+1)};O.prototype.load=function(){var t=this;if(t.loaded||t.name==="_module_"+y)return t.onload();if(!t.url){var n=e.createElement("script");t.url=t.id+t.suffix+".js"+t.version,n.src=t.url,n.async=!0,n.id=t.id,u=n,g.appendChild(n),u=null,v?n.onload=n.onerror=t.onload(n):n.onreadystatechange=function(){/loaded|complete/.test(n.readyState)&&t.onload(n)()}}return t.resolve()},O.prototype.loadcss=function(){var t=this;return t.styles&&t.styles.length&&i.each(t.styles,function(n){var i=O.getAttrs(n,t.uri)[0];if(!b[i]){b[i]=!0;var r=e.createElement("link");i=i+".css"+t.version,r.rel="stylesheet",r.href=i,g.appendChild(r)}}),t},O.prototype.resolve=function(){var t=this;return t.alldeps.length&&p(t.depmodules)&&i.each(t.alldeps,function(e){var n=O.getModule(e,[],t.uri);n.version=t.version,t.depmodules[e]=n.loaded?n:n.load()}),t},O.prototype.onload=function(t){var e=this;return t?function(){return s=t.moduleData||s,t.onload=t.onerror=t.onreadystatechange=null,g.removeChild(t),t=null,e.loaded=!0,s&&(i.each(s,function(t,n){t&&(e[n]=t)}),s=null),e.resolve().rootCallback()}:(e.loaded=!0,e.resolve().rootCallback())},O.prototype.rootCallback=function(){return i.each(N,function(t,e){var n=t.getData(),i=c(n.ids);n.loaded&&t.callback&&t.callback(i)}),this},O.prototype.getData=function(t){return t||(t={ids:[],loaded:!0}),t.ids.unshift(this.id),this.loaded||(t.loaded=!1),this.alldeps.length&&i.each(this.depmodules,function(e){t=e.getData(t)}),t},O.prototype.setFactory=function(){var t=this,e=t.factory;return e.require=function(e,n){var i=t.depmodules[e];if(i)return"function"==typeof n&&n(i.module),i.module},e.extend=function(t,n,r){var s;if(t){if("string"==typeof t){var u=e.require(t);if(void 0===u)return t;t=u}return o(t)?(s=l(!0,[],t),!0===r&&(o(n)?s=s.concat(n):s.push(n))):i.type(t,"Function")?t.exports?(s=l(!0,{},t.exports,n),s.static.__parent=new O.Class.parent(t)):s=l(!0,a,t,n):s=i.type(t,"Object")?l(!0,{},t,n):t,o(r)&&i.type(s,["Object","Function"])&&i.each(r,function(t){if(t.method&&t.content){for(var e,n,r=t.method.split("->"),o=r[r.length-1];(n=r.shift())&&(e=e||s,n!==o);)e=e[n];var a=e[o];if(i.type(a,"Function")){var u=a.toString().replace(/(\})$/,";"+t.content+"$1");a=new Function("return "+u),e[o]=a()}}}),s}},e.imports=a,e.renders=function(t){return t},e.exports={},e},O.prototype.exec=function(){var t=this;if(!t.module&&"function"==typeof t.factory){var e,n=t.setFactory();t.deps.length?(e=[],i.each(t.deps,function(t){e.push(n.require(t))})):e=[n.require,n.imports,n.renders,n.extend];var r=n.apply(n,e);if(void 0===r&&(r=n.exports),"component"===t.name||r.static&&r.static.__parent instanceof O.Class.parent){var o={statics:{},propertys:{},methods:{},apis:{init:!0}};j.skin&&"string"==typeof j.skin&&(r.options.skin=j.skin),i.each(r,function(t,e){"static"===e?o.statics=t:"function"==typeof t?(o.methods[e]=t,/^_/.test(e)||(o.apis[e]=!0)):o.propertys[e]=t});var a=t.name.substr(t.name.lastIndexOf("/")+1).replace(/\W/g,"");if(x[a])t.module=x[a];else if(o.statics.__component_name=a,t.module=x[a]=O.Class(t,o),delete r.static.__parent,t.module.exports=r,"component"!==t.name){var s,u=t.module("Class");i.each(["_$fn","_$ready"],function(e){"function"==typeof(s=u[e])&&s.call(u,a,t.module)})}}else t.module=r}return t},O.replacePath=function(t){t=t.replace(/([^:])\/{2,}/g,"$1/"),t=t.replace(/\.{2,}/g,"..");var e=function(t){return/([\w]+\/?)(\.\.\/)/g.test(t)?(t=t.replace(/([\w]+\/?)(\.\.\/)/g,function(t,e,n){return t==e+n?"":t}),e(t)):t};return t=e(t),t.replace(/([\w]+)\/?(\.\/)+/g,"$1/")},O.Class=function(t,e){var n=function(t){var i=this;l(!0,i,e.propertys,{__id:n.__id++,_eventList:[]}),i.options=l(!0,{},i.options,n._options,t||{}),i.optionsCache=l(i.options),n.__instances[i.__id]=i,i._init()};return l(!0,n,e.statics),l(!0,n.prototype,e.methods),n.__setMethod(e.apis,x),"function"==typeof n._init&&n._init(),function(){var t=arguments,e=t.length,i=t[0];if("string"!=typeof i)return new n(i);if("Class"===i)return n;if(!/^_/.test(i)){var r=n[i];return"function"==typeof r?r.apply(n,Array.prototype.slice.call(t,1)):e>1?n[i]=t[1]:r}}},O.Class.parent=function(t){this.exports=t.exports,this.Class=t("Class")},O.setPath=function(t){var e=/\{([^\{\}]+)\}/.exec(t);if(e){var n=j.paths[e[1]];n&&(t=t.replace(e[0],n).replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""))}return t},O.getAttrs=function(t,e){var n,i=t.replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""),r=i.match(/(-debug|-min)$/g),o="";return r&&(i=i.replace(/(-debug|-min)$/g,""),o=r[0]),t=O.setPath(j.alias[i]||i),/^((https?|file):)?\/\//.test(t)||(n=O.replacePath(h+t),t=(e||h)+t),t=O.replacePath(t),[t,i,o,n]},O.getModule=function(t,e,n){var i=O.getAttrs(t,n),r=i[0];return _[i[1]]||_[r]||_[i[3]]||(_[r]=new O(i,e))},O.load=function(t,e,n){if(i.type(t,"String")&&i.trim(t)){var r=t.match(/(\?[\s\S]+)$/),o=O.getModule(n,[t]);r&&(o.version=r[0]);var a=o.alldeps[0],s=j.maps[a.replace(/-(debug|min)$/,"")]||"";s&&(/^\?/.test(s)||(s="?v="+s),o.version=s),o.callback=function(t){var r=o.depmodules[a],s=r.suffix;i.each(t,function(t){var e=_[t].exec();s||e.loadcss()}),i.type(e,"Function")&&e.call(i,r.module),delete N[n],delete o.callback},N[n]=o,o.load()}},O.getdeps=function(t){var e=[],n=[],r=t.match(/(require|extend|imports)\(('|")[^'"]+\2/g);return r&&i.each(r,function(t){/^(require|extend)/.test(t)?e.push(t.replace(/^(require|extend)|[\('"]/g,"")):n.push(t.replace(/^imports|[\('"]/g,""))}),[c(e),c(n)]},O.define=function(t,e,n){i.type(t,"Function")?(n=t,t=void 0,e=[]):i.type(e,"Function")&&(n=e,i.type(t,"String")?e=[]:(e=t,t=void 0));var r=O.getdeps(n.toString()),o=e.concat(r[0]),a=r[1];if(t&&!_[t]&&!_[O.getAttrs(t)[0]]){var u=O.getModule(t,o);u.deps=e,u.styles=a,u.factory=n,u.loaded=!0,u.load()}if(s={name:t,deps:e,styles:a,alldeps:o,factory:n},void 0!==w){var c=w();c&&(c.moduleData=s)}},i.load=i.use=function(t,e){return t&&"string"==typeof t&&O.load(t,e,m()),i},i.define=function(){var t=arguments,e=t.length,n=[];!e||1===e&&!i.type(t[0],"Function")?n.push(function(){return t[0]}):2===e&&!i.type(t[1],"Function")||3==e&&!i.type(t[2],"Function")?(n.push(t[0]),n.push(function(){return t[1]})):2===e&&!i.type(t[0],["Array","String"])&&i.type(t[1],"Function")?n.push(t[1]):3===e&&!o(t[1])&&i.type(t[2],"Function")?(n.push(t[0]),n.push(t[2])):n=t,O.define.apply(O,n)},i.config=function(t,e){if(i.type(t,"Object"))j=l({},j,t);else{if(!e||!i.type(t,"String"))return;if(j[t]=e,"paths"!==t)return}var n=j.base||j.paths.base||"";/^((https?|file):)?\/\//.test(n)||(n=j.paths.base=d+n),i.each(j.paths,function(t,e){"base"===e||/^((https?|file):)?\/\//.test(t)||(j.paths[e]=n+"/"+t)})}}}(this,document),Nui.define("util",{regex:{mobile:/^0?(13|14|15|17|18)[0-9]{9}$/,tel:/^[0-9-()（）]{7,18}$/,email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,idcard:/^\d{17}[\d|x]|\d{15}$/,cn:/^[\u4e00-\u9fa5]+$/,taxnum:/^[a-zA-Z0-9]{15,20}$/},getParam:function(t,e){var n=decodeURI(e||location.href),i={};if(startIndex=n.indexOf("?"),startIndex++>0){var r,o=n.substr(startIndex).split("&");Nui.each(o,function(t){r=t.split("="),i[r[0]]=r[1]})}return"string"==typeof t&&t&&(i=void 0!==(r=i[t])?r:""),i},setParam:function(t,e,n){var i;if(Nui.type(t,"Object"))i=e||location.href,Nui.each(t,function(t,e){t&&(Nui.type(t,"Object")&&(t=tools.getJSON(t)),i=tools.setParam(e,t,i))});else if(i=n||location.href,-1===i.indexOf("?")&&(i+="?"),Nui.type(e,"Object")&&(e=tools.getJSON(e)),-1!==i.indexOf(t+"=")){var r=new RegExp("("+t+"=)[^&]*");i=i.replace(r,"$1"+e)}else{var o="";-1!==i.indexOf("=")&&(o="&"),i+=o+t+"="+e}return i},supportCss3:function(t){var e,n=["webkit","Moz","ms","o"],i=[],r=document.documentElement.style,o=function(t){return t.replace(/-(\w)/g,function(t,e){return e.toUpperCase()})};for(e in n)i.push(o(n[e]+"-"+t));i.push(o(t));for(e in i)if(i[e]in r)return!0;return!1},supportHtml5:function(t,e){return t in document.createElement(e)},location:function(t,e){t&&jQuery('<a href="'+t+'"'+(e?'target="'+(e||"_self")+'"':"")+"><span></span></a>").appendTo("body").children().click().end().remove()},formatDate:function(t,e){if(t=parseInt(t)){if(!e)return t;var n=new Date(t),i={"M":n.getMonth()+1,"d":n.getDate(),"h":n.getHours(),"m":n.getMinutes(),"s":n.getSeconds()};return e=e.replace(/([yMdhms])+/g,function(t,e){var r=i[e];return void 0!==r?(t.length>1&&(r="0"+r,r=r.substr(r.length-2)),r):"y"===e?(n.getFullYear()+"").substr(4-t.length):t})}return"-"},getJSON:function(t){if("undefined"!=typeof JSON){var e=JSON.stringify(t);return Nui.browser.msie&&"8.0"==Nui.browser.version?e.replace(/\\u([0-9a-fA-F]{2,4})/g,function(t,e){return String.fromCharCode(parseInt(e,16))}):e}if(Nui.isArray(t)){var n=[];return Nui.each(t,function(t){n.push(tools.getJSON(t))}),"["+n.join(",")+"]"}if(Nui.type(t,"Object")){var i=[];return Nui.each(t,function(t,e){i.push('"'+e+'":'+tools.getJSON(t))}),"{"+i.join(",")+"}"}return'"'+t+'"'},getData:function(t){var e={result:{},total:0,voidTotal:0},n=t.serializeArray(),i=n.length,r=0;for(r;r<i;r++){var o=Nui.trim(n[r].value);e.all++,o||e.voidTotal++,e.result[n[r].name]=o}return e}}),Nui.define("template",["util"],function(t){var e=function(t,e,i){if(this.tplid=t){if(n[t])return f.call(this,n[t],e,i);var r=document.getElementById(t);if(r&&"SCRIPT"===r.nodeName&&"text/html"===r.type)return f.call(this,n[t]=r.innerHTML,e,i)}return""},n={},i={openTag:"<%",closeTag:"%>"},r={trim:Nui.trim,formatDate:t.formatDate,setParam:t.setParam},o=!!"".trim,a=";$that.out = function(){return $that.code";a=(o?'""'+a:"[]"+a+'.join("")')+"}";var s=function(t){return o?t?function(t){return"$that.code += "+t+";"}:function(t,e){return t+=e}:t?function(t){return"$that.code.push("+t+");"}:function(t,e){return t.push(e),t}},u=s(!0),c=s(),l=function(t,n,i,r){var o=this,a=n.replace(/([^\s])/g,"\\$1"),s=i.replace(/([^\s])/g,"\\$1");return t.replace(new RegExp(a+"\\s*include\\s+['\"]([^'\"]*)['\"]\\s*"+s,"g"),function(t,n){if(n){var i=o[n];return"function"==typeof i&&(i=i()),"string"==typeof i?f.call(o,i,null,r):e(n,null,r)}return""})},f=function(t,e,n){var s=this;if("string"==typeof t){n=n||{};var u=n.openTag||i.openTag,f=n.closeTag||i.closeTag;if(t=l.call(s,t,u,f),e&&"object"==typeof e){Nui.isArray(e)&&(e={$list:e});var h=o?"":[];t=t.replace(/\s+/g," "),Nui.each(t.split(u),function(t,e){t=t.split(f),e>=1?h=c(h,d(Nui.trim(t[0]),!0)):t[1]=t[0],h=c(h,d(t[1].replace(/'/g,"\\'").replace(/"/g,'\\"')))});var m=o?"":[];Nui.each(e,function(t,e){m=c(m,e+"=$data."+e+",")}),o||(h=h.join(""),m=m.join("")),h="var "+m+"$that=this; $that.line=4; $that.code="+a+";\ntry{\n"+h+";}\ncatch(e){\n$that.error(e, $that.line)\n};";try{var g=new Function("$data",h);g.prototype.methods=r,g.prototype.error=p(h,e,s.tplid),t=new g(e).out(),g=null}catch(t){p(h,e,s.tplid)(t)}}return t}return""},p=function(t,e,n){return function(i,r){var o="\n",a=[];t="function anonymous($data){\n"+t+"\n}",t=t.split("\n"),Nui.each(t,function(t,e){a.push(e+1+"      "+t.replace("$that.line++;",""))}),o+="code\n",o+=a.join("\n")+"\n\n",void 0!==typeof JSON&&(o+="data\n",o+=JSON.stringify(e)+"\n\n"),n&&(o+="templateid\n",o+=n+"\n\n"),r&&(o+="line\n",o+=r+"\n\n"),o+="message\n",o+=i.message,console.error(o)}},d=function(t,e){if(!t)return"";var n;return(e?void 0!==(n=h(t,"if"))?"if("+n+"){":void 0!==(n=h(t,"elseif"))?"\n}\nelse if("+n+"){":"else"===t?"\n}\nelse{":"/if"===t?"}":void 0!==(n=h(t,"each ",/\s+/))?"Nui.each("+n[0]+", function("+(n[1]||"$value")+","+(n[2]||"$index")+"){":"/each"===t?"});":void 0!==(n=h(t," | ",/\s*,\s*/))?u("$that.methods."+n[0]+"("+n.slice(1).toString()+")"):0===t.indexOf("var ")?t+";":u(t):u("'"+t+"'"))+"\n$that.line++;"},h=function(t,e,n){var i;if(0===t.indexOf(e)?i="":" | "===e&&t.indexOf(e)>0&&(i=","),void 0!==i)return t=Nui.trimLeft(t.replace(e,i)),n?t.split(n):t};return e.method=function(t,e){r[t]||(r[t]=e)},e.config=function(){var t=arguments;Nui.type(t[0],"Object")?Nui.each(t[0],function(t,e){i[e]=t}):t.length>1&&"string"==typeof t[0]&&(i[t[0]]=t[1])},e.render=f,e}),Nui.define("delegate",function(){return function(t){var e=this,n=t.elem,i=t.maps,r=t.calls;if(t&&n&&i&&r){n instanceof jQuery||(n=jQuery(n));var o,a,s=function(t,e){var n=this,i=$(n);Nui.each(e,function(e,o){if("function"==typeof(e=r[e]))return e.call(n,t,i)})},u=e.constructor&&e.constructor._component_name_;return Nui.each(i,function(t,i){t=Nui.trim(t).split(/\s+/),i=Nui.trim(i).split(/\s+/),o=i.shift().replace(/:/g," "),a=i.join(" "),u?e._on(o,n,a,function(e){s.call(this,e,t)}):n.on(o,a,function(e){s.call(this,e,t)})}),e}}}),function(window,undefined){"undefined"!=typeof jQuery&&Nui.define("component",["template","delegate"],function(tpl,events){var module=this,callMethod=function(t,e,n){if(e.length>t.length){var i=e[t.length];if(i&&n.options.id!==i&&n.__id!==i)return}t.apply(n,e)},statics={__id:0,__instances:{},__setMethod:function(apis,components){var that=this;return Nui.each(apis,function(val,methodName){that[methodName]||(that[methodName]=function(){var that=this,args=arguments,container=args[0],name=that.__component_name;if(name&&"component"!==name)if(container&&container instanceof jQuery)if("init"===methodName){var mod=components[name];mod&&container.find("[data-"+name+"-options]").each(function(){if(!this.nui||!this.nui[name]){var elem=jQuery(this),options=elem.data(name+"Options")||{};"string"==typeof options&&(options=eval("("+options+")")),options.target=elem,mod(options)}})}else container.find("[nui_component_"+name+"]").each(function(){var t,e;this.nui&&(t=this.nui[name])&&"function"==typeof(e=t[methodName])&&callMethod(e,Array.prototype.slice.call(args,1),t)});else Nui.each(that.__instances,function(t){var e=t[methodName];"function"==typeof e&&callMethod(e,args,t)});else Array.prototype.unshift.call(args,methodName),Nui.each(components,function(t,e){"component"!==e&&t.apply(t,args)})})}),that},_options:{},_init:jQuery.noop,_jquery:function(t){return t instanceof jQuery?t:jQuery(t)},_getSize:function(t,e,n){var i=0;if(n=n||"border",e=e||"tb","all"===n)return this._getSize(t,e)+this._getSize(t,e,"padding");var r={l:["Left"],r:["Right"],lr:["Left","Right"],t:["Top"],b:["Bottom"],tb:["Top","Bottom"]},o=[{border:{l:["LeftWidth"],r:["RightWidth"],lr:["LeftWidth","RightWidth"],t:["TopWidth"],b:["BottomWidth"],tb:["TopWidth","BottomWidth"]}},{padding:r},{margin:r}];return Nui.each(o,function(r){r[n]&&Nui.each(r[n][e],function(e){var r=parseInt(t.css(n+e));i+=isNaN(r)?0:r})}),i},_$fn:function(t,e){jQuery.fn[t]=function(){var n=arguments,i=n[0];return this.each(function(){if("string"!=typeof i)Nui.type(i,"Object")?i.target=this:i={target:this},e(i);else if(i){var r;if(this.nui&&(r=this.nui[t])&&0!==i.indexOf("_"))if("options"===i)r.set(n[1],n[2]);else{var o=r[i];"function"==typeof o&&o.apply(r,Array.prototype.slice.call(n,1))}}})}},_$ready:function(t,e){"function"==typeof this.init&&this.init(Nui.doc)},options:function(t,e){Nui.type(t,"Object")?jQuery.extend(!0,this._options,t):Nui.type(t,"String")&&(this._options[t]=e)}};return{static:statics,options:{target:null,id:"",skin:""},_template:{},_init:jQuery.noop,_exec:jQuery.noop,_getTarget:function(){var t=this;if(!t.target){var e=t.options.target,n=t.constructor;if(!e)return null;e=n._jquery(e);var i="nui_component_"+n.__component_name;t.target=e.attr(i,""),t.target.each(function(){this.nui||(this.nui={}),this.nui[n.__component_name]=t})}return t.target},_tplData:function(){var t=this.options,e=this.constructor,n="nui-"+e.__component_name,i=Nui.trim(t.skin),r=function(t,e){if(t.__parent){var n=t.__parent.Class,o=n.__component_name;if("component"!==o)return i&&e.unshift("nui-"+o+"-"+i),e.unshift("nui-"+o),r(n,e)}return e},o=r(e,[]);return o.push(n),i&&o.push(n+"-"+i),{className:o.join(" ")}},_event:function(){var t=this._events;return"function"==typeof t&&(!(t=t.call(this))||t instanceof this.constructor)?this:events.call(this,t)},_on:function(t,e,n,i,r){var o=this;"function"==typeof n&&(r=i,i=n,n=e,e=null,n=o.constructor._jquery(n));var a=function(t){return i.call(this,t,jQuery(this))};return e?("string"!=typeof n&&((n=n.selector)||(n=o.options.target)),e.on(t,n,a),r&&e.find(n).trigger(t)):(n.on(t,a),r&&n.trigger(t)),o._eventList.push({dalegate:e,selector:n,type:t,callback:a}),o},_off:function(){var t=this,e=t._eventList;return Nui.each(e,function(t,n){t.dalegate?t.dalegate.off(t.type,t.selector,t.callback):t.selector.off(t.type,t.callback),e[n]=null,delete e[n]}),t._eventList=[],t},_delete:function(){var t=this,e=t.constructor,n="nui_component_"+e.__component_name;t.target.removeAttr(n).each(function(){this.nui&&(this.nui[e.__component_name]=null,delete this.nui[e.__component_name])}),e.__instances[t.__id]=null,delete e.__instances[t.__id]},_reset:function(){return this._off(),this.element&&this.element.remove(),this},_tpl2html:function(t,e){return tpl.render.call(this._template,this._template[t],e,{openTag:"<%",closeTag:"%>"})},set:function(t,e){return this._reset(),(t||e)&&(jQuery.isPlainObject(t)?this.options=jQuery.extend(!0,this.options,t):this.options[t]=e,this._exec()),this},get:function(t){return t?this.options[t]:this.options},reset:function(){return this.set(this.optionsCache)},destroy:function(){this._reset(),this._delete()}}})}(this);