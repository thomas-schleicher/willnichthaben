import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideNativeDateAdapter} from '@angular/material/core';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {urlInterceptor} from './interceptors/url.interceptor';
import {credentialsInterceptor} from './interceptors/credentials.interceptor';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([credentialsInterceptor, urlInterceptor])),
    provideAnimations(),
    provideNativeDateAdapter(),
    importProvidersFrom(CommonModule,FormsModule)
  ]
};
