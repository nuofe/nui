!function(t,e,n){if(!t.Nui){var i=t.Nui={},r=function(t){return function(e){return{}.toString.call(e)==="[object "+t+"]"}},o=i.isArray=Array.isArray||r("Array"),a=i.each=function(t,e){var n;if(o(t)){var i=t.length;for(n=0;n<i&&!1!==e(t[n],n);n++);}else for(n in t)if(!1===e(t[n],n))break},s=i.type=function(t,e){if(null===t||void 0===t)return!1;if(o(e)){var n=!1;return a(e,function(e){if(r(e)(t))return n=!0,!1}),n}return r(e)(t)};a({trim:/^\s+|\s+$/g,trimLeft:/^\s+/g,trimRight:/\s+$/g},function(t,e){i[e]=function(){return String.prototype[e]?function(t){return t[e]()}:function(e){return e.replace(t,"")}}()});var u=i.noop=function(){};i.browser=function(){var t=navigator.userAgent.toLowerCase(),e=/(edge)[ \/]([\w.]+)/.exec(t)||/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[],n=e[1]||"",i=e[2]||"0",r={};return"mozilla"===n&&/trident/.test(t)&&(n="msie",i="11.0"),n&&(r[n]=!0,r.version=i),r.chrome||r.edge?r.webkit=!0:r.webkit&&(r.safari=!0),r}(),i.bsie6=i.browser.msie&&i.browser.version<=6,i.bsie7=i.browser.msie&&i.browser.version<=7;var c=i.unique=function(t,e){var n=[],i={},r="push";return!0===e&&(r="unshift"),a(t,function(t){i[t]||(i[t]=!0,n[r](t))}),n},l=i.extend=function(){var t,e,n,i,r,a,u=arguments[0]||{},c=1,p=arguments.length,d=!1;for("boolean"==typeof u&&(d=u,u=arguments[1]||{},c=2),"object"==typeof u||s(u,"Function")||(u={}),p===c&&(u={},--c);c<p;c++)if(null!=(r=arguments[c]))for(i in r)t=u[i],n=r[i],u!==n&&(d&&n&&(f(n)||(e=o(n)))?(e?(e=!1,a=t&&o(t)?t:[]):a=t&&f(t)?t:{},u[i]=l(d,a,n)):void 0!==n&&(u[i]=n));return u},f=function(t){return!(!s(t,"Object")||t.constructor!==Object)},p=function(t){var e;for(e in t)return!1;return!0},d=location.protocol+"//"+location.host,h=function(){var t=(d+location.pathname).replace(/\\/g,"/"),e=t.lastIndexOf("/");return t.substr(0,e+1)}();"file://"===d&&(d=h);var m,v,g=function(t){if(/^((https?|file):)?\/\//i.test(t))return!0},_=function(){return"_module_"+ ++x},y=function(t){return t.replace(/(\.(js|css))?(\?[\s\S]*)?$/i,"")},b=e.head||e.getElementsByTagName("head")[0]||e.documentElement,N="onload"in e.createElement("script"),x=0,w={},j={},$={},S={},A={skin:null,min:!0,paths:{},alias:{},maps:{}};if(i.browser.msie&&i.browser.version<=9)var O,k=function(){return v||(O&&"interactive"===O.readyState?O:(a(b.getElementsByTagName("script"),function(t){if("interactive"===t.readyState)return O=t,!1}),O))};t.console=t.console||{log:u,debug:u,error:u,info:u},i.bsie7&&e.execCommand("BackgroundImageCache",!1,!0),"undefined"!=typeof jQuery&&(i.win=jQuery(t),i.doc=jQuery(e));var F=function(t,e){var n=this;n.deps=e||[],n.alldeps=n.deps,n.depmodules={},n.id=t[0],n.name=t[1],n.version="",n.suffix=t[2],n.uri=n.id.substr(0,n.id.lastIndexOf("/")+1)};F.prototype.load=function(){var t=this;if(t.loaded||t.name==="_module_"+x)return t.onload();if(!t.url){var n=e.createElement("script");t.url=t.id+t.suffix+".js"+t.version,n.src=t.url,n.async=!0,n.id=t.id,v=n,b.appendChild(n),v=null,N?n.onload=n.onerror=t.onload(n):n.onreadystatechange=function(){/loaded|complete/.test(n.readyState)&&t.onload(n)()}}return t.resolve()},F.prototype.loadcss=function(){var t=this;return t.styles&&t.styles.length&&a(t.styles,function(n){var i=F.getAttrs(n,t.uri)[0];if(!j[i]){j[i]=!0;var r=e.createElement("link");i=i+".css"+t.version,r.rel="stylesheet",r.href=i,b.appendChild(r)}}),t},F.prototype.resolve=function(){var t=this;return t.alldeps.length&&p(t.depmodules)&&a(t.alldeps,function(e){var n=F.getModule(e,[],t.uri);n.version=t.version,t.depmodules[e]=n.loaded?n:n.load()}),t},F.prototype.onload=function(t){var e=this;return t?function(){return m=t.moduleData||m,t.onload=t.onerror=t.onreadystatechange=null,b.removeChild(t),t=null,e.loaded=!0,m&&(a(m,function(t,n){t&&(e[n]=t)}),m=null),e.resolve().rootCallback()}:(e.loaded=!0,e.resolve().rootCallback())},F.prototype.rootCallback=function(){return a($,function(t,e){var n=t.getData(),i=c(n.ids);n.loaded&&t.callback&&t.callback(i)}),this},F.prototype.getData=function(t){return t||(t={ids:[],loaded:!0}),t.ids.unshift(this.id),this.loaded||(t.loaded=!1),this.alldeps.length&&a(this.depmodules,function(e){t=e.getData(t)}),t},F.prototype.methods=function(){var t=this,e={};return e.require=function(e,n){var i;if(e&&((i=t.depmodules[e])||(i=w[e])||(i=w[h+e])))return n?i:i.module||i.exports},e.extend=function(t,n,i){var r;if(t){if("string"==typeof t){var c=e.require(t);if(void 0===c)return t;t=c}return o(t)?(r=l(!0,[],t),!0===i&&(o(n)?r=r.concat(n):r.push(n))):s(t,"Function")?t.exports?(r=l(!0,{},t.exports,n),r._static.__parent=new F.Class.parent(t)):r=l(!0,u,t,n):r=s(t,"Object")?l(!0,{},t,n):t,o(i)&&s(r,["Object","Function"])&&a(i,function(t){if(t.method&&t.content){for(var e,n,i=t.method.split("->"),o=i[i.length-1];(n=i.shift())&&(e=e||r,n!==o);)e=e[n];var a=e[o];if(s(a,"Function")){var u=a.toString().replace(/(\})$/,";"+t.content+"$1");a=new Function("return "+u),e[o]=a()}}}),r}},e.imports=u,e.renders=function(t){return t},e.exports={},e},F.prototype.exec=function(){var t=this;if(!t.module&&!t.exports&&"function"==typeof t.factory){var e,n=t.methods();t.deps.length?(e=[],a(t.deps,function(t){e.push(n.require(t))})):e=[n.require,n.imports,n.renders,n.extend];var i=t.factory.apply(n,e);if(void 0===i&&(i=n.exports),"component"===t.name||i._static&&i._static.__parent instanceof F.Class.parent){var r={statics:{},propertys:{},methods:{},apis:{init:!0}};A.skin&&!i._options.skin&&(i._options.skin=A.skin),a(i,function(t,e){"_static"===e?r.statics=t:"function"==typeof t?(r.methods[e]=t,/^_/.test(e)||(r.apis[e]=!0)):r.propertys[e]=t});var o=t.name.substr(t.name.lastIndexOf("/")+1).replace(/\W/g,"");if(S[o])t.module=S[o];else if(r.statics.__component_name=o,t.module=S[o]=F.Class(t,r),delete i._static.__parent,t.exports=t.module.exports=i,"component"!==t.name){var s,u=t.module.constructor;a(["_$fn","_$ready"],function(e){"function"==typeof(s=u[e])&&s.call(u,o,t.module)})}}else t.exports=i}return t},F.normalize=function(t){t=t.replace(/([^:])\/{2,}/g,"$1/"),t=t.replace(/\.{2,}/g,"..");var e=function(t){return/([\w]+\/?)(\.\.\/)/g.test(t)?(t=t.replace(/([\w]+\/?)(\.\.\/)/g,function(t,e,n){return t==e+n?"":t}),e(t)):t};return t=e(t),t.replace(/([\w]+)\/?(\.\/)+/g,"$1/")},F.Class=function(t,e){var n=function(t){var i=this;l(!0,i,e.propertys,{__id:n.__id++,__eventList:[]}),i._options=l(!0,{},i._options,n._options,t||{}),i._options.self=i,i._defaultOptions=l(!0,i._options),n.__instances[i.__id]=i,i._init()};l(!0,n,e.statics),l(!0,n.prototype,e.methods),n.__setMethod(e.apis,S),"function"==typeof n._init&&n._init();var i=function(t){return new n(t)};return i.constructor=n,a(n,function(t,e){"function"!=typeof t||/^_/.test(e)||"constructor"===e||"function"==typeof t&&(i[e]=function(){return n[e].apply(n,arguments)})}),i},F.Class.parent=function(t){this.exports=t.exports,this.constructor=t.constructor},F.setPath=function(t){var e=/\{([^\{\}]+)\}/.exec(t);if(e){var n=A.paths[e[1]];n&&(t=y(t.replace(e[0],n)))}return t},F.getAttrs=function(t,e){var n,i=y(t),r=i.match(/-min$/g),o="";return r&&(i=i.replace(/-min$/g,""),o=r[0]),t=F.setPath(A.alias[i]||i),g(t)||(n=F.normalize(h+t),t=(e||h)+t),t=F.normalize(t),[t,i,o,n]},F.getModule=function(t,e,n){var i=F.getAttrs(t,n),r=i[0];return w[i[1]]||w[r]||w[i[3]]||(w[r]=new F(i,e))},F.load=function(t,e,n,r){if(s(t,"String")&&i.trim(t)){var o=t.match(/(\?[\s\S]*)$/);!0===A.min&&!0===r&&(t=y(t),/-min$/.test(t)||(t+="-min"));var u=F.getModule(n,[t]);o&&(u.version=o[0]);var c=u.alldeps[0],l=A.maps[c.replace(/(-min)?(\.js)?$/,"")];l&&(/^\?/.test(l)||(l="?v="+l),u.version=l),u.callback=function(t){var r=u.depmodules[c],o=r.suffix;a(t,function(t){var e=w[t].exec();o||e.loadcss()}),s(e,"Function")&&e.call(i,r.module||r.exports),delete $[n],delete u.callback},$[n]=u,u.load()}},F.getdeps=function(t){var e=[],n=[],i=t.match(/(require|extend|imports)\(?('|")[^'"]+\2/g);return i&&a(i,function(t){/^(require|extend)/.test(t)?e.push(t.replace(/^(require|extend)|[\('"]/g,"")):n.push(t.replace(/^imports|[\('"]/g,""))}),[c(e),c(n)]},F.define=function(t,e,n){s(t,"Function")?(n=t,t=void 0,e=[]):s(e,"Function")&&(n=e,s(t,"String")?e=[]:(e=t,t=void 0));var i=F.getdeps(n.toString()),r=e.concat(i[0]),o=i[1];if(t&&!w[t]&&!w[F.getAttrs(t)[0]]){var a=F.getModule(t,r);a.deps=e,a.styles=o,a.factory=n,a.loaded=!0,a.load()}if(m={name:t,deps:e,styles:o,alldeps:r,factory:n},void 0!==k){var u=k();u&&(u.moduleData=m)}},i.load=function(t,e){return t&&"string"==typeof t&&F.load(t,e,_(),!0),i},i.use=function(t,e){return t&&"string"==typeof t&&F.load(t,e,_()),i},i.define=function(){var t=arguments,e=t.length,n=[];!e||1===e&&!s(t[0],"Function")?n.push(function(){return t[0]}):2===e&&!s(t[1],"Function")||3==e&&!s(t[2],"Function")?(n.push(t[0]),n.push(function(){return t[1]})):2===e&&!s(t[0],["Array","String"])&&s(t[1],"Function")?n.push(t[1]):3===e&&!o(t[1])&&s(t[2],"Function")?(n.push(t[0]),n.push(t[2])):n=t,F.define.apply(F,n)},i.config=function(t,e){if(s(t,"Object"))A=l({},A,t);else{if(!e||!s(t,"String"))return;if(A[t]=e,"paths"!==t)return}var n=A.base||A.paths.base||"";g(n)||(n=A.paths.base=d+n),a(A.paths,function(t,e){"base"===e||g(t)||(A.paths[e]=n+"/"+t)})}}}(this,document),Nui.define("util",{regex:{mobile:/^0?(13|14|15|17|18)[0-9]{9}$/,tel:/^[0-9-()（）]{7,18}$/,email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,idcard:/^\d{17}[\d|x]|\d{15}$/,cn:/^[\u4e00-\u9fa5]+$/,taxnum:/^[a-zA-Z0-9]{15,20}$/},toFixed:function(t,e,n){if(isNaN(t)||""===t)return t;void 0===n&&(n=2),e=e||0;var i=t.toString(),r=function(t){for(var e="";t>0;)e+="0",t--;return e},o="";i<0&&(i=i.replace("-",""),o="-");var a=i.indexOf(".");if(-1!==a&&e>=0){var s=parseInt(i.substr(0,a)),u="0"+i.substr(a),c="1"+r(e);u=(Math.round(u*c)/c).toFixed(e),u>=1&&(s=(s+1).toString()),i=o+s+u.substr(1)}else e>0&&(i=o+i+"."+r(e));if(null!==n&&n>=0&&n<e){i=i.replace(/0+$/,"");var a=i.indexOf("."),l=0;for(-1!==a&&(l=i.substr(a+1).length);l<n;)i+="0",l++;i=i.replace(/\.$/,"")}return i},getParam:function(t,e){var n=decodeURI(e||location.href),i={};if(startIndex=n.indexOf("?"),startIndex++>0){var r,o=n.substr(startIndex).split("&");Nui.each(o,function(t){r=t.split("="),i[r[0]]=r[1]})}return"string"==typeof t&&t&&(i=void 0!==(r=i[t])?r:""),i},setParam:function(t,e,n){var i,r=this;if(Nui.type(t,"Object"))i=e||location.href,Nui.each(t,function(t,e){t&&(i=r.setParam(e,t,i))});else if(i=n||location.href,-1===i.indexOf("?")&&(i+="?"),-1!==i.indexOf(t+"=")){var o=new RegExp("("+t+"=)[^&]*");i=i.replace(o,"$1"+e)}else{var a="";-1!==i.indexOf("=")&&(a="&"),i+=a+t+"="+e}return i},supportCss3:function(t){var e,n=["webkit","Moz","ms","o"],i=[],r=document.documentElement.style,o=function(t){return t.replace(/-(\w)/g,function(t,e){return e.toUpperCase()})};for(e in n)i.push(o(n[e]+"-"+t));i.push(o(t));for(e in i)if(i[e]in r)return!0;return!1},supportHtml5:function(t,e){return t in document.createElement(e)},location:function(t,e){t&&jQuery('<a href="'+t+'"'+(e?'target="'+(e||"_self")+'"':"")+"><span></span></a>").appendTo("body").children().click().end().remove()},formatDate:function(t,e){if(t=parseInt(t)){if(!e)return t;var n=new Date(t),i={"M":n.getMonth()+1,"d":n.getDate(),"h":n.getHours(),"m":n.getMinutes(),"s":n.getSeconds()};return e=e.replace(/([yMdhms])+/g,function(t,e){var r=i[e];return void 0!==r?(t.length>1&&(r="0"+r,r=r.substr(r.length-2)),r):"y"===e?(n.getFullYear()+"").substr(4-t.length):t})}return"-"},getData:function(t,e,n){var i=this,r={"result":{},"voids":0,"total":0};if(t.length){var o=t.serializeArray();o.length||(o=t.find("[name]").serializeArray());var a=",";if(e&&"string"==typeof e&&!n&&(a=e),Nui.each(o,function(t,e){var n=Nui.trim(t.value);r.total++,n||r.voids++;var i=t.name;Nui.isArray(r.result[i])||(r.result[i]=[]),r.result[i].push(n)}),Nui.each(r.result,function(t,e){r.result[e]=t.join(a)}),e&&n){var s=!1;r.result[n]=[],t.find(e).each(function(){var t=i.getData($(this).find("[name]")).result;!0===e||s||(Nui.each(t,function(t,e){delete r.result[e]}),s=!0),r.result[n].push(t)})}}return r},getFocusIndex:function(t){var e=Nui.trim(t.value),n=e.length;if(t.setSelectionRange)n=t.selectionStart;else try{var i=document.selection.createRange(),r=t.createTextRange();r.setEndPoint("endtoend",i),n=r.text.length}catch(t){}return n},isTextSelect:function(){var t="";if(document.selection)t=document.selection.createRange().text;else if(-1!==navigator.userAgent.toLowerCase().indexOf("gecko")){var e=document.activeElement;t=e.value.substring(e.selectionStart,e.selectionEnd)}else window.getSelection?t=window.getSelection().toString():document.getSelection&&(t=document.getSelection().toString());return!!t},isInstallPDF:function(){var i,len,flag=!0;if((Nui.browser.webkit||Nui.browser.mozilla&&Nui.browser.version>19)&&(flag=!1),navigator.plugins&&(len=navigator.plugins.length))for(i=0;i<len;i++)if(/Adobe Reader|Adobe PDF|Acrobat|Chrome PDF Viewer/.test(navigator.plugins[i].name)){flag=!1;break}try{if(window.ActiveXObject||window.ActiveXObject.prototype){for(i=1;i<10;i++)try{if(eval("new ActiveXObject('PDF.PdfCtrl."+i+"');")){flag=!1;break}}catch(t){flag=!0}var arr=["PDF.PdfCtrl","AcroPDF.PDF.1","FoxitReader.Document","Adobe Acrobat","Adobe PDF Plug-in"];for(len=arr.length,i=0;i<len;i++)try{if(new ActiveXObject(arr[i])){flag=!1;break}}catch(t){flag=!0}}}catch(t){}return flag},isInstallFlash:function(){if(void 0!==window.ActiveXObject)try{if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return!1}catch(t){}else if(navigator.plugins["Shockwave Flash"])return!1;return Nui.browser.msie?"http://rj.baidu.com/soft/detail/17153.html":"http://rj.baidu.com/soft/detail/15432.html"},formatNumber:function(t){var e=parseInt(t);if(!isNaN(e)&&e&&(t=t.toString())){var n=t.indexOf("."),i="";return n>0&&(i=t.substr(n)),e.toLocaleString().replace(/\.\d+$/,"")+i}return t},numberToCN:function(t){var e,n,i,r=new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖"),o=new Array("","拾","佰","仟"),a=new Array("","万","亿","兆"),s=new Array("角","分","毫","厘"),u="";if(""==t)return"";var c=t<0;if((t=Math.abs(parseFloat(t)))>=1e15)return"";if(0==t)return u=r[0]+"元整";if(t=t.toString(),-1==t.indexOf(".")?(e=t,n=""):(i=t.split("."),e=i[0],n=i[1].substr(0,4)),parseInt(e,10)>0){for(var l=0,f=e.length,p=0;p<f;p++){var d=e.substr(p,1),h=f-p-1,m=h/4,v=h%4;"0"==d?l++:(l>0&&(u+=r[0]),l=0,u+=r[parseInt(d)]+o[v]),0==v&&l<4&&(u+=a[m])}u+="元"}if(""!=n)for(var g=n.length,p=0;p<g;p++){var d=n.substr(p,1);"0"!=d&&(u+=r[Number(d)]+s[p])}return""==u?u+=r[0]+"元整":""==n&&(u+="整"),c&&(u="负"+u),u}}),Nui.define("template",["util"],function(t){var e=function(t,e,i){if(this.tplid=t){if(n[t])return d.call(this,n[t],e,i);var r=document.getElementById(t);if(r&&"SCRIPT"===r.nodeName&&"text/html"===r.type)return d.call(this,n[t]=r.innerHTML,e,i)}return""},n={},i={openTag:"<%",closeTag:"%>"},r={trim:Nui.trim,formatDate:t.formatDate,formatNumber:t.formatNumber,setParam:t.setParam,toFixed:t.toFixed,numberToCN:t.numberToCN},o=!!"".trim,a=";$that.out = function(){return $that.code";a=(o?'""'+a:"[]"+a+'.join("")')+"}";var s=function(t){return o?t?function(t){return"$that.code += "+t+";"}:function(t,e){return t+=e}:t?function(t){return"$that.code.push("+t+");"}:function(t,e){return t.push(e),t}},u=s(!0),c=s(),l=function(t,n,i,r){var o=this,a=n.replace(/([^\s])/g,"\\$1"),s=i.replace(/([^\s])/g,"\\$1");return t.replace(new RegExp(a+"\\s*include\\s+['\"]([^'\"]*)['\"]\\s*"+s,"g"),function(t,n){if(n){var i=o[n];return"function"==typeof i&&(i=i()),"string"==typeof i?d.call(o,i,null,r):e(n,null,r)}return""})},f="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return 1===t.nodeType&&"string"==typeof t.nodeName},p=function(t){if(t&&"object"==typeof t){var e=t[0];return f(e?e:t)}},d=function(t,e,n){var s=this;if("string"==typeof t){n=n||{};var u=n.openTag||i.openTag,f=n.closeTag||i.closeTag;if(t=l.call(s,t,u,f),e&&"object"==typeof e){Nui.isArray(e)&&(e={$list:e});var d=o?"":[];t=t.replace(/\s+/g," "),Nui.each(t.split(u),function(t,e){t=t.split(f),e>=1?d=c(d,m(Nui.trim(t[0]),!0)):t[1]=t[0],d=c(d,m(t[1].replace(/'/g,"\\'").replace(/"/g,'\\"')))});var v=o?"":[];Nui.each(e,function(t,e){v=c(v,e+"=$data."+e+",")}),o||(d=d.join(""),v=v.join("")),d="var "+v+"$that=this; $that.line=4; $that.code="+a+";\ntry{\n"+d+";}\ncatch(e){\n$that.error(e, $that.line)\n};";try{var g=new Function("$data",d);g.prototype.methods=r,g.prototype.error=h(d,e,s.tplid),g.prototype.dom=p,t=new g(e).out(),g=null}catch(t){h(d,e,s.tplid)(t)}}return t}return""},h=function(t,e,n){return function(i,r){var o="\n",a=[];t="function anonymous($data){\n"+t+"\n}",t=t.split("\n"),Nui.each(t,function(t,e){a.push(e+1+"      "+t.replace("$that.line++;",""))}),o+="code\n",o+=a.join("\n")+"\n\n",void 0!==typeof JSON&&(o+="data\n",o+=JSON.stringify(e)+"\n\n"),n&&(o+="templateid\n",o+=n+"\n\n"),r&&(o+="line\n",o+=r+"\n\n"),o+="message\n",o+=i.message,console.error(o)}},m=function(t,e){if(!t)return"";var n,i;if(e)if(void 0!==(i=g(t,"if")))n="if("+v(i)+"){";else if(void 0!==(i=g(t,"elseif")))n="\n}\nelse if("+v(i)+"){";else if("else"===t)n="\n}\nelse{";else if("/if"===t)n="}";else if(void 0!==(i=g(t,"each ",/\s+/)))n="Nui.each("+i[0]+", function("+(i[1]||"$value")+","+(i[2]||"$index")+"){";else if("/each"===t)n="});";else if(void 0!==(i=g(t," | ",/\s*,\s*/))){var r=i[0],o=r.lastIndexOf("("),a="("+v(i.slice(1).toString())+")";if(-1!==o){var s=r.substr(0,o),c=Nui.trimLeft(r.substr(o+1));n=u(s+"($that.methods."+c+a)}else n=u("$that.methods."+r+a)}else n=/^(var|let|const|return|delete)\s+/.test(t)?v(t)+";":u(v(t,!0));else n=u("'"+t+"'");return n+"\n$that.line++;"},v=function(t,e){return t.replace(/([\.\$\w]+\s*(\[[\'\"\[\]\w\.\$\s]+\])?)\?\?/g,function(t,n){var i="(typeof "+n+'!=="undefined"&&'+n+"!==null&&"+n+"!==undefined&&!$that.dom("+n+")";return e&&(i+="?"+n+':""'),i+")"})},g=function(t,e,n){var i;if(0===t.indexOf(e)?i="":" | "===e&&t.indexOf(e)>0&&(i=","),void 0!==i)return t=Nui.trimLeft(t.replace(e,i)),n?t.split(n):t};return e.method=function(t,e){r[t]||(r[t]=e)},e.config=function(){var t=arguments;Nui.type(t[0],"Object")?Nui.each(t[0],function(t,e){i[e]=t}):t.length>1&&"string"==typeof t[0]&&(i[t[0]]=t[1])},e.render=d,e}),Nui.define("events",function(){return function(t){var e=this,n=t||e,i=n.constructor,r=i&&i.__component_name,o=e.element||n.element||Nui.doc,a=r?n._events:n.events;if(!o||!a)return n;"function"==typeof a&&(a=a.call(n)),o instanceof jQuery||(o=jQuery(o));var s,u,c,l=function(t,i,r){"function"==typeof r?r.call(n,t,i):Nui.each(r,function(r,o){if("function"==typeof(r=n[r]||e[r]))return c=r.call(n,t,i,c)})};return Nui.each(a,function(t,e){!t||"string"!=typeof t&&"function"!=typeof t||("string"==typeof t&&(t=Nui.trim(t).split(/\s+/)),e=Nui.trim(e).split(/\s+/),s=e.shift().replace(/:/g," "),u=e.join(" "),r?n._on(s,o,u,function(e,n){l(e,n,t)}):o.on(s,u,function(e){l(e,jQuery(this),t)}))}),n}}),function(window,undefined){"undefined"!=typeof jQuery&&Nui.define("component",["template","events"],function(tpl,events){var module=this,require=this.require,extend=this.extend,callMethod=function(t,e,n){if(e.length>t.length){var i=e[t.length];if(i&&n._options.id!==i&&n.__id!==i)return}t.apply(n,e)};Nui.bsie7&&Nui.doc.on("focus",'button, input[type="button"]',function(){this.blur()});var statics={__id:0,__instances:{},__setMethod:function(apis,components){var self=this;return Nui.each(apis,function(val,methodName){self[methodName]===undefined&&(self[methodName]=function(){var self=this,args=arguments,container=args[0],name=self.__component_name;if(name&&"component"!==name)if(container&&container instanceof jQuery)if("init"===methodName){var mod=components[name];mod&&container.find("[data-"+name+"-options]").each(function(){if(!this.nui||!this.nui[name]){var elem=jQuery(this),options=elem.data(name+"Options"),_mod;options&&"string"==typeof options&&(/^{[\s\S]*}$/.test(options)?options=eval("("+options+")"):(_mod=require(options,!0))&&(options="function"==typeof _mod.exports?_mod.exports(elem):_mod.exports)),"object"!=typeof options&&(options={}),mod(extend(options,{target:elem}))}})}else container.find("[nui_component_"+name+"]").each(function(){var t,e;this.nui&&(t=this.nui[name])&&"function"==typeof(e=t[methodName])&&callMethod(e,Array.prototype.slice.call(args,1),t)});else Nui.each(self.__instances,function(t){var e=t[methodName];"function"==typeof e&&callMethod(e,args,t)});else Nui.each(components,function(t,e){"component"!==e&&"function"==typeof t[methodName]&&t[methodName].apply(t,args)})})}),self},_options:{},_init:jQuery.noop,_jquery:function(t){return t instanceof jQuery?t:jQuery(t)},_getSize:function(t,e,n){var i=0;if(n=n||"border",e=e||"tb","all"===n)return this._getSize(t,e)+this._getSize(t,e,"padding")+this._getSize(t,e,"margin");var r={l:["Left"],r:["Right"],lr:["Left","Right"],t:["Top"],b:["Bottom"],tb:["Top","Bottom"]},o=[{border:{l:["LeftWidth"],r:["RightWidth"],lr:["LeftWidth","RightWidth"],t:["TopWidth"],b:["BottomWidth"],tb:["TopWidth","BottomWidth"]}},{padding:r},{margin:r}];return Nui.each(o,function(r){r[n]&&Nui.each(r[n][e],function(e){var r=parseFloat(t.css(n+e));i+=isNaN(r)?0:r})}),i},_$fn:function(t,e){jQuery.fn[t]=function(){var n=arguments,i=n[0];return this.each(function(){if("string"!=typeof i)Nui.type(i,"Object")?i.target=this:i={target:this},e(i);else if(i){var r;if(this.nui&&(r=this.nui[t])&&0!==i.indexOf("_"))if("options"===i)r.option(n[1],n[2]);else{var o=r[i];"function"==typeof o&&o.apply(r,Array.prototype.slice.call(n,1))}}})}},_$ready:function(t,e){"function"==typeof this.init&&this.init(Nui.doc)},config:function(){var t=arguments,e=(t.length,t[0]);return Nui.type(e,"Object")?this._options=jQuery.extend(!0,this._options,e):Nui.type(e,"String")?1===t.length?this._options[e]:this._options[e]=t[1]:void 0},hasInstance:function(t){var e=!1,n=this.__instances;if(t)Nui.each(n,function(n){if(n._options.id===t)return e=!0,!1});else for(i in n)return!0;return e}};return{_static:statics,_options:{target:null,id:"",skin:"",className:"",onInit:null,onReset:null,onDestroy:null},_template:{},_init:function(){this._exec()},_exec:jQuery.noop,_getTarget:function(){var t=this;if(!t.target){var e=t._options.target,n=t.constructor;if(!e)return null;e=n._jquery(e),t.target=t._bindComponentName(e)}return t.target},_bindComponentName:function(t){var e=this,n=e.constructor,i="nui_component_"+n.__component_name;return t.attr(i,"").each(function(){this.nui||(this.nui={}),this.nui[n.__component_name]=e}),t},_tplData:function(t){var e=this._options,n=this.constructor,i="nui-"+n.__component_name,r=Nui.trim(e.skin),o=function(t,e){if(t.__parent){var n=t.__parent.constructor,i=n.__component_name;if("component"!==i)return r&&e.unshift("nui-"+i+"-"+r),e.unshift("nui-"+i),o(n,e)}return e},a=o(n,[]);return a.push(i),r&&a.push(i+"-"+r),e.id&&a.push(n.__component_name+"-"+e.id),t||(t={}),e.className&&a.push(e.className),t.className=a.join(" "),t},_event:function(){var t=this,e=t._options;return t.element&&e.events&&(e.element=t.element,events.call(t,e)),events.call(t)},_on:function(t,e,n,i,r){var o=this;"function"==typeof n&&(r=i,i=n,n=e,e=null,n=o.constructor._jquery(n));var a=function(t){return i.call(this,t,jQuery(this))};return e?("string"!=typeof n&&((n=n.selector)||(n=o._options.target)),e.on(t,n,a),r&&e.find(n).trigger(t)):(n.on(t,a),r&&n.trigger(t)),o.__eventList.push({dalegate:e,selector:n,type:t,callback:a}),o},_off:function(){var t=this,e=t.__eventList;return Nui.each(e,function(t,n){t.dalegate?t.dalegate.off(t.type,t.selector,t.callback):t.selector.off(t.type,t.callback),e[n]=null,delete e[n]}),t.__eventList=[],t},_delete:function(){var t=this,e=t.constructor;if(t.target){var n="nui_component_"+e.__component_name;t.target.removeAttr(n).each(function(){this.nui&&(this.nui[e.__component_name]=null,delete this.nui[e.__component_name])})}e.__instances[t.__id]=null,delete e.__instances[t.__id]},_reset:function(){return this._off(),this.element&&(this.element.remove(),this.element=null),this},_tpl2html:function(t,e){var n={openTag:"<%",closeTag:"%>"};return 1===arguments.length?tpl.render(this._template,t,n):tpl.render.call(this._template,this._template[t],e,n)},_callback:function(t,e){var n=this,i=n._options,r=i["on"+t];if("function"==typeof r)return e?(Array.prototype.unshift.call(e,n),r.apply(i,e)):r.call(i,n)},option:function(){var t,e=arguments,n=!1;return!0===e[0]?n=!0:jQuery.isPlainObject(e[0])?(t=e[0],n=e[1]):e.length>1&&"string"==typeof e[0]&&(t={},t[e[0]]=e[1],n=e[2]),(t||n)&&(this._options=jQuery.extend(!0,{},this[!0===n?"_defaultOptions":"_options"],t),this._reset(),this._exec()),this},reset:function(){return this.option(!0),this._callback("Reset"),this},destroy:function(){this._delete(),this._reset(),this._callback("Destroy")}}})}(this);