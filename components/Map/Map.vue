<template>
  <div class="mx-auto pa-3" style="background: #FAFAFA">
    <GmapMap
      ref="mapRef"
      :options="options"
      class="map"
      style="height: 570px; margin: 15px"
      :center="myCoordinates"
      :zoom="zoom"

    />
  </div>
</template>
<script>
// @dragend="handleDrag"
export default {
  data() {
    return {
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      zoom: 7,
      options: {
           disableDefaultUI: true,
     }
    }
  },
  /*
        mounted() {
            // add the map to a data object
            this.$refs.mapRef.$mapPromise.then(map => this.map = map);
        },

        methods: {
            handleDrag() {
                // get center and zoom level, store in localstorage
                let center = {
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                };
                let zoom = this.map.getZoom();

                localStorage.center = JSON.stringify(center);
                localStorage.zoom = zoom;
            }

        },

  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0,
        }
      }

      return {
        lat: this.map.getCenter().lat().toFixed(4),
        lng: this.map.getCenter().lng().toFixed(4),
      }
    },
  },

  created() {
    // does the user have a saved center? use it instead of the default
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center)
    } else {
      // get user's coordinates from browser request
      thi
      this.$getLocation({})
        .then((coordinates) => {
          this.myCoordinates = coordinates
        })
        .catch((error) => alert(error))
    }

    // does the user have a saved zoom? use it instead of the default
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom)
    }
  }, */
}
</script>
<style>
.map {
  border-radius: 50px;
  border: 3px solid rgb(78, 76, 76);
  overflow: hidden;
}
</style>
