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
      <v-card-actions>
        ฿{{ item.price }}
        <v-spacer/>
        <v-btn
          icon
          @click="addToCart(item)"
        >
            <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
        <!-- <v-btn color="success" @click="editItem(item)">
            Edit
        </v-btn>
        <v-btn color="error" @click="deleteItem(item)">
            Delete
        </v-btn> -->
      </v-card-actions>
    </v-card>
    </div>
    </v-col>
    </v-row>
    <v-dialog
        v-model="dialogedit"
        max-width="500px"
    >
        <v-card>
            <v-card-title primary-title>
                {{savemode}}
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            name="productname"
                            label="productname"
                            v-model="postdata.productname"
                        >   
                        </v-text-field>
                        <v-text-field
                            name="price"
                            label="price"
                            type="number"
                            v-model="postdata.price"
                        >   
                        </v-text-field>
                        <v-text-field
                            name="stock"
                            label="stock"
                            type="number"
                            v-model="postdata.stock"
                        >   
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>       
                <v-spacer/>
                <v-btn color="info" @click="saveSelect()">
                    Save
                </v-btn>
                <v-btn color="error" @click="closeItem()">
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
            this.axios.get('http://localhost:3000/api/v1/products').then((response) => {
                this.apidata = response.data.data
            })
        },
        async savePostdata() {
            try {
                const {data} = await this.axios.post('http://localhost:3000/api/v1/products', this.postdata)
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
                const {data} = await this.axios.put('http://localhost:3000/api/v1/products/'+this.id, this.postdata)
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
            if(confirm('Delete '+item.productname))
            try {
                const {data} = await this.axios.delete('http://localhost:3000/api/v1/products/'+item._id)
                console.log(data);
                alert('deleted completed')
                this.getData()
                this.closeItem()
            } catch(error) {
                console.log(error)
                alert(error)
            }
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

            window.dispatchEvent(new Event('cart-updated'))
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