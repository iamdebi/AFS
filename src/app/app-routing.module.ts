import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./home/users/users.component";
import { ClientsComponent } from "./home/clients/clients.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "",
        children: [
          {
            path: "users",
            component: UsersComponent,
            canActivate: [AuthGuard]
          },
          {
            path: "clients",
            component: ClientsComponent,
            canActivate: [AuthGuard]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
