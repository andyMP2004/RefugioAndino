import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DivisaService {

  private apiUrl = 'https://openexchangerates.org/api/latest.json?app_id=e8a8407187314c498dafb7609980b7bb';

  constructor(private http: HttpClient) { }

  async convertCurrency(amount: number, toCurrency: string): Promise<number> {
    try {
      const response: any = await this.http.get(this.apiUrl).toPromise();
      const rates = response.rates;
      if (!rates[toCurrency]) {
        throw new Error(`La moneda ${toCurrency} no se encuentra disponible en las tasas de cambio.`);
      }
      const rate = rates[toCurrency];

      if (toCurrency === 'CLP') {
        return amount; 
      }
      const clpRate = rates['CLP'];

      if (!clpRate) {
        throw new Error('La tasa de cambio para CLP no está disponible.');
      }
      return (amount / clpRate) * rate;
    } catch (error) {
      console.error('Error al obtener las tasas de cambio:', error);
      throw new Error('No se pudo obtener la tasa de cambio. Intente nuevamente.');
    }
  }
}
