import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Product = ({ product, onDeleteProduct }) => {
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
            <Link to={`products/${product.id}`}>
              <h3 className="product-title">{product.title}</h3>
            </Link>
            <div className="product-meta">
              <p className="product-price">{product.price}</p>
              <p className="product-category">{product.category}</p>
            </div>
            <p className="product-description">{product.description}</p>
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

export default Product
