import { Component, OnInit } from "@angular/core";
import json from "../../../assets/mock_data.json";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  constructor() {
    console.log("Reading local json files");
    console.log(json);
  }

  ngOnInit() {}
}
