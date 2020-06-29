<template>
<div class="maps">
  <pinch-zoom>
  <div class="maps-container">
    <div class="map map-new"><img src="../assets/Maps/ekaterinburg.jpg" alt=""></div>
    <div class="map map-old" :style="mapTransform"><img :src="require(`@/assets/${yearMap}`)" alt="" :style="opacityStyle"></div>
  </div>
  </pinch-zoom>
  <modal></modal>
</div>
</template>

<script>
import { Draggable } from 'draggable-vue-directive'
//import { PinchZoom } from 'pinch-zoom-element/dist/pinch-zoom.mjs'
import { Modal } from './Modal.vue'

export default {
  name: 'CityMap',
  directives: {
    Draggable,
  },
  components: {
    modal: Modal
  },
  props: {
    year: Number,
    epoch: Number,
    yearMaps: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  data: () => { return {
    last_posX: 0,
    last_posY: 0,
    last_scale: 1,
    moving: false
  }},
  computed: {
    opacityStyle: function() {
      return "opacity: " + this.epoch / 10
    },
    yearMap: function() {
      let curYear = this.yearMaps[this.year]
      if(!curYear)
        return ""
      return `Maps/${curYear.image}`
    },
    mapTransform: function() {
      return this.yearMaps[this.year].transform
    }
  },
  methods: {

  },
  mounted: function() {
    window.addEventListener("pointerdown", () => {
      this.moving = true;
    })
    window.addEventListener("pointermove", () => {
      if(this.moving) {
        const pinchZoomStyle = getComputedStyle(document.querySelector("pinch-zoom"))
        // [x,y,zoom]
        const coordArr = [parseInt(pinchZoomStyle.getPropertyValue('--x')),parseInt(pinchZoomStyle.getPropertyValue('--y')),pinchZoomStyle.getPropertyValue('--scale')]
        this.$emit("change", coordArr)
      }
    });
    window.addEventListener("pointerup", () => {
      if(this.moving) {
        this.moving = false
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
pinch-zoom {
  width: 100vw;
  height: 100vh;
}
.maps {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.map,
.maps-draggable {
  position: absolute;
  top: 0;
  left: 0;
}
/* .maps-container {
  transform: scale(2);
} */
.map-old {
  transform: rotate(85deg) scale(0.86);
}
.map-new {
  left: -328px; 
  top: -764px;
}
</style>
