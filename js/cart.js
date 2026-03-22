"use strict";

// file will only handle cart functionality
/* 
--------------------------------
Its job will be:

- listen for Add to Bag clicks
- store cart data
- update the badge
- later help the checkout page too 
--------------------------------
*/

// Create a cart item
let cartItem = {
    id: "lip-plumper-001",
    name: "J'Adore Lips Lip Plumper",
    price: 34.99,
    image: "images/Prodcuts.PNG",
    quantity: 1,
}

function addToCart() {
    // Get existing cart from localStorage or initialize empty array
   let cart = cartItem();

   // Check if item already exists in cart
   let existingCart = cart.find(item => item.id === cartItem.id);

   // If item exists, do nothing else create a new item/cart item
   if (existingCart) {
       existingCart.quantity++;
   } else {
        cart.push(cartItem);
   }

   // Save cart to localStorage
   saveCart(cart);

   // Update badge UI
   updateBagCount();
}

function updateBagCount() {
    // Get cart from localStorage
    let cart = getCart();
    
    // Calculate total quantity
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update badge
    let badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = totalQuantity;
    }
}