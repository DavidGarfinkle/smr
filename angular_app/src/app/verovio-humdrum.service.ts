import { Injectable } from '@angular/core';

declare var verovio: any;

@Injectable({
  providedIn: 'root'
})
export class VerovioHumdrumService {
    
  private options = {
    inputFormat: 'humdrum',
    adjustPageHeight: 1,
    pageHeight: 400,
    pageWidth: 1000,
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
