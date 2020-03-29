import React from 'react';

class Items extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      items: [],
    }
  }

  componentDidMount() {
    fetch('/api/v1/items')
      .then((res) => res.json())
      .then((items) => this.setState(() => ({ items, loading: false })))
      .catch(console.error)
  }

  renderImage(image) {
    console.log(image);
    var blob = new Blob( image.itempicturelocation.data, { type: "image/jpeg" } );
    const imgSrc = `data:image/jpg;base64,${btoa(image.itempicturelocation.data.toString())}`;
    console.log(imgSrc);
    return (
      <div className="item" key={image.itemid}>
        <img src={imgSrc} />
      </div>
    )
  }

  render(){
    if (this.state.loading) {
      return (
        <div className="loading-items">
          <img
            alt="loading"
            className="loading-items__image"
            src="https://webstockreview.net/images/hexagon-clipart-transparent-background.gif"
          />
        </div>
      )
    }
    return (
      <div className="items">
        {
          this.state.items.map(this.renderImage)
        }
      </div>
    );
  }
}


export default Items;
