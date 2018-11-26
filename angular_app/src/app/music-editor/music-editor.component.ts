import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AceEditorComponent } from 'ng2-ace-editor';

import { VerovioHumdrumService } from '../verovio-humdrum.service';
import { DefaultService } from 'api/api/default.service';
import { ResultsManagerService } from '../results-manager.service';

@Component({
  selector: 'app-music-editor',
  templateUrl: './music-editor.component.html',
  styleUrls: ['./music-editor.component.css']
})
export class MusicEditorComponent implements AfterViewInit {

  @ViewChild('editor') editor: AceEditorComponent;
  @ViewChild('svgContainer') svgContainer: ElementRef;

  humdrumPrefix: string = 
`**kern
*clefG2
*k[]
=-
`
  humdrumInput: string = "";
  renderedHumdrum: string;
  results: string = "results";
  aceceOptions: any;
  svg: string;

  constructor(
      private verovio: VerovioHumdrumService,
      private sanitizer: DomSanitizer,
      private resultsManager: ResultsManagerService
  ) { };

  ngAfterViewInit() {
    // Initial render
    this.updateHumdrumInput('c4');

    //Register on-change event listener for the editor
    this.editor.getEditor().on('change', (delta) => {
      this.updateHumdrumInput(this.editor.value);
    });
  };

  updateHumdrumInput(val) {
    this.humdrumInput = this.humdrumPrefix + val;
    this.resultsManager.query = this.humdrumInput;
    this.renderHumdrum();
  }

  renderHumdrum() {
    this.svg = this.verovio.render(this.humdrumInput);
    this.svgContainer.nativeElement.innerHTML = this.svg;
  };


  search() {
    this.resultsManager.search().subscribe(
        data => { console.log(data) }
    );
  }

}

    /*
Vue.component("verovio-humdrum-viewer", {
    data: function() {
        return {
            input: document.getElementById('default_krn').text,
            vrv_options: {
                inputFormat: "humdrum",
                adjustPageHeight: 1,
                pageHeight: 1000,
                pageWidth: 1000,
                scale: 60,
                font: "Leipzig"
            }
        }
    },
    props: ['targetWindowFilter', 'transpositionFilter', 'diatonicOccFilter'],
    methods: {
        update: function(newstr) {
            this.input = newstr
        },
        updateProp(eventName, value){
            console.log("update " + eventName + ": ")
            console.log(value)
            this.$emit(eventName, value)
        }
    },
    computed: {
        verovioOutput: function() {
            return vrvToolkit.renderData(this.input, this.vrv_options);
        }
    },
    mounted: function(){
        var onChange = this.update;
        var editorId = "editor";
        var editorDiv = document.getElementById(editorId);

        var editor = ace.edit(editorId, {
            autoScrollEditorIntoView: true,
            value: this.input,
            minLines: 10,
            maxLines: 10
        });
        editor.session.on('change', function(delta){
            onChange(editor.getValue())
        });

        var onPropChange = this.updateProp
        $("#targetWindowSlider").slider({
            range: true,
            min: 1,
            max: 15,
            values: [1, 1],
            slide: function(event, ui){
                onPropChange('targetWindowFilter', ui.values)
            }
        });

        $("#transpositionSlider").slider({
            range: true,
            min: -12,
            max: 12,
            values: [-12, 12],
            slide: function(event, ui){
                onPropChange('transpositionFilter', ui.values)
            }
        });

        $("#diatonicOccFilter").checkboxradio();
    },

    */
