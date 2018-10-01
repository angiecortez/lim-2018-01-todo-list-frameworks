<template>
  <div id="app">
    <nav class= "navbar navbar-dark bg-primary">
      <a href="/" class="navbar-brand">VUE TODO-LIST</a>
    </nav>
    <!-- MAIN CONTENT -->
      <div class="container">
        <div class="row mt-5">
          <div class="col-sm-8">
            <div class="card">
              <div class="card-header">
                <h3>AGREGAR</h3>
              </div>
              <div class="card-body">
                <form @submit.prevent="addTodo">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="introduce tu nombre" v-model="newTodo.name">
                  </div>
                  <!-- <div class="form-group">
                    <input type="text" class="form-control" placeholder="introduce tu autor" v-model="newTodo.author">
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="introduce tu URL" v-model="newTodo.url">
                  </div> -->
                  <button type="submit" class="btn btn-primary">save</button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-sm-8 text-center">
            <div class="card">
              <div class="card-header">
                <h3>website list</h3>
              </div>
              <div class="card-body">
                <table class="table table-scriped table-bordered">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>EDITAR</th>
                      <th>ELIMINAR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="todo in todos">
                      <td>
                        <!-- <a v-bind:href="todo.url" target="_blank">{{todo.name}}</a> -->
                        <p v-bind:href="todo.url" target="_blank">{{todo.name}}</p>
                      </td>
                      <!-- <td>
                        {{todo.author}}
                      </td> -->
                      <td>
                        <button class="btn btn-success">EDITAR</button>
                      </td>
                      <td>
                        <button class="btn btn-danger" @click="eliminar(todo)">ELIMINAR</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- <div class="">
      <label></label>
      <input type="text" placeholder="introduce tus datos" v-model="name"/>
      <button>ADD</button>
    </div> -->

  </div>
</template>

<script>
import firebase from 'firebase'
import config from './config'
// import HelloWorld from './components/HelloWorld'
let app = firebase.initializeApp(config)
let db = app.database()
let todoList = db.ref('todo-list')

export default {
  name: 'App',
  firebase: {
    todos: todoList
  },
  data () {
    return {
      newTodo: {
        name: '',
        author: '',
        url: ''
      }
    }
  },
  methods: {
    addTodo () {
      // console.log(this.newTodo);
      todoList.push(this.newTodo)
      this.newTodo.name = ''
      this.newTodo.author = ''
      this.newTodo.url = ''
    },
    eliminar(todo) {
      if (confirm('Seguro que lo quieres eliminar?')) {
        todoList.child(todo['.key']).remove()
      }
    }
  }
}
</script>

<style>

</style>
