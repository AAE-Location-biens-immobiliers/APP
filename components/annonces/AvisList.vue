<template>
  <v-list three-line>
    <v-subheader>
      Avis
    </v-subheader>
    <v-list-item-group v-for="(item, index) in avis" :key="index">

      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="item.idWriter && item.idWriter.photo ? item.idWriter.photo : require('@/static/empty.jpg')"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.idWriter.prenom }} {{ item.idWriter.nom }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.commentaire }}
          </v-list-item-subtitle>
          <v-rating
            readonly
            :value="item.etoile"
            hover
            length="5"
            size="20"
          />
        </v-list-item-content>

        <v-list-item-action>

          <v-tooltip bottom>
            <template #activator="{ attrs, on }">
              <v-btn
                v-if="item.idWriter.id === $store.getters['session/getUser'].id"
                small fab rounded color="error"
                class="my-auto"
                v-bind="attrs" v-on="on"
                @click="$emit('supprimer', index)"
              >
                <v-icon class="delete">
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Effacer la recherche</span>
          </v-tooltip>

        </v-list-item-action>
      </v-list-item>

      <v-divider />

    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "AvisList",
  props: {
    avis: {
      type: Array,
      default: () => []
    }
  },
};
</script>

<style scoped lang="scss">
.delete:hover {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  perspective: 1000px;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(2px, 0, 0);
  }
}
</style>
