import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagingComponent, SortingComponent, FilteringComponent, EditingComponent } from './home';

const routes: Routes = [
    { path: '', component: PagingComponent },
    { path: 'grid/sorting', component: SortingComponent },
    { path: 'grid/filtering', component: FilteringComponent },
    { path: 'grid/editing', component: EditingComponent },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }