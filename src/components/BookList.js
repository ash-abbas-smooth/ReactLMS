"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import {BookForm} from '../components/BookForm';
import {AddBook} from '../components/AddBook';

export class BookList extends React.Component{
    
    createBookRow(book){
        return( <BookForm book={book}/>);
    }

    componentDidMount(){
        BookActions.readBooks();
    }


    render() {
        //handle AddButton

        //handle bookList    
        let content = '';
        
        if(this.props.book.readState.pending){
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }
        

        if(this.props.book.readState.success){
            content = 
                (<table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.book.bookList.map(this.createBookRow, this)}
                    </tbody>    
                </table>)
        }

        if(this.props.book.readState.failure){
            content = 
            (
                <div className="alert alert-danger" role="alert">
                    Error while loading books!
                </div>
            )
        }

        return(
            <div>
                <h1>Books</h1>
                {content}
                <AddBook />
            </div>
        );
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired
};



