<template>
  <v-menu
    :value="showMenu"
    offset-y
    :position-x="x"
    :position-y="y"
    absolute
    :close-on-content-click="false"
  >
    <Destination
      v-if="dataType === 'String'"
      @submit-destination="send"
    />
    <Date
      v-if="dataType.includes('Date')"
      @submit-date="send"
    />
    <Voyageurs
      v-if="dataType === 'Object'"
      @submit-object="send"
      />
  </v-menu>
</template>

<script>
import Destination from "~/components/layout/Forms/Destination";
import Date from "~/components/layout/Forms/Date";
import Voyageurs from "~/components/layout/Forms/Voyageurs";

export default {
  name: "CriteriaMenu",
  components: {
    Voyageurs,
    Destination,
    Date
  },
  model: {
    prop: 'showMenu',
    event: 'change'
  },
  props: {
    showMenu: Boolean,
    dataType: {
      type: String,
      default: ''
    },
    x: {
      type: Number,
      default() {
        return 0
      }
    },
    y: {
      type: Number,
      default() {
        return 0
      }
    },
  },
  methods: {
    send(data) {
      this.$emit('submit-data', data)
      this.$emit('change', false)
    }
  }
}
</script>

<style scoped lang="scss">
.v-menu__content {
  background-color: white;
}
</style>
