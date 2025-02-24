document.addEventListener("DOMContentLoaded", function () {
    let cart = {};
    
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", function () {
            let id = this.dataset.id;
            let name = this.dataset.name;
            let price = parseFloat(this.dataset.price);
            
            cart[id] = cart[id] || { name, price, quantity: 0 };
            cart[id].quantity++;
            updateCart();
        });
    });

    function updateCart() {
        let cartList = document.querySelector(".cart-items");
        let total = 0;
        cartList.innerHTML = "";

        Object.keys(cart).forEach(id => {
            let item = cart[id];
            total += item.price * item.quantity;

            let div = document.createElement("div");
            div.innerHTML = `
                ${item.name} ($${item.price.toFixed(2)}) 
                <button class="decrease" data-id="${id}">-</button> 
                ${item.quantity} 
                <button class="increase" data-id="${id}">+</button> 
                <button class="remove" data-id="${id}">🗑️</button>
            `;
            cartList.appendChild(div);
        });

        document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
        attachEvents();
    }

    function attachEvents() {
        document.querySelectorAll(".increase").forEach(btn => btn.addEventListener("click", function () {
            cart[this.dataset.id].quantity++;
            updateCart();
        }));

        document.querySelectorAll(".decrease").forEach(btn => btn.addEventListener("click", function () {
            cart[this.dataset.id].quantity > 1 ? cart[this.dataset.id].quantity-- : delete cart[this.dataset.id];
            updateCart();
        }));

        document.querySelectorAll(".remove").forEach(btn => btn.addEventListener("click", function () {
            delete cart[this.dataset.id];
            updateCart();
        }));
    }

    document.querySelector(".confirm-order").addEventListener("click", function () {
        if (Object.keys(cart).length > 0) document.querySelector(".modal").style.display = "block";
        else alert("El carrito está vacío.");
    });

    document.querySelector(".new-order").addEventListener("click", function () {
        cart = {};
        updateCart();
    });

    document.querySelector(".close-modal").addEventListener("click", function () {
        document.querySelector(".modal").style.display = "none";
    });
});
