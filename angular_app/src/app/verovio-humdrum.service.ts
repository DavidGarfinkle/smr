import { Injectable } from '@angular/core';

declare var verovio: any;

@Injectable({
  providedIn: 'root'
})
export class VerovioHumdrumService {
    
  private options = {
    inputFormat: 'humdrum',
    barLineWidth: 0.1,
    pageMarginTop: 0,
    pageMarginBottom: 0,
    pageMarginRight: 0,
    pageMarginLeft: 0,
    noHeader: 1,
    noFooter: 1,
    noJustification: 1,
    scale: 60,
    font: "Leipzig"
  };

  tk: any;

  constructor() { 
    this.tk = new verovio.toolkit();
  }

  public render(data: string) {
    return this.tk.renderData(data, this.options);
  }

}
