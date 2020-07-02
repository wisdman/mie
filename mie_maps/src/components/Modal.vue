<template>
<el-dialog
  title="Tips"
  :visible.sync="dialogVisibleInner"
  width="80%">
  <span>{{ content }} {{id}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisibleInner = false">Закрыть</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    dialogVisible:  {type: Boolean, default: false},
    content: {type: String, default: 'This is a message'},
    id: {type: String, default: ''}
  },
  data: () => { return {
    dialogVisibleInner: false
  }},
  computed: {

  },
  methods: {

  },
  mounted: function() {
      console.log('detail')
  },
  watch: {
      dialogVisible: function(val) {
       
          this.dialogVisibleInner = val
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
