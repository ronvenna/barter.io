import React from 'react';
import Rodal from 'rodal';
import Header from './Header';

class Items extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      items: [],
      modalOpen: false,
      selectedItem: null,
    }

    this.showItem = this.showItem.bind(this);
    this.hideItem = this.hideItem.bind(this);
    this.getItems = this.getItems.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  showItem(item) {
    this.setState({ modalOpen: true, selectedItem: item });
  }

  hideItem() {
    this.setState({ modalOpen: false, selectedItem: null });
  }

  getItems() {
    this.setState({ loading: true });
    fetch('/api/v1/availableItems')
      .then((res) => res.json())
      .then((items) => this.setState(() => ({ items, loading: false })))
      .catch(console.error)
  }

  renderItem(item) {
    return (
      <div
        className="item"
        key={item.itemid}
        onClick={() => this.showItem(item)}
      >
        <div className="item__title_container">
          <p className="item__title"> {item.itemname} </p>
        </div>
        {
          item.itemtype ? (
            <img
              alt={item.itemname}
              className="item__image"
              src={item.itemtype}
            />
        ) : null
        }
      </div>
    )
  }

  render(){
    const {
      items,
      selectedItem,
    } = this.state;
    console.log(selectedItem);
    console.log(items);
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
                    this.state.items.map(this.renderItem)
                  }
                </div>
              )
        }
        <Rodal visible={this.state.modalOpen} onClose={this.hideItem} animation="slideUp">
          {
            selectedItem && (
              <div className="selected_item">
                <h2> {selectedItem.itemname} </h2>
                {
                  selectedItem.itemtype && (
                    <img
                      alt={selectedItem.itemname}
                      className="item__image"
                      src={selectedItem.itemtype}
                    />
                  )
                }
                <div className="submitItem">
                  <a href="mailto:user@example.com?subject=Subject&body=message%20goes%20here">
                    <button className="postButton">Barter for item</button>
                  </a>
                </div>
              </div>
            )
          }
        </Rodal>
      </div>
    );
  }
}


export default Items;
