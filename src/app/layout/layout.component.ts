import { Component, OnInit } from '@angular/core';
import 'node_modules/jquery/dist/jquery.min.js';
import 'node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import 'node_modules/bootstrap/dist/js/bootstrap.js';
import 'node_modules/@popperjs/core/dist/umd/popper.min.js';
import 'node_modules/@amcharts/amcharts4/core.js';
import 'node_modules/@amcharts/amcharts4/charts.js';
import 'node_modules/chart.js/dist/Chart.min.js';
import 'node_modules/@amcharts/amcharts4/themes/animated.js';
import 'src/assets/js/chart.js';
import 'src/assets/js/main.js';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
