import { Routes } from "@angular/router";

import { HomeComponent } from './home';
import { LoginComponent, RegisterComponent } from './account';
import { authGuard } from './_helpers';
import { ViewPostComponent } from "./post/view-post";
import { UserProfileComponent } from "./user-profile";
import { CreatePostComponent } from "./post/create-post";


export const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'view-post/:id', component: ViewPostComponent },
    { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [authGuard] },
    { path: 'list-subreddits', component: ListSubredditsComponent },
    { path: 'create-post', component: CreatePostComponent, canActivate: [authGuard] },
    { path: 'create-subreddit', component: CreateSubredditComponent, canActivate: [authGuard] },
    { path: 'account/login', component: LoginComponent },
    { path: 'account/register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];