import Products from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ message: "Internal server error" });
    // Error check for more than ONE json
  }
};

// export const getProduct = async (req, res) => {
//   try {
//     const product = await Products.findOne({
//       where: { id: req.params.id },
//       attributes: ['id', 'name', 'price', 'category']
//     });
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (error) {
//     console.error('Error in getProduct:', error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

//TODO CREATE PRODUCTS AS ONE JSON.
// export const createProducts = async (req, res) => {
//   try {
//     // const { name, price, category } = req.body;
//     // const newProduct = await Products.create({
//     //   name,
//     //   price,
//     //   image,
//     //   category
//     // });
//     const products = req.body;
//     console.log(products);
//     const newProducts = await Products.create(products);
//     res.status(201).json(newProducts);
//   } catch (error) {
//     console.error('Error in createProduct:', error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const updateProduct = async (req, res) => {
  try {
    // const { name, price, category } = req.body;
    // const updatedProduct = await Products.update({
    //   name,
    //   price,
    //   image,
    //   category
    // }, {
    //   where: { id: req.params.id }
    // });
    // if (!updatedProduct[0]) return res.status(404).json({ message: "Product not found" });

    const products = req.body;
    console.log("Products Request: ", products);
    const updatedProducts = await Products.update(products);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error('Error in updateProduct:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const deleteProduct = async (req, res) => {
//   try {
//     const deletedProduct = await Products.destroy({
//       where: { id: req.params.id }
//     });
//     if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error('Error in deleteProduct:', error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };