<template>
  <div id="app">
    <city-map :year="year" :epoch="epoch" :yearMaps="mapsArray" @change="onChange"></city-map>
    <pointers :pointers="locations" :transform="transform"></pointers>
    <!-- <div class="epochSlderContainer"><el-slider v-model="epoch" :min="0" :max="10" :step="1" :show-tooltip="false"></el-slider></div> -->
    <div class="yearsSlderContainer"><el-slider
      v-model="year"
      show-stops
      :marks="yearMarks"
      :max="3"
      :show-tooltip="false">
    </el-slider></div>


     <router-view></router-view>
  </div>
</template>

<script>
import CityMap from './components/CityMap.vue'
import Pointers from './components/Pointers.vue'

export default {
  name: 'App',
  components: {
    CityMap,
    Pointers
  },
  data: () => { return {
    epoch: 5,
    year: 1,
    yearMarks: {
      0: '1780',
      1: '1900',
      2: '1910',
      3: '1947',
      // 50: {
      //   style: {
      //     color: '#1989FA'
      //   },
      //   label: this.$createElement('strong', '50%')
      // }
    },
    points: {},
    mapsArray: [
      {
        year: "1780",
        image: "1780.jpg",
        transform: "left:-403.528px;top: -443.317px;transform:rotate(85deg) scale(0.18); "
      },
      {
        year: "1900",
        image: "1900.jpg",
        transform: "transform: rotate(-5deg) scale(0.45); left:191.883px;top: -392.277px;"
      },
      {
        year: "1910",
        image: "1910.jpg",
        transform: "transform: rotate(85deg) scale(0.86);"
      },
      {
        year: "1947",
        image: "1947.jpg",
        transform: "transform: rotate(6deg) scale(0.65); left: -1078px; top: -1728px;"
      }
    ],
    // [x,y,zoom]
    transform: [0,0,1],
    locations: [
        {
            "name": "Здание 1",
            "image": "/images/building1.jpg",
            "description": "some description",
            "coord": [200, 200],
            "delta": [0,0],
            "scale": 1,
            "year": 1920
        },
        {
            "name": "Здание 2",
            "image": "/images/building2.jpg",
            "description": "some description",
            "coord": [300, 300],
            "delta": [0,0],
            "scale": 1,
            "year": 1950
        },
        {
            "name": "Здание 3",
            "image": "/images/building3.jpg",
            "description": "some description",
            "coord": [100, 300],
            "delta": [0,0],
            "scale": 1,
            "year": 1850
        }
    ],
    centerDialogVisible: false
  }},
  methods: {
    onChange: function(val) {
      this.transform = val
    }
  }
}
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
}
  .epochSlderContainer {
    position: fixed;
    top: 50px;
    right: 50px;
    width: 400px;
  }

  .yearsSlderContainer {
    position: fixed;
    bottom: 50px;
    right: 100px;
    left: 100px;
  }

.el-slider__runway {
  height: 44px !important;
  background-image: -moz-linear-gradient( 90deg, rgb(143,107,41) 0%, rgb(253,224,141) 100%) !important;
  background-image: -webkit-linear-gradient( 90deg, rgb(143,107,41) 0%, rgb(253,224,141) 100%) !important;
}

.el-slider__bar {
  background-color: transparent !important;
}

.el-slider__marks-text {
  color: #321200 !important;
  font-size: 36px !important;
  margin-top: 0 !important;
  z-index: 2010;
}

.el-slider__button-wrapper {
  background-color: #97723d !important;
  width: 110px !important;
  height: 69px !important;
  border-radius: 0 !important;
}

.el-slider__button {
  opacity: 0;
}
.el-slider__stop.el-slider__marks-stop {
  opacity: 0 !important;
}
</style>
