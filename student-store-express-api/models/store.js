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

      let totalMoneySpent = 0;
      let oneItemTotal = 0;
      let oneItemTax = 0;
      let productIdsInShoppingCart = new Set();
      let receipt = {title: "", body: "", conclusion: ""}
      receipt.title = `Showing receipt for ${user.name} available at ${user.email}:`;

      const shoppingCartItemRequiredFields = ["itemId", "quantity"]
      shoppingCart.forEach((productObject) => {
        shoppingCartItemRequiredFields.forEach((field) => {
          if (!productObject[field] && productObject[field] !== 0) {
            throw new BadRequestError(`Field: ${field} is required in every object in shoppingCart`)
          }
        })
        let tempProductInfo = Store.getProductById(productObject.itemId)
        productIdsInShoppingCart.add(productObject.itemId)
        oneItemTotal = productObject.quantity * tempProductInfo.price
        oneItemTax = oneItemTotal * 0.0875
        totalMoneySpent += oneItemTotal + oneItemTax
        receipt.body += `${tempProductInfo.name}: ${productObject.quantity} bought @ $${tempProductInfo.price.toFixed(2)} for a total cost of $${(oneItemTotal + oneItemTax).toFixed(2)} including taxes + fees.\n`
      })

      if (productIdsInShoppingCart.size !== shoppingCart.length)
      {
        // duplicates found
        throw new BadRequestError(`Duplicates found in shopping cart`)
      }
      receipt.conclusion = `Total after taxes + fees: $${totalMoneySpent}\nThank you for your order! See you next time.`

      const purchaseId = storage.get("purchases").value().length + 1
      const createdAt = new Date().toISOString()
  
      const newPurchase = { id: purchaseId, 
                            name: user.name,
                            email: user.email,
                            order: shoppingCart,
                            total: totalMoneySpent.toFixed(2),
                            createdAt: createdAt.toString(),
                            receipt: receipt  }
  
      storage.get("purchases").push(newPurchase).write()
  
      return newPurchase
    }

}

module.exports = Store