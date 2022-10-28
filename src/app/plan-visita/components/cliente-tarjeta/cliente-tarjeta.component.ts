import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-tarjeta',
  templateUrl: './cliente-tarjeta.component.html',
  styleUrls: ['./cliente-tarjeta.component.scss'],
})
export class ClienteTarjetaComponent implements OnInit {
  @Input() body: any;
  public noData: boolean;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.noData = this.body.Error !== undefined;
  }

}
