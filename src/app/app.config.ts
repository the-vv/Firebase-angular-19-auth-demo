import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDSnzUteB7NVoY65I2CJNzktqmrnzfgIM8",
      authDomain: "esignature-validation.firebaseapp.com",
      projectId: "esignature-validation",
      storageBucket: "esignature-validation.firebasestorage.app",
      messagingSenderId: "430089803523",
      appId: "1:430089803523:web:577d0f15d8e8dfd9ad3b36",
      measurementId: "G-1RBEX8EN84"
    })),
    provideAuth(() => getAuth())
  ]
};
