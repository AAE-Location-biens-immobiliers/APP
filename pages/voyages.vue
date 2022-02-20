<template>
  <v-container>
    <v-card>
      <v-card-title>Mes voyages</v-card-title>
      <v-list>
        <v-list-item
          v-for="(reservation, i) in reservations"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="reservation.idAnnonce.description" />
            <v-list-item-subtitle>
              Du {{ reservation.dateReservationDebut.split('-').reverse().join('-') }} au {{ reservation.dateReservationFin.split('-').reverse().join('-') }}
            </v-list-item-subtitle>
            <v-divider />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { Reservation } from "@/models/reservation";

export default {
  name: "Voyages",
  async asyncData(ctx) {

    let reservations;
    try {
      reservations = (await ctx.$axios('/reservations', {
        params: {
          id: ctx.store.getters["session/getUser"].id
        }
      })).data
    } catch (e) { reservations = [] }

    return { reservations: reservations.map(r => new Reservation(r)) }
  }
};
</script>

<style scoped>

</style>
