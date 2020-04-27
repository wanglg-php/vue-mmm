<template>
  <div class="city_body">
    <div class="city_list">
      <Scroller ref="city_List">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="hot in hotlist" :key="hot.id" @tap="handleToCity(hot.nm,hot.id)">{{hot.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in citylist" :key="item.index">
              <h2>{{item.index}}</h2>
              <ul>
                <li
                  v-for="it in item.list"
                  :key="it.id"
                  @tap="handleToCity(it.name,it.id)"
                >{{it.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item,index) in citylist"
          :key="item.index"
          @touchstart="toindex(index)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "City",
  data() {
    return {
      citylist: [],
      hotlist: []
    };
  },
  mounted() {
    var citylist = window.localStorage.getItem("citylist");
    var hotlist = window.localStorage.getItem("hotlist");
    if (citylist && hotlist) {
      console.log( JSON.parse(citylist))
      this.citylist = JSON.parse(citylist);
      this.hotlist = JSON.parse(hotlist);
    }
    this.axios.get("/api/citylist").then(res => {
      // console.log("msg", res.data.data.cts);
      if (res.data.data.cities) {
        var { citylist, hotlist } = this.formatCityList(res.data.data.cities);
        this.citylist = citylist;
        this.hotlist = hotlist;
        window.localStorage.setItem("citylist", JSON.stringify(citylist));
        window.localStorage.setItem("hotlist", JSON.stringify(hotlist));
      }
    });
  },
  methods: {
    handleToCity(nm, id) {
      this.$store.commit("city/CITY_INFO", { nm, id });
      window.localStorage.setItem("nowNm", nm);
      window.localStorage.setItem("nowId", id);
      this.$router.push('/movie/now')
      console.log(id, nm);
    },
    toindex(index) {
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
      //this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
    },
    formatCityList(cities) {
      var citylist = [];
      var hotlist = [];

      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotlist.push(cities[i]);
        }
      }

      for (var i = 0; i < cities.length; i++) {
        var firstletter = cities[i].py.substring(0, 1).toUpperCase();
        if (tocom(firstletter)) {
          citylist.push({
            index: firstletter,
            list: [{ name: cities[i].nm, id: cities[i].id }]
          });
        } else {
          for (var j = 0; j < citylist.length; j++) {
            if (citylist[j].index === firstletter) {
              citylist[j].list.push({ name: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }

      function tocom(firstletter) {
        for (var i = 0; i < citylist.length; i++) {
          if (citylist[i].index === firstletter) {
            return false;
          }
        }
        return true;
      }
      citylist.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        }
      });
      console.log(citylist, hotlist);
      return {
        citylist,
        hotlist
      };
    }
  }
};
</script>
<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul {
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort {
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>