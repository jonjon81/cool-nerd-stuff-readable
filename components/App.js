import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleProducts from '../sample-products';
import Product from './Product';
import base from '../base';

class App extends React.Component {
  constructor() {
    super()

    this.addProduct = this.addProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // getinitialState
    this.state = {
      products: {},
      order: {}
    };
  }

  componentWillMount() {
    // this runs right before app is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/products`
      , {
      context: this,
      state: 'products'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }

  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order));
  }

  addProduct(product) {
    // update our state
    const products = {...this.state.products};
    // add in our new product
    const timestamp = Date.now();
    products[`product-${timestamp}`] = product;
    // set state
    this.setState({ products })
  }

  updateProduct(key, updatedProduct) {
    const products = {...this.state.products};
    products[key] = updatedProduct;
    this.setState({ products });
  }

  removeProduct(key) {
    const products = {...this.state.products};
    products[key] = null;
    this.setState({ products });
  }

  loadSamples() {
    this.setState({
      products: sampleProducts
    })
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add new number of product ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="guaranteed coolness" name="Wowee"/>
          <ul className="list-of-products">
            {
              Object
                .keys(this.state.products)
                .map(key => <Product key={key} index={key} details={this.state.products[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
          products={this.state.products}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
        addProduct={this.addProduct}
        loadSamples={this.loadSamples}
        products={this.state.products}
        updateProduct={this.updateProduct}
        removeProduct={this.removeProduct}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default App;