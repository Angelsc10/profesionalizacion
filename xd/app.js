       document.addEventListener('DOMContentLoaded', function () {
            const cartItemsDiv = document.querySelector('.cart-items');
            const cartTotalPriceSpan = document.querySelector('#cart-total-price');
            const checkoutButton = document.querySelector('.checkout-button');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            function displayCart() {
                cartItemsDiv.innerHTML = '';
                let totalPrice = 0;

                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    totalPrice += itemTotal;

                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item');
                    cartItemDiv.innerHTML = `
                        <span class="item-name">${item.name}</span>
                        <span class="item-quantity">Cantidad: ${item.quantity}</span>
                        <span>$${itemTotal.toFixed(2)}</span>
                    `;
                    cartItemsDiv.appendChild(cartItemDiv);
                });

                cartTotalPriceSpan.textContent = totalPrice.toFixed(2);
            }

            displayCart();

            checkoutButton.addEventListener('click', function () {
                let totalPrice = parseFloat(cartTotalPriceSpan.textContent);
                const iva = totalPrice * 0.16;  // 16% IVA (Mexico)
                const finalTotal = totalPrice + iva;

                alert(`
                    Subtotal: $${totalPrice.toFixed(2)}
                    IVA (16%): $${iva.toFixed(2)}
                    Total: $${finalTotal.toFixed(2)}
                `);

                localStorage.removeItem('cart'); // Clear the cart after "purchase"
                cart = [];
                displayCart();
            });
        });