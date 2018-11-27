import { Injectable } from '@angular/core';

declare var verovio: any;

@Injectable({
  providedIn: 'root'
})
export class VerovioService {
    
  private options = {
    inputFormat: 'humdrum',
    barLineWidth: 0,
    pageMarginTop: 0,
    pageMarginBottom: 0,
    pageMarginRight: 0,
    pageMarginLeft: 0,
    noHeader: 1,
    noFooter: 1,
    noJustification: 1,
    font: "Leipzig"
  };

  tk: any;

  constructor() { 
    this.tk = new verovio.toolkit();
  }

  render(data: string) {
    return this.tk.renderData(data, this.options);
  }

}
