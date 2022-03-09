// import { element } from 'prop-types';
// import { object } from 'prop-types';
import React, { Component } from 'react';
import Books from './Books'

class BookShelf extends Component {
  
 
  
    render() {
     

     
     return (
      <div className="bookshelf" >
              
      <h2 className="bookshelf-title">
            {this.props.title==='currentlyReading'? 'Currently Reading'
            :this.props.title==='wantToRead'? 'Want To Read'
            :this.props.title===  'read'? 'Read':console.log('error') }
        </h2> 


       <div className="bookshelf-books">
                <ol className="books-grid">
                   {this.props.AllBooks.map((book)=>(
                        <Books books={book} key={book.id} changeshelf = {this.props.changeshelf}/>
                       ))}
                  </ol>
              </div>
     </div>
          
        )
    }
}

export default BookShelf;