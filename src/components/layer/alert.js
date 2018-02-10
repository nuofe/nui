Nui.define(['./layer'], function(layer){
    return function(content, title, width, height){
        var opts;
        if(typeof content === 'object'){
            opts = content;
            content = opts.content;
            delete opts.content;
        }
        return layer(Nui.extend({
            content:'<div style="padding:10px; line-height:20px;">'+(content||'')+'</div>',
            title:title,
            width:width,
            height:height,
            cancel:{
                text:'关闭'
            }
        }, opts||{}))
    }
})