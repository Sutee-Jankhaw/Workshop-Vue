<template>
  <div>
    <h1>Hello Word</h1>
    <testprops :name="admin"/>
    <v-btn color="red" @click="callAlert()">Alert</v-btn>
    <h1>{{ User.name }}</h1>
    <h1>{{ User.age }}</h1>
    <v-btn color="success" @click="show = !show">Switch</v-btn>
    <div v-if="show">
      <cardimg/>
    </div>
    <v-row>
      <v-col cols="3" v-for="( item,index ) in items" :key="index">
    <div>
    <v-card width="350">
      <v-img :src="item.image"></v-img>
      <v-card-title primary-title>
        {{ item.message }}
      </v-card-title>
      <v-card-actions>
        <v-btn color="success" @click="callAlertParam(item.message)">alertparam</v-btn>
      </v-card-actions>
    </v-card>
    </div>
    </v-col>
        <v-col cols="12">
            <h1>{{ value1 }}</h1>
            <v-text-field
                name="value1"
                label="value1"
                id="value1"
                v-model="value1"
            ></v-text-field>
            <v-btn color="success" @click="setLocalStorage(value1)">set</v-btn>
            <v-btn color="success" @click="removeLocalStorage(value1)">remove</v-btn>
        </v-col>
    </v-row>
  </div>
</template>

<script>
import {EventBus } from '@/EventBus'
import cardimg from '../components/CardImg.vue'
import testprops  from '../components/TestProps.vue'
export default {
  components: { 
    cardimg,
    testprops 
  },
  data() {
    return {
        value1: '',
        admin: 'Frank',
        User: {
          name: 'John',
          age: 25
        },
        show: false,
        items:[
            { message:'Foo', image:'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png?utm_source=th.wikipedia.org&utm_campaign=index&utm_content=original' },
            { message:'Bar', image:'https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg'},
            { message:'Bar', image:'https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg'},
            { message:'Foo', image:'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png?utm_source=th.wikipedia.org&utm_campaign=index&utm_content=original' },
            { message:'Bar', image:'https://static.vecteezy.com/system/resources/thumbnails/057/068/323/small/single-fresh-red-strawberry-on-table-green-background-food-fruit-sweet-macro-juicy-plant-image-photo.jpg'},
        ]
    }
  },
  mounted() {
    EventBus.$on('CallAlertMain', this.callAlert)
  },
  beforeDestroy() {
    EventBus.$off('CallAlertMain', this.callAlert)
  },
  methods: {
    callAlert() {
        alert("Alert")
    },
    callAlertParam(item){
        alert(item)
    },
    setLocalStorage() {
      localStorage.setItem('User', this.value1)
      this.$cookies.set('User', this.value1, '60s')
    },
    removeLocalStorage() {
      localStorage.removeItem('User', this.value1)
    },
  }
}
</script>

<style>

</style>