import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getProductById } from '../api/ProductAPI'

class ProductPage extends React.Component {
  id = this.props.match.params.id
  state = { product: '' }
  async componentDidMount() {
    const product = await getProductById(this.id)
    this.setState({ product })
  }

  render() {
    return (
      <div>
        {this.state.product && (
          <div className="product">
            {this.state.product.image && (
              <img
                src={this.state.product.image}
                className="product-avatar"
                alt={`product of ${this.state.product.title}`}
              />
            )}
            <div className="product-details">
              <h3 className="product-title">{this.state.product.title}</h3>
              <div className="product-meta">
                <p className="product-price">{this.state.product.price + '$'}</p>
                <p className="product-category">{this.state.product.category}</p>
              </div>
              <p className="product-description">{this.state.product.description}</p>
            </div>
            <Link to="/">Back to homepage</Link>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(ProductPage)
