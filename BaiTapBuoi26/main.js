const products = [
    {id: 1, name: "Gạo ST25 (5kg)", price: 180000, remaining: 20},
    {id: 2, name: "Dầu ăn Simply (1L)", price: 65000, remaining: 15},
    {id: 3, name: "Nước mắm Nam Ngư (750ml)", price: 45000, remaining: 30},
    {id: 4, name: "Sữa tươi Vinamilk (1L)", price: 38000, remaining: 25},
    {id: 5, name: "Trứng gà (10 quả)", price: 42000, remaining: 18}
]

const orders = []
let nextOrderId = 1
createOrder = (productId, orderQuantity) => {
    if (productId == null || orderQuantity == null) {
        return "Invalid"
    }
    const product = products.find(function (p) {
        return p.id === productId
    })
    if (!product) {
        return "Product not found"
    }
    if (product.remaining < orderQuantity) {
        console.log("out of stock");
        return;
    }
    const order = {
        id: nextOrderId++,
        productId,
        quantity: orderQuantity
    }
    orders.push(order)
    product.remaining -= orderQuantity;
    return order
}
console.log(createOrder(1, 5))
console.log(createOrder(2, 3))


updateOrder = (orderId, quantity) => {
    const order = orders.find(function (o) {
        return o.id === orderId
    })
    if (!order) {
        return "Not found"
    }
    const product = products.find(function (p) {
        return p.id === order.productId
    })
    const diff = quantity - order.quantity
    if (diff > 0 && product.remaining < diff) {
        return "out of stock"
    }
    product.remaining -= diff
    order.quantity = quantity
}
console.log("============Update Order==============")
updateOrder(1, 8)
console.log(orders)
console.log(products)

deleteOrder = (orderId) => {
    if (orderId === null) {
        return "Invalid"
    }
    const order = orders.find(function (o) {
        return o.id === orderId
    })
    if (!order) {
        return "Not found"
    }
    const product = products.find(function (p) {
        return p.id === order.productId
    })
    product.remaining += order.quantity
    orders.splice(orders.indexOf(order), 1)
}
console.log("============Delete Order==============")
deleteOrder(2)
console.log(orders)
console.log(products)
