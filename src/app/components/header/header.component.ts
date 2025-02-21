import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service'; // Import CartService
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchTerm: string = ''; // Search term entered by the user
  cartCount: number = 0; // Cart count displayed in the header
  filteredProducts: any[] = []; // Products filtered by search term

  constructor(
    private cartService: CartService, // Inject CartService
    private http: HttpClient, // Inject HttpClient
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    // Subscribe to cartCount$ to get updates
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count; // Update the cart count
    });
  }

  // Fetch products from the API
  fetchProducts() {
    this.http.get('https://fakestoreapi.com/products').subscribe(
      (data: any) => {
        this.filteredProducts = data; // Store all products initially
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Filter products based on the search term
  searchProducts() {
    if (!this.searchTerm) {
      this.filteredProducts = []; // If search term is empty, clear the filtered products
    } else {
      this.http.get('https://fakestoreapi.com/products').subscribe(
        (data: any) => {
          // Filter products by title
          this.filteredProducts = data.filter((product: any) =>
            product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  // Navigate to the product detail page
  navigateToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}

