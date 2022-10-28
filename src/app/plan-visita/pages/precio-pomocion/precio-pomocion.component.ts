import { Component, Inject, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdapterService } from '../../services/adapter-b2b.service';

@Component({
  selector: 'app-precio-pomocion',
  templateUrl: './precio-pomocion.component.html',
  styleUrls: ['./precio-pomocion.component.scss'],
})
export class PrecioPomocionComponent implements OnInit {
  public codeClient: string;
  public discount: boolean = true;
  public checked: boolean = false;
  public completed: false;
  public indexDialog: number;
  public motiveList = new Array();
  public allComplete: boolean = false;
  public itemList = new Array();
  public noData: boolean;
  hayError = false;

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    public dialog: MatDialog,
    protected adapterService: AdapterService
  ) {
    route.params.subscribe((response) => {
      this.codeClient = response.kunnr;
    });
  }

  ngOnInit(): void {}

  public clickeables(value: boolean): void {
    this.discount = value;
    if (value === false) {
      this.adapterService.getDiscount(this.codeClient).then((resp) => {
        this.itemList = resp.data;
        
        if (this.itemList !== undefined && this.itemList.length !== 0) {
          this.noData = false;
        } else{
          this.noData = true;
        }
      });
    }else{
      this.noData = false
    } 
    /* else {
      const clientDiscount: Array<{
        discountId: number;
        active: boolean;
        motive: string;
      }> = new Array();

      this.itemList.forEach((dataElement, i) => {
        clientDiscount.push({
          discountId: dataElement.discountId,
          active: dataElement.active,
          motive: this.motiveList[i],
        });
      });

      this.adapterService
        .updateDiscount(this.codeClient, clientDiscount)
        .then((resp) => {});
    } */
  }
  // funcionalidad que cumple con el check que selcciona y envia las promociones ofertadas.
  /* public updateAllComplete() {
    this.allComplete =
      this.itemList != null && this.itemList.every((t) => t.active);
  }

  public someComplete(): boolean {
    if (this.itemList == null) {
      return false;
    }
    return (
      this.itemList.filter((t) => t.active).length > 0 && !this.allComplete
    );
  } */

  /*  public bulk(completed: boolean): void {
    this.allComplete = completed;
    if (this.itemList == null) {
      return;
    }
    this.itemList.forEach((t) => (t.active = completed));
  } */

  public detailDiscount(index: number, event: any): void {
    if (event.checked === true) {
      const dialogRef = this.dialog.open(DetailDiscount, {
        data: { body: this.itemList, index: index },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.itemList[index].active = true;
      });
    } else {
      const dialogRefLow = this.dialog.open(LowDetail, {
        data: { name: this.itemList[index].name, index: index },
      });
      dialogRefLow.afterClosed().subscribe((result) => {
        this.motiveList[index] = result.data;
        this.indexDialog = result.index;
        this.itemList[index].active = false;
      });
    }
  }
}

@Component({
  selector: 'detalle-decuento-promociones',
  templateUrl: './detalle-descuento-promociones.html',
})
export class DetailDiscount {
  constructor(
    public dialogRef: MatDialogRef<DetailDiscount>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'detalle-baja-promociones',
  templateUrl: './detalle-baja-promociones.html',
  styleUrls: ['./precio-pomocion.component.scss'],
})
export class LowDetail {
  @ViewChild('justification') justification: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<LowDetail>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close({
      data: this.justification.nativeElement.value,
      index: this.data.index,
    });
  }
}
