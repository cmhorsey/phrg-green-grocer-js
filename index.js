const items = 
  [
    {"AVOCADO": {price: 3.0, clearance: true}},
    {"AVOCADO": {price: 3.0, clearance: true}},
    {"KALE": {price: 3.0, clearance: false}}
  ]

const consolidateCart = (items) => {
  const cart = {}
  for(const item in items){
    const itemKey = Object.keys(items[item])[0]
    if(cart.hasOwnProperty(itemKey)){
      cart[itemKey].count++
    }else{
      cart[itemKey] = {
        price: items[item][itemKey].price,
        clearance: items[item][itemKey].clearance,
        count: 1
      }
    }
  }
  return cart
}
//console.log(consolidateCart(items));

const cart2 = {
  "AVOCADO": {price: 3.0, clearance: true, count: 2},
  "KALE": {price: 3.0, clearance: false, count: 1}
}

const coupons = {item: "AVOCADO", num: 2, cost: 5.0}

const applyCoupons = (cart, coupon) => {
  const couponProduct = coupon.item
  for(const item in cart){
    if(item === couponProduct){
      if(cart[item].count - coupon.num >= 0){
        const eligibleSetsForCoupon = Math.floor(cart[item].count / coupon.num)
        cart[`${item} W/COUPON`] = {
          price: coupon.cost,
          clearance: cart[item].clearance,
          count: eligibleSetsForCoupon
        }
        const remainingCount =  cart[item].count - (eligibleSetsForCoupon * coupon.num)
        cart[item].count = remainingCount
      }
      return cart
    }
  }
}
//console.log(applyCoupons(cart2, coupons));

const cart3 = {
  "PEANUTBUTTER": {price: 3.00, clearance: true, count: 2},
  "KALE": {price: 3.00, clearance: false, count: 3},
  "SOY MILK": {price: 4.50, clearance: true, count: 1}
}

const applyClearance = (cart) =>{
  const discount = .20;
  for(const item in cart){
    if(cart[item].clearance === true){
      const discountPrice = cart[item].price * (1 - discount)
      cart[item].price = Math.round(discountPrice * 100) / 100
    }
  }
  return cart
}
console.log(applyClearance(cart3))
// {
//   "PEANUTBUTTER": {price: 2.40, clearance: true, count: 2},
//   "KALE": {price: 3.00, clearance: false, count: 3},
//   "SOY MILK": {price: 3.60, clearance: true, count: 1}
// }
const checkout = (cart, coupons) => {
  // code here
}
