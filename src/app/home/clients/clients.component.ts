import { Component, OnInit } from "@angular/core";
import * as queries from "../../../graphql/queries";
import { listUsers } from "../../../graphql/queries";
import * as subscriptions from "../../../graphql/subscriptions";
import * as mutations from "../../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
// import { createTodo, updateTodo, deleteTodo } from "../../../graphql/mutations";
import { createUser, updateUser, deleteUser } from "../../../graphql/mutations";
import { onCreateUser } from "../../../graphql/subscriptions";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"]
})
export class ClientsComponent implements OnInit {
  user = {};
  allUsers = {};
  isVisible = false;

  createUser(firstName, lastName, favouriteCity, hasVisited, gender) {
    if (hasVisited === "true") {
      hasVisited = true;
    } else {
      hasVisited = false;
    }
    this.user = {
      first_name: firstName,
      last_name: lastName,
      favourite_city: favouriteCity,
      has_visited: hasVisited,
      gender: gender
    };
    API.graphql(graphqlOperation(createUser, { input: this.user }));
    API.graphql(graphqlOperation(queries.listUsers));
    this.handleOk();
  }

  deleteUser(id) {
    const deleteUserDetails = {
      id: id
    };
    API.graphql(
      graphqlOperation(mutations.deleteUser, { input: deleteUserDetails })
    );
    API.graphql(graphqlOperation(queries.getUser));
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log("Button ok clicked!");
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
  }

  async ngOnInit() {
    this.allUsers = await API.graphql(graphqlOperation(queries.listUsers));

    let subscription;

    (async () => {
      subscription = client.subscribe({ query: gql(onCreateUser) }).subscribe({
        next: data => {
          console.log(data.data.onCreateTodo);
        },
        error: error => {
          console.warn(error);
        }
      });
    })();

    // const subscription = API.graphql(
    //   graphqlOperation(subscriptions.onCreateUser)
    // ).subscribe({
    //   next: todoData => console.log(todoData)
    // });

    // API.graphql(
    //   graphqlOperation(subscriptions.onCreateUser)
    // ).OnCreateTodoListener.subscribe(evt => {
    //   const data = (evt as any).value.data.onCreateTodo;
    //   this.allUsers = [...this.allUsers, data];
    // });
    // subscription.unsubscribe();
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
  // }
}
