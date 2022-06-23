const { BadRequestError } = require("../utils/errors")
const { storage } = require("../data/storage")


class Store {
    // not putting async for now
    static getAllProducts() {
      return storage.get("products").value()
    }

    static getAllPurchases() {
      return storage.get("purchases").value()
    }
    
    static getPurchaseById(purchaseId) {
      // get a single purchase
      const purchase = storage
        .get("purchases")
        .find({ id: Number(purchaseId) })
        .value()
      return purchase
    }

    static getProductById(productId) {
      // get a single product
      const product = storage
        .get("products")
        .find({ id: Number(productId) })
        .value()
      return product
    }

    static recordPurchase(user, shoppingCart) {
      if (!user) {
        throw new BadRequestError(`No user sent`)
      }
      if (!shoppingCart) {
        throw new BadRequestError(`No shoppingCart sent`)
      }
      const userRequiredFields = ["name", "email"]
      userRequiredFields.forEach((field) => {
        if (!user[field] && user[field] !== 0) {
          throw new BadRequestError(`Field: ${field} is required in user`)
        }
      })

      let totalMoneySpent = 0
      let oneItemTotal = 0
      let oneItemTax = 0
      let productIdsInShoppingCart = new Set();

      const shoppingCartItemRequiredFields = ["itemId", "quantity"]
      shoppingCart.forEach((productObject) => {
        shoppingCartItemRequiredFields.forEach((field) => {
          if (!productObject[field] && productObject[field] !== 0) {
            throw new BadRequestError(`Field: ${field} is required in every object in shoppingCart`)
          }
        })
        productIdsInShoppingCart.add(productObject.itemId)
        oneItemTotal = productObject.quantity * Store.getProductById(productObject.itemId).price
        oneItemTax = oneItemTotal * 0.0875
        totalMoneySpent += oneItemTotal + oneItemTax
      })

      if (productIdsInShoppingCart.size !== shoppingCart.length)
      {
        // duplicates found
        throw new BadRequestError(`Duplicates found in shopping cart`)
      }
      
      const purchaseId = storage.get("purchases").value().length + 1
      const createdAt = new Date().toISOString()
  
      const newPurchase = { id: purchaseId, 
                            name: user.name,
                            email: user.email,
                            order: shoppingCart,
                            total: totalMoneySpent.toFixed(2),
                            createdAt: createdAt.toString()  }
  
      storage.get("purchases").push(newPurchase).write()
  
      return newPurchase
    }

}

module.exports = Store