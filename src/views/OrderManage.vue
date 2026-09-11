<template>
    <v-app>
  <div>
    <h1>รายการคำสั่งซื้อ</h1>
    <v-row>
      <v-col cols="12" v-for="order in orderdata" :key="order._id">
        <div>
            <v-card>
                <v-list>
                    <v-list-item
                      v-for="product in order.products"
                      :key="product._id"
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                Product: {{ product.productname }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                Quantity: {{ product.quantity }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                Total Price: ฿{{ product.totalPrice }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                สั่งซื้อเมื่อ {{ order.createdAt }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-card-actions>
                    <v-spacer/>
                    <!-- <v-btn color="success" @click="editItem(order)">
                      Edit
                    </v-btn> -->
                    <v-btn color="error" @click="deleteItem(order)">
                      Delete
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
            orderdata:[],
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
        newItem() {
            this.id = ''
            this.postdata = {...this.postdefault}
            this.dialogedit = true
        },
        editItem(item) {
            this.id = item._id
            this.postdata = {...item}
            this.dialogedit = true
        },
        closeItem() {
            this.id = ''
            this.postdata = {...this.postdefault}
            this.dialogedit = false
        },
        saveSelect() {
            if(this.id != '') {
                this.savePutdata()
            } else {
                this.savePostdata()
            }
        },
        getData() {
            this.axios.get('http://localhost:3000/api/v1/orders').then((response) => {
                this.orderdata = response.data.data
            })
        },
        async savePostdata() {
            try {
                const {data} = await this.axios.post('', this.postdata)
                console.log(data);
                alert('save completed')
                this.getData()
                this.closeItem()
            } catch(error) {
                console.log(error)
                alert(error)
            }
        },
        async savePutdata() {
            try {
                const {data} = await this.axios.put(''+this.id, this.postdata)
                console.log(data);
                alert('updated completed')
                this.getData()
                this.closeItem()
            } catch(error) {
                console.log(error)
                alert(error)
            }
        },
        async deleteItem(item) {
            if(confirm('Delete This Order?'))
            try {
                await this.axios.delete('http://localhost:3000/api/v1/orders/'+item._id)
                alert('deleted completed')
                this.getData()
                this.closeItem()
            } catch(error) {
                console.log(error)
                alert(error)
            }
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
</style>