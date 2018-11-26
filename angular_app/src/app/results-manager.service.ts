import { Injectable, OnInit } from '@angular/core';
import { DefaultService } from 'api/api/default.service';
import { Occurrence } from 'api/model/models';
import { VerovioHumdrumService } from './verovio-humdrum.service';
import { BASE_PATH } from '../../api/variables';

import { from } from 'rxjs/observable/from';
import { ajax } from 'rxjs/ajax';
import { Observable, EMPTY, of, pipe } from 'rxjs';
import { pluck, tap, elementAt } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultsManagerService implements OnInit {

  public results: any;
  public threshold: number = 1;
  public window: number = 3;
  public diatonic: boolean;
  public encoding: string = 'krn';
  public query: string;
  public count: number = 0;
  public searched: boolean = false;

  private verovioOptions = {
    inputFormat: 'xml',
  }

  constructor(
      private searchService: DefaultService,
      private verovioService: VerovioHumdrumService) { 
    this.results = [];
    this.count = 0;
  }

  ngOnInit() {
  }

  public search() {
    return this.searchService.search(this.encoding, this.query, this.threshold, this.window).pipe(
      tap((res) => {
        this.results = res;
        this.count = res.count;
        this.searched = true;
        this.getSvgExcerpts(0);
      ));
  }

  public getSvgExcerpts(pageNum: number) {
    console.log("getting xml for page ");
    console.log(pageNum);
    for (let occ of this.results.pages[pageNum].occurrences) {
      console.log(occ);
      this.searchService.getPiece(occ.piece, occ.targetNotes, 'red').pipe(
      //ajax(BASE_PATH + occ.excerptUrl).pipe(
        tap(res => {
          occ.xml = res;
          occ.svg = this.verovioService.tk.renderData(res, this.verovioOptions);
      })).subscribe(data => console.log(data));
    }
  }

/*
  public getSvgExcerpts(pageNum: number) {
    let excerpts: any = this.results.pipe(
      tap(data => console.log(data)),
      pluck("pages"),
      tap(data => console.log(data)),
      elementAt(pageNum),
      tap(data => console.log(data)),
      pluck("occurrences"),
      tap(occs => console.log(occs))
        //mergeMap(occs => from(occs).pipe(
        //map(occ => this.service.getPiece(occ['piece'], occ['targetNotes'], 'red')))
          //map(xml => verovio.render(xml))
      );
    this.svgExcerpts = excerpts;
  }
*/

}
