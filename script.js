// ===== Initialize App =====
let products = JSON.parse(localStorage.getItem('products')) || getDefaultProducts();
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProductId = null;
let editingProductId = null;

// Get Default Products
function getDefaultProducts() {
    return [
        {
            id: 1,
            name: 'Premium Cotton T-Shirt',
            category: 'clothes',
            price: 29.99,
            stock: 50,
            image: 'https://via.placeholder.com/280x300?text=Premium+T-Shirt&bg=667eea&fg=white',
            description: 'High-quality 100% cotton t-shirt. Comfortable, breathable, and perfect for everyday wear.',
            rating: 4.5
        },
        {
            id: 2,
            name: 'Classic Blue Jeans',
            category: 'clothes',
            price: 49.99,
            stock: 30,
            image: 'https://via.placeholder.com/280x300?text=Classic+Jeans&bg=764ba2&fg=white',
            description: 'Stylish denim jeans with perfect fit. Great for casual or smart casual looks.',
            rating: 4.7
        },
        {
            id: 3,
            name: 'Summer Floral Dress',
            category: 'clothes',
            price: 59.99,
            stock: 25,
            image: 'https://via.placeholder.com/280x300?text=Summer+Dress&bg=f093fb&fg=white',
            description: 'Lightweight and breathable summer dress. Perfect for hot weather.',
            rating: 4.6
        }
    ];
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', function() {
    displayProducts('all');
    updateCartCount();
    setupEventListeners();
    displayProductsInAdmin();
    loadCartFromStorage();
});

// ===== Event Listeners =====
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
            displayProductsArray(filtered);
        });
    }

    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.toggle('active');
            }
        });
    }

    window.onclick = function(event) {
        const cartModal = document.getElementById('cartModal');
        const productModal = document.getElementById('productModal');
        
        if (event.target === cartModal) closeCart();
        if (event.target === productModal) closeProductModal();
    };
}

// ===== Products Display =====
function filterProducts(category) {
    displayProducts(category);
}

function displayProducts(category) {
    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    displayProductsArray(filtered);
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function displayProductsArray(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px;">No products found</p>';
        return;
    }

    productsGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.stock < 10 ? '<div class="product-badge">Low Stock</div>' : ''}
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">${'⭐'.repeat(Math.floor(product.rating))} (${product.rating})</div>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <div class="product-actions">
                        <button class="btn-view" onclick="openProductModal(${product.id})">View</button>
                        <button class="btn-cart" onclick="addToCart(${product.id})" title="Add to Cart">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Product Modal =====
function openProductModal(productId) {
    currentProductId = productId;
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailCategory').textContent = '📦 ' + product.category.toUpperCase();
    document.getElementById('detailDescription').textContent = product.description;
    document.getElementById('detailPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('detailStock').textContent = `${product.stock} in stock`;
    document.getElementById('detailRating').textContent = `⭐ ${product.rating} rating`;
    document.getElementById('quantity').value = 1;
    document.getElementById('quantity').max = product.stock;

    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function increaseQuantity() {
    const input = document.getElementById('quantity');
    const maxStock = products.find(p => p.id === currentProductId)?.stock || 1;
    if (parseInt(input.value) < maxStock) {
        input.value = parseInt(input.value) + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function addToCartFromModal() {
    const quantity = parseInt(document.getElementById('quantity').value);
    for (let i = 0; i < quantity; i++) {
        addToCart(currentProductId);
    }
    closeProductModal();
    alert('✅ Product added to cart!');
}

function buyNow() {
    addToCartFromModal();
    setTimeout(() => openCart(), 300);
}

// ===== Shopping Cart =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock <= 0) {
        alert('❌ Product is out of stock!');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            alert('❌ Cannot add more! Only ' + product.stock + ' available.');
            return;
        }
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function openCart() {
    document.getElementById('cartModal').classList.add('active');
    displayCart();
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const subtotal = document.getElementById('subtotal');
    const shipping = document.getElementById('shipping');
    const total = document.getElementById('total');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">🛒 Your cart is empty</p>';
        subtotal.textContent = '$0.00';
        total.textContent = '$5.00';
        return;
    }

    let subtotalAmount = 0;
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotalAmount += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-quantity">Qty: <strong>x${item.quantity}</strong></div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-item-total">
                    <strong>$${itemTotal.toFixed(2)}</strong>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    subtotal.textContent = '$' + subtotalAmount.toFixed(2);
    const totalAmount = subtotalAmount + 5.00;
    total.textContent = '$' + totalAmount.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = document.getElementById('total').textContent;
    alert('✅ Thank you for your purchase!\n\nTotal: ' + total + '\n\nYour order has been confirmed!');
    cart = [];
    saveCart();
    updateCartCount();
    closeCart();
    displayCart();
}

// ===== ADMIN PANEL - LIKE FACEBOOK =====
function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('prodName').value.trim();
    const category = document.getElementById('prodCategory').value;
    const price = parseFloat(document.getElementById('prodPrice').value);
    const stock = parseInt(document.getElementById('prodStock').value);
    const image = document.getElementById('prodImage').value.trim();
    const description = document.getElementById('prodDescription').value.trim();
    const rating = parseFloat(document.getElementById('prodRating').value) || 4.5;

    // Validation
    if (!name || !category || !price || !image || !description || price <= 0) {
        alert('❌ Please fill all required fields with valid data!');
        return;
    }

    if (editingProductId) {
        // EDIT MODE - Update existing product
        const index = products.findIndex(p => p.id === editingProductId);
        if (index > -1) {
            products[index] = {
                id: editingProductId,
                name: name,
                category: category,
                price: price,
                stock: stock,
                image: image,
                description: description,
                rating: rating
            };
            alert('✅ Product updated successfully!');
            editingProductId = null;
            document.querySelector('.admin-form-wrapper h3').innerHTML = '<i class="fas fa-plus-circle"></i> Add New Product';
        }
    } else {
        // ADD MODE - New product
        const newProduct = {
            id: Math.max(...products.map(p => p.id), 0) + 1,
            name: name,
            category: category,
            price: price,
            stock: stock,
            image: image,
            description: description,
            rating: rating
        };
        products.push(newProduct);
        alert('✅ Product posted successfully! 📱');
    }

    saveProducts();
    document.getElementById('productForm').reset();
    displayProductsInAdmin();
    displayProducts('all');
}

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function displayProductsInAdmin() {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;

    if (products.length === 0) {
        productsList.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No products posted yet. Post your first product!</p>';
        return;
    }

    productsList.innerHTML = `
        <div class="products-count">Total Products: <strong>${products.length}</strong></div>
        ${products.map(product => `
            <div class="product-item-fb">
                <div class="product-item-header-fb">
                    <div class="product-item-details">
                        <h4>${product.name}</h4>
                        <span class="category-badge">${product.category}</span>
                        <p class="product-meta"><strong>$${product.price.toFixed(2)}</strong> | Stock: ${product.stock} | ⭐${product.rating}</p>
                        <p class="product-desc-admin">${product.description}</p>
                    </div>
                    <img src="${product.image}" alt="${product.name}" class="product-thumb-admin">
                </div>
                <div class="product-item-actions-fb">
                    <button class="btn-edit-fb" onclick="editProduct(${product.id})" title="Edit">
                        <i class="fas fa-pencil-alt"></i> Edit
                    </button>
                    <button class="btn-delete-fb" onclick="deleteProduct(${product.id})" title="Delete">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('')}
    `;
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        displayProductsInAdmin();
        displayProducts('all');
        alert('✅ Product deleted successfully!');
    }
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        editingProductId = productId;
        
        // Fill form with product data
        document.getElementById('prodName').value = product.name;
        document.getElementById('prodCategory').value = product.category;
        document.getElementById('prodPrice').value = product.price;
        document.getElementById('prodStock').value = product.stock;
        document.getElementById('prodImage').value = product.image;
        document.getElementById('prodDescription').value = product.description;
        document.getElementById('prodRating').value = product.rating;

        // Change button label
        document.querySelector('.admin-form-wrapper h3').innerHTML = '<i class="fas fa-edit"></i> Edit Product';

        // Scroll to admin panel
        document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Utility Functions =====
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
