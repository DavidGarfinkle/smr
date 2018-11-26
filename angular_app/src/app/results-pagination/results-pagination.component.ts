import { Component, OnInit } from '@angular/core';

import { pipe, Observable } from 'rxjs';
import { map, mergeMap, elementAt, pluck, tap } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';

import { ResultsManagerService } from '../results-manager.service';
import { DefaultService } from 'api/api/default.service';
import { VerovioHumdrumService } from '../verovio-humdrum.service';

@Component({
  selector: 'app-results-pagination',
  templateUrl: './results-pagination.component.html',
  styleUrls: ['./results-pagination.component.css']
})
export class ResultsPaginationComponent implements OnInit {

  p: number = 1;
  pageSize: number = 10;
  collection: any;  
  svgExcerpts: any;
  count: Observable<number>;
  loading: boolean = false;
  
  constructor(
	private resultsManager: ResultsManagerService,
    private service: DefaultService,
    private verovio: VerovioHumdrumService
  ) { }


  ngOnInit() {
    this.svgExcerpts = this.resultsManager.svgExcerpts;
    this.count = this.resultsManager.count;
  }
/*
  getExcerpt(item: any) { 
    console.log(item);
    let svgObservable: any = this.service.getPiece(item.piece, item.targetNotes, 'red').pipe(
      map(res => this.verovio.render(res)));

    return svgObservable
  }

  getSvgExcerpts(pageNum: number) {
    let excerpts: any = this.resultsManager.results.pipe(
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
    return excerpts;
  }
*/

  pageChange(pageNum: number) {
    this.p = pageNum;
    this.resultsManager.getSvgExcerpts(pageNum);
  }
}