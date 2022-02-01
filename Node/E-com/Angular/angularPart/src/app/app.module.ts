import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { NgshopComponent } from './ngshop/ngshop.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

const routes: Routes = [
  {
path: '',
component: HomePageComponent
  },
  {
path: 'products',
component: ProductListComponent
  },
];




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NgshopComponent,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
