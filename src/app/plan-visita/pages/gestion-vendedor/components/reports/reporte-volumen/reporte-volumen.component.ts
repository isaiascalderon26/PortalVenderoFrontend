import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { UtilService } from 'src/app/plan-visita/services/util.service';
import { ReportService } from 'src/app/plan-visita/services/report.service';
import { data } from 'jquery';

@Component({
  selector: 'app-reporte-volumen',
  templateUrl: './reporte-volumen.component.html',
  styleUrls: ['./reporte-volumen.component.scss']
})
export class ReporteVolumenComponent implements OnInit {

  constructor(private reporteService: ReportService, protected utils: UtilService) {
  }
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

  ngOnInit(): void {
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
                                  cumplimiento: this.utils.calculatePercentage(i.meta_vol_ing, i.vol_ing),
                                  meta: this.utils.formatAmounts(i.meta_vol_ing),
                                  ventaActual: this.utils.formatAmounts(i.vol_ing),
                                  unidad: i.unidad
                                });
        const catSplitted = i.categoria.split(' ');
        if (i.unidad === 'UC') {
          this.chartLabels.push(catSplitted);
          currData.push(i.vol_ing);
          goalData.push(i.meta_vol_ing);
        }
        else {
          iceChartLabels.push(catSplitted);
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


}
