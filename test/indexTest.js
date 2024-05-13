require ( './helpers.js' )

const { expect } = require('chai')

describe("Grocer", function() {
  let items = [
    {"AVOCADO": {price: 3.00, clearance: true}},
    {"KALE": {price: 3.00, clearance: false}},
    {"BLACK_BEANS": {price: 2.50, clearance: false}},
    {"ALMONDS": {price: 9.00, clearance: false}},
    {"TEMPEH": {price: 3.00, clearance: true}},
    {"CHEESE": {price: 6.50, clearance: false}},
    {"BEER": {price: 13.00, clearance: false}},
    {"PEANUTBUTTER": {price: 3.00, clearance: true}},
    {"BEETS": {price: 2.50, clearance: false}},
    {"SOY MILK": {price: 4.50, clearance: true}}
  ]

  let coupons = [
    {item: "AVOCADO", num: 2, cost: 5.00},
    {item: "BEER", num: 2, cost: 20.00},
    {item: "CHEESE", num: 3, cost: 15.00}
  ]

  function findItem(name) {
    return items.find(item => Object.keys(item).includes(name))
  }

  function findCoupon(name) {
    return coupons.find(coupon => coupon.item === name)
  }

  describe("#consolidateCart", function() {
    it("adds a count of one to each item when there are no duplicates", function() {
      let cart = [findItem('TEMPEH'), findItem('PEANUTBUTTER'), findItem('ALMONDS')]
      let result = consolidateCart(cart)
      Object.values(result).forEach(attributes => {
        expect(Object.keys(attributes)).to.include('count')
        expect(attributes.count).to.equal(1)
      })
    })

    it("increments count when there are multiple items", function() {
      let avocado = findItem('AVOCADO')
      let cart = [avocado, avocado, findItem('KALE')]

      let result = consolidateCart(cart)
      expect(result["AVOCADO"].price).to.equal(3.00)
      expect(result["AVOCADO"].clearance).to.be.true
      expect(result["AVOCADO"].count).to.equal(2)

      expect(result["KALE"].price).to.equal(3.00)
      expect(result["KALE"].clearance).to.be.false
      expect(result["KALE"].count).to.equal(1)
    })
  })

  describe("#applyCoupons", function() {
    context("base case - with perfect coupon (number of items identical):", function() {
      let avocado, avocadoCoupon, cart, consolidatedCart, avocadoResult

      beforeEach(function() {
        avocado = findItem('AVOCADO')
        avocadoCoupon = findCoupon('AVOCADO')
        cart = [avocado, avocado]
        consolidatedCart = consolidateCart(cart)
        avocadoResult = applyCoupons(consolidatedCart, avocadoCoupon)
      })

      it("adds a new key, value pair to the cart hash called 'ITEM NAME W/COUPON'", function() {
        expect(Object.keys(avocadoResult)).to.include("AVOCADO W/COUPON")
      })

      it("adds the coupon price to the property hash of couponed item", function() {
        expect(avocadoResult["AVOCADO W/COUPON"].price).to.equal(5.00)
      })

      it("adds the count number to the property hash of couponed item", function() {
        expect(avocadoResult["AVOCADO W/COUPON"].count).to.equal(1)
      })

      it("removes the number of discounted items from the original item's count", function() {
        expect(avocadoResult["AVOCADO"].price).to.equal(3.00)
        expect(avocadoResult["AVOCADO"].count).to.equal(0)
      })

      it("remembers if the item was on clearance", function() {
        expect(avocadoResult["AVOCADO W/COUPON"].clearance).to.be.true
      })
    })
  })

  describe("#applyClearance", function() {
    it("takes 20% off price if the item is on clearance", function() {
      const cart = {
        "PEANUTBUTTER": { price: 3.00, clearance: true, count: 1 }
      }

      const result = applyClearance(cart)
      expect(result["PEANUTBUTTER"].price).to.equal(2.40)
    })

    it("does not discount the price for items not on clearance", function() {
      const cart = {
        "AVOCADO": { price: 3.00, clearance: false, count: 1 },
        "PEANUTBUTTER": { price: 3.00, clearance: true, count: 1 },
        "BEETS": { price: 2.50, clearance: false, count: 1 }
      }

      const result = applyClearance(cart)
      expect(result["AVOCADO"].price).to.equal(3.00)
      expect(result["PEANUTBUTTER"].price).to.equal(2.40)
      expect(result["BEETS"].price).to.equal(2.50)
    })
  })

  describe("#checkout", function() {
    it("calls on consolidateCart, applyCoupons, and applyClearance, and calculates the total correctly", function() {
      const items = [
        {"AVOCADO": {price: 3.0, clearance: true}},
        {"AVOCADO": {price: 3.0, clearance: true}},
        {"KALE": {price: 3.0, clearance: false}}
      ]

      const coupons = [
        {item: "AVOCADO", num: 2, cost: 5.0}
      ]

      const total = checkout(items, coupons)
      expect(total).to.equal(7.00)
    })

    it("applies no discounts if no clearance or coupons are relevant", function() {
      const items = [
        {"KALE": {price: 3.0, clearance: false, count: 1}}
      ]

      const total = checkout(items, [])
      expect(total).to.equal(3.00)
    })
  })
})
