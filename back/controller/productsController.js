const producto = require("../models/productos") //importar el Schema de producto para poder usarlo
const fetch = (url) => import('node-fetch').then(({default:fetch}) => fetch(url));

//Ver la lista de productos

exports.getProducts = async(req, res, next) => {
    const productos = await producto.find();
    if(!productos){
        return res.status(404).json({
            success: false,
            message: "No se encuentran los productos"
        })
    }else{
        res.status(200).json({
            success:true,
            count: productos.length,
            productos
        })
    }
}

//Consulta de un producto por ID

exports.getProductsById = async(req, res, next) => {
    const product = await producto.findById(req.params.id);
    if (!product){
        return res.status(404).json({
            sucess: false,
            message: "No se encuentra ese producto",
            error: true
        })
    }else{
        res.status(200).json({
            success:true,
            mensaje: "esta es la información del producto solicitado",
            product
        })
    }   
}

//Crear un nuevo producto /api/productos
exports.newProduct = async(req, res, next) => {
    const product = await producto.create(req.body);
    res.status(201).json({
        sucess:true,
        product
    })
}

//Update un producto

exports.updateProduct = async(req,res,next) => {
    let product = await producto.findById(req.params.id);
    //Verifico si el producto existe
    if (!product){
        return res.status(404).json({
            sucess: false,
            message: "No se encuentra ese producto"
        })
    }
    //Si existe, ejecuto la actualización
    else{  
        product = await producto.findByIdAndUpdate(req.params.id, req.body,{
            new: true, //Valido solo los atributos nuevos o actualizados
            runValidators: true
        });
        //Respondo ok si el producto se actualizó
        res.status(200).json({
            success:true,
            mensaje: "Producto actualizado correctamente",
            product
        })
    }    
}

//Eliminar un producto
exports.deleteProduct = async(req,res,next) => {
    const product = await producto.findById(req.params.id);
    //Verifico si el producto existe
    if (!product){
        return res.status(404).json({ //Si el objeto no existe, return termina el método
            sucess: false,
            message: "No se encuentra ese producto"
        })
    }else{
        await product.remove(); //Eliminamos el producto
        res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente"
        })
    }
}

//Hablemos de FETCH
//Ver todos los productos

function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

//verProductos(); //Llamamos al método creado para probar la consulta

//Ver por id

function verProductoPorID(id){
    fetch('http://localhost:4000/api/productos/'+id)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

//verProductoPorID('63558c2db682a01d44cffd4e'); //Probamos el método con un Id existente en la base de datos