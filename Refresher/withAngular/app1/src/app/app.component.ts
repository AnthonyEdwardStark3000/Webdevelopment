import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productSearchvalue: String | undefined;
  products:Product[]=[];

  constructor(@Inject(HttpClient) private httpClient: HttpClient)
  {
  }

  onClicked(){
    this.httpClient.get<Product[]>("/getproducts?s="+this.productSearchvalue)
    .subscribe
    (
      (response: Product[])=>
      {
          this.products = response;
      }
    );
  }

}
