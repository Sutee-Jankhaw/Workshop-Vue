<template>
  <div>
    <v-card>
      <v-card-title>
        Your Chart
      </v-card-title>
      <v-card-text>
        <div v-if="cart.length === 0">
            ยังไม่สินค้าในตะกร้า
        </div>
        <v-list v-if="cart != []">
          <v-list-item
            v-for="item in cart"
            :key="item.productname"
          >
          <v-list-item-avatar>
              <v-img 
                :src="item.image"
                class="product-image"
                cover
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.productname }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <div>
              <v-btn
                icon
                @click="decreaseAmount(item)"
                :disabled="item.amount <= 1"
              >
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span class="mx-3">
                {{ item.amount }}
              </span>
              <v-btn
                icon
                @click="increaseAmount(item)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn
                icon
                @click="removeItem(item)"
              >
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
              </div>
              ราคา ฿{{ item.price*item.amount }}
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <div class="total-price">
            ทั้งหมด ฿{{ totalPrice }}
        </div>
        <v-btn color="success" @click="createOrderdata">Buy</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => {
        return total + (item.price * item.amount)
      }, 0)
    }
  },
  mounted() {
    this.loadCart()
  },

  methods: {
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || []
    },

    increaseAmount(item) {
      item.amount++
      this.saveCart()
    },

    decreaseAmount(item) {
      if (item.amount > 1) {
        item.amount--
        this.saveCart()
      }
    },

    removeItem(item) {
      this.cart = this.cart.filter(
        cartItem => cartItem._id !== item._id
      )
      this.saveCart()
    },

    clearCart() {
      localStorage.removeItem('cart')
      this.cart = []
    },

    saveCart() {
      localStorage.setItem(
        'cart',
        JSON.stringify(this.cart)
      )
    },

    async createOrderdata() {
      try {
        if (this.cart.length == 0) {
          alert('ยังไม่มีสินค้าในตะกร้า')
        } else {
          await this.axios.post('http://localhost:3000/api/v1/orders', this.cart)
          this.clearCart()
          alert('Order completed')
        }

      } catch(error) {
        console.log(error)
        alert(error.response.data.message)
      }
    },
  }
}
</script>

<style>
.product-image{
  width: 100px;
  height: 100px;
}
.total-price{
  margin-right: 20px;
  color: greenyellow;
}
</style>