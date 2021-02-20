import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { CountryDetailComponent } from "./country-detail/country-detail.component";
import { CountryListComponent } from "./country-list/country-list.component";

const routes: Routes = [
    { path: '', component: CountryListComponent },
    { path: 'country/:id', component: CountryDetailComponent,  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}