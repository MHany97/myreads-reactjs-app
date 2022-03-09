import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './Compnents/Bookshelf'
import Header from './Compnents/Header'
import SearchBook from './Compnents/SearchBook'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {CSSTransition, TransitionGroup,} from 'react-transition-group'


class BooksApp extends React.Component {
  state = {
   // used to store books data from the server
    AllBooks :[],

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

  }
  

//  Getting the data from Books API and store it in Books Array map over it to get needed objects

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({
          AllBooks: books.map(({ id, title, authors, imageLinks, publisher, shelf }) =>
           ({ id, title, authors, imageLinks, publisher, shelf }))
        })
    })
    
  }

  CreateShelfs(changeshelf){
    //filter each state of books 
    const currentlyReading = this.state.AllBooks.filter(bookShelf=> bookShelf.shelf==='currentlyReading')    
    const read = this.state.AllBooks.filter(bookShelf=> bookShelf.shelf==='read')    
    const wantToRead = this.state.AllBooks.filter(bookShelf=> bookShelf.shelf==='wantToRead')
    //create an array of Shelf Status only
    const bookShelfTitles = this.state.AllBooks.reduce((title, obj)=> title.set(obj.shelf, obj), new Map())
    let TitleShelfs = [...bookShelfTitles.keys()]
    TitleShelfs.sort()
    //creating book shelfs based on the Status of the shelf and pass books data to books comp.
    const Elements = TitleShelfs.map((element)=>( 
      <div key={TitleShelfs.indexOf(element)}>
        {element==='currentlyReading'? <BookShelf title={element} AllBooks={currentlyReading} changeshelf ={changeshelf}/>
          :element==='wantToRead'? <BookShelf title={element} AllBooks={wantToRead}  changeshelf ={changeshelf}/>
          :element==='read'? <BookShelf title={element} AllBooks={read}  changeshelf ={changeshelf}/>:console.log('Error')}
       </div>
    ))
    return(
      Elements
      )
  }
  
  
  render() {
    
    const changeshelf = (value , id)=>{
      this.setState((prev) =>{
        const newArray = prev.AllBooks.map(element =>{
          if(element.id == id){
            element.shelf = value
          }
          return element
        })
        return ({
          AllBooks : newArray
        })
      })
      BooksAPI.update(id , value).then((element)=>{
        console.log(element)
      })
    }

    const addToShelf = (value , id) =>{
      BooksAPI.update(id , value).then((element)=>{
        console.log(element)
      }).then(()=>{
        BooksAPI.getAll().then((books) => {
          this.setState({
            AllBooks: books.map(({ id, title, authors, imageLinks, publisher, shelf }) =>
             ({ id, title, authors, imageLinks, publisher, shelf }))
          })
       })
      })
    }
    return (
      <div className="app">
        
          
          <Route exact path="/" render={()=>{
            return (
                <div>
                  <Header />
                  <div className="list-books-content">
                    <div>
                    {this.CreateShelfs(changeshelf)}
                    </div>
                  </div>
                  <div className="open-search">
                    <Link to='/Search'>Add a book</Link>
                  </div>
                </div>
            )
          }} />
            <Route path="/Search" render={()=>(
              <TransitionGroup>
                 <CSSTransition timeout={500} classNames="fade" >
                  <SearchBook AddedBooks={this.state.AllBooks}  addToShelf = {addToShelf}/>
                </CSSTransition>
              </TransitionGroup>
            )} />
        
      </div>
    )
  }
}

export default BooksApp
