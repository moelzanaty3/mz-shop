import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

class Product extends React.Component {

  handleProductDetails = (e,id) => {
      e.preventDefault()
      this.props.history.push(`/products/${id}`)
}
render() {
const {product, onDeleteProduct} = this.props
console.log(this.props)
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
            <h1 className="product-title" onClick={(e)=>this.handleProductDetails(e,product.id)}>{product.title}</h1>
            <div className="product-meta">
              <p className="product-price">{product.price}</p>
              <p className="product-category">{product.category}</p>
            </div>
          </div>
          <button
            className="product-remove"
            onClick={() => {
              onDeleteProduct(product.id)
            }}
          >
            remove
          </button>
        </div>
      )}
    </div>
  )

}
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    image: PropTypes.string
  }).isRequired,
  onDeleteProduct: PropTypes.func.isRequired
}

export default withRouter(Product)
