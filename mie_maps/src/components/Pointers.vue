<template>
<div class="marks">
  <div v-for="(point, index) in newpointers" v-bind:key="index">
    <div class="mark" :style="getStyle(point)">
      <router-link :to="'/detail/' + index">
        <svg width="60px" height="60px" viewBox="0 0 139 139" xmlns="http://www.w3.org/2000/svg"><circle cx="69.5" cy="54.5" r="35.2" stroke="#000" stroke-miterlimit="10"/><circle cx="69.5" cy="54.5" r="20.8" fill="#fff"/><path d="M70 121l-3-1C29 76 34 55 34 55s11 35 36 35M70 121l2-1c38-44 33-65 33-65S94 90 70 90"/></svg>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import { Draggable } from 'draggable-vue-directive'
//import { PinchZoom } from 'pinch-zoom-element/dist/pinch-zoom.mjs'

export default {
  name: 'Pointers',
  directives: {
    Draggable,
  },
  props: {
    transform: {
      type: Array,
      default: function() {
        return [0,0,1]
      }
    },
    pointers: {
      type: Array,
      default: function() {
        return []
      }
    },
  },
  data: () => { return {
    _transform: [],
    newpointers: []
  }},
  computed: {

  },
  methods: {
    placePoints: function() {
    },

    transformPoints: function() {
      //console.log(this.pointers)
      
      this.pointers.forEach((pointer, index) => {
        pointer.delta = [
          this._transform[0], 
          this._transform[1]
        ]
        pointer.scale = this._transform[2]
        this.$set(this.newpointers, index, pointer)
      })
    },

    getStyle(point) {
      if(point) {
        //return `left: ${point.coord[0]*point.scale + point.delta[0]}px; top: ${point.coord[1]*point.scale + point.delta[1]}px;`
        return `transform: translateX(${point.coord[0]*point.scale + point.delta[0]}px) translateY(${point.coord[1]*point.scale + point.delta[1]}px);`
      }
      else return ""
    }
  },
  created: function() {
    //this.placePoints();
    this.newpointers = this.pointers.map(v => ({ ...v, coord:[...v.coord] }))
  },
  watch: {
    transform: function(newVal) {
      this._transform = newVal
      this.transformPoints()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mark {
  position: absolute;
}
</style>
