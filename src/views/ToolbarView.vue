<template>
  <v-app>
    <v-navigation-drawer
        app
        v-model="drawer"
        class="navigation-drawer"
      >
        <v-list>
          <v-list-item to="/">
            <v-list-item-content>
              <div class="drawer-item">
                <v-list-item-avatar>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>Home</v-list-item-title>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/chart">
            <v-list-item-content>
              <div class="drawer-item">
                  <v-list-item-avatar>
                    <v-icon>mdi-cart</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>Chart</v-list-item-title>
                  <v-badge
                    v-if="cart.length > 0"
                    color="red"
                    inline
                    :content="cart.length"
                  />
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/product">
            <v-list-item-content>
              <div class="drawer-item">
                <v-list-item-avatar>
                  <v-icon>mdi-treasure-chest-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>Manage Product</v-list-item-title>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/order">
            <v-list-item-content>
              <div class="drawer-item">
                <v-list-item-avatar>
                  <v-icon>mdi-archive</v-icon>
                </v-list-item-avatar>
                <v-list-item-title>Manage Order</v-list-item-title>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-app-bar
      color="primary"
      dark
      class="main-toolbar"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <h1>
          Vuetify Shop
        </h1>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
    data() {
        return {
          drawer: true,
          cart: []
        }
    },
    created() {
        this.user1 = localStorage.getItem('User')
        this.user2 = this.$cookies.get('User')
    },
    mounted() {
      this.loadCart()
    },
    methods: {
      loadCart() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || []
      },
    }
}
</script>

<style>
.main-toolbar {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100% !important;
  z-index: 10 !important;
}

.navigation-drawer {
  z-index: 5 !important;
  top: 55px !important;
  background-color: rgb(233, 253, 253) !important;
}

.v-main {
  padding: 54px 0 0 150px !important;
}

.drawer-item{
  display: flex;
  height: 40px;
  margin-right: 20px;
}
</style>