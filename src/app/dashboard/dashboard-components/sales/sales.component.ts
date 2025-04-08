import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexFill,
  ApexXAxis,
  ApexGrid
} from 'ng-apexcharts';

export interface activeusercardChartOptions {
  series: number[]; // Cambiado para gráficos de pastel
  chart: ApexChart;
  labels: string[];  // Etiquetas para el gráfico de pastel
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  fill: ApexFill;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent {
  @ViewChild("activeusercardchart") chart1: ChartComponent = Object.create(null);
  public activeusercardChartOptions!: Partial<activeusercardChartOptions> | any;

  constructor() {
    // Gráfico de pastel
    this.activeusercardChartOptions = {
      series: [45, 25, 30],  // Los valores de las partes del pastel
      chart: {
        type: 'donut',  // Tipo de gráfico: pie
        height: 300,
      },
      labels: ['Ample Admin', 'Pixel Admin', 'Other Users'],  // Etiquetas del gráfico
      legend: {
        show: true,  // Muestra la leyenda
      },
      dataLabels: {
        enabled: true,  // Muestra los valores dentro de las secciones
      },
      tooltip: {
        theme: "dark",  // Tema del tooltip
      },
      fill: {
        opacity: 1,
      },
    };
  }
}
