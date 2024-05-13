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

const applyCoupons = (cart, coupon) => {
  coupon.forEach(coupon => {
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
      }
      return cart
      }
    })
    return cart
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
  const ourCart = consolidateCart(cart)
  const couponedCart = applyCoupons(ourCart, coupons)
  const discountCart = applyClearance(couponedCart);
  let cartTotal = 0
  for(let item in discountCart) {
    cartTotal += discountCart[item].price * discountCart[item].count
  } 
  if(cartTotal > 100) {
    cartTotal = cartTotal * (1 - .10)
    cartTotal = Math.round(cartTotal * 100) / 100
    return cartTotal
  }
return cartTotal
}
