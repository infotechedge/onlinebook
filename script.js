let cart = [];

function addToCart(bookName, price, type) {
    cart.push({ name: bookName, price: price * 100, type: type });
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

function viewCart() {
    const cartItemsList = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} (${item.type}) - ₦${(item.price / 100).toFixed(2)}`;

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.style.marginLeft = "10px";
        removeButton.style.padding = "5px 10px";
        removeButton.style.background = "red";
        removeButton.style.color = "white";
        removeButton.style.border = "none";
        removeButton.style.borderRadius = "5px";
        removeButton.style.cursor = "pointer";

        removeButton.onclick = function () {
            removeFromCart(index);
        };

        li.appendChild(removeButton);
        cartItemsList.appendChild(li);
        total += item.price;
    });

    totalPrice.textContent = (total / 100).toFixed(2);
    document.getElementById("cart-modal").style.display = "block";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    viewCart();
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "payment.html";
}

