import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { EmbedPowertBI } from '../../../../interfaces/embedPowerBI';
import { ChannelTokenService } from '../../../../services/channel-token.service';
import * as pbi from 'powerbi-client';
import { PowerBIConfig } from 'src/app/plan-visita/interfaces/powerBiConfig';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss'],
})

export class GestionComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private channelTokenService: ChannelTokenService) {
  }
  public screenHeight: number;
  @ViewChild('reportContainer') reportContainer: ElementRef;
  public powerBi: EmbedPowertBI;
  title = '';
  report: pbi.Embed;
  powerBiConfig: PowerBIConfig;


  ngOnInit(): void {
    this.authenticate();
  }

  authenticate(): void {
    this.channelTokenService.getURLToEmbedReport().then((response) => {
      this.powerBiConfig = response;
      this.showReport();
    }).catch((errorResponse) => {
      console.error('errorResponse: ', errorResponse);
    });
  }

  public showReport(): void {
    const urlEmbed = this.powerBiConfig.reportConfig.embedUrl;
    const setingsNew: pbi.IEmbedSettings = {
      filterPaneEnabled: false,
    };

    const config: pbi.IEmbedConfiguration = {
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken: this.powerBiConfig.accessToken,
      embedUrl: urlEmbed
    };
    const reportContainer = this.reportContainer.nativeElement;
    const powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    this.report = powerbi.embed(reportContainer, config);
    this.report.off('loaded');
    this.report.on('error', () => {
      console.error('Error en reporte');
    });
  }
}
