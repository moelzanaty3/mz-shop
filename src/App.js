import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {deleteProduct, getAllProduct} from './api/ProductAPI';
import ProductList from './containers/ProductList';
import ProductDetailsContainer from './containers/ProductDetailsContainer';

class App extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    // get products
    getAllProduct().then(products => {
      if (Array.isArray(products)) {
        this.setState({products});
      }
    });
  }

  handleDeleteProduct(productId) {
    this.setState(prevState => ({
      products: prevState.products.filter(p => p.id !== productId)
    }));
    deleteProduct(productId).catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => (
              <ProductList products={this.state.products} onDeleteProduct={this.handleDeleteProduct.bind(this)} />
            )}
          />
          <Route path="/products/" component={ProductDetailsContainer} />
          <Route
            render={() => (
              <div style={{textAlign: 'center'}}>
                <h1>Error: 404</h1>
                <p>Page not found!</p>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;