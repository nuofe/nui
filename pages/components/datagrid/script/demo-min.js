Nui.define('src/components/datagrid',function(){var e=this,t=e.require('component'),a=e.require('util'),i=function(){var e,t,a=document.createElement('div');return a.style.cssText='position:absolute; top:-10000em; left:-10000em; width:100px; height:100px; overflow:hidden;',e=document.body.appendChild(a).clientWidth,a.style.overflowY='scroll',t=a.clientWidth,document.body.removeChild(a),e-t}();return e.extend(t,{_static:{_init:function(){var e=this;Nui.doc.on('click',function(t){var a=$(t.target).closest('tr').hasClass('table-row');Nui.each(e.__instances,function(e){!a&&e.element&&e._activeElem&&(e._callback('CancelActive',[t,e._activeElem]),e._activeElem.removeClass('s-crt'),delete e._activeElem,e._activeFixedElem&&(e._activeFixedElem.removeClass('s-crt'),delete e._activeFixedElem))})});var t=null;Nui.win.on('resize',function(){clearTimeout(t),t=setTimeout(function(){e._resize()},80)})},_resize:function(){Nui.each(this.__instances,function(e){'100%'===e._options.height&&(e._theadHeight(),e._resetSize())})},_hasChildren:function(e){return Nui.isArray(e.children)&&e.children.length},_getRowNumber:function(e,t,a,i,l){var n=this;return a[t]||(a[t]=!0),void 0===i&&(i=0),Nui.each(e,function(e){e.cellid=i++;var o=e.order,r=e.className;!0===o&&(o='desc'),'asc'!==o&&'desc'!==o||(e.order={},e.order[o]=1),e.order&&!e.order.field&&(e.order.field=e.field),e.style||(e.style={}),e.align&&(e.style['text-align']=e.align),e.valign&&(e.style['vertical-align']=e.valign),e.width&&(e.width=e.width.toString().replace(/px$/,'')),r||(r=''),r&&(r=' '+Nui.trim(r)),e.className=r,$.isEmptyObject(e.style)&&delete e.style,l&&l.fixed&&(e.fixed=l.fixed),n._hasChildren(e)&&(i=n._getRowNumber(e.children,t+1,a,i,e))}),l?i:a.length},_colspan:function(e,t){var a=this;return void 0===t&&(t=0),Nui.each(e,function(e){a._hasChildren(e)?t+=a._colspan(e.children):t+=1}),t}},_options:{container:null,data:null,columns:null,isFixed:!0,isLine:!1,isActive:!0,isBorder:!0,isPaging:!0,isDir:!1,keyCode:[9,13],url:null,paging:null,fields:null,dataField:'list',width:'100%',height:'100%',footer:'',placeholder:'',onFocusin:null,onFocusout:null,onFocus:null,onBlur:null,stringify:null,rowRender:null,onActive:null,onCancelActive:null,onRowClick:null,onRowDblclick:null,onCheckboxChange:null,onRender:null,onRenderBefore:null,onScroll:null},_template:{layout:'<div class="<% className %>"><div class="datagrid-body<%if isFixed%> datagrid-fixed<%/if%>"><%include "table"%></div><%if footer || paging%><div class="datagrid-foot"><%if footer%><%footer%><%/if%><%if paging%><div class="datagrid-paging"></div><%/if%></div><%/if%></div>',table:'<%each rows v k%><%if v.length%><div class="datagrid-table<%if k === "left" || k === "right"%> datagrid-table-fixed<%/if%> datagrid-table-<%k%>"><%if !isFixed%><div class="datagrid-box"><table class="ui-table<%if !isBorder%> ui-table-nobd<%/if%>"><%include "thead"%><tbody class="table-tbody datagrid-tbody"></tbody></table></div><%else%><div class="datagrid-title"><div class="datagrid-thead"><table class="ui-table<%if !isBorder%> ui-table-nobd<%/if%>"><%include "thead"%></table></div></div><div class="datagrid-box"><table class="ui-table<%if !isBorder%> ui-table-nobd<%/if%>"><tbody class="table-tbody datagrid-tbody"></tbody></table></div><%/if%></div><%/if%><%/each%>',thead:'<thead class="table-thead"><%each v%><tr class="table-row"><%var cellLastIndex = $value.length-1%><%each $value val key%><%var isTitle = true%><th class="table-cell<%val.className%> table-cell-<%key%><%if cellLastIndex === key%> table-cell-last<%/if%>"<%include "attr"%>><span class="cell-wrap"<%if val.width > 0 && (val.fixed === "left" || val.fixed === "right")%> style="width:<%val.width%>px"<%/if%>><span class="cell-text"><%if val.title%><%val.title%><%if typeof val.order === "object"%><%var asc = Nui.type(val.order.asc, ["String", "Number"]), desc = Nui.type(val.order.desc, ["String", "Number"])%><em class="datagrid-order<%if asc && desc%> datagrid-order-both<%/if%>" field="<%val.order.field%>"><%if asc%><b class="datagrid-order-asc" type="asc" value="<%val.order.asc%>"><i></i><s></s></b><%/if%><%if desc%><b class="datagrid-order-desc" value="<%val.order.desc%>"><i></i><s></s></b><%/if%></em><%/if%><%elseif val.content === "checkbox"%><span class="ui-checkradio"><input type="checkbox" name="datagrid-checkbox-all" class="datagrid-checkbox datagrid-checkbox-choose"></span><%/if%></span></span></th><%/each%></tr><%/each%></thead>',rows:'<%if list && list.length%><%var toLower = function(str){return str.replace(/([A-Z])/g, function(a){return "-"+a.toLowerCase()})}%><%each list%><%var rowData = rowRender($value, $index)||{}%><%var className = (rowData.className ? " "+rowData.className : "")%><%delete rowData.className%><tr class="table-row table-row-<%$index%><%className%>" row-index="<%$index%>"<%include "data"%><%each rowData _v _n%> <%_n%>="<%_v%>"<%/each%>><%var colLastIndex = cols.length-1%><%each cols val key%><%var _value%><%if val.field && (!val.content || "number checkbox input".indexOf(val.content)===-1)%><%var _value=$value[val.field]%><%elseif val.content === "number"%><%var _value=$index+1%><%elseif val.content === "checkbox"%><%var _value={"name":val.field ? val.field : "datagrid-checkbox", "class":"datagrid-checkbox"+(!val.title ? " datagrid-checkbox-choose" : ""), "value":$value[val.field]!==undefined?$value[val.field]:""}%><%elseif val.content === "input"%><%var _value={"name":val.field ? val.field : "datagrid-input", "class":"datagrid-input", "value":$value[val.field]!==undefined?$value[val.field]:""}%><%else%><%var _value=val.content%><%/if%><td class="table-cell<%val.className%> table-cell-<%key%><%if colLastIndex === key%> table-cell-last<%/if%>"<%include "attr"%>><%if typeof val.filter === "function"%><%var _value = val.filter(_value, val.field, $value, $index)%><%/if%><span class="cell-wrap<%if val.nowrap === true%> cell-nowrap<%/if%>"<%if val.width > 0 && (val.fixed === "left" || val.fixed === "right")%> style="width:<%val.width%>px"<%/if%>><span class="cell-text<%if val.content === "checkbox"%> cell-text-checkbox<%/if%><%if val.content === "input"%> cell-text-input<%/if%>"<%if val.showtitle === true%> title="<%_value%>"<%/if%>><%if val.content === "checkbox" && typeof _value === "object"%><span class="ui-checkradio"><input type="checkbox"<%include "_attr"%>></span><%elseif val.content === "input" && typeof _value === "object"%><input type="text" autocomplete="off"<%include "_attr"%>><%else%><%_value??%><%/if%></span></span></td><%/each%></tr><%/each%><%elseif type === "all"%><tr><td class="table-cell table-cell-void" colspan="<%cols.length%>"><span class="ui-void"><%placeholder??%></span></td></tr><%/if%>',_attr:'<%if !_value["class"]%><%var _class = _value["class"] = ""%><%/if%><%if _value.className%><%var _class = (_value["class"]+=" "+Nui.trim(_value.className))%><%delete _value.className%><%/if%><%each _value _v _k%> <%_k%>="<%_v%>"<%/each%>',attr:'<%each val value name%><%if !isTitle?? && name === "style"%>style="<%each value _v _k%><%_k%>:<%_v%>;<%/each%>"<%elseif "width field colspan rowspan cellid".indexOf(name) !== -1%> <%name%>="<%value%>"<%/if%><%/each%>',data:'<%if fields%><%each $value value field%><%if fields === true || $.inArray(field, fields) !== -1%><%var _value = stringify(value)%> data-<%toLower(field)%>=<%if typeof _value !== "undefined"%><%_value%><%else%>"<%value%>"<%/if%><%/if%><%/each%><%/if%>'},_exec:function(){var e=this,t=e._options,a=e.constructor,i=t.container;i&&Nui.isArray(t.columns)&&t.columns.length&&(e._container=a._jquery(i),e._columns={all:[],left:[],right:[]},Nui.each(t.columns,function(t,a){'left'===t.fixed||!0===t.fixed?e._columns.left.push(t):'right'===t.fixed&&e._columns.right.push(t),e._columns.all.push(t)}),e._keyCode=[],!0===t.isDir&&(e._keyCode=e._keyCode.concat([37,38,39,40])),t.keyCode&&(e._keyCode=e._keyCode.concat(t.keyCode)),e._create())},_create:function(){var e=this,t=e._options,a=e.constructor;e._rows={},e._cols={},e._rowNumber=a._getRowNumber(t.columns,0,[]),Nui.each(e._columns,function(t,a){e._setRowCol(t,a)}),e._hasLeftRight=this._cols.left.length||this._cols.right.length,e.element=e._bindComponentName($(e._tpl2html('layout',e._tplData({rows:e._rows,isFixed:!0===t.isFixed,isBorder:!0===t.isBorder,paging:t.paging&&'object'==typeof t.paging&&!1!==t.paging.isPage,footer:t.footer}))).appendTo(e._container)),e._body=e.element.children('.datagrid-body'),e._tableAll=e._body.children('.datagrid-table-all'),e._tableAllBox=e._tableAll.find('.datagrid-box'),e._tableAllTitle=e._tableAll.children('.datagrid-title'),e._tableAllThead=e._tableAll.find('.datagrid-thead'),e._tableLeft=e._body.children('.datagrid-table-left'),e._tableRight=e._body.children('.datagrid-table-right'),e._tableFixed=e._body.children('.datagrid-table-fixed'),e._tableFixedBox=e._tableFixed.find('.datagrid-box'),e._foot=e.element.children('.datagrid-foot'),e._tableTbody=e._body.find('.datagrid-tbody'),t.width&&(e._tableAllThead.children().css('width',t.width),e._tableAllBox.children().css('width',t.width)),e._theadHeight(),e._initList(),e._bindEvent()},_initList:function(){var e=this,t=e._options;if(t.paging){delete t.paging.wrap,t.paging.wrap=e._foot.children('.datagrid-paging'),t.paging.container=e._tableAllBox;var a='paging_'+e.__id,i=t.paging.echoData;t.paging.echoData=function(a,l){e.element&&(e.data=a,e._render(),'function'==typeof i&&i.call(t,a,l))},e.paging=window[a]=new Paging(t.paging),!0===t.isPaging&&e.paging.query(!0)}else t.data&&(e.data=t.data,e._render())},_bindEvent:function(){var e=this;e._options;e._on('scroll',e._tableAllBox,function(t,a){e._scroll(a),e._callback('Scroll',[t,a,{left:a.scrollLeft(),top:a.scrollTop()}])}),e._event()},_getList:function(){var e,t=this,a=t._options,i=a.dataField,l=t.data;return i&&Nui.type(l,'Object')&&Nui.each(i.split('.'),function(e){if(!l[e])return l=null,!1;l=l[e]}),(e=t._callback('RenderBefore',[l]))&&Nui.type(e,'Array')&&(l=e),l||[]},_render:function(){var e=this,t=e._options;e.list=e._getList(),Nui.each(e._cols,function(a,i){e.element.find('.datagrid-table-'+i+' .datagrid-tbody').html(e._tpl2html('rows',{type:i,isFixed:!0===t.isFixed,cols:a,fields:t.fields?!0===t.fields?t.fields:[].concat(t.fields):null,list:e.list,placeholder:t.placeholder,stringify:function(e){if('function'==typeof t.stringify)return t.stringify.call(t,e)},rowRender:function(e,a){return'function'==typeof t.rowRender?t.rowRender.call(t,e,a):t.rowRender}}))}),e.element.find('.datagrid-checkbox:checkbox').prop('checked',!1).checkradio(e._checkradio()),e._resetSize(),e._callback('Render')},_checkradio:function(){var e=this;e._options;return{callback:function(t,a){var i='datagrid-checkbox-choose';if(t.hasClass(i)){var l=t.prop('checked');if(t.closest('.datagrid-table').hasClass('datagrid-table-all')||e._tableAllBox.find('tr[row-index="'+t.closest('tr.table-row').attr('row-index')+'"]').find('.'+i).checkradio('checked',l),'datagrid-checkbox-all'===t.attr('name'))e._tableTbody.find('.'+i+':enabled').checkradio('checked',l);else{var l=e._tableTbody.find('.'+i+':checked').length===e._tableTbody.find('.'+i).length;e._body.find('.table-thead .'+i).checkradio('checked',l)}}e._callback('CheckboxChange',[a,t])}}},_resetSize:function(){var e=this,t=e._options,a=e.constructor;if(e._rowHeight(),'auto'!==t.height){var l=e._tableAllBox.scrollTop();e._tableAllBox.css('height','auto');var n=e._container.height();t.height>0&&(n=t.height);var o=n-e._tableAllTitle.outerHeight()-a._getSize(e._tableAllTitle,'tb','margin')-e._foot.outerHeight()-a._getSize(e._foot,'tb','margin');if(e._tableAllBox.height(o),!0===t.isFixed){var r=e._tableAllBox.children(),c=e._tableAllBox.height()>=r.outerHeight()?0:i,s=o;r.outerWidth()>e._tableAllBox.width()&&(s-=i),Nui.browser.msie&&Nui.browser.version<=7&&'100%'===t.width&&r.width(e._tableAllBox.width()-c),e._tableFixedBox.height(s),e._tableAllTitle.css({'margin-right':c}),e._tableRight.css('right',c)}e._tableAllBox.scrollTop(l)}},_theadHeight:function(){var e=this;e._hasLeftRight&&e._tableFixed.find('.table-thead .table-cell').each(function(t){var a=$(this),i=a.attr('cellid'),l=e._tableAll.find('.table-thead .table-cell[cellid="'+i+'"]'),n=l.height(),o=a.height(n).height()-n;a.height(n-o)})},_rowHeight:function(){var e=this;if(e._hasLeftRight){var t=e._tableLeft.find('.table-tbody .table-row'),a=e._tableLeft.find('.table-tbody .table-row');e._tableAll.find('.table-tbody .table-row').each(function(e){var i=$(this).outerHeight();t.eq(e).height(i),a.eq(e).height(i)})}},_setRowCol:function(e,t,a){var i=this,l=(i._options,i.constructor);void 0===a&&(a=0),i._rows[t]||(i._rows[t]=[]),i._cols[t]||(i._cols[t]=[]),e.length&&!i._rows[t][a]&&(i._rows[t][a]=[]),Nui.each(e,function(e){var n=l._hasChildren(e),o={};n&&(o.colspan=l._colspan(e.children),i._setRowCol(e.children,t,a+1)),Nui.each(e,function(e,t){'children'!==t&&'function'!=typeof e&&(o[t]=e)}),n||(o.rowspan=i._rowNumber-a,i._cols[t].push(e)),i._rows[t][a].push(o)})},_editInput:function(e,t){var i=t.get(0),l=e.keyCode;if(37===l||39===l){var n,o=a.getFocusIndex(i);if(n=37===l?0!==o:o!==i.value.length,a.isTextSelect()||n)return!1}},_horzFocus:function(e,t,a,i){var l=t.closest('td.table-cell'),n=l[a]();if(i&&e.preventDefault(),n.length){var o=n.find('.datagrid-input');!o.length||o.prop('readonly')||o.prop('disabled')?this._horzFocus(e,n.children(),a,i):(o.focus(),setTimeout(function(){o.select()}))}else{var o,r=l.closest('tr.table-row').children('td.table-cell');'prev'===a?$.each($.makeArray(r).reverse(),function(e,t){var a=$(t).find('.datagrid-input');if(a.length)return o=a,!1}):r.each(function(){var e=$(this).find('.datagrid-input');if(e.length)return o=e,!1}),o&&this._verticalFocus(e,o,a)}},_verticalFocus:function(e,t,a){var i=t.closest('td.table-cell'),l=i.index(),n=i.closest('tr.table-row')[a]();if(n.length){var o=n.children('td.table-cell').eq(l),r=o.find('.datagrid-input');!r.length||r.prop('readonly')||r.prop('disabled')?this._verticalFocus(e,o.children(),a):(r.focus(),setTimeout(function(){r.select()}))}e.preventDefault()},_dirFocus:function(e,t){var a=this,i=e.keyCode;if(-1!==$.inArray(i,a._keyCode))switch(i){case 37:a._horzFocus(e,t,'prev');break;case 38:a._verticalFocus(e,t,'prev');break;case 39:a._horzFocus(e,t,'next');break;case 40:a._verticalFocus(e,t,'next');break;default:a._horzFocus(e,t,'next',!0)}},_events:{'click .table-tbody .table-row':'_getRowData _active','mouseenter .table-tbody .table-row':function(e,t){this._tableFixed.length&&self._tableFixed.find('.datagrid-tbody .table-row[row-index="'+t.attr('row-index')+'"]').addClass('s-hover'),t.addClass('s-hover'),this._callback('RowMouseover',[e,t])},'mouseleave .table-tbody .table-row':function(e,t){this._tableFixed.length&&this._tableFixed.find('.datagrid-tbody .table-row[row-index="'+t.attr('row-index')+'"]').removeClass('s-hover'),t.removeClass('s-hover'),this._callback('RowMouseout',[e,t])},'dblclick .table-tbody .table-row':'_getRowData _rowdblclick','focus .datagrid-input':'_enable _getRowData _focus','blur .datagrid-input':'_enable _getRowData _blur','focusin .table-tbody .table-cell':'_focusin','focusout .table-tbody .table-cell':'_focusout','click .datagrid-order > b':'_order','keydown .datagrid-input':'_editInput _dirFocus'},_order:function(e,t){t.toggleClass('s-crt'),t.siblings().removeClass('s-crt');var a=t.parent(),i=a.attr('field'),l=a.children('b.s-crt').attr('value');this.paging&&(this.paging.condition[i]=l,this.paging.query(!0))},_enable:function(e,t){if(t.prop('readonly')||t.prop('disabled'))return e.stopPropagation(),!1},_active:function(e,t,a){var i=this;i._callback('RowClick',[e,t,a]),!0===i._options.isActive&&(i.cancelActive(),i._activeElem=t.addClass('s-crt'),i._tableFixed.length&&(i._activeFixedElem=i._tableFixed.find('.datagrid-tbody .table-row[row-index="'+t.attr('row-index')+'"]').addClass('s-crt')),i._callback('Active',[e,t,a]))},_getRowData:function(e,t){return t.hasClass('table-row')?t.data():t.closest('.table-row').data()},_focus:function(e,t,a){return this._active(e,t.closest('.table-row'),a),this._callback('Focus',arguments)},_blur:function(e,t,a){return this._callback('Blur',arguments)},_focusin:function(e,t){return t.addClass('s-focus'),this._callback('Focusin',arguments)},_focusout:function(e,t){return t.removeClass('s-focus'),this._callback('Focusout',arguments)},_rowdblclick:function(e,t,a){return this._callback('RowDblclick',arguments)},_scroll:function(e){var t=this,a=e.scrollTop(),i=e.scrollLeft();t._tableFixedBox.scrollTop(a),t._tableAllThead.scrollLeft(i)},resize:function(){this._theadHeight(),this._resetSize()},scrollTo:function(e,t){var a=this._tableAllBox;a.scrollTop(t||0),a.scrollLeft(e||0)},cancelActive:function(){!0===this._options.isActive&&this._activeElem&&(this._activeElem.removeClass('s-crt'),delete this._activeElem)},checkedData:function(e){var t=this,a=[];return t._tableAllBox.find('.datagrid-checkbox-choose:checked').each(function(){var t=$(this).closest('tr.table-row').data();e?a.push(t[e]):a.push(t)}),a}})}),Nui.define('pages/components/datagrid/script/checkradio',function(require,imports,renders,extend){!function(e,t){e.fn.checkradio=function(t,a){if(!t||e.isPlainObject(t)){var i=e.extend({switches:{off:'',on:''},beforeCallback:e.noop,callback:e.noop},t||{});return this.each(function(){var t=e(this),a=t.closest('.ui-checkradio');if(a.length){var l=t.prop('checked')?' s-checked':'',n=t.prop('disabled')?' s-dis':'',o=t.attr('name'),r=e.extend({},i.switches,t.data()||{}),c=a.find('.text'),s='radio';t.is(':checkbox')&&(s='checkbox'),a.children().attr('checkname')?a.children().attr('class','ui-'+s+l+n):(r.off&&r.on&&(a.addClass('ui-switches'),c=e('<s class="text">'+(t.prop('checked')?r.on:r.off)+'</s>').insertBefore(t)),t.css({position:'absolute',top:'-999em',left:'-999em',opacity:0}).wrap('<i></i>'),a.wrapInner('<em class="ui-'+s+l+n+'" checkname="'+o+'"></em>').children().click(function(a){var l=e(this);if(!t.is(':disabled')&&!1!==i.beforeCallback(t,a)){if(t.is(':checkbox')){var n=t.prop('checked');t.prop('checked',!n),l[(n?'remove':'add')+'Class']('s-checked'),c.length&&c.text(n?r.off:r.on)}else{if(t.prop('checked'))return;t.prop('checked',!0),e('.ui-radio[checkname="'+o+'"]').removeClass('s-checked'),l.addClass('s-checked')}i.callback(t,a)}})),i.init&&!t.is(':disabled')&&!1!==i.beforeCallback(t)&&i.callback(t,'init')}})}return e(this).prop(t,1==a).checkradio()}}(jQuery)}),Nui.define('pages/components/datagrid/script/paging',function(require,imports,renders,extend){!function(e,t,a,i){function l(i){var n=this;n.load=!1,n.instance=function(){for(var t in e)if(e[t]==n)return t.toString()},a.extend(n,a.extend(!0,{url:'',wrap:null,paramJSON:'',pCount:10,current:1,aCount:0,last:!1,allData:!1,isFull:!0,container:e,scroll:{enable:!1},ajax:{},condition:{},loading:{wrap:null,show:function(){var e=this;e.hide();var t=e.wrap;t&&t.append('<i class="ui-loading" style="position:absolute;">正在加载数据...</i>').css({position:'relative'})},hide:function(){a('.ui-loading').remove()}},button:{prev:'«',next:'»',first:'',last:''},extPage:{wrap:null,desc:'',prev:'上一页',next:'下一页'},refreshCallback:null,endCallback:a.noop,jumpCallback:a.noop,echoData:a.noop},l.options,i||{})),n.container=a(n.container||e),!0===n.scroll.enable&&(n.wrap=null,n.children=n.container[0]===e?a(t.body):n.container.children(),n.container.scroll(function(){n.resize()}).resize(function(){n.resize()}))}var n=function(e){return e.dataType='json',a.ajax(e)};l.options={},l.config=function(e){a.extend(!0,l.options,e||{})},l.prototype={constructor:l,jump:function(e){var t,i=this,l=Math.ceil(i.aCount/i.pCount);if(i.showload=!0,i.aCount>0)if('object'==typeof e){var n=a(e).prevAll('input').val();t=n<=l&&n!=i.current?parseInt(n):i.current}else t=e>0&&e<=l?e:e<0?l+e+1:l;else t=e;if(i.current=i.condition.current=t,i.jumpCallback(t),'function'==typeof i.refreshCallback)return i.refreshCallback(t),void i.create();i.getData('jump')},query:function(e){var t=this;t.showload=!0,t.load=!1,'function'!=typeof t.refreshCallback||'refresh'!==e?(e?('noloading'===e?t.showload=!1:'reload'!==e&&(t.current=1),t.filter(),t.condition.current=t.current):t.condition={current:t.current=1},t.getData(e||'')):t.create()},filter:function(){var e=this;for(var t in e.condition)e.condition[t]||delete e.condition[t]},getData:function(t){var i=this;i.condition.pCount=i.pCount,!0===i.allData&&(delete i.condition.pCount,delete i.condition.current);var l=i.condition;if(i.paramJSON){l=[],a.each(i.condition,function(e,t){l.push(e+':'+t)});var o=l.length?'{'+l.join(',')+'}':'';l={},l[i.paramJSON]=o}var r='function'==typeof i.ajax?i.ajax():i.ajax;delete r.success,i.load||(i.load=!0,n(a.extend({},!0,{url:i.url,data:l,success:function(a){try{a.current=i.current}catch(e){}var l,n=0;if(i.container[0]===e||'reload'===t||'noloading'===t||'jump'===t&&('jump'!==t||i.scroll.enable)||(i.container.scrollTop(0),i.container.scrollLeft(0)),'reload'===t){var o=i.container;i.selector?(o=i.container.find(i.selector),n=o.scrollTop()):n=o.scrollTop(),l=o.find('tr.rows.s-crt').index()}if(i.echoData(a,t),i.aCount=a.aCount,i.load=!1,!0===i.scroll.enable&&i.resize(),n>0){var o=i.container;i.selector?(o=i.container.find(i.selector),o.scrollTop(n)):o.scrollTop(n),l>=0&&o.find('tr.rows').eq(l).addClass('s-crt')}if(!0===i.last)return i.last=!1,void i.jump(-1);i.create(),i.endCallback(a)},error:function(){i.showload&&i.loading.hide(),i.load=!1}},r||{})))},trim:function(e){var t=Math.abs(parseInt(a(e).val()));!t&&(t=1),a(e).val(t)},echoList:function(e,t,a){return this.current==t?'<li><span class="s-crt">'+t+'</span></li>':'<li><a href="javascript:'+a+'.jump('+t+');" target="_self">'+t+'</a></li>'},resize:function(){var e=this;try{var t=e.container.scrollTop(),a=e.container.height(),i=e.children.outerHeight();!e.load&&Math.ceil(e.aCount/e.pCount)>e.current&&(0===t&&i<=a||a+t>=i)&&e.jump(++e.current)}catch(e){}},create:function(){var e=this,t=e.button,a=Math.ceil(e.aCount/e.pCount),i=e.current,l='',n=a==i?1:i+1,o=e.instance(),r=e.extPage;if(r.wrap){var c='<div>';c+=i==a||0==a?'<span>'+r.next+'</span>':'<a href="javascript:'+o+'.jump('+(i+1)+');" target="_self">'+r.next+'</a>',c+=1==i?'<span>'+r.prev+'</span>':'<a href="javascript:'+o+'.jump('+(i-1)+');" target="_self">'+r.prev+'</a>',c+='</div><em>'+(0!==a?i:0)+'/'+a+'</em><strong>共'+e.aCount+r.desc+'</strong>',r.wrap.html(c)}if(e.wrap){if(!a)return void e.wrap.empty();if(l+=function(){var a='';return 1==i?(t.first&&(a+='<li><span>'+t.first+'</span></li>'),a+='<li><span>'+t.prev+'</span></li>'):(e.button.first&&(a+='<li><a href="javascript:'+o+'.jump(1);" target="_self">'+t.first+'</a></li>'),a+='<li><a href="javascript:'+o+'.jump('+(i-1)+');" target="_self">'+t.prev+'</a></li>'),a}(),a<=7)for(var s=1;s<=a;s++)l+=e.echoList(l,s,o);else if(i-3>1&&i+3<a){l+='<li><a href="javascript:'+o+'.jump(1);" target="_self">1</a></li>',l+='<li><em>...</em></li>';for(var s=i-2;s<=i+2;s++)l+=e.echoList(l,s,o);l+='<li><em>...</em></li>',l+='<li><a href="javascript:'+o+'.jump('+a+');" target="_self">'+a+'</a></li>'}else if(i-3<=1&&i+3<a){for(var s=1;s<=5;s++)l+=e.echoList(l,s,o);l+='<li><em>...</em></li>',l+='<li><a href="javascript:'+o+'.jump('+a+');" target="_self">'+a+'</a></li>'}else if(i-3>1&&i+3>=a){l+='<li><a href="javascript:'+o+'.jump(1);" target="_self">1</a></li>',l+='<li><em>...</em></li>';for(var s=a-5;s<=a;s++)l+=e.echoList(l,s,o)}l+=function(){var e='';return i==a?(e+='<li><span>'+t.next+'</span></li>',t.last&&(e+='<li><span>'+t.last+'</span></li>')):(e+='<li><a href="javascript:'+o+'.jump('+(i+1)+');" target="_self">'+t.next+'</a></li>',t.last&&(e+='<li><a href="javascript:'+o+'.jump('+a+');" target="_self">'+t.last+'</a></li>')),e}(),e.isFull&&(l+='<li><em>跳转到第</em><input type="text" onblur="'+o+'.trim(this);" value="'+n+'" /><em>页</em><button type="button" onclick="'+o+'.jump(this);">确定</button></li>'),l='<ul class="ui-paging">'+l+'</ul>',e.wrap.html(l)}}},a.extend({paging:function(t,a){void 0===a&&(a=t,t='paging');var i=e[t]=new l(a);return'function'!=typeof e[t].refreshCallback?(i.query(!0),i):(i.query('refresh'),i)}}),e.Paging=l}(window,document,jQuery)}),Nui.define('./script/demo',function(require,imports,renders,extend){var e=this,t=(e.require('pages/components/datagrid/script/paging'),e.require('pages/components/datagrid/script/checkradio'),require('src/components/datagrid')),a=t({container:'#data',isBorder:!1,isDir:!0,paging:{url:'http://172.30.5.28/data/',pCount:20},data:[{buname:'11111'}],columns:[{title:'名称',width:100,field:'buname',fixed:'left',nowrap:!0},{title:'名称',width:'200',field:'id',content:'input'},{title:'',content:''},{title:'名称',width:200,field:'buname',content:'input'}],onRowClick:function(e,t,a,i){},onRowDblclick:function(e,t,a,i){},onRender:function(e){},onFocus:function(e,t,a,i){}});$('h1').click(function(){a.option('isBorder',!0)})});
//# sourceMappingURL=demo-min.js.map?v=c0ccd70