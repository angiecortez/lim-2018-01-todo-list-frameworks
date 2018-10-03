
<template>
  <div id="app" class="container">
    <h1 align="center" class="title is-1">COCINEMOS</h1>
      <form>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="Los ingredientes son ..." v-model="name">
          </div>
          <!-- <div> -->
            <i class="glyphicon glyphicon-plus mr-5" @click="submitName()"></i>
            <i class="glyphicon glyphicon-repeat mr-5" @click="refresh()"></i>
          <!-- </div> -->
        </div>
      </form>

    <div>
      <ul>
        <li v-for="personName of names" v-bind:key="personName['.key']">
          <div class="row" v-if="!personName.edit">
            <div class="col mt-5" v-bind:class="{ 'check': item.state, 'c-white': !item.state	}">
              <p>{{ personName.name }} </p>
            </div>
            <i class="glyphicon glyphicon-ok mt-5 mr-3" aria-hidden="true"></i>
            <i class="glyphicon glyphicon-remove mt-5 mr-3" @click="removePerson(personName['.key'])"></i>
            <i class="glyphicon glyphicon-pencil mt-5" @click="editPerson(personName['.key'])"></i>

          </div>
          <div class="row" v-else>
            <div class="col">
              <input type="text" class="form-control mt-5" v-model="personName.name">
            </div>
            <i class="glyphicon glyphicon-plus mt-5 mr-5" @click="saveEdit(personName)"></i>
            <i class="glyphicon glyphicon-remove mt-5 mr-3" @click="cancelEdit(personName['.key'])"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
import { namesRef } from '../firebase'
export default {
  name: 'app',
  data () {
    return {
      name: '',
      check: ''
    }
  },
  methods:{
    submitName(){
      namesRef.push({name : this.name
                    ,edit : false});
      this.name = '';
    },
    refresh(){
      this.name = ''
    },
    removePerson(key){
      namesRef.child(key).remove();
    },
    editPerson(key){
      namesRef.child(key).update({
        edit: true,
      })
    },
    saveEdit(person){
      const key = person['.key'];
      namesRef.child(key).set({
        name: person.name,
        edit: false
      });
    },
    cancelEdit(key){
      namesRef.child(key).update({
        edit: false
      });
    }
  },
  firebase:{
    names : namesRef
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  margin-right: 150px;
  margin-top: 20px;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
