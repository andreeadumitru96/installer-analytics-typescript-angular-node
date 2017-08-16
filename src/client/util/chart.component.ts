import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as d3Shape from "d3-shape";
import { ChartService } from './chart.service';
import { Datum } from '../data'; 

@Component({
    moduleId: module.id,
    templateUrl: 'chart.html',
    selector: 'chart'
})
export class ChartComponent {

    data: Datum[];
    constructor(private chartService: ChartService) { }
    getData(): void {
     this.chartService.getData()
      .then(data => {
        this.data = data;
      });
  }
    
}