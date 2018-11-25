import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResultsManagerService } from '../results-manager.service';
import { DefaultService } from 'api/api/default.service';
import { VerovioHumdrumService } from '../verovio-humdrum.service';

@Component({
  selector: 'app-results-pagination',
  templateUrl: './results-pagination.component.html',
  styleUrls: ['./results-pagination.component.css']
})
export class ResultsPaginationComponent {

  p: number = 1;
  collection: any[];  
  
  constructor(
	private resultsManager: ResultsManagerService,
    private service: DefaultService,
    private verovio: VerovioHumdrumService
  ) { }

  getExcerpt(item: any) { 
    console.log(item);
    let svgObservable: any = this.service.getPiece(item.piece, item.targetNotes, 'red').pipe(
      map(res => this.verovio.render(res)));

    return svgObservable
  }
/*
  getPage(page: number) {
    this.loading = true;
    this.asyncExcerpt = service.getPiece(this.meals, page)
      .do(res => {
        this.total = res.total;
        this.p = page;
        this.loading = false;
      })
    .map(res => res.items);
  }
*/

}
