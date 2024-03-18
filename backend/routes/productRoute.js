const express = require("express");
const {
  getAllproducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser,authorizedRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllproducts);
router.route("/admin/products").get(isAuthenticatedUser,authorizedRole("admin"), getAdminProducts);
router.route("/admin/products/new").post(isAuthenticatedUser,authorizedRole("admin"), createProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser,authorizedRole("admin"), updateProducts)
  .delete(isAuthenticatedUser,authorizedRole("admin"),deleteProduct)
router.route("/products/:id").get(getSingleProduct);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReviews)
router.route("/review/delete").delete(isAuthenticatedUser,deleteProductReview);

module.exports = router;
