import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuessWordsComponent } from './components/guess-words/guess-words.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MaterialModule } from './material.module';
import { BaseURLToken } from './models/Tokens/BaseURLToken';
import { SnackbarService } from './Services/snackbar.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TopbarComponent,
    GuessWordsComponent,
    HttpClientModule,
  ],
  providers: [
    {
      provide: BaseURLToken,
      useValue: 'https://localhost:44396',
    },
    SnackbarService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
