import { Routes } from '@angular/router';
import path from 'path';
import { Home } from './components/home/home';
import { ProductList } from './components/product-list/product-list';
import { Details } from './components/details/details';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';

export const routes: Routes = [

    { path: '', component: Home },
    { path: 'products', component: ProductList },
    { path: 'product/:id', component: Details },
    { path: 'cart', component: Cart },
    { path: 'checkout', component: Checkout },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
