<template>
<div class="marks">
  <div v-for="(point, index) in newpointers" v-bind:key="index">
    <div class="mark" :style="getStyle(point)">
      <i class="el-icon-location mie_map-location" @click="openModal(index)"></i>
    </div>
  </div>

  <el-dialog
    :title="currentBuilding.name"
    :visible.sync="dialogVisible"
    :fullscreen="true">
    <div class="mie_dialog--container">
    <div class="mie_dialog--img"><img :src="require(`@/assets/${currentBuilding.image}`)" /></div>
    <div class="mie_dialog--text"><div v-html="currentBuilding.description"></div></div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { Draggable } from 'draggable-vue-directive'
//import { PinchZoom } from 'pinch-zoom-element/dist/pinch-zoom.mjs'
//import Modal from './Modal.vue'

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
    newpointers: [],
    dialogVisible: false,
    i: false

  }},
  computed: {
    currentBuilding: function() {
      if(this.i !== false) {
        return this.pointers[this.i];
      }
      else return {
        name: "",
        image: "static/photos/photo3.jpg",
        description: ""
      }
    }
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

    openModal: function(index) {
      this.dialogVisible = true;
      this.i = index;
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

.mie_dialog--img {
  width: 600px;
  margin-right: 40px;
}
.mie_dialog--text {
  flex-grow: 1;
  overflow: auto;
}
.mie_dialog--img img {
  width: 600px;
}
.mie_dialog--container {
  display: flex;
}
.mie_map-location {
  font-size: 42px;
  color: #409EFF;
  cursor: pointer;
}
.el-button--primary {
  background-color: #97723d !important;
  border-color: #97723d !important;
}
</style>
