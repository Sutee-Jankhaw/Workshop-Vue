<template>
    <v-app>
  <div>
    <h1>รายการสินค้า</h1>
    <v-row>
      <v-col cols="3" v-for="( item,index ) in apidata" :key="index">
    <div>
    <v-card width="350">
      <v-img 
        :src="item.image"
        width="350"
        height="300"
      ></v-img>
      <v-card-title primary-title>
        {{ item.productname }}
      </v-card-title>
      <v-card-subtitle class="description">
        {{ item.description }}
      </v-card-subtitle>
      <v-card-subtitle :class="{ 'out-stock': item.stock <= 0 }">
        <h4>สินค้าคงเหลือ</h4>{{ item.stock }}
      </v-card-subtitle>
      <v-card-actions>
        ฿{{ item.price }}
        <v-spacer/>
        <v-btn
          icon
          :disabled="item.stock === 0"
          @click="addToCart(item)"
        >
            <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    </div>
    </v-col>
    </v-row>
  </div>
  </v-app>
</template>

<script>
export default {
    data() {
        return {
            apidata:[],
            id:'',
            postdata: {
                productname:'',
                price:0,
                stock:0
            },
            postdefault: {
                productname:'',
                price:0,
                stock:0
            },
            dialogedit:false
        }
    },
    computed: {
        savemode() {
            return this.id === '' ? 'NewItem' : 'EditItem'
        }
    }, 
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.axios.get('http://localhost:3000/api/v1/products').then((response) => {
                this.apidata = response.data.data
            })
        },
        addToCart(item) {
            let cart = JSON.parse(localStorage.getItem('cart')) || []

            const existingItem = cart.find(
                cartItem => cartItem._id === item._id
            )

            if (existingItem) {
                existingItem.amount++
            } else {
                cart.push({
                ...item,
                amount: 1
                })
            }

            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
}
</script>

<style>
.description {
  height: 48px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.out-stock{
    color: red !important;
}
</style>