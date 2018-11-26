import { Injectable, OnInit } from '@angular/core';
import { DefaultService } from 'api/api/default.service';
import { Occurrence } from 'api/model/models';

import { from } from 'rxjs/observable/from';
import { Observable, EMPTY, of, pipe } from 'rxjs';
import { pluck, tap, elementAt } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultsManagerService implements OnInit {

  public results: Observable<Occurrence[]>;
  public svgExcerpts: Observable<String[]>;
  public threshold: number = 1;
  public window: number = 3;
  public diatonic: boolean;
  public encoding: string = 'krn';
  public query: string;
  public count: Observable<number>;

  constructor(private searchService: DefaultService) { 
    this.results = EMPTY;
    this.svgExcerpts = EMPTY;
    this.count = of(0);
  }

  ngOnInit() {
  }

  public search() {
      this.results = from(this.searchService.search(this.encoding, this.query, this.threshold, this.window));
      this.count = this.results.pipe( pluck('count') );
      this.getSvgExcerpts(1);
  }

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

}
