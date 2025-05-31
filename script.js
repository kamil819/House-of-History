// Байланыш формасы (жөнөтүү)
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Сиздин билдирүү жөнөтүлдү! Рахмат.");
});

// Себет элементтери
const cartItems = document.getElementById('cart-items');
const totalEl = document.getElementById('total');
const clearBtn = document.getElementById('clear-cart');

let cart = {};

// Себетти жаңыртуу функциясы
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    for (let title in cart) {
        const item = cart[title];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement('li');
        li.innerHTML = `
            ${title} — ${item.price} USD × ${item.quantity} = ${itemTotal} USD
            <button class="decrease">−</button>
            <button class="increase">+</button>
            <button class="remove">x</button>
        `;
        li.setAttribute('data-title', title);
        cartItems.appendChild(li);
    }

    totalEl.textContent = `Итого: ${total} USD`;
}

// Сатып алуу баскычы иштейт
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const item = e.target.closest('.item');
        const title = item.querySelector('h3').innerText;
        const priceText = item.querySelector('.price').innerText;
        const price = parseInt(priceText.replace(/[^\d]/g, ''));

        if (cart[title]) {
            cart[title].quantity += 1;
        } else {
            cart[title] = { price, quantity: 1 };
        }

        updateCartDisplay();
    });
});

// Себеттеги "+" "−" "x" баскычтары
cartItems.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    const title = li.getAttribute('data-title');

    if (e.target.classList.contains('increase')) {
        cart[title].quantity += 1;
    } else if (e.target.classList.contains('decrease')) {
        cart[title].quantity -= 1;
        if (cart[title].quantity <= 0) delete cart[title];
    } else if (e.target.classList.contains('remove')) {
        delete cart[title];
    }

    updateCartDisplay();
});

// Себетти толугу менен тазалоо
clearBtn.addEventListener('click', () => {
    cart = {};
    updateCartDisplay();
});
