import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Singleton service
})
export class CartService {
  private cartItems: any[] = []; // Array to store cart items
  private cartCount = new BehaviorSubject<number>(0); // Observable for cart count
  private cartItemsSubject = new BehaviorSubject<any[]>([]); // Observable for cart items

  // Expose the cartCount as an observable
  cartCount$ = this.cartCount.asObservable();

  // Expose the cartItems as an observable
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // Add an item to the cart
  addToCart(item: any) {
    this.cartItems.push(item); // Add the item to the cart
    this.cartCount.next(this.cartItems.length); // Notify subscribers of the new cart count
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers of the new cart items
    console.log('Cart Items:', this.cartItems); // Debugging: Log cart items
  }

  // Get all items in the cart
  getCartItems() {
    return this.cartItems; // Return the cart items
  }

  // Get the total number of items in the cart
  getCartCount() {
    return this.cartItems.length; // Return the cart count
  }

  // Remove an item from the cart
  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item); // Find the index of the item
    if (index !== -1) {
      this.cartItems.splice(index, 1); // Remove the item from the cart
      this.cartCount.next(this.cartItems.length); // Notify subscribers of the new cart count
      this.cartItemsSubject.next(this.cartItems); // Notify subscribers of the new cart items
    }
  }

  // Clear the cart
  clearCart() {
    this.cartItems = []; // Clear the cart items
    this.cartCount.next(0); // Notify subscribers of the new cart count
    this.cartItemsSubject.next([]); // Notify subscribers of the new cart items
  }
}