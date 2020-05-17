import { Component, OnInit } from "@angular/core";
import * as queries from "../../../graphql/queries";
import { listUsers } from "../../../graphql/queries";
import * as subscriptions from "../../../graphql/subscriptions";
import * as mutations from "../../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
// import { createTodo, updateTodo, deleteTodo } from "../../../graphql/mutations";
import { createUser, updateUser, deleteUser } from "../../../graphql/mutations";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"]
})
export class ClientsComponent implements OnInit {
  user = {};
  allUsers = {};

  createUser(firstName, lastName, favouriteCity, hasVisited, gender) {
    console.log(hasVisited);

    if (hasVisited === "true") {
      hasVisited = true;
    } else {
      hasVisited = false;
    }
    console.log(hasVisited);

    this.user = {
      first_name: firstName,
      last_name: lastName,
      favourite_city: favouriteCity,
      has_visited: hasVisited,
      gender: gender
    };
    API.graphql(graphqlOperation(createUser, { input: this.user }));
    API.graphql(graphqlOperation(queries.listUsers));
    console.log(this.allUsers);
  }

  deleteUser(id) {
    const deleteUserDetails = {
      id: id
    };
    API.graphql(
      graphqlOperation(mutations.deleteUser, { input: deleteUserDetails })
    );
    API.graphql(graphqlOperation(queries.listUsers));
    console.log(this.allUsers);
  }

  async ngOnInit() {
    this.allUsers = await API.graphql(graphqlOperation(queries.listUsers));
    console.log(this.allUsers);

    this.apiService.OnCreateTodoListener.subscribe(evt => {
      const data = (evt as any).value.data.onCreateTodo;
      this.todos = [...this.todos, data];
    });
  }

  // // old code before working on extra
  // todo = {};
  // allTodos = {};
  // createTodo(name, description) {
  //   this.todo = {
  //     name: name,
  //     description: description
  //   };
  //   API.graphql(graphqlOperation(createTodo, { input: this.todo }));
  // }
  // async ngOnInit() {
  //   this.allTodos = await API.graphql(graphqlOperation(queries.listTodos));
  //   console.log(this.allTodos);
  //   /* create a todo */
  //   await API.graphql(graphqlOperation(createTodo, { input: this.todo }));
  // }
}
