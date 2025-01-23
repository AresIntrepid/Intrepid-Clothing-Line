document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    
    // Automatically trigger "All Categories" filter when page loads
    const allCategoriesButton = document.querySelector('.filter-button.active');
    if (allCategoriesButton) {
        filterProducts('all categories'); // Load products immediately
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.textContent.toLowerCase();
            filterProducts(category);
        });
    });

    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            sortProducts(sortValue);
        });
    }
});

async function filterProducts(category) {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        
        const filteredProducts = category === 'all categories' 
            ? products 
            : products.filter(product => product.category.toLowerCase() === category);
        
        updateProductsDisplay(filteredProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function sortProducts(sortValue) {
    const productsGrid = document.querySelector('.products-grid');
    const products = Array.from(productsGrid.children);
    
    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.price').textContent.slice(1));
        const priceB = parseFloat(b.querySelector('.price').textContent.slice(1));
        
        if (sortValue === 'price-low') return priceA - priceB;
        if (sortValue === 'price-high') return priceB - priceA;
        return 0;
    });
    
    productsGrid.innerHTML = '';
    products.forEach(product => productsGrid.appendChild(product));
}

function updateProductsDisplay(products) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = products.map(product => `
        <article class="product-card">
            <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="button">Add to Cart</button>
            </div>
        </article>
    `).join('');
}

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    // Existing filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    
    // Load cart from localStorage
    loadCart();
    updateCartCount();
    
    // Automatically trigger "All Categories" filter when page loads
    const allCategoriesButton = document.querySelector('.filter-button.active');
    if (allCategoriesButton) {
        filterProducts('all categories');
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.textContent.toLowerCase();
            filterProducts(category);
        });
    });

    // Sort functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            sortProducts(sortValue);
        });
    }

    // Add cart event delegation
    document.addEventListener('click', function(e) {
        if (e.target.matches('.add-to-cart-btn')) {
            const card = e.target.closest('.product-card');
            const product = {
                id: card.dataset.id,
                name: card.querySelector('h3').textContent,
                price: parseFloat(card.querySelector('.price').textContent.slice(1)),
                image: card.querySelector('img').src,
                quantity: 1
            };
            addToCart(product);
        }
    });
});

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    saveCart();
    showAddToCartAnimation(product.id);
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

function showAddToCartAnimation(productId) {
    const button = document.querySelector(`[data-id="${productId}"] .add-to-cart-btn`);
    if (button) {
        button.textContent = 'Added!';
        button.classList.add('added');
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.classList.remove('added');
        }, 1000);
    }
}

async function filterProducts(category) {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        
        const filteredProducts = category === 'all categories' 
            ? products 
            : products.filter(product => product.category.toLowerCase() === category);
        
        updateProductsDisplay(filteredProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function updateProductsDisplay(products) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = products.map(product => `
        <article class="product-card" data-id="${product._id}">
            <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="button add-to-cart-btn">Add to Cart</button>
            </div>
        </article>
    `).join('');
}