import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from "./theme/login/login.module";
import { MainComponent } from './theme/main/main.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {PagesModule} from "./pages/pages.module";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {ThemeModule} from "./theme/theme.module";
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    PagesModule,
    ThemeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
