<template>
  <div class="movie_body">
    <loadings v-if="isLoading" />
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pwm">{{pullDownMsg}}</li>
        <li v-for="item in movelist" :key="item.id">
          <div class="pic_show" @tap="handleToDetail">
            <img :src="item.img|setWH(64.89)" />
          </div>
          <div class="info_list">
            <h2>{{item.nm}}</h2>
            <p>
              观众评
              <span class="grade">{{item.sc}}</span>
            </p>
            <p>主演 {{item.star}}</p>
            <p>{{item.showinfo}}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>
<script>
//import bsscroll from 'better-scroll';

export default {
  name: "nowpaying",
  data() {
    return {
      movelist: [],
      pullDownMsg: "",
      isLoading: true,
      prevCityId: -1
    };
  },
  activated() {
    var cityId = this.$store.state.city.id;
    console.log(this.prevCityId,cityId);
    if (this.prevCityId === cityId) {
      return;
    }
    //api/movieOnInfoList?cityId=10
    this.axios.get("/api/movieOnInfoList?cityId=" + cityId).then(res => {
      console.log(res.data.msg);
      this.isLoading = true;
      var msg = res.data.msg;

      if (msg === "ok") {
        this.movelist = res.data.data.movieList;
        this.isLoading = false;
        this.prevCityId = cityId
        // this.$nextTick();
        // var bs = new bsscroll(this.$refs.reference,{
        // 	tap:true,
        // 	probeType:1
        // });
        // bs.on('scroll',(pos)=>{
        // 	//console.log('scroll');
        // 	if(pos.y>30){
        // 		console.log('scroll');
        // 		this.pullDownMsg='正在更新。。'
        // 	}
        // });
        // bs.on('touchEnd',(pos)=>{
        // 	//console.log('touchEnd');

        // 	if(pos.y>30){
        // 		this.axios.get("/api/movieOnInfoList?cityId=11").then((res=>{
        // 			var msg = res.data.msg;
        // 			if(msg ==='ok'){
        // 				this.pullDownMsg='更新成功';
        // 				setTimeout(()=>{
        // 				this.movelist = res.data.data.movieList;
        // 				console.log('touchEnd');
        // 				this.pullDownMsg = '';
        // 				},1000)

        // 			}
        // 		}))
        // 	}

        // })
      }
    });
  },
  methods: {
    handleToDetail() {
      console.log(111);
    },
    handleToScroll(pos) {
      console.log("ccccscroll");
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新。。";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 50) {
        var cityId = this.$store.state.city.id;
        this.axios.get("/api/movieOnInfoList?cityId=" +  cityId).then(res => {
          var msg = res.data.msg;
          if (msg === "ok") {
            this.pullDownMsg = "更新成功";
            setTimeout(() => {
              this.movelist = res.data.data.movieList;
              console.log("touchEnd");
              this.pullDownMsg = "";
            }, 1000);
          }
        });
      }
    }
  }
};
</script>
<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pwm {
  border: none;
  margin: 0px;
  padding: 0px;
}
</style>