!function(window,document,undefined){if(!window.Nui){var Nui=window.Nui={type:function(e,t){if(null===e||e===undefined)return!1;if(isArray(t)){var n=!1;return Nui.each(t,function(t){if(isType(t)(e))return n=!0,!1}),n}return isType(t)(e)},each:function(e,t){var n;if(isArray(e)){var i=e.length;for(n=0;n<i&&!1!==t(e[n],n);n++);}else for(n in e)if(!1===t(e[n],n))break},browser:function(){var e=navigator.userAgent.toLowerCase(),t=/(edge)[ \/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],n=t[1]||"",i=t[2]||"0",o={};return"mozilla"===n&&/trident/.test(e)&&(n="msie",i="11.0"),n&&(o[n]=!0,o.version=i),o.chrome||o.edge?o.webkit=!0:o.webkit&&(o.safari=!0),o}()},isType=function(e){return function(t){return{}.toString.call(t)==="[object "+e+"]"}},isArray=Nui.isArray=Array.isArray||isType("Array");Nui.each({trim:/^\s+|\s+$/g,trimLeft:/^\s+/g,trimRight:/\s+$/g},function(e,t){Nui[t]=function(){return String.prototype[t]?function(e){return e[t]()}:function(t){return t.replace(e,"")}}()});var noop=function(){};Nui.bsie6=Nui.browser.msie&&Nui.browser.version<=6,Nui.bsie7=Nui.browser.msie&&Nui.browser.version<=7;var unique=function(e){var t=[],n={};return Nui.each(e,function(e){n[e]||(n[e]=!0,t.push(e))}),t},extend=function(){var e,t,n,i,o,r,u=arguments[0]||{},a=1,c=arguments.length,s=!1;for("boolean"==typeof u&&(s=u,u=arguments[1]||{},a=2),"object"==typeof u||Nui.type(u,"Function")||(u={}),c===a&&(u={},--a);a<c;a++)if(null!=(o=arguments[a]))for(i in o)e=u[i],n=o[i],u!==n&&(s&&n&&(isObject(n)||(t=isArray(n)))?(t?(t=!1,r=e&&isArray(e)?e:[]):r=e&&isObject(e)?e:{},u[i]=extend(s,r,n)):n!==undefined&&(u[i]=n));return u},isObject=function(e){return!(!e||!Nui.type(e,"Object")||e.nodeType)},isEmptyObject=function(e){var t;for(t in e)return!1;return!0},domain=location.protocol+"//"+location.host,getPath=function(){var e=(domain+location.pathname).replace(/\\/g,"/"),t=e.lastIndexOf("/");return e.substr(0,t+1)},dirname=getPath(),getModuleid=function(){return"_module_"+ ++mid},head=document.head||document.getElementsByTagName("head")[0]||document.documentElement,support="onload"in document.createElement("script"),array=Array.prototype,mid=0,moduleData,cacheModules={},cacheStyles={},rootModules={},components={},config={skin:null,paths:{},alias:{},maps:{}},currentlyAddingScript;if(Nui.browser.msie&&Nui.browser.version<=9)var interactiveScript,getCurrentScript=function(){return currentlyAddingScript||(interactiveScript&&"interactive"===interactiveScript.readyState?interactiveScript:(Nui.each(head.getElementsByTagName("script"),function(e){if("interactive"===e.readyState)return interactiveScript=e,!1}),interactiveScript))};window.console=window.console||{log:noop,debug:noop,error:noop,info:noop},Nui.bsie7&&document.execCommand("BackgroundImageCache",!1,!0),"undefined"!=typeof jQuery&&(Nui.win=jQuery(window),Nui.doc=jQuery(document));var Module=function(e,t){var n=this;n.deps=t||[],n.alldeps=n.deps,n.depmodules={},n.id=e[0],n.name=e[1],n.version="",n.suffix=e[2],n.uri=n.id.substr(0,n.id.lastIndexOf("/")+1)};Module.prototype.load=function(){var e=this;if(e.loaded||e.name==="_module_"+mid)return e.onload();if(!e.url){var t=document.createElement("script");e.url=e.id+e.suffix+".js"+e.version,t.src=e.url,t.id=e.id,currentlyAddingScript=t,head.appendChild(t),currentlyAddingScript=null,support?t.onload=t.onerror=e.onload(t):t.onreadystatechange=function(){/loaded|complete/.test(t.readyState)&&e.onload(t)()}}return e.resolve()},Module.prototype.loadcss=function(){var e=this;return e.styles&&e.styles.length&&Nui.each(e.styles,function(t){var n=Module.getAttrs(t,e.uri)[0];if(!cacheStyles[n]){cacheStyles[n]=!0;var i=document.createElement("link");n=n+".css"+e.version,i.rel="stylesheet",i.href=n,head.appendChild(i)}}),e},Module.prototype.resolve=function(){var e=this;return e.alldeps.length&&isEmptyObject(e.depmodules)&&Nui.each(e.alldeps,function(t){var n=Module.getModule(t,[],e.uri);n.version=e.version,e.depmodules[t]=n.loaded?n:n.load()}),e},Module.prototype.onload=function(e){var t=this;return e?function(){return moduleData=e.moduleData||moduleData,e.onload=e.onerror=e.onreadystatechange=null,head.removeChild(e),e=null,t.loaded=!0,moduleData&&(Nui.each(moduleData,function(e,n){e&&(t[n]=e)}),moduleData=null),t.resolve().rootCallback()}:(t.loaded=!0,t.resolve().rootCallback())},Module.prototype.rootCallback=function(){return Nui.each(rootModules,function(e,t){var n=e.getData(),i=unique(n.ids);n.loaded&&e.callback&&e.callback(i)}),this},Module.prototype.getData=function(e){return e||(e={ids:[],loaded:!0}),e.ids.unshift(this.id),this.loaded||(e.loaded=!1),this.alldeps.length&&Nui.each(this.depmodules,function(t){e=t.getData(e)}),e},Module.prototype.setFactory=function(){var e=this,t=e.factory;return t.require=function(t,n){var i=e.depmodules[t];if(i)return"function"==typeof n&&n(i.module),i.module},t.extend=function(e,n,i){var o;if(e){if("string"==typeof e){var r=t.require(e);if(r===undefined)return e;e=r}return isArray(e)?(o=extend(!0,[],e),!0===i&&(isArray(n)?o=o.concat(n):o.push(n))):Nui.type(e,"Function")?e.exports?(o=extend(!0,{},e.exports,n),o.static._parent=e):o=extend(!0,noop,e,n):o=Nui.type(e,"Object")?extend(!0,{},e,n):e,isArray(i)&&Nui.type(o,["Object","Function"])&&Nui.each(i,function(e){if(e.method&&e.content){for(var t,n,i=e.method.split("->"),r=i[i.length-1];(n=i.shift())&&(t=t||o,n!==r);)t=t[n];var u=t[r];if(Nui.type(u,"Function")){var a=u.toString().replace(/(\})$/,";"+e.content+"$1");u=new Function("return "+a),t[r]=u()}}}),o}},t.imports=noop,t.renders=function(e){return e},t.exports={},t},Module.prototype.exec=function(){var e=this;if(!e.module&&"function"==typeof e.factory){var t=e.setFactory(),n=[];Nui.each(e.deps,function(e){n.push(t.require(e))});var i=t.apply(t,n);void 0===i&&(i=t.exports);var o=i.static;if("component"===e.name||o&&o._parent&&o._parent.constructor===Module.exports){var r={static:{},attr:{},proto:{},method:{init:!0}};config.skin&&"string"==typeof config.skin&&(i.options.skin=config.skin),Nui.each(i,function(e,t){"static"===t?r[t]=e:"function"==typeof e?(r.proto[t]=e,/^_/.test(t)||(r.method[t]=!0)):r.attr[t]=e});var u=e.name.substr(e.name.lastIndexOf("/")+1).replace(/\W/g,"");components[u]?e.module=components[u]:(r.static._component_name_=u,e.module=Module.createClass(e,r),e.module.exports=i,"component"!==e.name&&(components[u]=e.module,Nui.each(["_$fn","_$ready"],function(t){e.module.call(e,t,u,e.module)})))}else e.module=i}return e},Module.replacePath=function(e){e=e.replace(/([^:])\/{2,}/g,"$1/"),e=e.replace(/\.{2,}/g,"..");var t=function(e){return/([\w]+\/?)(\.\.\/)/g.test(e)?(e=e.replace(/([\w]+\/?)(\.\.\/)/g,function(e,t,n){return e==t+n?"":e}),t(e)):e};return e=t(e),e.replace(/([\w]+)\/?(\.\/)+/g,"$1/")},Module.setMethod=function(obj,Class){return Nui.each(obj.method,function(val,method){Class[method]||(Class[method]=function(){var that=this,args=arguments,container=args[0],name=that._component_name_;if(name&&"component"!==name)if(container&&container instanceof jQuery)if("init"===method){var mod=components[name];mod&&container.find("[data-"+name+"-options]").each(function(){if(!this.nui||!this.nui[name]){var elem=jQuery(this),options=elem.data(name+"Options")||{};"string"==typeof options&&(options=eval("("+options+")")),options.target=elem,mod(options)}})}else container.find("[nui_component_"+name+"]").each(function(){var e;this.nui&&(e=this.nui[name])&&e[method]&&e[method].apply(e,array.slice.call(args,1))});else Nui.each(that._instances,function(e){"function"==typeof e[method]&&e[method].apply(e,args)});else array.unshift.call(args,method),Nui.each(components,function(e,t){e.apply(e,args)})})}),delete obj.method,Class},Module.exports=function(e){this.init=function(){var t=arguments,n=t.length,i=t[0];if("string"!=typeof i)return new e(i);if("class"===i)return e;if(!/^_/.test(i)||this instanceof Module){var o=e[i];return"function"==typeof o?o.apply(e,array.slice.call(t,1)):n>1?e[i]=t[1]:o}},this.init.constructor=Module.exports},Module.createClass=function(e,t){var n=function(e){var i=this;extend(!0,i,t.attr,{_index:n._index++,_eventList:[]}),i.options=extend(!0,{},i.options,n._options,e||{}),i.optionsCache=extend(i.options),n._instances[i._index]=i,i.static=null,i._init()};return extend(!0,n,t.static),extend(!0,n.prototype,t.proto),Module.setMethod(t,n),"function"==typeof n._init&&n._init(),new Module.exports(n).init},Module.setPath=function(e){var t=/\{([^\{\}]+)\}/.exec(e);if(t){var n=config.paths[t[1]];n&&(e=e.replace(t[0],n).replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""))}return e},Module.getAttrs=function(e,t){var n,i=e.replace(/(\.(js|css))?(\?[\s\S]*)?$/g,""),o=i.match(/(-debug|-min)$/g),r="";return o&&(i=i.replace(/(-debug|-min)$/g,""),r=o[0]),e=Module.setPath(config.alias[i]||i),/^((https?|file):)?\/\//.test(e)||(n=Module.replacePath(dirname+e),e=(t||dirname)+e),e=Module.replacePath(e),[e,i,r,n]},Module.getModule=function(e,t,n){var i=Module.getAttrs(e,n),o=i[0];return cacheModules[i[1]]||cacheModules[o]||cacheModules[i[3]]||(cacheModules[o]=new Module(i,t))},Module.load=function(e,t,n){if(Nui.type(e,"String")&&Nui.trim(e)){var i=e.match(/(\?[\s\S]+)$/),o=Module.getModule(n,[e]);i&&(o.version=i[0]);var r=o.alldeps[0],u=config.maps[r.replace(/-(debug|min)$/,"")]||"";u&&(/^\?/.test(u)||(u="?v="+u),o.version=u),o.callback=function(e){var i=o.depmodules[r],u=i.suffix;Nui.each(e,function(e){var t=cacheModules[e].exec();u||t.loadcss()}),Nui.type(t,"Function")&&t.call(Nui,i.module),delete rootModules[n],delete o.callback},rootModules[n]=o,o.load()}},Module.getdeps=function(e){var t=[],n=[],i=e.match(/(require|extend|imports)\(('|")[^'"]+\2/g);return i&&Nui.each(i,function(e){/^(require|extend)/.test(e)?t.push(e.replace(/^(require|extend)|[\('"]/g,"")):n.push(e.replace(/^imports|[\('"]/g,""))}),[unique(t),unique(n)]},Module.define=function(e,t,n){Nui.type(e,"Function")?(n=e,e=undefined,t=[]):Nui.type(t,"Function")&&(n=t,Nui.type(e,"String")?t=[]:(t=e,e=undefined));var i=Module.getdeps(n.toString()),o=t.concat(i[0]),r=i[1];if(e&&!cacheModules[e]&&!cacheModules[Module.getAttrs(e)[0]]){var u=Module.getModule(e,o);u.deps=t,u.styles=r,u.factory=n,u.loaded=!0,u.load()}if(moduleData={name:e,deps:t,styles:r,alldeps:o,factory:n},void 0!==getCurrentScript){var a=getCurrentScript();a&&(a.moduleData=moduleData)}},Nui.load=Nui.use=function(e,t){return e&&"string"==typeof e&&Module.load(e,t,getModuleid()),Nui},Nui.define=function(){var e=arguments,t=e.length,n=[];!t||1===t&&!Nui.type(e[0],"Function")?n.push(function(){return e[0]}):2===t&&!Nui.type(e[1],"Function")||3==t&&!Nui.type(e[2],"Function")?(n.push(e[0]),n.push(function(){return e[1]})):2===t&&!Nui.type(e[0],["Array","String"])&&Nui.type(e[1],"Function")?n.push(e[1]):3===t&&!isArray(e[1])&&Nui.type(e[2],"Function")?(n.push(e[0]),n.push(e[2])):n=e,Module.define.apply(Module,n)},Nui.config=function(e,t){if(Nui.type(e,"Object"))config=extend({},config,e);else{if(!t||!Nui.type(e,"String"))return;if(config[e]=t,"paths"!==e)return}var n=config.base||config.paths.base||"";/^((https?|file):)?\/\//.test(n)||(n=config.paths.base=domain+n),Nui.each(config.paths,function(e,t){"base"===t||/^((https?|file):)?\/\//.test(e)||(config.paths[t]=n+"/"+e)})}}}(this,document),Nui.define("util",{regex:{mobile:/^0?(13|14|15|17|18)[0-9]{9}$/,tel:/^[0-9-()（）]{7,18}$/,email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,idcard:/^\d{17}[\d|x]|\d{15}$/,cn:/^[\u4e00-\u9fa5]+$/,taxnum:/^[a-zA-Z0-9]{15,20}$/},getParam:function(e,t){var n=decodeURI(t||location.href),i={};if(startIndex=n.indexOf("?"),startIndex++>0){var o,r=n.substr(startIndex).split("&");Nui.each(r,function(e){o=e.split("="),i[o[0]]=o[1]})}return"string"==typeof e&&e&&(i=void 0!==(o=i[e])?o:""),i},setParam:function(e,t,n){var i;if(Nui.type(e,"Object"))i=t||location.href,Nui.each(e,function(e,t){e&&(Nui.type(e,"Object")&&(e=tools.getJSON(e)),i=tools.setParam(t,e,i))});else if(i=n||location.href,-1===i.indexOf("?")&&(i+="?"),Nui.type(t,"Object")&&(t=tools.getJSON(t)),-1!==i.indexOf(e+"=")){var o=new RegExp("("+e+"=)[^&]*");i=i.replace(o,"$1"+t)}else{var r="";-1!==i.indexOf("=")&&(r="&"),i+=r+e+"="+t}return i},supportCss3:function(e){var t,n=["webkit","Moz","ms","o"],i=[],o=document.documentElement.style,r=function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})};for(t in n)i.push(r(n[t]+"-"+e));i.push(r(e));for(t in i)if(i[t]in o)return!0;return!1},supportHtml5:function(e,t){return e in document.createElement(t)},location:function(e,t){e&&jQuery('<a href="'+e+'"'+(t?'target="'+(t||"_self")+'"':"")+"><span></span></a>").appendTo("body").children().click().end().remove()},formatDate:function(e,t){if(e=parseInt(e)){if(!t)return e;var n=new Date(e),i={"M":n.getMonth()+1,"d":n.getDate(),"h":n.getHours(),"m":n.getMinutes(),"s":n.getSeconds()};return t=t.replace(/([yMdhms])+/g,function(e,t){var o=i[t];return void 0!==o?(e.length>1&&(o="0"+o,o=o.substr(o.length-2)),o):"y"===t?(n.getFullYear()+"").substr(4-e.length):e})}return"-"},getJSON:function(e){if("undefined"!=typeof JSON){var t=JSON.stringify(e);return Nui.browser.msie&&"8.0"==Nui.browser.version?t.replace(/\\u([0-9a-fA-F]{2,4})/g,function(e,t){return String.fromCharCode(parseInt(t,16))}):t}if(Nui.isArray(e)){var n=[];return Nui.each(e,function(e){n.push(tools.getJSON(e))}),"["+n.join(",")+"]"}if(Nui.type(e,"Object")){var i=[];return Nui.each(e,function(e,t){i.push('"'+t+'":'+tools.getJSON(e))}),"{"+i.join(",")+"}"}return'"'+e+'"'},getData:function(e){var t={result:{},total:0,voidTotal:0},n=e.serializeArray(),i=n.length,o=0;for(o;o<i;o++){var r=Nui.trim(n[o].value);t.all++,r||t.voidTotal++,t.result[n[o].name]=r}return t}}),Nui.define("template",["util"],function(e){var t=function(e,t,i){if(this.tplid=e){if(n[e])return d.call(this,n[e],t,i);var o=document.getElementById(e);if(o&&"SCRIPT"===o.nodeName&&"text/html"===o.type)return d.call(this,n[e]=o.innerHTML,t,i)}return""},n={},i={openTag:"<%",closeTag:"%>"},o={trim:Nui.trim,formatDate:e.formatDate,setParam:e.setParam},r=!!"".trim,u=";$that.out = function(){return $that.code";u=(r?'""'+u:"[]"+u+'.join("")')+"}";var a=function(e){return r?e?function(e){return"$that.code += "+e+";"}:function(e,t){return e+=t}:e?function(e){return"$that.code.push("+e+");"}:function(e,t){return e.push(t),e}},c=a(!0),s=a(),l=function(e,n,i,o){var r=this,u=n.replace(/([^\s])/g,"\\$1"),a=i.replace(/([^\s])/g,"\\$1");return e.replace(new RegExp(u+"\\s*include\\s+['\"]([^'\"]*)['\"]\\s*"+a,"g"),function(e,n){if(n){var i=r[n];return"function"==typeof i&&(i=i()),"string"==typeof i?d.call(r,i,null,o):t(n,null,o)}return""})},d=function(e,t,n){var a=this;if("string"==typeof e){n=n||{};var c=n.openTag||i.openTag,d=n.closeTag||i.closeTag;if(e=l.call(a,e,c,d),t&&"object"==typeof t){Nui.isArray(t)&&(t={$list:t});var h=r?"":[];e=e.replace(/\s+/g," "),Nui.each(e.split(c),function(e,t){e=e.split(d),t>=1?h=s(h,p(Nui.trim(e[0]),!0)):e[1]=e[0],h=s(h,p(e[1].replace(/'/g,"\\'").replace(/"/g,'\\"')))});var m=r?"":[];Nui.each(t,function(e,t){m=s(m,t+"=$data."+t+",")}),r||(h=h.join(""),m=m.join("")),h="var "+m+"$that=this; $that.line=4; $that.code="+u+";\ntry{\n"+h+";}\ncatch(e){\n$that.error(e, $that.line)\n};";try{var g=new Function("$data",h);g.prototype.methods=o,g.prototype.error=f(h,t,a.tplid),e=new g(t).out(),g=null}catch(e){f(h,t,a.tplid)(e)}}return e}return""},f=function(e,t,n){return function(i,o){var r="\n",u=[];e="function anonymous($data){\n"+e+"\n}",e=e.split("\n"),Nui.each(e,function(e,t){u.push(t+1+"      "+e.replace("$that.line++;",""))}),r+="code\n",r+=u.join("\n")+"\n\n",void 0!==typeof JSON&&(r+="data\n",r+=JSON.stringify(t)+"\n\n"),n&&(r+="templateid\n",r+=n+"\n\n"),o&&(r+="line\n",r+=o+"\n\n"),r+="message\n",r+=i.message,console.error(r)}},p=function(e,t){if(!e)return"";var n;return(t?void 0!==(n=h(e,"if"))?"if("+n+"){":void 0!==(n=h(e,"elseif"))?"\n}\nelse if("+n+"){":"else"===e?"\n}\nelse{":"/if"===e?"}":void 0!==(n=h(e,"each ",/\s+/))?"Nui.each("+n[0]+", function("+(n[1]||"$value")+","+(n[2]||"$index")+"){":"/each"===e?"});":void 0!==(n=h(e," | ",/\s*,\s*/))?c("$that.methods."+n[0]+"("+n.slice(1).toString()+")"):0===e.indexOf("var ")?e+";":c(e):c("'"+e+"'"))+"\n$that.line++;"},h=function(e,t,n){var i;if(0===e.indexOf(t)?i="":" | "===t&&e.indexOf(t)>0&&(i=","),void 0!==i)return e=Nui.trimLeft(e.replace(t,i)),n?e.split(n):e};return t.method=function(e,t){o[e]||(o[e]=t)},t.config=function(){var e=arguments;Nui.type(e[0],"Object")?Nui.each(e[0],function(e,t){i[t]=e}):e.length>1&&"string"==typeof e[0]&&(i[e[0]]=e[1])},t.render=d,t}),Nui.define("delegate",function(){return function(e){var t=this,n=e.elem,i=e.maps,o=e.calls;if(e&&n&&i&&o){n instanceof jQuery||(n=jQuery(n));var r,u,a=function(e,t){var n=this,i=$(n);Nui.each(t,function(t,r){if("function"==typeof(t=o[t]))return t.call(n,e,i)})},c=t.constructor&&t.constructor._component_name_;return Nui.each(i,function(e,i){e=Nui.trim(e).split(/\s+/),i=Nui.trim(i).split(/\s+/),r=i.shift().replace(/:/g," "),u=i.join(" "),c?t._on(r,n,u,function(t){a.call(this,t,e)}):n.on(r,u,function(t){a.call(this,t,e)})}),t}}}),function(e,t){"undefined"!=typeof jQuery&&Nui.define("component",["template","delegate"],function(e,t){return{static:{_index:0,_instances:{},_options:{},_init:null,_jquery:function(e){return e instanceof jQuery?e:jQuery(e)},_getSize:function(e,t,n){var i=0;if(n=n||"border",t=t||"tb","all"===n)return this._getSize(e,t)+this._getSize(e,t,"padding");var o={l:["Left"],r:["Right"],lr:["Left","Right"],t:["Top"],b:["Bottom"],tb:["Top","Bottom"]},r=[{border:{l:["LeftWidth"],r:["RightWidth"],lr:["LeftWidth","RightWidth"],t:["TopWidth"],b:["BottomWidth"],tb:["TopWidth","BottomWidth"]}},{padding:o},{margin:o}];return Nui.each(r,function(o){o[n]&&Nui.each(o[n][t],function(t){var o=parseInt(e.css(n+t));i+=isNaN(o)?0:o})}),i},_$fn:function(e,t){jQuery.fn[e]=function(){var n=arguments,i=n[0];return this.each(function(){if("string"!=typeof i)Nui.type(i,"Object")?i.target=this:i={target:this},t(i);else if(i){var o;if(this.nui&&(o=this.nui[e])&&0!==i.indexOf("_"))if("options"===i)o.set(n[1],n[2]);else{var r=o[i];"function"==typeof r&&r.apply(o,Array.prototype.slice.call(n,1))}}})}},_$ready:function(e,t){t("init",Nui.doc)},options:function(e,t){Nui.type(e,"Object")?jQuery.extend(!0,this._options,e):Nui.type(e,"String")&&(this._options[e]=t)}},options:{target:null,id:"",skin:""},_template:{},_init:jQuery.noop,_exec:jQuery.noop,_getTarget:function(){var e=this;if(!e.target){var t=e.options.target,n=e.constructor;if(!t)return null;t=n._jquery(t);var i="nui_component_"+n._component_name_;e.target=t.attr(i,""),e.target.each(function(){this.nui||(this.nui={}),this.nui[n._component_name_]=e})}return e.target},_tplData:function(){var e=this.options,t=this.constructor,n="nui-"+t._component_name_,i=Nui.trim(e.skin),o=function(e,t){if(e._parent){var n=e._parent("class"),r=n._component_name_;if("component"!==r)return i&&t.unshift("nui-"+r+"-"+i),t.unshift("nui-"+r),o(n,t)}return t},r=o(t,[]);return r.push(n),i&&r.push(n+"-"+i),{className:r.join(" ")}},_event:function(){var e=this._events;return"function"==typeof e&&(!(e=e.call(this))||e instanceof this.constructor)?this:t.call(this,e)},_on:function(e,t,n,i,o){var r=this;"function"==typeof n&&(o=i,i=n,n=t,t=null,n=r.constructor._jquery(n));var u=function(e){return i.call(this,e,jQuery(this))};return t?("string"!=typeof n&&((n=n.selector)||(n=r.options.target)),t.on(e,n,u),o&&t.find(n).trigger(e)):(n.on(e,u),o&&n.trigger(e)),r._eventList.push({dalegate:t,selector:n,type:e,callback:u}),r},_off:function(){var e=this,t=e._eventList;return Nui.each(t,function(e,n){e.dalegate?e.dalegate.off(e.type,e.selector,e.callback):e.selector.off(e.type,e.callback),t[n]=null,delete t[n]}),e._eventList=[],e},_delete:function(){var e=this,t=e.constructor,n="nui_component_"+t._component_name_;e.target.removeAttr(n).each(function(){this.nui&&(this.nui[t._component_name_]=null,delete this.nui[t._component_name_])}),t._instances[e.index]=null,delete t._instances[e.index]},_reset:function(){return this._off(),this.element&&this.element.remove(),this},_tpl2html:function(t,n){return e.render.call(this._template,this._template[t],n,{openTag:"<%",closeTag:"%>"})},set:function(e,t){return this._reset(),(e||t)&&(jQuery.isPlainObject(e)?this.options=jQuery.extend(!0,this.options,e):this.options[e]=t,this._exec()),this},get:function(e){return e?this.options[e]:this.options},reset:function(){return this.set(this.optionsCache)},destroy:function(e){e&&this.options.id!==e||(this._reset(),this._delete())}}})}();