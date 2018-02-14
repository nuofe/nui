{% macro active(current='index', page='index') %}
<div class="f-fl g-sidecol">
    <div class="side">
        <ul class="m-menu f-lh28">
            <li>
                <a class="f-fs16{%if current == 'index' %} s-crt{% endif %}" href="/nui/pages/">介绍</a>
                {%if current == 'index' %}
                <ul>
                    <li>
                        <a href="#Nui是什么">Nui是什么</a>
                    </li>
                    <li>
                        <a href="#快速上手">快速上手</a>
                    </li>
                </ul>
                {% endif %}
            </li>
            <li>
                <a class="f-fs16{%if current == 'doc' %} s-crt{% endif %}" href="/nui/pages/doc.html">API文档</a>
                {%if current == 'doc' %}
                <ul>
                    <li>
                        <a href="#load">load</a>
                    </li>
                    <li>
                        <a href="#use">use</a>
                    </li>
                    <li>
                        <a href="#config">config</a>
                    </li>
                    <li>
                        <a href="#define">define</a>
                        <ul>
                            <li>
                                <a href="#define_exports">exports</a>
                            </li>
                            <li>
                                <a href="#define_require">require</a>
                            </li>
                            <li>
                                <a href="#define_imports">imports</a>
                            </li>
                            <li>
                                <a href="#define_renders">renders</a>
                            </li>
                            <li>
                                <a href="#define_extend">extend</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#each">each</a>
                    </li>
                    <li>
                        <a href="#trim">trim</a>
                    </li>
                    <li>
                        <a href="#trimLeft">trimLeft</a>
                    </li>
                    <li>
                        <a href="#trimRight">trimRight</a>
                    </li>
                    <li>
                        <a href="#type">type</a>
                    </li>
                    <li>
                        <a href="#unique">unique</a>
                    </li>
                    <li>
                        <a href="#extend">extend</a>
                    </li>
                    <li>
                        <a href="#noop">noop</a>
                    </li>
                    <li>
                        <a href="#browser">browser</a>
                    </li>
                    <li>
                        <a href="#bsie">bsie</a>
                    </li>
                    <li>
                        <a href="#win">win</a>
                    </li>
                    <li>
                        <a href="#doc">doc</a>
                    </li>
                </ul>
                {% endif %}
            </li>
            <li>
                <a class="f-fs16{%if current == 'util' %} s-crt{% endif %}" href="/nui/pages/util.html">工具集</a>
                {%if current == 'util' %}
                <ul>
                    <li>
                        <a href="#regex">regex</a>
                    </li>
                    <li>
                        <a href="#toFixed">toFixed</a>
                    </li>
                    <li>
                        <a href="#getParam">getParam</a>
                    </li>
                    <li>
                        <a href="#setParam">setParam</a>
                    </li>
                    <li>
                        <a href="#supportCss3">supportCss3</a>
                    </li>
                    <li>
                        <a href="#supportHtml5">supportHtml5</a>
                    </li>
                    <li>
                        <a href="#jumpUrl">jumpUrl</a>
                    </li>
                    <li>
                        <a href="#formatDate">formatDate</a>
                    </li>
                    <li>
                        <a href="#getData">getData</a>
                    </li>
                </ul>
                {% endif %}
            </li>
            <li>
                <a class="f-fs16{%if current == 'template' %} s-crt{% endif %}" href="/nui/pages/template.html">模板引擎</a>
                {%if current == 'template' %}
                <ul>
                    <li>
                        <a href="#快速上手">快速上手</a>
                    </li>
                    <li>
                        <a href="#语法">语法</a>
                    </li>
                    <li>
                        <a href="#方法">方法</a>
                        <ul>
                            <li>
                                <a href="#render">render</a>
                            </li>
                            <li>
                                <a href="#method">method</a>
                            </li>
                            <li>
                                <a href="#config">config</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#性能测试">性能测试</a>
                    </li>
                </ul>
                {% endif %}
            </li>
            <li>
                <a class="f-fs16{%if current == 'events' %} s-crt{% endif %}" href="/nui/pages/events.html">代理事件</a>
            </li>
            <li>
                <a class="f-fs16{%if current == 'element' %} s-crt{% endif %}" href="/nui/pages/element.html">页面元素</a>
                {%if current == 'element' %}
                <ul>
                    <li>
                        <a href="/nui/pages/element/layout/">布局</a>
                    </li>
                    <li>
                        <a href="/nui/pages/element/header/">页头</a>
                    </li>
                    <li>
                        <a href="/nui/pages/element/iconfont/">图标</a>
                    </li>
                    <li>
                        <a href="/nui/pages/element/button/">按钮</a>
                    </li>
                    <li>
                        <a href="/nui/pages/element/setp/">步骤条</a>
                    </li>
                    <li>
                        <a href="/nui/pages/element/card/">卡片</a>
                    </li>
                    <li>
                        <a href="/nui/pages/element/form/">表单</a>
                    </li>
                    <li>
                        <a href="/nui/pages/element/nav/">导航栏</a>
                    </li>
                    <li>
                        <a href="/nui/pages/element/table/">表格</a>
                    </li>
                    <li>
                        <a href="/nui/pages/element/list/">列表</a>
                    </li>
                    <li>
                        <a href="/nui/pages/element/footer/">页脚</a>
                    </li>
                </ul>
                {% endif %}
            </li>
            <li>
                <a class="f-fs16{%if current == 'request' %} s-crt{% endif %}" href="/nui/pages/request.html">网络请求</a>
            </li>
            <li>
                <a class="f-fs16{%if current == 'cpns' %} s-crt{% endif %}" href="/nui/pages/components/">交互组件</a>
                {%if current == 'cpns' %}
                <ul>
                    <li>
                        <a {%if page == 'index' %} class="s-crt"{% endif %} href="/nui/pages/components/#开发组件">开发组件</a>
                        {%if page == 'index' %}
                        <ul>
                            <li>
                                <a href="#命名规范">命名规范</a>
                            </li>
                            <li>
                                <a href="#私有实例属性">私有实例属性</a>
                            </li>
                            <li>
                                <a href="#私有实例方法">私有实例方法</a>
                            </li>
                            <li>
                                <a href="#实例方法">实例方法</a>
                            </li>
                            <li>
                                <a href="#私有类属性">私有类属性</a>
                            </li>
                            <li>
                                <a href="#私有类方法">私有类方法</a>
                            </li>
                            <li>
                                <a href="#类方法">类方法</a>
                            </li>
                            <li>
                                <a href="#封装组件">封装组件</a>
                            </li>
                            <li>
                                <a href="#调用组件">调用组件</a>
                            </li>
                        </ul>
                        {% endif %}
                    </li>
                    <li>
                        <a{%if page == 'router' %} class="s-crt"{% endif %} href="/nui/pages/components/router/">路由</a>
                    </li>
                    <li>
                        <a{%if page == 'layer' %} class="s-crt"{% endif %} href="/nui/pages/components/layer/">弹出层</a>
                    </li>
                    <li>
                        <a{%if page == 'datagrid' %} class="s-crt"{% endif %} href="/nui/pages/components/datagrid/">数据网格</a>
                    </li>
                    <li>
                        <a{%if page == 'placeholder' %} class="s-crt"{% endif %} href="/nui/pages/components/placeholder/">输入框占位符</a>
                    </li>
                    <li>
                        <a{%if page == 'input' %} class="s-crt"{% endif %} href="/nui/pages/components/input/">输入框增强</a>
                    </li>
                    <li>
                        <a{%if page == 'popover' %} class="s-crt"{% endif %} href="/nui/pages/components/popover/">提示框</a>
                    </li>
                    <li>
                        <a{%if page == 'search' %} class="s-crt"{% endif %} href="/nui/pages/components/search/">搜索</a>
                    </li>
                    <li>
                        <a{%if page == 'select' %} class="s-crt"{% endif %} href="/nui/pages/components/select/">选择器</a>
                    </li>
                    <li>
                        <a{%if page == 'calendar' %} class="s-crt"{% endif %} href="/nui/pages/components/calendar/">日历</a>
                    </li>
                    <li>
                        <a{%if page == 'tab' %} class="s-crt"{% endif %} href="/nui/pages/components/tab/">选项卡</a>
                    </li>
                    <li>
                        <a{%if page == 'paging' %} class="s-crt"{% endif %} href="/nui/pages/components/paging/">分页</a>
                    </li>
                    <li>
                        <a{%if page == 'carousel' %} class="s-crt"{% endif %} href="/nui/pages/components/carousel/">走马灯</a>
                    </li>
                    <li>
                        <a{%if page == 'upload' %} class="s-crt"{% endif %} href="/nui/pages/components/upload/">文件上传</a>
                    </li>
                    <li>
                        <a{%if page == 'radio' %} class="s-crt"{% endif %} href="/nui/pages/components/radio/">单选框</a>
                    </li>
                    <li>
                        <a{%if page == 'checkbox' %} class="s-crt"{% endif %} href="/nui/pages/components/checkbox/">复选框</a>
                    </li>
                    <li>
                        <a{%if page == 'fixed' %} class="s-crt"{% endif %} href="/nui/pages/components/fixed/">固钉</a>
                    </li>
                    <li>
                        <a{%if page == 'numeral' %} class="s-crt"{% endif %} href="/nui/pages/components/fixed/">数字输入</a>
                    </li>
                    <li>
                        <a{%if page == 'print' %} class="s-crt"{% endif %} href="/nui/pages/components/print/">打印</a>
                    </li>
                    <li>
                        <a{%if page == 'collapse' %} class="s-crt"{% endif %} href="/nui/pages/components/collapse/">折叠面板</a>
                    </li>
                    <li>
                        <a{%if page == 'validate' %} class="s-crt"{% endif %} href="/nui/pages/components/validate/">表单校验</a>
                    </li>
                </ul>
                {% endif %}
            </li>
            <li>
                <a class="f-fs16{%if current == 'pack' %} s-crt{% endif %}" href="/nui/pages/pack.html">打包工具</a>
                {%if current == 'pack' %}
                <ul>
                    <li>
                        <a href="/nui/pages/pack/gulp.html"{%if page == 'gulp' %} class="s-crt"{% endif %}>gulp</a>
                        {%if page == 'gulp' %}
                        <ul>
                            <li>
                                <a href="#install">安装</a>
                            </li>
                            <li>
                                <a href="#use">使用</a>
                            </li>
                            <li>
                                <a href="#notice">注意事项</a>
                            </li>
                        </ul>
                        {% endif %}
                    </li>
                    <li>
                        <a href="/nui/pages/pack/webpack.html"{%if page == 'webpack' %} class="s-crt"{% endif %}>webpack</a>
                        {%if page == 'webpack' %}
                        <ul>
                            <li>
                                <a href="#install">安装</a>
                            </li>
                            <li>
                                <a href="#use">使用</a>
                            </li>
                            <li>
                                <a href="#notice">注意事项</a>
                            </li>
                        </ul>
                        {% endif %}
                    </li>
                </ul>
                {% endif %}
            </li>
        </ul>
    </div>
</div>
{% endmacro %}
