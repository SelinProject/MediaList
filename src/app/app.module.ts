import { NgModule, enableProdMode } from '@angular/core';

enableProdMode();
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MediaComponent } from './Component/media.component';
//Directive
import { SearchItemComponent } from './Directive/search/search.item';
import { PagerItemComponent } from './Directive/pager/pager.item';

//Pipe
import { SearchPipe } from './Filter/search/search.pipe';


@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent, MediaComponent, SearchPipe, SearchItemComponent, PagerItemComponent],
  entryComponents: [SearchItemComponent, PagerItemComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
