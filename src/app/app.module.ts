import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IgxGridModule, IgxIconModule } from 'igniteui-angular';
import { AppRoutingModule } from './app-routing.module';

import { PagingComponent, SortingComponent, FilteringComponent, EditingComponent } from './home';

import { FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { IgxPreventDocumentScrollModule } from "./directives/prevent-scroll.directive";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        IgxIconModule,
        IgxPreventDocumentScrollModule,
        BrowserAnimationsModule,
        IgxGridModule,
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