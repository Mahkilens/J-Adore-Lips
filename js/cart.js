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
    // An array of objects 
   let cart = getCart();

    // Check if item already exists in cart
    // item is a temporary variable that represents each object in the cart array
   let existingItem = cart.find(item => item.id === cartItem.id);

   // If item exists, do nothing else create a new item/cart item
   if (existingItem) {
       existingItem.quantity++;
   } else {
        cart.push({...cartItem});
   }

   // Save cart to localStorage
   saveCart(cart);

   // Update badge UI
   updateBagCount();
   updateCheckoutSummary();
}

function updateBagCount() {
    // Get cart from localStorage
    let cart = getCart();
    
    // Calculate total quantity
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update badge
    let badge = document.getElementById('bag-count');
    if (badge) {
        badge.textContent = totalQuantity;
    }
}

// Get cart from localStorage
function getCart() {
    let cart = localStorage.getItem("cart");

    if (!cart) {
        return [];
    }

    return JSON.parse(cart);
}

// Save cart to localStorage
function saveCart(cart) {
    // Convert cart array to JSON string
    let cartString = JSON.stringify(cart);
    
    // Save to localStorage
    localStorage.setItem("cart", cartString);
}

function fmt(amount) {
    return '$' + amount.toFixed(2);
}

function updateCheckoutSummary() {
    var cart = getCart();
    var item = cart.find(function (c) { return c.id === 'lip-plumper-001'; });
    var total = item ? item.price * item.quantity : 0;

    // Quantity badge
    var badge = document.querySelector('.order-item-qty');
    if (badge) badge.textContent = item ? item.quantity : 0;

    // Item price (qty x unit price)
    var priceEl = document.querySelector('.order-item-price');
    if (priceEl) priceEl.textContent = fmt(total);

    // Subtotal row
    var subtotalRow = document.querySelectorAll('.order-row')[0];
    if (subtotalRow) subtotalRow.querySelector('span:last-child').textContent = fmt(total);

    // Total
    var totalEl = document.querySelector('.order-total-amount');
    if (totalEl) totalEl.textContent = fmt(total);

    // Pay button
    var payBtn = document.querySelector('.co-pay-btn');
    if (payBtn) payBtn.innerHTML = 'Pay now &mdash; ' + fmt(total);
}

document.addEventListener('DOMContentLoaded', function () {
    updateBagCount();
    updateCheckoutSummary();

    let addBtns = document.querySelectorAll('.add-to-bag');
    addBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            addToCart();
        });
    });

    document.querySelectorAll('.order-item-remove').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.order-item');
            var itemId = item ? item.dataset.itemId : null;

            // Remove from localStorage and sync badge across all pages
            if (itemId) {
                var cart = getCart();
                cart = cart.filter(function (c) { return c.id !== itemId; });
                saveCart(cart);
                updateBagCount();
            }

            // Remove row from DOM then refresh totals
            if (item) item.remove();
            updateCheckoutSummary();
        });
    });
});