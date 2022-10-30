import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../common/product";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    this.listProducts();
  }

  private listProducts() {
    // check if id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    // get the id param string, convert string to a number using the "+" symbol
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // now get the product for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
