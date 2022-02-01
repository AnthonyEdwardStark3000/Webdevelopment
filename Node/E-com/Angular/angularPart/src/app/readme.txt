Defining the router link by  import { RouterModule } from '@angular/router';
in imports:
 RouterModule.forRoot(
      [
        {
      path: '',
      component: HomePageComponent
        },
        {
      path: 'products',
      component: ProductListComponent
        },
      ]
