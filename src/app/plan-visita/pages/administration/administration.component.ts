import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject } from 'rxjs';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  constructor(protected reportService: ReportService,
              private toastrSvc: ToastrService) { }
  @ViewChild('fileOne') fileOneRef: ElementRef;
  @ViewChild('fileTwo') fileTwoRef: ElementRef;
  public tabsToApps = [
    {
      id: 0,
      name: 'loadPromoFiles',
      label: 'Cargar Promociones'
    }
  ];
  public selectedId = 0;
  public fileOneCheked = false;
  public fileTwoCheked = false;
  public buttonActivated = false;
  public base64Files: Array<{id: number, file: string, name: string}> = new Array();
  public checkFile1 = false;
  public checkFile2 = false;
  protected validExtensions = ['xlsx', 'pdf', 'xls'];
  ngOnInit(): void {

  }

  public showSetting(id: number): void {
    this.selectedId = id;
  }

  public filesSelected(idFile: number, event: any): void {
    const file = event.target.files[0];
    this.validateExtensionFile(file.name.split('.').pop(), idFile);
    let fileName = idFile === 0 ? 'Promociones.' : 'Seguimiento_promo.';
    fileName = fileName + file.name.split('.').pop();
    this.convertFileToBase64(file).then(file64 => {
      this.base64Files.push({id: idFile, file: file64, name: fileName});
    });
    if (((this.fileOneCheked && idFile === 0) || (this.fileTwoCheked && idFile === 1)) && this.base64Files !== null ){
      this.buttonActivated = true;
    }
  }

  protected validateExtensionFile(extFile: string, idFile: number): void {
    let itsValid = true;
    if (!this.validExtensions.includes(extFile)) {
      itsValid = false;
      const fileEvent = {
        target: {
          checked: false
        }
      };
      this.selectedFileLoad(idFile, fileEvent);
    }
  }

  protected convertFileToBase64(file: File): Promise<string> {
    // const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    return new Promise((resolve, reject) => {
      reader.onload = (event) => {
        resolve(btoa(event.target.result as string));
      };
    });
  }

  public selectedFileLoad(index: number, event: any): void {
    if (event.target.checked) {
      if (index === 0) {
        this.fileOneCheked = true;
      }
      if (index === 1) {
        this.fileTwoCheked = true;
      }
    } else {
      if (index === 0) {
        this.fileOneCheked = false;
        this.checkFile1 = false;
        this.base64Files.forEach((data, i)  => {
          if (data.id === index) {
            this.base64Files.splice(i, 1);
          }
        });
        this.fileOneRef.nativeElement.value = '';
      }
      if (index === 1) {
        this.fileTwoCheked = false;
        this.checkFile2 = false;
        this.base64Files.forEach((data, i)  => {
          if (data.id === index) {
            this.base64Files.splice(i, 1);
          }
        });
        this.fileTwoRef.nativeElement.value = '';
      }
    }
    if ( !this.fileTwoCheked && !this.fileOneCheked ) {
      this.buttonActivated = false;
    }
  }
  public loadFileToBucket(): void {
    if (this.base64Files !== null){
      this.base64Files.forEach((data) => {
        this.reportService.uploadFiles(data).then(response => {
          this.toastrSvc.success('Archivos guardados con exito', 'Portal Vendedores');
          this.fileOneRef.nativeElement.value = '';
          this.fileTwoRef.nativeElement.value = '';
          this.buttonActivated = false;
          this.checkFile1 = false;
          this.checkFile2 = false;
        }).catch(errorResp => {
          console.error('Error cargando el archivo: ', data.name, ' Error: ', errorResp);
          this.fileOneRef.nativeElement.value = '';
          this.fileTwoRef.nativeElement.value = '';
          this.buttonActivated = false;
          this.checkFile1 = false;
          this.checkFile2 = false;
        });
      });
    } else {
      console.error('loadFileToBucket - No se han cargado los archivos.');
    }
  }

}
