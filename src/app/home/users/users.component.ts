import { Component, OnInit } from "@angular/core";
import json from "../../../assets/mock_data.json";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  listData: {} = json;

  constructor() {
    console.log(json);
    console.log(this.listData);
  }

  ngOnInit() {}
}
