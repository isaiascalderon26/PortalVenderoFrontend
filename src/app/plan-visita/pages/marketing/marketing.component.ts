import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit {

  constructor(protected reportService: ReportService, private sanitizer: DomSanitizer) { }
  public urlFile;
  public bttDisable = [true, true];
  public files = [
    {
      name: 'Promociones',
      file: '',
      fileName: 'Promociones.pdf',
      id: 0,
      type: 'data:application/pdf;base64,',
      urlFile: ''
    },
    {
      name: 'Seguimiento de Promociones',
      file: '',
      fileName: 'Seguimiento_promo.xlsx',
      id: 1,
      type: 'data:application/octet-stream;base64,',
      urlFile: ''
    }
  ];
  ngOnInit(): void {
    this.files.forEach((i) => {
      this.downloadFile(i.fileName, i.id);
    });
  }

  protected downloadFile(file: string, id: number): void {
    this.reportService.downloadFiles(file)
    .then((resolve) => {
      this.files[id].file = resolve.body.file;
      if (this.files[id].file !== null || this.files[id].file !== '') {
        this.bttDisable[id] = false;
        this.files[id].urlFile = this.setFile(this.files[id].type, this.files[id].file);
      }
    })
    .catch(() => {
      console.error('Error descargando archivo ', file);
    });
  }

  public setFile(type: string, file: any): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(type + file);
  }

}

