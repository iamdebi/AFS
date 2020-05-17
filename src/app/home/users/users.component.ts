import { Component, OnInit } from "@angular/core";
import json from "../../../assets/mock_data.json";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  listData = json;

  // name: string;
  // sortOrder?: NzTableSortOrder;
  // sortFn?: NzTableSortFn;
  // listOfFilter?: NzTableFilterList;
  // filterFn?: NzTableFilterFn;
  // filterMultiple?: boolean;
  // sortDirections?: NzTableSortOrder[];

  constructor() {
    console.log(json);
    console.log(this.listData);
  }

  ngOnInit() {}
}
