import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service'; // Import CartService

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: any;
  errorMessage: string | null = null; // Define errorMessage property

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProduct(productId);
    } else {
      this.errorMessage = 'Product ID is missing.'; // Set error message
    }
  }

  fetchProduct(productId: string) {
    this.http.get(`https://fakestoreapi.com/products/${productId}`).subscribe(
      (data: any) => {
        this.product = data;
        console.log('Product:', this.product); // Debugging: Log product data
      },
      (error) => {
        this.errorMessage = 'Failed to fetch product details.'; // Set error message
        console.error('Error fetching product:', error); // Handle errors
      }
    );
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product); // Add the product to the cart
      console.log('Product added to cart:', this.product); // Debugging: Log the product
    } else {
      this.errorMessage = 'No product to add to cart.'; // Set error message
    }
  }
}