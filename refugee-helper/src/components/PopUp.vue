<template>
<div class="popup">
    <div>
      <h1>{{marker.waypointTitle}}</h1>
    </div>
    <div>
      <h3 v-if="marker.waypointType === 'friendly' "> Waypoint Type: friendly</h3>
      <h3 v-else> Waypoint Type: dangerous</h3>
    </div>
    <h3>Attributes:</h3>
    <span v-for="attr in marker.waypointAttributesList" :key="attr">
      {{attr}} {{space}}
    </span>

    <div>
      <h4 > Description: {{marker.waypointDescription}} </h4>
    </div> 

    <CommentSection :id='id'/>
</div>
</template>

<script>
import CommentSection from './CommentSection.vue'


export default {
  props: ['marker', 'id'],
  components: { CommentSection },
  data() {
    return {
      space: '',
    }
  },
  
}
</script>

<style scoped>
    .popup {
        color: #141c24;
    }
</style>