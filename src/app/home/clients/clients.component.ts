import { Component, OnInit } from "@angular/core";
import * as queries from "../../../graphql/queries";
import * as mutations from "../../../graphql/mutations";
import * as subscriptions from "../../../graphql/subscriptions";
import { API, graphqlOperation } from "aws-amplify";
import { APIService } from "../../API.service";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"]
})
export class ClientsComponent implements OnInit {
  allTodos: Array<any>;

  constructor(private apiService: APIService) {}

  createTodo(name, description) {
    this.apiService.CreateTodo({
      name: name,
      description: description
    });
  }

  async ngOnInit() {
    this.apiService.ListTodos().then(evt => {
      this.allTodos = evt.items;
    });

    this.apiService.OnCreateTodoListener.subscribe(evt => {
      const data = (evt as any).value.data.onCreateTodo;
      this.allTodos = [...this.allTodos, data];
    });
  }
}
