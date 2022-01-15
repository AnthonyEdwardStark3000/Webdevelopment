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

  //constructor is just common for everything
  constructor(@Inject(HttpClient) private httpClient: HttpClient)
  {
  }


  // Retrieving the data
  onClicked(){
    this.httpClient.get<Product[]>("/getproducts?s="+this.productSearchvalue)
    .subscribe(
      (response: Product[])=>
      {
          this.products = response;
      }
    );
  }
    // Inserting the data
  newProduct: Product = new Product;
  insertionStatus: String ="";
  onInsert(){
    this.httpClient.post("/insertproduct",this.newProduct,
     {responseType:"text"}).subscribe(
    (response)=>
    {
      this.insertionStatus=response;
    }
    );
  }

}
