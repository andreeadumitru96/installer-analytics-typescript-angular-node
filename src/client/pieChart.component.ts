import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BarChartService } from './barChart.service';
import { ChartComponent } from './util/chart.component';

import { IBarData } from '../server/types/IBarData';

@Component({
  moduleId: module.id,
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['pieChart.component.css']
})

export class PieChartComponent implements OnInit {
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private data: IBarData[];
  private radius: number;
  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;


  constructor(
    private _barChartService: BarChartService
  ) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._barChartService.getBarData().subscribe(
      data => {
        this.data = data;
        this.initSvg()
        this.drawPie();
      },
      err => console.error(err)
    );
  }

  private initSvg() {
    this.color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    this.arc = d3.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
    this.labelArc = d3.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
    this.pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value);
    this.svg = d3.select("svg")
      .append("g")
      .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");;
  }

  private drawPie() {
    let g = this.svg.selectAll(".arc")
      .data(this.pie(this.data))
      .enter().append("g")
      .attr("class", "arc");
    g.append("path").attr("d", this.arc)
      .style("fill", (d: any) => this.color(d.data.prop));
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
      .attr("dy", ".35em")
      .text((d: any) => d.data.prop);
  }

}