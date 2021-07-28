import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { deleteProduct, getAllProduct } from './api/ProductAPI'
import Page404 from './components/Page404'
import ProductDetails from './containers/ProductDetails'
import ProductList from './containers/ProductList'

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
            <Route exact path='/' render={() =>(
              <ProductList
              products={this.state.products}
              onDeleteProduct={this.handleDeleteProduct.bind(this)}
            />
            )}/>
            <Route exact path='/products/:id' component={ProductDetails}/>
            <Route component={Page404}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App