import React from 'react';

class Items extends React.Component {

  componentDidMount() {
    fetch('/api/v1/items')
      .then((res) => res.json())
      .then(console.log)
      .catch(console.log)
  }

  render(){
    return(
      <div className="items">
        {
          [...Array(200).keys()].map(() => <div className="item" />)
        }
      </div>
    );
  }
}


export default Items;
