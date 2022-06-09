<template>
  <div>
    <RightClickMenu v-if="rightClickPressed" 
    :x=mouseRightClickX :y=mouseRightClickY 
    :lat=latitude :lng=longitude />
    <div id="map" @contextmenu.prevent="handleRightClick" @mousedown = "handleClick" >
      <GMapMap
        ref="myMapRef"
        :center="center"
        :zoom="12"
        :options="options"
        map-type-id="terrain"
        style="height: 100vh;"
        :rightclick="true"
        @rightclick="handleMapRightClick"
      >
        <GMapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          @click="openMarker(m.id)"
        >
          <GMapCircle
            :radius="m.waypointDangerouseRadius"
            :center="{ lat: m.position.lat, lng: m.position.lng}"
            :options="circleOptions"
          />

          <GMapInfoWindow
            :closeclick="true"
            @closeclick="openMarker(null)"
            :opened="openedMarkerID === m.id"
            :options=" {
              maxWidth: 227,
              maxHeight: 294.154,}" 
          >
            <PopUp :marker="m" :id="m.id"/>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>
    </div>

  </div>
</template>

<script>
import PopUp from './PopUp.vue'
import RightClickMenu from './RightClickMenu.vue';

export default {
  components: {
    PopUp,
    RightClickMenu
},

  props: ['options', 'markers', 'menuExpanded', 'location'],

  
  setup() {
    return {
       center: { lat: 44.4432384, lng: 26.0931584 }
    }
  },

  data() {
    return {
      circleOptions: {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      },
      openedMarkerID: null,
      rightClickPressed: false,
      mouseRightClickX : null,
      mouseRightClickY : null,
      latitude: null,
      longitude: null,
      doneSetupPan : false,
    };
  },

  methods: {
    openMarker(id) {
      this.openedMarkerID = this.openedMarkerID === id ? null : id;
    },

    handleMapRightClick(event){
      this.latitude = event.latLng.lat()
      this.longitude = event.latLng.lng()
    },

    handleRightClick(event){
      this.rightClickPressed = true
      this.mouseRightClickX = event.clientX
      this.mouseRightClickY = event.clientY
    },

    handleClick(){
      this.rightClickPressed = false
    },
  },

  computed: {
    isUserAdmin(){
      return this.$store.getters.getUser
    }
  },

  watch: {
    location(state) {
      if(!this.doneSetupPan){
        this.doneSetupPan = true
        this.center.lat = state.coords.latitude
        this.center.lng = state.coords.longitude
      }
    },
  }

};
</script>

<style scoped>

#map {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: -1;
}

</style>
