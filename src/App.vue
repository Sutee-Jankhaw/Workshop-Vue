<template>
  <v-main>
    <router-view/>
  </v-main>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    cart() {
      return this.$store.state.cart
    }
  },
};
</script>
