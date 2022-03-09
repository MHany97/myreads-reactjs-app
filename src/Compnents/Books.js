import React, { Component } from 'react';


class Books extends Component {
   
  state ={ 
   selectValue : 'none'
  }

  handleOnChange(event){
    const {value} = event.target;
    this.setState({selectValue : value})
    this.props.changeshelf(value , this.props.books.id)
  }

  
  
    render() {
       return (  
          <li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, 
                  backgroundImage: `url("${ this.props.books.imageLinks===undefined?
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuwK0uvpNrRc2foEt5bQei5dvBZgJrRVrz824ihD0LMsRBvyxkSlGehLsl6dOVty_Ow14&usqp=CAU'
                  :this.props.books.imageLinks.thumbnail }")` }}></div>
                <div className="book-shelf-changer">
                  <select
                    defaultValue = {this.props.books.shelf}
                    onChange = {(event) =>this.handleOnChange(event)}
                    value = {this.selectValue}
                  >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.books.title}</div>
              <div className="book-authors">{this.props.books.authors===undefined?'Unknown':this.props.books.authors}</div>
            </div>
          </li> 
          );
    }
}
 
export default Books;