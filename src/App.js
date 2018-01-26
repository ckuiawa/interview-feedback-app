import React, { Component } from 'react';

import PageContainer from './components/container/PageContainer';
import './App.css';

class App extends Component {

  constructor() {
    super();

    // productId comes from api.
    this.productId = 1000001;
  }

  render() {

    return (
      <div>
        <PageContainer productId={this.productId}></PageContainer>
      </div>
    );
  }
}

export default App;
