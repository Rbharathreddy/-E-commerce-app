import { Component, OnInit } from '@angular/core';
import { CartService } from '../..//cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Array to store cart items

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cartItems$ to get updates
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items; // Update the cart items
    });
  }

  // Remove an item from the cart
  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  // Clear the cart
  clearCart() {
    this.cartService.clearCart();
  }
}
