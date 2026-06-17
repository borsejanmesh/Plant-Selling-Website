// Product Data (Expanded with Real Images)
const products = [
    {
        id: 1,
        name: "Snake Plant",
        price: 499,
        image: "https://www.ugaoo.com/cdn/shop/files/1_0061f10d-18e9-47b3-aced-b7ddfae135ff.jpg?v=1765224194&width=1000",
        category: "Low Light"
    },
    {
        id: 2,
        name: "Monstera Deliciosa",
        price: 1299,
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
        category: "Popular"
    },
    {
        id: 3,
        name: "Peace Lily",
        price: 399,
        image: "https://www.ugaoo.com/cdn/shop/files/final_p.jpg?v=1758283634&width=1000",
        category: "Flowering"
    },
    {
        id: 4,
        name: "Fiddle Leaf Fig",
        price: 1599,
        image: "https://www.ugaoo.com/cdn/shop/files/2_649a98cb-6818-4a48-b52f-024e8392f66b.jpg?v=1717308876&width=1000",
        category: "Large"
    },
    {
        id: 5,
        name: "Aloe Vera",
        price: 299,
        image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80",
        category: "Succulent"
    },
    {
        id: 6,
        name: "Rubber Plant",
        price: 699,
        image: "https://www.ugaoo.com/cdn/shop/products/GroPot_997d008c-0bd8-4ec4-8540-498d4c9338f3.jpg?v=1706609471&width=1000",
        category: "Low Light"
    },
    {
        id: 7,
        name: "Spider Plant",
        price: 349,
        image: "https://www.ugaoo.com/cdn/shop/files/1_ec5c0b2a-34b6-4fd2-b95b-0775fc80d710.jpg?v=1709643092&width=1000",
        category: "Air Purifying"
    },
    {
        id: 8,
        name: "Areca Palm",
        price: 899,
        image: "https://www.ugaoo.com/cdn/shop/files/1_65df4ea5-2702-4a23-b434-7dad643b4e03.jpg?v=1744815220&width=1000",
        category: "Large"
    },
    {
        id: 9,
        name: "Jade Plant",
        price: 449,
        image: "https://www.ugaoo.com/cdn/shop/files/1_69c03517-6f5a-4f05-baa1-06df9db2c9d2.jpg?v=1710422375&width=1000",
        category: "Succulent"
    },
    {
        id: 10,
        name: "ZZ Plant",
        price: 799,
        image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80",
        category: "Low Light"
    },
    {
        id: 11,
        name: "Pothos Neon",
        price: 249,
        image: "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=600&q=80",
        category: "Hanging"
    },
    {
        id: 12,
        name: "Bamboo Palm",
        price: 1099,
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80",
        category: "Pet Safe"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const shopContainer = document.getElementById('shop-products');
const cartContainer = document.getElementById('cart-items');
const cartCountBubble = document.querySelector('.cart-count');
const cartTotalElement = document.getElementById('cart-total');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const themeToggleBtn = document.getElementById('theme-toggle');

// Helper: Format Price
const formatPrice = (price) => `₹${price}`;

// Theme Logic
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Cart Logic
function updateCartCount() {
    if (cartCountBubble) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountBubble.textContent = totalItems;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();

    // Toast notification (simple alert for now, could be improved)
    // alert(`${product.name} added to cart!`);

    // Optional: Visual feedback on button
    const btn = document.querySelector(`button[onclick="addToCart(${productId})"]`);
    if (btn) {
        const originalText = btn.textContent;
        btn.textContent = "Added!";
        btn.style.backgroundColor = "var(--secondary-green)";
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = ""; // Reset to default
        }, 1000);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

// Rendering
function renderShop() {
    if (!shopContainer) return;

    shopContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/400x500/2D6A4F/FFFFFF?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="product-info">
                <span class="category-tag">${product.category}</span>
                <div class="product-name">${product.name}</div>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function renderCart() {
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--gray);">Your cart is empty. <br><a href="shop.html" style="color:var(--primary-green); text-decoration:underline; font-weight:bold;">Go Shopping</a></td></tr>';
        if (cartTotalElement) cartTotalElement.textContent = formatPrice(0);
        if (cartSubtotalElement) cartSubtotalElement.textContent = formatPrice(0);
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <tr>
            <td>
                <div class="cart-item-info">
                   <img src="${item.image}" alt="${item.name}" class="cart-item-img" style="width: 80px; height: 80px; border-radius: 10px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/100x100?text=${encodeURIComponent(item.name)}'">
                    <div>
                        <div style="font-weight: 600; font-size: 1.1rem;">${item.name}</div>
                        <div style="color: var(--gray); font-size: 0.9rem;">${item.category}</div>
                    </div>
                </div>
            </td>
            <td>${formatPrice(item.price)}</td>
            <td>
                <div style="font-weight: 600;">${item.quantity}</div>
            </td>
            <td>${formatPrice(item.price * item.quantity)}</td>
            <td>
                <i class="remove-btn" onclick="removeFromCart(${item.id})" style="cursor: pointer; color: #ef233c; font-size: 1.4rem; padding: 10px;">✖</i>
            </td>
        </tr>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotalElement) cartTotalElement.textContent = formatPrice(total);
    if (cartSubtotalElement) cartSubtotalElement.textContent = formatPrice(total);
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateCartCount();
    renderShop();
    renderCart();

    // Bind Toggle Event
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});
