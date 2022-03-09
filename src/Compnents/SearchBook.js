import React, { Component } from 'react';
import Books from './Books';
import * as BooksAPI from '../BooksAPI'
import {Route} from 'react-router-dom';
import { Link } from 'react-router-dom'
import { element } from 'prop-types';

class SearchBook extends Component {
  
    state ={ 
          showSearchPage: false,
          SearchedBooks : [],
          inputValue : ''
    }

      //SE searhed Book
   async searching (SE) {
      const query = SE.target.value
      this.setState({inputValue : query})
      await BooksAPI.search(query,20 ).then(SearchedBooks => {
      if(SearchedBooks === undefined || SearchedBooks.error){
        this.setState({
          SearchedBooks: [],
          
        })
      }else{
        const newArray = SearchedBooks.map(element =>{
          const x = this.props.AddedBooks.find(e => e.id === element.id )
          if(x === undefined) return {...element , shelf : 'none'}
          else return {...element , shelf :x.shelf}
        })
        
        this.setState({SearchedBooks : newArray})
        
      }
     })
    }

    render() { 
  
        return ( 

            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/' >Close</Link> 
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  onChange={(SE) => this.searching(SE) }
                  value= {this.state.inputValue}
                />

              </div>
            </div>


            <div className="search-books-results">
              <ol className="books-grid">
               {this.state.SearchedBooks.map((books)=>(
                  <Books books={books} key={books.id} changeshelf= {this.props.addToShelf} />
               ))}
              </ol>
            </div>
          </div>
         );
    }
}
 
export default SearchBook;