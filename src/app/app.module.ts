import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PagingComponent, SortingComponent, FilteringComponent, EditingComponent } from './home';


@NgModule({
    imports: [
        BrowserModule,        
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PagingComponent,
        SortingComponent,
        FilteringComponent,
        EditingComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }