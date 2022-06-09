<template>
  <div id="app">
    <div>
      <SideBar :markers="this.markers" :menuExpanded="menuExpanded" @update="menuExpanded = $event;"/>
    </div>
    <div>
      <GoogleMap 
      :menuExpanded="menuExpanded" 
      :options="this.options"
      :markers="this.markers"
      :location="this.location"
      :cntr="this.location"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GoogleMap from './components/GoogleMap.vue'
import SideBar from './components/SideBar.vue'

export default {
  name: 'App',
  components: {
    GoogleMap,
    SideBar
},

  created() {
    axios.get('http://localhost:6001/options')
    .then(response => {
      this.options.styles = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })

    axios.get('http://localhost:6001/markers')
    .then(response => {
      this.markers = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })

    if(!("geolocation" in navigator)) {
      console.log('Geolocation is not available.');
    } else {
      navigator.geolocation.getCurrentPosition(pos => {
        this.location = pos;
      }, e => {
        this.errors.push(e)
      })
    }
  },

  data() {
    return {
      menuExpanded: false,
      location: null,
      options: {
        fullscreenControl: false,
        mapTypeControl: false,
        styles: null,
      },
      markers: null,
    }
  },
}
</script>

<style>
#app {
  font-family: Calibri, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b28860;
  text-align: left;
  
}
</style>
