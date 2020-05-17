import { Component, OnInit } from "@angular/core";
import * as queries from "../../../graphql/queries";
import * as mutations from "../../../graphql/mutations";
import * as subscriptions from "../../../graphql/subscriptions";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo, updateTodo, deleteTodo } from "../../../graphql/mutations";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"]
})
export class ClientsComponent {
  todo = {};
  allTodos = {};

  createTodo(name, description) {
    this.todo = {
      name: name,
      description: description
    };
    API.graphql(graphqlOperation(createTodo, { input: this.todo }));
  }

  async ngOnInit() {
    this.allTodos = await API.graphql(graphqlOperation(queries.listTodos));
    console.log(this.allTodos);

    /* create a todo */
    await API.graphql(graphqlOperation(createTodo, { input: this.todo }));
  }
}
