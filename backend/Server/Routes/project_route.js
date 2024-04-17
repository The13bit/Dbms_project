/**
 * This is the main router for handling project routes.
 * The router is an instance of the Express router class
 * and is exported at the bottom of the file.
 */
import express, { Router } from "express";

/**
 * These are the controller functions that handle the
 * business logic for each of the routes.
 */
import {
  add_prdoct_to_cart,
  get_cart,
  increase_quantity,
  insert_product,
  insert_customer,
  remove_product_from_cart,
  remove_product_from_warehouse,
  add_warehouse,
  remove_warehouse,
  fetch_customers,
  fetch_warehouse,
  remove_customer,
  fetch_product,
  delete_product,
  fetch_only_products,
  fetch_warehose_conatining_product,
} from "../Controller/project_cont.js";

/**
 * This is the Express router instance for handling
 * project routes.
 */
const router = express.Router();

/**
 * These are the route definitions for the router. Each
 * route is a POST request to the given URL and calls the
 * corresponding controller function.
 */
router.route("/insert_customer").post(insert_customer); // Adds a new customer to the DB
router.route("/delete_customer").post(remove_customer); // Removes a customer from the DB
router.route("/insert_product").post(insert_product); // Adds a new product to the DB
router.route("/add_to_cart").post(add_prdoct_to_cart); // Adds a product to an existing cart
router.route("/increase_quantity").post(increase_quantity); // Increases the quantity of a product in a cart
router.route("/fetch_cart").post(get_cart); // Fetches the contents of a cart
router.route("/remove_from_cart").post(remove_product_from_cart); // Removes a product from a cart
router.route("/remove_from_warehouse").post(remove_product_from_warehouse); // Removes a product from a warehouse
router.route("/add_warehouse").post(add_warehouse); // Adds a new warehouse to the DB
router.route("/remove_warehouse").post(remove_warehouse); // Removes a warehouse from the DB
router.route("/delete_product").post(delete_product); // Removes a product from the DB
router.route("/fetch_warehouse_product").post(fetch_warehose_conatining_product)
/**
 * These are GET routes that fetch data from the DB
 * using a controller function.
 */
router.route("/fetch_customer").get(fetch_customers); // Fetches all customers from the DB
router.route("/fetch_warehouse").get(fetch_warehouse); // Fetches all warehouses from the DB
router.route("/fetch_product").get(fetch_product); // Fetches all products from the DB
router.route("/fetch_only_product").get(fetch_only_products)

/**
 * This is the exported router that is used by the
 * main app.js file to handle project routes.
 */
export default router;
