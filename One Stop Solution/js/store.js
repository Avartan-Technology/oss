if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButton = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButton)
    for (var i = 0; i < removeCartItemButton.length; i++) {
        var button = removeCartItemButton[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-qt-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('btn-success')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var imageSrc = document.getElementsByClassName('img-fluid')[0].src
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText

    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByTagName('cart-items')[0]
    var cartRowContents = `
    <tr class="cart-item">
                                                <td class="product-col">
                                                    <img src="img/cart/2.jpg" alt="">
                                                    <div class="pc-title">
                                                        <h4>Laptop</h4>
                                                        <span class="cart-price">Rs.120000</span>
                                                    </div>
                                                </td>

                                                <td class="quy-col">
                                                    <div class="quantity">
                                                        <div class="pro-qty">
                                                            <input class="cart-qt-input" type="number" value="1">
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="size-col">
                                                    <h4>ABC</h4>
                                                </td>
                                                <td class="total-col">
                                                    <h4 class="total-price">Rs.120000</h4>
                                                </td>
                                                <td>
                                                    <button class=" btn btn-danger" type="button">REMOVE</button>
                                                </td>
                                            </tr>

    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByTagName('tbody')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-item')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-qt-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rs.', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-cost')[0].innerText = 'Total Amount' + ' ' + 'Rs.' + total

}