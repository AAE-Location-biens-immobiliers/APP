<template>
  <div v-html="view" />
</template>

<script>
export default {
  name: "Reservations",
  async asyncData(ctx) {
    let view;
    try {
      view = (await ctx.$axios.get('/reservations/vue', { params: { id: ctx.store.getters['session/getUser'].id }})).data
    } catch (e) {
      ctx.error({ statusCode: 404, message: 'Page not found' })
    }
    return { view }
  }
}
</script>

<style scoped>

</style>
