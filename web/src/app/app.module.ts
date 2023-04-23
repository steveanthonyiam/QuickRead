import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReadComponent } from './read/read.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { TagKeywordPipe } from './shared/tag.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReadComponent,
    SearchComponent,
    TagKeywordPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TagKeywordPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
