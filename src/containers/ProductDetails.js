import React from 'react'
import { getProductById } from '../api/ProductAPI'
import { Redirect } from 'react-router-dom'

class ProductDetails extends React.Component {
    state={
        product: null
    }
    componentDidMount(){
        // get product
        const id = this.props.match.params.id
        const isNum = this.validateId()
        // console.log(id.length)
        console.log(isNum)
        if(isNum){
            getProductById(id) // get id from current URL
            .then((product)=>{
                console.log(product)
                this.setState({
                    product:product ? product : 'notFound' 
                })
            })
            .catch(err => console.log(err))
        }
        else{
            this.setState({
                product:'notFound' 
                })
        }
    }
    validateId =()=>{
        const id = this.props.match.params.id.trim()
        let isNum
        for(let i=0 ; i < id.length;i++){
            console.log(id[i])
            isNum = 0 <= id[i] && id[i] <= 9 && id[i] !== ' '? true : false
            console.log(isNum)
            if(!isNum){
                return isNum
            }
        }
        return isNum
    }

    render(){
        const {product} =this.state
        console.log(product)
        if(product === 'notFound'){
            return <Redirect to='/notFound' /> // if the product not found go to page 404 
        }
        return (
            <div>
            {product && (
                <div className="product">
                {product.image && (
                    <img
                    src={product.image}
                    className="product-avatar"
                    alt={`product of ${product.title}`}
                    />
                )}
                <div className="product-details">
                    <h3 className="product-title" >{product.title}</h3>
                    <div className="product-meta">
                    <p className="product-price">{product.price}</p>
                    <p className="product-category">{product.category}</p>
                    </div>
                    <p className="product-description">{product.description}</p>
                </div>
                </div>
            )}
            </div>
        )
    }
}

export default ProductDetails
