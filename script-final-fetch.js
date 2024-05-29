document.addEventListener("DOMContentLoaded", function () {

    const productContainer = document.getElementById("product-container");
    console.log(productContainer)
    var products = [];

    fetch('/productos.json')
        .then(res => res.json())
        .then(data => {
            console.log(data, 'data de los productos');



            renderProducts(data);

            function renderProducts(productos) {
                productos.forEach(function (product, index) {
                    products.push(product);

                    const productDiv = document.createElement("div");
                    productDiv.classList.add("col-md-4", "col-sm-12");
                    productDiv.innerHTML = `
                    <div class="card cajita">
                        <img src="${product.image}" class="card-img-top" alt="Img del curso">
                        <div class="card-body card-nombre">
                            <div class="product">
                                <h2>${product.name}</h2>
                                <p>Precio: $${product.price}</p>
                                <div class="quantity">
                                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                                    <span class="quantity-value">1</span>
                                    <button class="quantity-btn increase" data-index="${index}">+</button>
                                </div>
                                <button class="add-to-cart">¡Lo quiero!</button>
                            </div>
                        </div>
                    </div>
                `;
                    productContainer.appendChild(productDiv);
                });
            }

            const addToCartButtons = document.querySelectorAll(".add-to-cart");
            console.log(addToCartButtons)
            const clearCartButton = document.getElementById("clear-cart");
            const cartContainer = document.getElementById("cart");
            const cartItems = document.getElementById("cart-items");
            const checkoutButton = document.getElementById("checkout");
            const cartTotal = document.getElementById("cart-total");
            //Agregar
            addToCartButtons.forEach(function (button, index) {
                button.addEventListener("click", function () {
                    const quantity = parseInt(productContainer.querySelectorAll('.quantity-value')[index].textContent);
                    for (let i = 0; i < quantity; i++) {
                        addToCart(products[index]);
                    }
                    updateCartUI();
                    //Usando Toastify:
                    Toastify({
                        text: "¡Yeiii! Tu producto se agregó 😋 ",
                        duration: 3000,
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                    }).showToast();
                });
            });

            clearCartButton.addEventListener("click", function () {
                clearCart();
                updateCartUI();
            });
            //Pagar
            checkoutButton.addEventListener("click", function () {
                Swal.fire({
                    title: "Pago realizado con éxito 🤑",
                    text: "¡Juntos haremos cosas maravillosas!",
                    icon: "success"
                });
            });
            //Vaciar
            clearCartButton.addEventListener("click", function () {
                Swal.fire({
                    title: "¡Oh no! Tu carrito está vacío de nuevo 😣",
                    text: "",
                    icon: "success"
                });
            });

            const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
            const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
            //Menos
            decreaseButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    const index = parseInt(button.getAttribute('data-index'));
                    const valueElement = button.nextElementSibling;
                    let value = parseInt(valueElement.textContent);
                    if (value > 1) {
                        value--;
                        valueElement.textContent = value;
                    }
                });
            });
            //Más
            increaseButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    const index = parseInt(button.getAttribute('data-index'));
                    const valueElement = button.previousElementSibling;
                    let value = parseInt(valueElement.textContent);
                    value++;
                    valueElement.textContent = value;
                });
            });
            //Agregar
            function addToCart(item) {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push(item);
                localStorage.setItem("cart", JSON.stringify(cart));
            }

            function clearCart() {
                localStorage.removeItem("cart");
            }
            //Borrar producto
            function updateCartUI() {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                cartItems.innerHTML = "";
                let total = 0;
                cart.forEach(function (item, index) {
                    const li = document.createElement("li");
                    li.textContent = `${item.name} $${item.price}`;

                    // Botón para eliminar el producto individualmente
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Borrar";
                    removeButton.classList.add("remove-from-cart");
                    removeButton.classList.add("btn");
                    removeButton.classList.add("btn-link");
                    //Estilos botón eliminar
                    removeButton.style.fontWeight = "bold";
                    removeButton.style.color = "black";
                    removeButton.style.backgroundColor = "rgb(228 239 255 / 72%)";
                    removeButton.style.fontSize = "8px";
                    removeButton.style.marginLeft = "8px";
                    removeButton.setAttribute("data-index", index);
                    removeButton.addEventListener("click", function () {
                        removeFromCart(index);
                        updateCartUI();
                    });

                    li.appendChild(removeButton);
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

            function removeFromCart(index) {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.splice(index, 1); // Eliminación de los productos en el carrito
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        })
        .catch(error => console.log(error))

    // Function to render the products

});
