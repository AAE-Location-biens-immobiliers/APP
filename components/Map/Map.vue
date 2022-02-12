<template>
  <GmapMap
    ref="mapRef"
    class="map"
    style="height: 590px; margin: 15px"
    :center="myCoordinates"
    :zoom="zoom"
    :options="options"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m"
      @click="center=m"
    ></gmap-marker>
  </GmapMap>
</template>
<script>
/*
<div>
    <h1>Map coordinates:</h1>
    <p>{{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longitude</p>
  </div>
 */

export default {
  data() {
    return {
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0
      },
      zoom: 13,
      options: {
        disableDefaultUI: true,
      },
      markers: [{
        lat: 48.40607525128705,
        lng: -71.05631971542435,
        label: "test"
      }],
    }
  },

  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0
        };
      }
      return {
        lat: this.map.getCenter().lat().toFixed(4),
        lng: this.map.getCenter().lng().toFixed(4)
      }
    }
  },

  created() {
    // does the user have a saved center? use it instead of the default
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      // get user's coordinates from browser request
      this.$getLocation({})
        .then(coordinates => {
          this.myCoordinates = coordinates;
        })
        .catch(error => alert(error));
    }
    // does the user have a saved zoom? use it instead of the default
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }
  },

  mounted() {
    // add the map to a data object
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.map = map
    });
  },
  methods: {
    handleDrag() {
      // get center and zoom level, store in localstorage
      const center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      };
      const zoom = this.map.getZoom();
      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    }
  },

}
</script>
<style>
.map {
  border-radius: 50px;
  border: 2px solid #BDBDBD;
  overflow: hidden;
  margin: 15px;
}
</style>
