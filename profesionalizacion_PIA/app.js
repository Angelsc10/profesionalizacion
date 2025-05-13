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
        if (cart.length === 0) {
            alert('El carrito está vacío. Por favor, añade productos antes de finalizar la compra.');
            return;
        }

        let totalPrice = parseFloat(cartTotalPriceSpan.textContent);
        const iva = totalPrice * 0.16;  // 16% IVA (Mexico)
        const finalTotal = totalPrice + iva;

        // Html de la compra
        const invoiceHTML = `
            <div class="invoice-container">
                <div class="invoice-header">
                    <h2>Gracias por tu compra</h2>
                <table class="invoice-items">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cart.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.price.toFixed(2)}</td>
                                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="invoice-totals">
                    <p><strong>Subtotal:</strong> $${totalPrice.toFixed(2)}</p>
                    <p><strong>IVA (16%):</strong> $${iva.toFixed(2)}</p>
                    <p style="font-size: 1.2em;"><strong>Total:</strong> $${finalTotal.toFixed(2)}</p>
                </div>
                <div class="invoice-footer">
                </div>
            </div>
        `;

        // Diseño
        const modalOverlay = document.createElement('div');
        modalOverlay.style.position = 'fixed';
        modalOverlay.style.top = '0';
        modalOverlay.style.left = '0';
        modalOverlay.style.width = '100%';
        modalOverlay.style.height = '100%';
        modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modalOverlay.style.display = 'flex';
        modalOverlay.style.justifyContent = 'center';
        modalOverlay.style.alignItems = 'center';
        
        // visualizar el html
        modalOverlay.innerHTML = invoiceHTML;
        
        // diseño del boton para finalizar
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cerrar y Finalizar';
        closeButton.style.position = 'absolute';
        closeButton.style.bottom = '20px';
        closeButton.style.padding = '10px 20px';
        closeButton.style.backgroundColor = '#4CAF50';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
            localStorage.removeItem('cart');
            cart = [];
            displayCart();
        });
        
        modalOverlay.querySelector('.invoice-container').appendChild(closeButton);
        
        // añadimos el ticket de compra
        document.body.appendChild(modalOverlay);
    });
});