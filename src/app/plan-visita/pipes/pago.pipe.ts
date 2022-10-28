import { Pipe, PipeTransform } from '@angular/core';
import { Body, PlanVisita } from '../interfaces/planVisita.interface';

@Pipe({
  name: 'pago',
})
export class PagoPipe implements PipeTransform {
  transform(body: Body): string {
    return `${body.kunnr}`;
  }
}
