// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart count
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setupCartEventListeners();
});

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Setup event listeners for cart functionality
function setupCartEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productCard = e.target.closest('.product-card');
            const product = {
                id: Date.now().toString(), // Temporary ID
                name: productCard.querySelector('.product-name').textContent,
                price: parseFloat(productCard.querySelector('.product-price').textContent.replace('₹', '')),
                image: productCard.querySelector('img').src
            };
            addToCart(product);
        }
    });
}
