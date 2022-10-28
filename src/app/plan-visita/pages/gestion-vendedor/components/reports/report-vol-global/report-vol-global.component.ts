import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { ReportService } from 'src/app/plan-visita/services/report.service';
import { UtilService } from 'src/app/plan-visita/services/util.service';

@Component({
  selector: 'app-report-vol-global',
  templateUrl: './report-vol-global.component.html',
  styleUrls: ['./report-vol-global.component.scss']
})
export class ReportVolGlobalComponent implements OnInit {

  constructor(protected reportService: ReportService, private utils: UtilService) { }
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
        stacked: true,
        grid: {
          display: false
        }
      },
      x: {
        stacked: false,
        grid: {
          display: false
        }
      }
    }
  };
  public chartDataSet = [];
  public chartIceDataSet = [];
  public goalsPercent = new Array();
  public dataJson = new Array();


  ngOnInit(): void {
    this.loadReportAndChart();
  }

  private loadReportAndChart(): void {
    this.reportService.getMetasVolumen()
    .then((response) => {
      this.dataJson = response.body;
      const currData = new Array();
      const currIceData = new Array();
      const goalData = new Array();
      const goalIceData = new Array();
      const iceChartLables = new Array();
      this.dataJson.forEach((data) => {
        this.goalsPercent.push({  categoria: data.categoria,
                                  cumplimiento: this.utils.calculatePercentage(data.meta_vol_ing, data.vol_ing),
                                  meta: this.utils.formatAmounts(data.meta_vol_ing),
                                  ventaActual: this.utils.formatAmounts(data.vol_ing),
                                  unidad: data.unidad
                                });
        const categorySplitred = data.categoria.split(' ');
        if (data.unidad !== 'UC') {
          this.chartLabels.push(categorySplitred);
          currData.push(data.vol_ing);
          goalData.push(data.meta_vol_ing);
        } else {
          iceChartLables.push(categorySplitred);
          currIceData.push(data.vol_ing);
          goalIceData.push(data.meta_vol_ing);
        }
      });
      const dataSetCurr = {
        label: 'Venta Actual',
        data: currData,
        backgroundColor: '#50c878'
      };
      const dataSetGoal =  {
        label: 'Meta',
        data: goalData,
        backgroundColor: '#d40606'
      };
      this.chartDataSet.push(dataSetCurr, dataSetGoal);
      this.chart = new Chart('chartNoIce', {
        type: this.chartType,
        data: {
          labels: this.chartLabels,
          datasets: this.chartDataSet
        },
        options: this.chartOptions
      });
      const dataSetIceCurr = {
        label: 'Venta Actual',
        data: currIceData,
        backgroundColor: '#50c878'
      };
      const dataSetIceGoal =  {
        label: 'Meta',
        data: goalIceData,
        backgroundColor: '#d40606'
      };
      this.chartIceDataSet.push(dataSetIceCurr, dataSetIceGoal);
      this.iceChart = new Chart('chartIce', {
        type: this.chartType,
        data: {
          labels: iceChartLables,
          datasets: this.chartIceDataSet
        },
        options: this.chartOptions
      });

    })
    .catch((error) => {
      console.error('error buscando metas volumen: ', error);
    });
  }

}
