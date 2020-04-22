<template>
    <div class="wrapper" ref="reference">
        <!-- 插槽 -->
        <slot></slot>
    </div>
</template>
<script>
import bsscroll from 'better-scroll';
export default {
    name:'scroll', 
    props:{
        handleToScroll:{
            type:Function,
            default:function(){}
        },
        handleToTouchEnd:{
            type:Function,
            default:function(){}
        }
    },
    mounted(){
       
        var bs = new bsscroll(this.$refs.reference,{
				tap:true,
				probeType:1
        });
        this.bs = bs;
        bs.on('scroll',(pos)=>{
             console.log('scroll')
            this.handleToScroll(pos)
        });
        bs.on('touchEnd',(pos)=>{
            console.log('touchEnd')
            this.handleToTouchEnd(pos)
        });
    },
    methods:{
        toScrollTop(y){
            this.bs.scrollTo(0,y);
        }
    }
}
</script>
<style  scoped>
.wrapper{height: 100%;}
</style>