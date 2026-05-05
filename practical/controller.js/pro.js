import express from "express";
import { StatusCodes } from "http-status-pro-js";

//add product
export const addProduct = async (req, res) => {
    try {
        const { name, price, stock, category } = req.body;
        // Create new product
        const newProduct = new product({
            name,
            price,
            stock,
            category
        });
        // Save product to database
        await newProduct.save();
        res.status(StatusCodes.CREATED).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error adding product" });
    }
};

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Find product by id and delete
        const deletedProduct = await product.findByIdAndDelete(id);     
        if (!deletedProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
        }
        res.status(StatusCodes.OK).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error deleting product" });
    }
};