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
  public activeusercardChartOptions2!: Partial<activeusercardChartOptions> | any;
  public adopcionesPorMesChartOptions!: Partial<activeusercardChartOptions> | any;
  public adopcionesPorAlbergueChartOptions!: Partial<activeusercardChartOptions> | any;

  constructor() {
    // Gráfico de pastel
    this.activeusercardChartOptions = {
      series: [60, 25, 15],
      chart: {
        type: 'pie',
        height: 300,
      },
      labels: ['Perros 🐶', 'Gatos 🐱', 'Otros 🐰🐦'],
      legend: {
        show: true,
        position: 'bottom'
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toFixed(0) + '%';
        }
      },
      tooltip: {
        theme: "dark",
      },
      fill: {
        opacity: 1,
      }
    };
    this.activeusercardChartOptions2 = {
      series: [40, 35, 25],
      chart: {
        type: 'pie',
        height: 300,
      },
      labels: ['Campaña “Adopta con Amor”', 'Feria Animal 2024', 'Red de Rescate Local'],
      legend: {
        show: true,
        position: 'right'
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toFixed(0) + '%';
        }
      },
      tooltip: {
        theme: "dark",
      },
      fill: {
        opacity: 1,
      }
    };
    this.adopcionesPorMesChartOptions = {
      series: [
        {
          name: 'Adopciones',
          data: [12, 18, 25, 30, 28, 22], // Ejemplo: de enero a junio
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        theme: 'dark'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      }
    };
    this.adopcionesPorAlbergueChartOptions = {
      series: [
        {
          name: 'Total Adopciones',
          data: [45, 38, 22, 17], // Total por albergue
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: ['Huellitas de Amor', 'Refugio Esperanza', 'Manada Feliz', 'Patitas Unidas'],
      },
      plotOptions: {
        bar: {
          distributed: true,
          columnWidth: '60%',
          borderRadius: 5
        }
      },
      dataLabels: {
        enabled: true
      },
      tooltip: {
        theme: 'dark'
      },
      fill: {
        opacity: 1
      },
      legend: {
        show: false
      }
    };
    
    
    
    
  }

}
