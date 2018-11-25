import { Injectable } from '@angular/core';
import { DefaultService } from 'api/api/default.service';
import { Occurrence } from 'api/model/models';
import { from } from 'rxjs/observable/from';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsManagerService {

  public results: Observable<Occurrence[]>;
  public threshold: number = 1;
  public window: number = 3;
  public diatonic: boolean;
  public encoding: string = 'krn';
  public query: string;

  constructor(private searchService: DefaultService) { }

  public search() {
      this.results = this.searchService.search(this.encoding, this.query, this.threshold, this.window);
  }

}
