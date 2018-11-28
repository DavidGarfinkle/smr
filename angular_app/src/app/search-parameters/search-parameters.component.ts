import { Component, OnInit } from '@angular/core';

import { ResultsManagerService, Transposition, Threshold } from '../results-manager.service';

@Component({
  selector: 'app-search-parameters',
  templateUrl: './search-parameters.component.html',
  styleUrls: ['./search-parameters.component.css']
})
export class SearchParametersComponent implements OnInit {

  Transposition = Transposition;
  Threshold = Threshold;

  constructor(private resultsManager: ResultsManagerService) { }

  ngOnInit() {
  }

}
