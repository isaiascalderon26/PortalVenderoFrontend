import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { ReportService } from 'src/app/plan-visita/services/report.service';
import { UtilService } from 'src/app/plan-visita/services/util.service';

@Component({
  selector: 'app-report-vol-parcial',
  templateUrl: './report-vol-parcial.component.html',
  styleUrls: ['./report-vol-parcial.component.scss']
})
export class ReportVolParcialComponent implements OnInit {

  constructor(private reporteService: ReportService, protected utils: UtilService) { }
  public chart;
  public iceChart;
  public chartType: ChartType = 'bar';
  public chartLabels = new Array();
  public chartOptions: ChartOptions = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        grid: {
          display: false
        }
      }
    }
  };
  public chartDataSet = [];
  public iceChartDataSet = [];
  public chartLegend = true;
  public dataJson = new Array();
  public goalsPercent = new Array();
  public weekDays = 0;
  public today = 1;

  ngOnInit(): void {
    this.calcBusinessDay();
    this.loadReport();
  }

  protected loadReport(): void {
    this.reporteService.getMetasVolumen()
    .then((response) => {
      this.dataJson = response.body;
      const currData = new Array();
      const goalData = new Array();
      const currIceData = new Array();
      const goalIceData = new Array();
      const iceChartLabels = new Array();
      this.dataJson.forEach((i) => {
        this.goalsPercent.push({  categoria: i.categoria,
                                  cumplimiento: this.utils.calculateParcialized(i.meta_vol_ing, i.vol_ing, this.weekDays, this.today),
                                  meta: this.utils.formatAmounts(i.meta_vol_ing),
                                  ventaActual: this.utils.formatAmounts(i.vol_ing),
                                  unidad: i.unidad
                                });
        const catSplitted = i.categoria.split(' ');
        if (i.unidad === 'UC') {
          this.chartLabels.push(catSplitted[0]);
          currData.push(i.vol_ing);
          goalData.push(i.meta_vol_ing);
        }
        else {
          iceChartLabels.push(catSplitted[0]);
          currIceData.push(i.vol_ing);
          goalIceData.push(i.meta_vol_ing);
        }
      });
      const dataSetCurr = {
        label: 'Venta Actual',
        data: currData,
        backgroundColor: '#000000'
      };
      const dataSetGoal =  {
        label: 'Cajas de Venta',
        data: goalData,
        backgroundColor: '#d40606'
      };
      const iceDataSetCurr = {
        label: 'Ingreso Actual',
        data: currIceData,
        backgroundColor: '#EAE9E9'
      };
      const iceDataSetGoal = {
        label: 'Meta Ingreso',
        data: goalIceData,
        backgroundColor: '#9A8F8F'
      };
      this.chartDataSet.push(dataSetGoal, dataSetCurr);
      this.iceChartDataSet.push(iceDataSetGoal, iceDataSetCurr);
      this.chart = new Chart('canvas', {
        type: this.chartType,
        data: {
            labels: this.chartLabels,
            datasets: this.chartDataSet
        },
        options: this.chartOptions
      });
      this.iceChart = new Chart('canvasIce', {
        type: this.chartType,
        data: {
            labels: iceChartLabels,
            datasets: this.iceChartDataSet
        },
        options: this.chartOptions
      });
    }).catch((error) => {
      console.error('loadReport - Error buscando metas volumen: ', error);
    });
  }
  public calcBusinessDay(): void {
    const date = new Date();
    this.today = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const dim = 32 - new Date(year, month, 32).getDate();
    for (let i = 0; i < dim; i++){
      if (this.isWeekDay(year, month, i + 1)) {
        this.weekDays ++;
      }
    }
  }
  public isWeekDay(year: number, month: number, day: number): boolean {
    const dayNew = new Date(year, month, day).getDay();
    return dayNew !== 0;
  }

}
