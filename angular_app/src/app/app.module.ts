import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { ApiModule } from 'api.module';
import { BASE_PATH } from 'api/variables';

import { AppComponent } from './app.component';
import { ExcerptComponent } from './excerpt/excerpt.component';
import { MusicEditorComponent } from './music-editor/music-editor.component';
import { ResultsPaginationComponent } from './results-pagination/results-pagination.component';
import { SearchParametersComponent } from './search-parameters/search-parameters.component';

@NgModule({
  declarations: [
    AppComponent,
    ExcerptComponent,
    MusicEditorComponent,
    ResultsPaginationComponent,
    SearchParametersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
	NgxPaginationModule,
    MatButtonModule,
    HttpClientModule,
    NgbModule,
    AceEditorModule,
    ApiModule
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: "http://132.206.14.238:8000"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
