const products = [
    {id: 1, name: 'iPhone', price: 2000},
    {id: 2, name: 'Samsung', price: 1500},
    {id: 3, name: 'Xiaomi', price: 1000},
    {id: 4, name: 'Oppo', price: 1200}
]

const orders = [
    {
        id: 1,
        items: [
            {productId: 1, quantity: 2},
            {productId: 2, quantity: 1}
        ]
    },
    {
        id: 2,
        items: [
            {productId: 1, quantity: 1},
            {productId: 3, quantity: 3}
        ]
    },
    {
        id: 3,
        items: [
            {productId: 2, quantity: 2},
            {productId: 4, quantity: 1}
        ]
    }
]

function findTopProduct() {
    let maxRevenue = 0
    let result   = null

         // 1. Loop through each product in the product list
    for (let p of products) {
        let totalSold = 0

        // 2. Find how many times this product appears in all orders
        for (let order of orders) {
            for (let item of order.items) {
                if (item.productId === p.id) {
                    totalSold += item.quantity
                }
            }
        }

        // 3. Calculate revenue of the current product
        let revenue = totalSold * p.price

        // 👉 Log revenue of each product
        console.log(`Product: ${p.name}, Sold: ${totalSold}, Revenue: ${revenue}`)

        // 4. Compare to find the product with the highest revenue
        if (revenue > maxRevenue) {
            maxRevenue = revenue
            result = {
                product: p,
                sold: totalSold,
                revenue: revenue
            }
        }
    }
    return result
}
const top = findTopProduct()
console.log(`Top revenue product: ${top.product.name}, Sold: ${top.sold}, Revenue: ${top.revenue}`)
// Gemini Support

