import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: string[] = []; // To store categories (array of strings)
  products: any[] = []; // To store products for a selected category

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchCategories(); 
  }

  // Fetch all categories from API 1
  fetchCategories() {
    this.http.get<string[]>('https://fakestoreapi.com/products/categories').subscribe(
      (data: string[]) => {
        this.categories = data; 
        console.log('Categories:', this.categories); 
      },
      (error) => {
        console.error('Error fetching categories:', error); 
      }
    );
  }

  // Fetch products for a selected category using API 2
  onCategoryClick(categoryName: string) {
    this.http.get(`https://fakestoreapi.com/products/category/${categoryName}`).subscribe(
      (data: any) => {
        this.products = data; 
        console.log('Products:', this.products); 
      },
      (error) => {
        console.error('Error fetching products:', error); 
      }
    );
  }

  // Redirect to product detail page
  onProductClick(productId: number) {
    this.router.navigate(['/product', productId]); 
  }
}