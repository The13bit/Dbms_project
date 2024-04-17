import { catchAsyncError } from "../middleware/CatchAsyncError.js";
import { connection } from "../Config/Databse.js";
import ErrorHandler from "../utils/errorHandler.js";

export const insert_customer = catchAsyncError((req, res, next) => {
  const { fname, mname, lname, email, address,city } = req.body;
  if (!fname || !mname || !lname || !email || !address||!city) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }
  connection.query(
    "INSERT INTO customer SET ?",
    { fname, mname, lname, email, address,city },
    (err, result) => {
      if (err) {
        return next(new ErrorHandler(err, 400));
      }
      res.status(200).json({
        success: true,
        message: "Customer added successfully",
      });
    }
  );
});
export const insert_product = catchAsyncError((req, res, next) => {
  const { name, price, warehouseName, stock } = req.body;
  if (!name || !price || !warehouseName || !stock) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }
  
    connection.query("Select * from product where name=?",[name],(err,result)=>{
      if(err){
        return next(new ErrorHandler(err, 400));
      }
      if(result.length>0){
        const productId = result[0].p_id;
        connection.query(
          "SELECT w_id FROM warehouse WHERE name = ?",
          [warehouseName],
          (err, result) => {
            if (err) {
              return next(new ErrorHandler(err, 400));
            }
            const warehouseId = result[0].w_id;
            connection.query(
              "INSERT INTO available (p_id, w_id, stock) VALUES (?, ?, ?)",
              [productId, warehouseId, stock],
              (err, result) => {
                if (err) {
                  return next(new ErrorHandler(err, 400));
                }
                res.status(200).json({
                  success: true,
                  message: "Product added successfully",
                });
              }
            );
          }
        );
      }
      else{
        connection.query("INSERT INTO product (name, price) VALUES (?, ?)",
        [name, price],
        (err, result) => {
          if (err) {
            return next(new ErrorHandler(err, 400));
          }
          const productId = result.insertId;
          connection.query(
            "SELECT w_id FROM warehouse WHERE name = ?",
            [warehouseName],
            (err, result) => {
              if (err) {
                return next(new ErrorHandler(err, 400));
              }
              const warehouseId = result[0].w_id;
              connection.query(
                "INSERT INTO available (p_id, w_id, stock) VALUES (?, ?, ?)",
                [productId, warehouseId, stock],
                (err, result) => {
                  if (err) {
                    return next(new ErrorHandler(err, 400));
                  }
                  res.status(200).json({
                    success: true,
                    message: "Product added successfully",
                  });
                }
              );
            }
          );
        }
      );
      }
    })
    
});
export const add_prdoct_to_cart = catchAsyncError((req, res, next) => {
  const { id_no, p_id, qty } = req.body;
  if (!id_no || !p_id || !qty) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }
  connection.query(
    "SELECT cart_id,p_id FROM contains WHERE cart_id=? AND p_id=?", [id_no, p_id],
    (err,result)=>{
      if(err){
        return next(new ErrorHandler(err, 400));
      }
      if(result.length>0){
        return next(new ErrorHandler("Product already in cart", 400));
      }
      connection.query(

        "SELECT city FROM customer WHERE id_no = ?",
        [id_no],
        (err, result) => {
          if (err) {
            return next(new ErrorHandler(err, 400));
          }
          const city = result[0].city;
          connection.query(
            "SELECT w_id FROM warehouse WHERE locality = ?",
            [city],
            (err, result) => {
              if (err) {
                return next(new ErrorHandler(err, 400));
              }
              if (result.length === 0) {
                return next(new ErrorHandler("No warehouse found in customer's city", 400));
              }
              const warehouseIds = result.map((row) => row.w_id);
              connection.query(
                "SELECT p_id FROM available WHERE p_id = ? AND w_id IN (?)",
                [p_id, warehouseIds],
                (err, result) => {
                  if (err) {
                    return next(new ErrorHandler(err, 400));
                  }
                  if (result.length === 0) {
                    return next(new ErrorHandler("Product not available in customer's city", 400));
                  }
                  connection.query(
                    "INSERT INTO contains (cart_id, p_id, qty) VALUES (?, ?, ?)",
                    [id_no, p_id, qty],
                    (err, result) => {
                      if (err) {
                        return next(new ErrorHandler(err, 400));
                      }
                      res.status(200).json({
                        success: true,
                        message: "Product added to cart successfully",
                      });
                    }
                  );
                })
              
            }
          );
        }
      );
    }
  )
  
});

export const increase_quantity=catchAsyncError((req,res,next)=>{
    const {id_no,p_id,qty}=req.body;
    if(!id_no || !p_id || !qty){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    connection.query("UPDATE contains SET qty=? WHERE cart_id=? AND p_id=?",[qty,id_no,p_id],(err,result)=>{
        if(err){
            return next(new ErrorHandler(err, 400));
        }
        res.status(200).json({
            success: true,
            message: "updated cart successfully",
        });
    })
})
//fetch contents pf cart by id_no of cutomer column where id_no is the cart_id of the contains table the contains table contains p_id of the product table which contains the product name
export const get_cart=catchAsyncError((req,res,next)=>{
    const {id_no}=req.body;
    if(!id_no){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    connection.query("SELECT product.name,contains.qty FROM product INNER JOIN contains ON product.p_id=contains.p_id WHERE contains.cart_id=?",[id_no],(err,result)=>{
        if(err){
            return next(new ErrorHandler(err, 400));
        }
        res.status(200).json({
            success: true,
            data:result
        });
    })
})
//Remove product from cart
export const remove_product_from_cart=catchAsyncError((req,res,next)=>{
    const {id_no,p_id}=req.body;
    if(!id_no || !p_id){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    connection.query("DELETE FROM contains WHERE cart_id=? AND p_id=?",[id_no,p_id],(err,result)=>{
        if(err){
            return next(new ErrorHandler(err, 400));
        }
        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
        });
    })
})
//remove product from certain warehouse
export const remove_product_from_warehouse=catchAsyncError((req,res,next)=>{
    const {p_id,w_id}=req.body;
    if(!p_id || !w_id){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    connection.query("DELETE FROM available WHERE p_id=? AND w_id=?",[p_id,w_id],(err,result)=>{
        if(err){
            return next(new ErrorHandler(err, 400));
        }
        res.status(200).json({
            success: true,
            message: "Product removed from warehouse successfully",
        });
    })
})
//add warehouse w_id,name,address,locality
export const add_warehouse=catchAsyncError((req,res,next)=>{
    const {name,address,locality}=req.body;
    if(!name || !address || !locality){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    connection.query("INSERT INTO warehouse (name,address,locality) VALUES (?,?,?)",[name,address,locality],(err,result)=>{
        if(err){
            return next(new ErrorHandler(err, 400));
        }
        res.status(200).json({
            success: true,
            message: "Warehouse added successfully",
        });
    })
})
//remove warehouse 
export const remove_warehouse=catchAsyncError((req,res,next)=>{
    const {w_id}=req.body;
    if(!w_id){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    connection.query("DELETE FROM warehouse WHERE w_id=?",[w_id],(err,result)=>{
        if(err){
            return next(new ErrorHandler(err, 400));
        }
        res.status(200).json({
            success: true,
            message: "Warehouse removed successfully",
        });
    })
})
//fetch customers
export const fetch_customers=catchAsyncError((req,res,next)=>{
    connection.query("SELECT * FROM customer",(err,result)=>{
        if(err){
            return next(new ErrorHandler(err, 400));
        }
        res.status(200).json({
            success: true,
            data:result
        });
    })
})
//fetch warehouse
export const fetch_warehouse=catchAsyncError((req,res,next)=>{
    connection.query("SELECT * FROM warehouse",(err,result)=>{
        if(err){
            return next(new ErrorHandler(err, 400));
        }
        res.status(200).json({
            success: true,
            data:result
        });
    })
})
//remove customer
export const remove_customer=catchAsyncError((req,res,next)=>{
    const {id_no}=req.body;
    if(!id_no){
        return next(new ErrorHandler("Please fill all the fields", 400));
    }
    connection.query("DELETE FROM customer WHERE id_no=?",[id_no],(err,result)=>{
        if(err){
            return next(new ErrorHandler(err, 400));
        }
        if(result.affectedRows===0){
            return next(new ErrorHandler("Customer not found", 400));
        }
        res.status(200).json({
            success: true,
            message: "Customer removed successfully",
        });
    })
})
//fetch products
export const fetch_product=catchAsyncError((req,res,next)=>{
  connection.query("SELECT p.p_id,p.name as Product_name,p.price,a.stock,w.w_id,w.name as Warehouse_name FROM product p INNER JOIN available a ON p.p_id=a.p_id INNER JOIN warehouse w ON a.w_id=w.w_id",(err,result)=>{
      if(err){
          return next(new ErrorHandler(err, 400));
      }
      res.status(200).json({
          success: true,
          data:result
      });
  })
})
//delete product
export const delete_product=catchAsyncError((req,res,next)=>{
  const {p_id}=req.body;
  if(!p_id){
      return next(new ErrorHandler("Please fill all the fields", 400));
  }
  connection.query("DELETE FROM product WHERE p_id=?",[p_id],(err,result)=>{
      if(err){
          return next(new ErrorHandler(err, 400));
      }
      if(result.affectedRows===0){
          return next(new ErrorHandler("Product not found", 400));
      }
      res.status(200).json({
          success: true,
          message: "Product removed successfully",
      });
  })
})
export const fetch_only_products=catchAsyncError((req,res,next)=>{
  connection.query("SELECT * FROM product",(err,result)=>{
      if(err){
          return next(new ErrorHandler(err, 400));
      }
      res.status(200).json({
          success: true,
          data:result
      });
  })
})

export const fetch_warehose_conatining_product=catchAsyncError((req,res,next)=>{
  const {p_id}=req.body
  if(!p_id){
    return next(new ErrorHandler("Enter Product id",400))
  }
  connection.query("Select w.w_id, w.name from product p inner join available a on a.p_id=p.p_id inner join warehouse w on w.w_id=a.w_id where p.p_id=?  ",[p_id],(err,result)=>{
     if(err){
      return next(new ErrorHandler(err,400))
     }
     res.status(200).json({
      success:true,
      data:result
     })
  })
})




