const cart1 = 
  [
    {"AVOCADO": {price: 3.0, clearance: true}},
    {"AVOCADO": {price: 3.0, clearance: true}},
    {"KALE": {price: 3.0, clearance: false}}
  ]

const consolidateCart = (cart) => {
  const consolidatedCart = {}
  cart.forEach((item) =>{
    //console.log(item)
    let currentKey = Object.keys(item)[0]
    if(!consolidatedCart[currentKey]){
      //console.log(Item not in consolidatedCart: ${item})
      consolidatedCart[currentKey] = {
        price: item[currentKey].price,
        clearance: item[currentKey].clearance,
        count: 1
      }
    }else{
      consolidatedCart[currentKey].count++;
    }
  })
  //console.log(consolidatedCart)
  return consolidatedCart;
}

const cart2 = {
  "AVOCADO": {price: 3.0, clearance: true, count: 3},
  "KALE": {price: 3.0, clearance: false, count: 1}
}

const coupons = {item: "AVOCADO", num: 2, cost: 5.0}

const applyCoupons = (cart, coupons) => {
  let ourCart = cart;
  // console.log(coupons)
  let currentCouponKey = coupons.item;
  for(const item in ourCart) {
    // let currentCartKey = Object.keys(ourCart)[0];
    if(item === currentCouponKey) {
      // console.log('if ran')
      // console.log(coupons.num)
      // console.log(ourCart[currentCartKey].count);
      let uncouponableItems = ourCart[item].count - coupons.num;
      console.log(uncouponableItems)
      ourCart[item].count = uncouponableItems
      let clearancePrice = coupons.cost
      ourCart[`${item} W/COUPON`] = {price: clearancePrice, clearance: true, count:1}
    }
  }
  console.log(Object.keys(ourCart))
  return ourCart;
}

console.log(applyCoupons(cart2, coupons));

// {
//   "AVOCADO": {price: 3.0, clearance: true, count: 1},
//   "KALE": {price: 3.0, clearance: false, count: 1},
//   "AVOCADO W/COUPON": {price: 5.0, clearance: true, count: 1}
// }

const applyClearance = (cart) =>{
  // code here
}

const checkout = (cart, coupons) => {
  // code here
}
