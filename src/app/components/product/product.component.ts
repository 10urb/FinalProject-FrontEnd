import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';

import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dataLoaded = false;
  filterText = '';

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
  }

  getProducts() {
    //console.log("Api request başladı")
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
      // console.log("Api request bitti")
    });
    // console.log("Metod bitti")
  }

  getProductsByCategory(categoryId: number) {
    //console.log("Api request başladı")
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
        this.dataLoaded = true;
        // console.log("Api request bitti")
      });
    // console.log("Metod bitti")
  }

  addToCart(product: Product) {
    this.toastrService.success('Sepete eklendi', product.productName);
    this.cartService.addToCart(product);
  }
}
