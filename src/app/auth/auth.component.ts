import { Component, OnInit } from "@angular/core";
import { Hub } from "aws-amplify";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  constructor() {
    Hub.listen("auth", data => {
      const { payload } = data;
      this.onAuthEvent(payload);
      console.log(
        "A new auth event has happened: ",
        data.payload.data.username + " has " + data.payload.event
      );
    });
  }

  onAuthEvent(payload) {
    // ... your implementation
  }

  ngOnInit() {}
}
