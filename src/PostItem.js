import React from 'react';
import { Widget } from "@uploadcare/react-widget";

class PostItem extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      quanitity: '',
      description: '',
      image: '',
      zipCode: '',
    }
    this.submit = this.submit.bind(this);
  }

  submit() {
    console.log(this.state);
    const {
      name,
      quanitity,
      description,
      image,
      zipCode,
    } = this.state;
    const record = [
      {
        itemname: name,
        itempicturelocation: image,
        quantity: quanitity,
        zipcode: zipCode,
        description: description,
        location_lat: "",
        location_long: "",
      }
    ];
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
    };
    console.log('posting this');
    console.log(JSON.stringify(record));
    fetch('/api/v1/availableitems', requestOptions)
        .then(response => response.json())
        .then(this.props.onSubmit)
        .catch(console.error)
  }

  render() {
    return (
      <div className="postContainer">
        <div className="startBarter">
          <p className="startBarterTitle">START A BARTER:</p>
        </div>
        <div>
          <input type="text"
            placeholder="Item Name"
            className="postItemInput"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Quantity"
            className="postItemInput"
            value={this.state.quanitity}
            onChange={(e) => this.setState({ quanitity: e.target.value })}
          />
        </div>
        <div>
          <input
            type="number"
            pattern="[0-9]{5}"
            placeholder="Zip Code"
            className="postItemInput"
            value={this.state.zipCode}
            onChange={(e) => this.setState({ zipCode: e.target.value })}
          />
        </div>
        <div>
          <textarea
            type="text"
            placeholder="Description"
            className="postItemInput"
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
          />
        </div>
        <div className="postItemImage">
          <p>
            <label htmlFor='file'>Upload Image:</label>{' '}
            <Widget
              publicKey='50b04df9968ae24e0bfe'
              id='file'
              imagesOnly={true}
              onFileSelect={(file) => {
                console.log('File changed: ', file)

                if (file) {
                  file.progress(info => console.log('File progress: ', info.progress))
                  file.done((info) => {
                    console.log('File uploaded: ', info);
                    this.setState({ image: info.cdnUrl });
                  })
                }
              }}
            />
          </p>
        </div>
        <div className="submitItem">
          <button className="postButton" onClick={this.submit}>Post</button>
        </div>
      </div>
    )
  }
}


export default PostItem;
