<template>
<div class="wrapper">
  <ul class="timeline">
    <li v-for="(point, index) in marks" v-bind:key="index" class="timeline_item">{{ point }}</li>
    <div @pointerdown="moveStart" ref="cursor" class="timeline_cursor"></div>
  </ul>
</div>
</template>

<script>

export default {
  name: 'Timeline',
  props: {
    marks: {
      type: Array,
      default: function() {
        return []
      }
    },
    value: {
      type: Number,
      default: 2020
    },
  },
  data: () => { return {
    dX: 0,
    isMove: false,
    items: []
  }},
  computed: {

  },
  methods: {
    moveStart: function(event) {
      const cursor = this.$refs.cursor;
      this.dX = Math.round(event.offsetX - cursor.offsetWidth / 2)
      cursor.classList.remove("transition")
      this.isMove = true 
    },
    moveEnd: function() {
      if (!this.isMove) return
      this.isMove = false
      const cursor = this.$refs.cursor
      console.dir(cursor)
      const x = Number.parseInt(getComputedStyle(cursor).getPropertyValue("--left"))
      let nX = Infinity
      let j = 0
      
      for (let i = 0; i < this.items.length; i++) {
        if (x < this.items[i]) {
          if (this.items[i] - x < nX) {
            nX = this.items[i] - x
            j = i
          }
        } else {
          if (x - this.items[i] < nX) {
            nX = x - this.items[i]
            j = i
          }
        }
      }
      cursor.classList.add("transition")
      cursor.style.setProperty("--left", `${this.items[j]}px`)
      this.$emit("input", j)
    },
    move: function(event) {
      if (!this.isMove) return
      const cursor = this.$refs.cursor;
      const y = event.clientX - this.dX
      cursor.style.setProperty("--left", `${y}px`)
    }
  },
  created: function() {
    window.addEventListener("pointermove", this.move)
    window.addEventListener("pointerup", this.moveEnd)
  },
  mounted: function() {
    const cursor = this.$refs.cursor;
    this.items = Array.from(document.querySelectorAll(".timeline_item")).map(node => Math.round(node.offsetLeft + node.offsetWidth / 2))
    const x = this.items[this.value]
    cursor.style.setProperty("--left", `${x}px`)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  overflow: hidden;
  height: 80px;

  position: fixed;
    bottom: 20px;
    width: 100%;
}

.timeline, .timeline_item {
  list-style: none;
  margin: 0;
  padding:0;
}

.timeline {
  position: relative;
  display: flex;
  justify-content: space-around;
  
  height: 50px;
  /* background: linear-gradient(0deg, rgba(0,31,130,1) 0%, rgba(9,9,121,1) 30%, rgba(0,151,255,1) 100%); */
  background-image: -moz-linear-gradient( 90deg, #504d48 0%, #b4ada3 100%) !important;
  background-image: -webkit-linear-gradient( 90deg, #504d48 0%, #b4ada3 100%) !important;
  margin: 10px 0;
}

.timeline_item {
  font-family: sans-serif;
  font-weight: bold;
  font-size: 30px;
  color: rgb(255 255 255 / .89 );
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  user-select: none;
}

.timeline_cursor {
  position: absolute;
  box-sizing: border-box;
  
  width: 120px;
  height: 70px;
  top: -10px;
  left: -60px;
  
  background: rgb(36 41 46 / 0.3);
  backdrop-filter: blur(1px) sepia(70%);
  
  border: 5px solid rgb(36 41 46 / 1);
  border-radius: 10px;
  
  transform-origin: center;
  --left: 178px;
  transform: translateX(var(--left));
  
}

.timeline_cursor.transition {
  transition: transform 500ms;
}

</style>
