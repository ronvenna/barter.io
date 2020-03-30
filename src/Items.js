import React from 'react';
import Header from './Header';

class Items extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      items: [],
    }
    this.getItems = this.getItems.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    this.setState({ loading: true });
    fetch('/api/v1/items')
      .then((res) => res.json())
      .then((items) => this.setState(() => ({ items, loading: false })))
      .catch(console.error)
  }

  renderImage(image) {
    return (
      <div className="item" key={image.itemid}>
        <div className="item__title_container">
          <p className="item__title"> {image.itemname} </p>
        </div>
        {
          image.itemtype ? (
            <img
              alt={image.itemname}
              className="item__image"
              src={image.itemtype}
            />
        ) : null
        }
      </div>
    )
  }

  render(){
    return (
      <div>
        <Header
          refresh={this.getItems}
        />
        {
          this.state.loading
            ?
              (
                <div className="loading-items">
                  <img
                    alt="loading"
                    className="loading-items__image"
                    src="https://webstockreview.net/images/hexagon-clipart-transparent-background.gif"
                  />
                </div>
              )
            :
              (
                <div className="items">
                  {
                    this.state.items.map(this.renderImage)
                  }
                </div>
              )
        }
      </div>
    );
  }
}


export default Items;
