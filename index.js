const items = 
  [
    {"AVOCADO": {price: 3.0, clearance: true}},
    {"AVOCADO": {price: 3.0, clearance: true}},
    {"KALE": {price: 3.0, clearance: false}}
  ]
  const items2 = [
    {"KALE": {price: 3.0, clearance: false, count: 1}}]

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
// console.log(consolidateCart(items2));

const cart2 = {
  "AVOCADO": {price: 3.0, clearance: true, count: 2},
  "KALE": {price: 3.0, clearance: false, count: 1}
}

const coupons = [{item: "AVOCADO", num: 2, cost: 5.0}]

const applyCoupons = (cart, coupon) => {
  if(coupon.length > 0) {
  const couponProduct = coupon[0].item
  for(const item in cart){
    if(item === couponProduct){
      if(cart[item].count - coupon[0].num >= 0){
        const eligibleSetsForCoupon = Math.floor(cart[item].count / coupon[0].num)
        cart[`${item} W/COUPON`] = {
          price: coupon[0].cost,
          clearance: cart[item].clearance,
          count: eligibleSetsForCoupon
        }
        const remainingCount =  cart[item].count - (eligibleSetsForCoupon * coupon[0].num)
        cart[item].count = remainingCount
      }
    }
    return cart
  }
  }
  return cart
}


// console.log(applyCoupons(items2, coupons));

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


const checkout = (cart, coupons) => {
  // code here
  const ourCart = consolidateCart(cart)
  // console.log(ourCart)
  // console.log(coupons)
  const couponedCart = applyCoupons(ourCart, coupons)
  // console.log(couponedCart)
  const discountCart = applyClearance(couponedCart);
  console.log(discountCart)
  let cartTotal = 0
  for(let item in discountCart) {
    cartTotal += discountCart[item].price * discountCart[item].count
  } 
// console.log(cartTotal)
return cartTotal
}

console.log(checkout(items2, []));
