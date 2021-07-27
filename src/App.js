import React, { Component } from 'react'
import { deleteProduct, getAllProduct } from './api/ProductAPI'
import ProductList from './containers/ProductList'
import ProductDetails from './containers/ProductDetails'
import PageNotFound from "./components/PageNotFound/PageNotFound";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

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
      <div>
        <Router>
          <Switch>

            <Route path="/product/:id" render={(match) => <ProductDetails productID = {match.match.params.id}
                                                                          onDeleteProduct = {this.handleDeleteProduct.bind(this)}/>} />

            <Route exact path="/">
              <ProductList
                products={this.state.products}
                onDeleteProduct={this.handleDeleteProduct.bind(this)}
              />
            </Route>
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App