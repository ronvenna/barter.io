import React from 'react';

// const Header = () => (
//   <div className="header">
//     <h3> Barter.io </h3>
//   </div>
// )

class Header extends React.Component {

  componentDidMount() {
    fetch('/api/v1/items')
      .then((res) => res.json())
      .then(console.log)
      .catch(console.log)
  }

  render(){
    return(
      <div className="header">
        <h3> Barter.io </h3>
      </div>
    );
  }
}


export default Header;
