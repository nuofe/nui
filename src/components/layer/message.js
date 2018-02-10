Nui.define(['./layer'], function(layer){
    return function(type, content){
        var opts, color = '#f00';
        if(typeof type === 'object'){
            opts = type;
            type = 'success';
        }
        else if(typeof content === 'object'){
            opts = content;
        }

        if(opts){
            content = opts.content;
            delete opts.content;
        }

        if(type !== 'success' && type !== 'error'){
            content = type;
            type = 'success';
        }

        if(type === 'success' && !content){
            content = '操作成功'
        }
        else if(type === 'error' && !content){
            content = '操作失败'
        }

        if(type === 'success'){
            color = '#39B54A';
        }

        return layer(Nui.extend({
            content:'<div style="padding:10px; color:'+ color +';">'+content+'</div>',
            id:'message',
            width:'auto',
            height:'auto',
            timer:1500,
            //将层级设置的足够大，使其永远在最顶部展示
            zIndex:19920604,
            close:{
                enable:true
            }
        }, opts || {}, {
            isMask:false,
            isTips:true
        }))
    }
})