// TODO: Paste the Firebase initialization code first

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDvSI3sVDHoi6kRjAKmFQJBTXHHtx6Wpg8",
  authDomain: "js1-final-project.firebaseapp.com",
  databaseURL: "https://js1-final-project.firebaseio.com",
  storageBucket: "js1-final-project.appspot.com",
};

firebase.initializeApp(config);

// TODO: Your code below
var into = document.querySelector('.todo-list ul')
var state = {}

firebase.database().ref('tasks/').on('value', function(snapshot) {
  state.todos = snapshot.val();
  renderTodos(state, into)
});

function createTodo(event) {
  firebase.database().ref('tasks/').push({
    title: document.querySelector('input').value,
    done: false
  });
  document.querySelector('input').value = "";
  renderTodos(state, into);
}

function renderTodos(state, into){
  into.innerHTML = `
      ${Object.keys(state.todos).map((k)=>{
        if(!state.todos[k].done){
          return `<li id=${k}>${renderTodo(state.todos[k])}</li>`
        }
      }).join('')}
  `
}

function renderTodo(todo){
    return (
      `<label><input type='checkbox' onclick='updateTodo(this);'>${todo.title}</label>`
  )
}

function updateTodo(todo){
  if(todo.checked){
    firebase.database().ref('tasks/'+todo.parentElement.parentElement.id).update({
      done: true
    });
  }
}

delegate('body','click','button', createTodo)


// //push will add a new item to the tasks collection with the given title and done values.
// firebase.database().ref('tasks/').push({
//   title: 'Learn CRUD',
//   done: true
// });

// //Using .set() will overwrite all values at the given path tasks with the object you pass it.
// firebase.database().ref('tasks/xyz890/').set({
//   title: 'Set new data',
//   done: true
// });

// /*
// The first example uses .once(), and will get the data for the tasks key once using a Promise. This is useful for setting up your application with data that wont be changed from anywhere else.
// */
// // firebase.database().ref('tasks/').once('value').then(function(snapshot) {
// //   console.log(snapshot.val());
// // });



// The second example uses .on(), and will also get the data for tasks. It will then continue to execute the callback whenever there is a change to the data from anywhere (eg; in the console). Note: .on() does not return a Promise.

// firebase.database().ref('tasks/').on('value', function(snapshot) {
//   console.log(snapshot.val());
// });


// /*
// Instead of using .set() which will completely replace all the data at the specified path, you can use .update() to update particular keys at that path.
// */
// firebase.database().ref('tasks/xyz890').update({
//   title: 'Update a value test'
// });

// /*
// TO DELETE:
// */

// // firebase.database().ref('tasks/xyz890').set(null)
// // --- or ---

// firebase.database().ref('tasks/xyz890').remove()