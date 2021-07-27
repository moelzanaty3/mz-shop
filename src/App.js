import React, { Component } from 'react'
import { deleteProduct, getAllProduct } from './api/ProductAPI'
import ProductList from './containers/ProductList'
import { Switch, Route } from 'react-router-dom'
import ProductPage from './components/ProductPage'

class App extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    // get products
    getAllProduct().then(products => {
      if (Array.isArray(products)) {
        this.setState({ products })
      }
    })
  }

  handleDeleteProduct(productId) {
    this.setState(prevState => ({
      products: prevState.products.filter(p => p.id !== productId)
    }))
    deleteProduct(productId).catch(err => console.log(err))
  }

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <div>
            <ProductList
              products={this.state.products}
              onDeleteProduct={this.handleDeleteProduct.bind(this)}
            />
          </div>
        </Route>
        <Route path="/products/:id">
          <ProductPage />
        </Route>
        <Route path="/">
          <img src="https://i.stack.imgur.com/6M513.png" alt="Error:404 Page not found "></img>
        </Route>
      </Switch>
    )
  }
}

export default App
