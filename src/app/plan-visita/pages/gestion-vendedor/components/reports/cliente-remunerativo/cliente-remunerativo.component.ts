import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartType } from 'chart.js';
import { ReportService } from 'src/app/plan-visita/services/report.service';
import { UtilService } from 'src/app/plan-visita/services/util.service';

@Component({
  selector: 'app-cliente-remunerativo',
  templateUrl: './cliente-remunerativo.component.html',
  styleUrls: ['./cliente-remunerativo.component.scss'],
})
export class ComponentsclienteRemunerativoComponent implements OnInit {
  public chart1;
  public chart2;
  public chart3;
  public chart4;
  public chartPie;
  public chartLabels = ['Cumplimiento', 'Meta'];
  public squares = [
    {
      category: '',
      class: '',
      percentage: ''
    }
  ];
  public chartType: ChartType = 'doughnut';
  public greenColor = '#00b868';
  public redColor = '#d40606';
  public gaugeNeedle;
  protected circumference = 180;
  protected rotation = 270;
  protected borderColors = [];
  protected cutout: '70%';
  public globalAccom = 0.0;
  public goalChart1: number;
  public selledChart1: number;
  public goalChart2: number;
  public selledChart2: number;
  public goalChart3: number;
  public selledChart3: number;
  public goalChart4: number;
  public selledChart4: number;
  public categoriesGoal = new Array();
  public categoriesSelled = new Array();
  public categories = new Array();
  public goalData = new Array();
  constructor(private router: Router, protected utils: UtilService, protected reportService: ReportService) {
  }

  ngOnInit(): void {
    let dataJson = new Array();
    let dataSet = new Array();
    const labelsPieChart = new Array();
    const dataSetPie = new Array();
    let catAux = '';
    this.reportService.getMetasFull()
    .then((data) => {
      dataJson = data.body.data;
      this.globalAccom = data.body.final;
      dataJson.forEach((json, i) => {
        const pulsOne = i + 1;
        labelsPieChart.push(json.categoria);
        dataSetPie.push(json.ponderación);
        const categorie = json.categoria !== null ? json.categoria.split(' ') : 'ND';
        this.categories.push(categorie[0]);
        this.categoriesGoal.push(this.utils.fixNumber(json.cumplimiento_categoría));
        this.categoriesSelled.push(this.utils.fixNumber(json.puntaje_ponderado));
        this.squares.push({
          category: json.categoria,
          class: 'square-' + pulsOne,
          percentage: json.ponderación + '%'
        });
        const dataTable = {
          categoria:  json.categoria,
          cumplimiento: json.cump_vol,
          FDE: this.utils.fixNumber(json.cump_fde),
          puntajeMeta: Math.round(json.cumplimiento_categoría),
          ponderado: Math.round(json.cumplimiento_categoría) + ' x '
          + json.ponderación +
          '% = ' + this.utils.fixNumber(json.cumplimiento_categoría * json.ponderación / 100)
        };
        const goalData = this.utils.fixNumber(json.cumplimiento_categoría);
        const selledData = this.utils.fixNumber(json.puntaje_ponderado);
        dataSet = this.calculateData(goalData, selledData);
        this.goalData.push(dataTable);
        if (catAux !== json.categoria) {
          this.setValuesToNeedle();
          this.createChart(this.chart1, 'chart' + pulsOne, goalData, selledData, dataSet);
        }
        catAux = json.categoria;
      });
      const colors = ['Orange', '#d0d538', '#008000', '#9a1e18'];
      this.createPieChart(dataSetPie, labelsPieChart, colors);
    })
    .catch((error) => {
      console.error('Error buscando datos para reporte, Error: ', error);
    });
  }

  protected calculateData(goal: number, accom: number,  ): any {
    const dataSet = new Array();
    const label = new Array();
    label.push('chart');
    const data = new Array();
    const backgroundColor = new Array();
    const borderColor = new Array();
    const percentage = this.utils.calculatePercentageNumber(goal, accom);
    const leaked = 100 > percentage ? 100 - percentage : percentage - 100;
    if (percentage < 100){
      data.push(percentage, leaked);
      backgroundColor.push(this.greenColor, this.redColor);
      borderColor.push(this.greenColor, this.redColor);
    } else {
      data.push(percentage);
      backgroundColor.push(this.greenColor);
      borderColor.push(this.greenColor, this.redColor);
    }
    dataSet.push({data, label, backgroundColor, borderColor, needleValue: percentage,
      circumference: this.circumference, rotation: this.rotation, cutout: this.cutout});

    return dataSet;
  }

  protected createChart(chartName: any, chartCanvas: string, goal: number, current: number, dataSet: any): void {
    chartName = new Chart(chartCanvas, {
      type: this.chartType,
      data: {
        labels: this.chartLabels,
        datasets: dataSet
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            yAlign: 'center',
            displayColors: false,
            callbacks: {
              label: tooltipItem => {
                return tooltipItem.label === 'Cumplimiento' ? `${tooltipItem.label}: ${current}` : `${tooltipItem.label}: ${goal}`;
              }
            }
          }
        }
      },
      plugins: [this.gaugeNeedle]
    });

  }
  protected setValuesToNeedle(): void {
    this.gaugeNeedle = {
      id: 'gaugeNeedle',
      afterDatasetDraw(chart, args, options): void {
        const {
          ctx,
          config,
          data,
          chartArea: { top, right, bottom, left, width, height },
        } = chart;
        ctx.save();
        const needleValue = data.datasets[0].needleValue;
        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);
        let angle: number;
        let screemSize: number;
        if (width > 100 && width < 200 ) {
          const angleDegrees = needleValue / dataTotal * 180;
          angle = angleDegrees * Math.PI / 180;
        }
        else if ( width > 200) {
          angle = Math.PI + (1 / dataTotal * needleValue * Math.PI);
        }
        if (width < 120) {
          screemSize = 180;
        }
        else if ( width >= 120 && width < 200 ){
          screemSize = 240;
        }
        else if ( width > 200 ){
          screemSize = 140;
        }
        const cx = width / 2;
        const cy = chart._metasets[0].data[0].y;
        // needle
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(height - ctx.canvas.offsetTop - screemSize, 0); // change 160 value if the needle size gets changed
        ctx.lineTo(0, 2);
        ctx.fillStyle = '#444';
        ctx.fill();
        // needle dot
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, 10);
        ctx.fill();
        ctx.restore();
      }
    };
  }

  protected createPieChart(data: any, labels: any, colors ): void {
    this.chartPie = new Chart('chartPie', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'pie',
            data,
            backgroundColor: colors
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        }
      }

    });
  }
}
