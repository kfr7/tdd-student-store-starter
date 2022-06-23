const express = require("express")
const Store = require("../models/store")
const { NotFoundError } = require("../utils/errors")
const router = express.Router()

// return ALL products for GET 
router.get("/", async (req, res, next) => {
  try {
    const products = await Store.getAllProducts()
    res.status(200).json({ products })
  } catch (err) {
    next(err)
  }
})

router.get("/purchases", async (req, res, next) => {
  try {
    const purchases = await Store.getAllPurchases()
    res.status(200).json({ purchases })
  } catch (err) {
    next(err)
  }
})

// return SINGLE purchase for GET 
router.get("/purchases/:purchaseId", async (req, res, next) => {
  try {
    const purchaseId = req.params.purchaseId
    const purchase = await Store.getPurchaseById(purchaseId)
    if (!purchase) {
      throw new NotFoundError(`Purchase with ID... ${purchaseId} not found`)
    }
    res.status(200).json({ purchase })
  } catch (err) {
    next(err)
  }
})

// return SINGLE product for GET 
router.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId
    const product = await Store.getProductById(productId)
    if (!product) {
      throw new NotFoundError(`Product with ID... ${productId} not found`)
    }
    res.status(200).json({ product })
  } catch (err) {
    next(err)
  }
})

// {user: {name: checkoutForm.name, email: checkoutForm.email}, shoppingCart: shoppingCart}
// UPDATE db.json file with new shopping cart item(s) POST
router.post("/", async (req, res, next) => {
  try {
    const user = req.body.user
    const shoppingCart = req.body.shoppingCart
    const newPurchase = await Store.recordPurchase(user, shoppingCart)
    res.status(201).json({ "purchase": newPurchase })
  } catch (err) {
    next(err)
  }
})


module.exports = router