import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from '@app/app.component';
import { jwtInterceptor, errorInterceptor, TokenInterceptor } from '@app/_helpers'

import { APP_ROUTES } from '@app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(APP_ROUTES),
        provideHttpClient(
            withInterceptors([
                jwtInterceptor, 
                errorInterceptor,               

            ])
        ),  
        HttpClientModule,      
            {
              provide: HTTP_INTERCEPTORS,
              useClass: TokenInterceptor,
              multi: true
            }
          
    ]
});