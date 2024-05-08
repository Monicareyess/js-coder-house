document.addEventListener("DOMContentLoaded", function() {
    const products = [
        { name: "Diseño gráfico", price: 100000 },
        { name: "Marketing digital", price: 50000 },
        { name: "Mantenimiento de página web", price: 200000 }
    ];

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const clearCartButton = document.getElementById("clear-cart");
    const cartContainer = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const checkoutButton = document.getElementById("checkout");
    const cartTotal = document.getElementById("cart-total");

    addToCartButtons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            addToCart(products[index]);
            updateCartUI();
        });
    });

    clearCartButton.addEventListener("click", function() {
        clearCart();
        updateCartUI();
    });

    checkoutButton.addEventListener("click", function() {
               alert("Pago realizado con éxito 🤑 . ¡Gracias por su compra!");
        clearCart();
        updateCartUI();
    });

    function addToCart(item) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function clearCart() {
        localStorage.removeItem("cart");
    }

    function updateCartUI() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach(function(item) {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price}`;
            cartItems.appendChild(li);
            total += item.price;
        });
        cartTotal.textContent = `$${total}`;
        if (cart.length > 0) {
            cartContainer.style.display = "block";
        } else {
            cartContainer.style.display = "none";
        }
    }

    updateCartUI();
});
