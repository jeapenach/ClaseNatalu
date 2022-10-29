const express = require("express")
const router = express.Router();

const {getProducts, newProduct, getProductsById, updateProduct, deleteProduct} = require("../controller/productsController"); //Traemos la respuesta json desde el controlador

router.route('/productos').get(getProducts); //Establecemos desde que ruta queremos ver el getProducts
router.route('/productos/:id').get(getProductsById); //Ruta para encontrar un producto por ID. los dos puntos son para indicar que es el Id es un parámetro
router.route('/productos').post(newProduct); //Ruta para crear un nuevo producto
router.route('/productos/:id').put(updateProduct) //Creación de la ruta de actualización de un artículo
router.route('/productos/:id').delete(deleteProduct) // Ruta para crear el producto por id

module.exports = router;