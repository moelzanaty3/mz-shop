import React from 'react'
import Product from '../components/Product'
import {getProductById } from '../api/ProductAPI'


class ProductDetails extends React.Component {

  state = {
    product : ""
  }

  async componentDidMount() {

    let product = await getProductById(this.props.productID);
    this.setState({product: product});

  }
  render(){

    return (
      <div>
        {this.state.product && <Product key={this.state.product.id} product = {this.state.product} onDeleteProduct={this.props.onDeleteProduct}/>}
      </div>
    )
}
}


export default ProductDetails
