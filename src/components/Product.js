import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";


const AddProduct = () => {
    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [company, setCompany] = React.useState('')
    const [errormessage, setError] = React.useState(false)

    const onClickFunc = async () => {
        if (!name || !price || !category || !company) {
            setError(true)
            return false
        }

        const userId = JSON.parse(localStorage.getItem('user')).data._id
        console.warn("this is for debug", userId)
        let result = await fetch('http://localhost:3001/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

        result = await result.json()
        if (result) {
            alert("Product has been saved")
        }
        console.warn(result.data, "has been saved")

    }

    // const addProduct= ()=>{
    //     console.warn(name,price,category,company)
    // }

    return (
        <div className='product'>
            <h1>
                Add product
            </h1>

            <input type='text' placeholder='Enter product name' className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }}></input>
            {errormessage && !name && <span className='errorCss'>Product name field is Invalid or Empty</span>}
            <input type='text' placeholder='Enter Price' className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
            {errormessage && !price && <span className='errorCss'>Price field is Invalid or Empty</span>}
            <input type='text' placeholder='category' className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
            {errormessage && !category && <span className='errorCss'>category name field is Invalid or Empty</span>}
            <input type='text' placeholder='company' className='inputBox' value={company} onChange={(e) => { setCompany(e.target.value) }}></input>
            {errormessage && !company && <span className='errorCss'>company field is Invalid or Empty</span>}
            <button type='submit' onClick={onClickFunc}>Add Product</button>
        </div>
    )
}
const ProductList = () => {

    const [product, setProduct] = useState([]);
  
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:3001/get-product',{
            headers : {
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
             }
        })
        result = await result.json()
        setProduct(result)


    }
    const deleteProduct = async (id) => {
        console.warn("id is ====", id)
        let result = await fetch(`http://localhost:3001/delete-product/${id}`, {
            method: 'Delete',
            headers : {
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
             }
        })

        result = await result.json()
        if (result) {
            alert("Product has been deleted")
            getProducts()
        }

    }

    const searchProduct = async (event)=>{
        let key = event.target.value
        if(!key){
            getProducts()
        }
        let result = await fetch(`http://localhost:3001/search/${key}`,{
            headers : {
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
             }
        })
        result = await result.json()
        setProduct(result)
        // console.warn("search data is ===", result)
    }
    console.warn("prodcts==", product);
    return (
        <div className='product-list'>
            <input type='text' placeholder='Search Products' onChange={searchProduct}>
            </input>
            <h1>Products</h1>
            <ul>
                <li>s no.</li>
                <li>name</li>
                <li>category</li>
                <li>price</li>
                <li>Operation</li>
            </ul>

            {
             product.length? product.map((product, index) => (
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{product.name}</li>
                        <li>{product.category}</li>
                        <li>{product.price}</li>
                        <li><button onClick={() => deleteProduct(product._id)}>delete</button>
                            <Link to={"/update/" + product._id}>Update</Link>
                        </li>

                    </ul>
                ))
                :
                <h1>No result found</h1>
            }
        </div>

    )
}

const UpdateProduct = () => {
    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [company, setCompany] = React.useState('')
    let navigate = useNavigate()
    let params = useParams()
    useEffect(() => {
        GetProductWithId()
    }, [])

    let GetProductWithId = async () => {
        let result = await fetch(`http://localhost:3001/product/${params.id}`,{
            headers : {
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
             }
        })
        result = await result.json()

        console.warn("get data", result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)

    }
    const onClickFunc = async () => {
        console.warn(name, price, category, company)
        let result = await fetch(`http://localhost:3001/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json",
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        })
        result = await result.json()
        console.warn("result is ====", result)
        navigate('/products')
    }


    return (
        <div className='product'>
            <h1>
                update product
            </h1>

            <input type='text' placeholder='Enter product name' className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }}></input>
            {!name && <span className='errorCss'>Product name field is Invalid or Empty</span>}
            <input type='text' placeholder='Enter Price' className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
            {!price && <span className='errorCss'>Product price field is Invalid or Empty</span>}
            <input type='text' placeholder='category' className='inputBox' value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
            {!category && <span className='errorCss'>Product category field is Invalid or Empty</span>}
            <input type='text' placeholder='company' className='inputBox' value={company} onChange={(e) => { setCompany(e.target.value) }}></input>
            {!company && <span className='errorCss'>Product company field is Invalid or Empty</span>}
            <button type='submit' onClick={onClickFunc}>Update Product</button>
        </div>
    )
}

export { AddProduct, ProductList, UpdateProduct };
