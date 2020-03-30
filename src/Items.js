import React from 'react';
import Rodal from 'rodal';
import Header from './Header';

class Items extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      items: [],
      allItems: [],
      modalOpen: false,
      selectedItem: null,
    }

    this.search = this.search.bind(this);
    this.showItem = this.showItem.bind(this);
    this.hideItem = this.hideItem.bind(this);
    this.getItems = this.getItems.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.generateEmailTemplate = this.generateEmailTemplate.bind(this);
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
    fetch('/api/v1/availableitems')
      .then((res) => res.json())
      .then((items) => this.setState(() => ({ allItems: items, items, loading: false })))
      .catch(console.error)
  }

  search(value) {
    console.log(value)
    if(!value) {
      this.setState({ items: this.state.allItems });
    } else {
      this.setState({
        items: this.state.allItems.filter(c => c.itemname.toLowerCase().indexOf(value.toLowerCase()) >= 0)
      });
    }
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
          item.itempicturelocation ? (
            <img
              alt={item.itemname}
              className="item__image"
              src={item.itempicturelocation}
            />
        ) : null
        }
      </div>
    )
  }

  generateEmailTemplate(selectedItem) {
    const emailTemplate = `mailto:ronvenna@egmail.com?Subject=%20Let%27s%20Barter%21&Body=Hey%20Posting%20User%2C%0AI%20saw%20your%20post%20about%20Posted%20Item.%20Would%20you%20be%20willing%20to%20exchange%20it%20for%20%5Blet%20requesting%20user%20enter%20items%20they%20want%20here%5D%0ABest%2C%0ARequesting%20User`;
    return emailTemplate;
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
          onSearch={this.search}
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
                <h3> Description </h3>
                <p> {selectedItem.itemtype} </p>
                <br />
                <h4> Location: {selectedItem.zipcode} </h4>
                <h4> Quantity: {selectedItem.quantity} </h4>
                {
                  selectedItem.itempicturelocation && (
                    <img
                      alt={selectedItem.itemname}
                      className="item__image"
                      src={selectedItem.itempicturelocation}
                    />
                  )
                }
                <div className="submitItem">
                  <a href={this.generateEmailTemplate(selectedItem)}>
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
