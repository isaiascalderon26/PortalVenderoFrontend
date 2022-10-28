import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { ReportService } from 'src/app/plan-visita/services/report.service';
import { UtilService } from 'src/app/plan-visita/services/util.service';

@Component({
  selector: 'app-reporte-fde-detalle',
  templateUrl: './reporte-fde-detalle.component.html',
  styleUrls: ['./reporte-fde-detalle.component.scss']
})
export class ReporteFdeDetalleComponent implements OnInit {

  constructor(protected reportService: ReportService,
              protected utils: UtilService) { }

  public chart;
  public iceChart;
  public chartType: ChartType = 'bar';
  public chartLabels = new Array();
  public chartOptions: ChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
  public chartDataSet = [];
  public goalsPercent = new Array();
  public dataJson = new Array();
  public jsonFullGoal = new Array();


  ngOnInit(): void {
    this.reportService.getMetasFull()
    .then((response) => {
      this.jsonFullGoal = response.body.data;
      this.loadReportAndChart();
    });
  }

  public getCategoryAccom(categoria: string): number {
    let accomCat;
    this.jsonFullGoal.forEach((data) => {
      if (categoria === data.categoria) {
        accomCat = data.cumplimiento_categoría;
      }
    });
    return accomCat;
  }

  loadReportAndChart(): void {
    this.reportService.getMetasFDE()
    .then((response) => {
      this.dataJson = response.body;
      const currData = new Array();
      const goalData = new Array();
      this.dataJson.forEach((data) => {
        this.goalsPercent.push({  categoria: data.categoria,
                                  cumplimiento: data.cumplimiento_fde,
                                  cumplimientoCat: this.getCategoryAccom(data.categoria),
                                  cumplimientoCatAjustado: data['%_cumplimiento_ajustado']
                                });
        const categorySplitred = data.categoria.split(' ');
        this.chartLabels.push(categorySplitred[0]);
        currData.push(data.fde);
        goalData.push(data.meta_fde);

      });
      const dataSetCurr = {
        label: 'Venta Actual',
        data: currData,
        backgroundColor: '#000000'
      };
      const dataSetGoal =  {
        label: 'Meta',
        data: goalData,
        backgroundColor: '#d40606'
      };
      this.chartDataSet.push(dataSetGoal, dataSetCurr);
      this.chart = new Chart('chart', {
        type: this.chartType,
        data: {
            labels: this.chartLabels,
            datasets: this.chartDataSet
        },
        options: this.chartOptions
      });


    })
    .catch((exception) => {
      console.error('error buscando metas FDE, error: ', exception);
    });

  }

}
