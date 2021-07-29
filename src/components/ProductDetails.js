import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getProductById} from '../api/ProductAPI';

class ProductDetails extends Component {
  state = {
    product: null
  };

  componentDidMount() {
    const path = this.props.path.replace(/\/$/, '');
    const match = path.match(/(?<=products\/)\d+$/),
      id = match ? match[0] : '';
    getProductById(id).then(response => {
      (response instanceof Array) | (response === null)
        ? this.setState({product: {}})
        : this.setState({product: response});
    });
  }

  render() {
    const product = this.state.product;
    return product ? (
      JSON.stringify(product) === JSON.stringify({}) ? (
        <h1 class="error">Invalid Product ID</h1>
      ) : (
        <div className="product">
          {product.image && <img src={product.image} className="product-avatar" alt={`product of ${product.title}`} />}
          <div className="product-details">
            <h3 className="product-title">{product.title}</h3>
            <div className="product-meta">
              <p className="product-price">{product.price}</p>
              <p className="product-category">{product.category}</p>
            </div>
            <p className="product-description" style={{whiteSpace: 'normal'}}>
              {product.description}
            </p>
          </div>
        </div>
      )
    ) : (
      <span class="not-found">Loading...</span>
    );
  }
}

ProductDetails.propTypes = {
  path: PropTypes.string.isRequired
};

export default ProductDetails;