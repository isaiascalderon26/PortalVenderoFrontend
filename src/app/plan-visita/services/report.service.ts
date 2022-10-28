
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class ReportService {
    protected urlMetasFDE = environment.BASE_URL + '/metas-fde';
    protected urlMetasVol = environment.BASE_URL + '/metas-vol';
    protected urlMetasFull = environment.BASE_URL + '/metas-full';
    protected urlUploadFile = environment.BASE_URL + '/files-upload';
    protected urlDownloadFiles = environment.BASE_URL + '/download-file';

    constructor(private http: HttpClient){ }

    public getMetasFDE(): Promise<any> {
        const ruta = localStorage.getItem('RUTA');
        const params = new HttpParams().append('ruta', ruta);
        return this.http.get(this.urlMetasFDE, {params}).toPromise();
    }
    public getMetasVolumen(): Promise<any> {
        const ruta = localStorage.getItem('RUTA');
        const params = new HttpParams().append('ruta', ruta);
        return this.http.get(this.urlMetasVol, {params}).toPromise();
    }
    public getMetasFull(): Promise<any> {
        const ruta = localStorage.getItem('RUTA');
        const params = new HttpParams().append('ruta', ruta);
        return this.http.get(this.urlMetasFull, {params}).toPromise();
    }

    public uploadFiles(fileEncodes: any): Promise<any> {
        const body = fileEncodes;
        return this.http.post(this.urlUploadFile, body).toPromise();
    }

    public downloadFiles(file: string): Promise<any> {
        const params = new HttpParams().append('file', file);
        return this.http.get(this.urlDownloadFiles, {params}).toPromise();
    }


}
