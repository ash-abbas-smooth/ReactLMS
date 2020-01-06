"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';

export class BookList extends React.Component{

    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            addBookForm: false,
            addInput:{
                title:"",
                author:"",
            }
        };
    }

    handleChange()
    {
        this.setState(state => ({ addBookForm: !state.addBookForm}));
    }

    createBookRow(book){
        return (
            <tr key={book.book_id}>
                <td> {book.book_id} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
            </tr>
        );
    }

    componentDidMount(){
        BookActions.readBooks();
    }

    render() {
        //handle AddButton
        let addContent ='';
        if(this.state.addBookForm)
        {
            addContent = (
                <form method="post">
                    <label>
                        Title: <input type="text" name="title" />
                    </label>
                    <br/>
                    <label>
                        Author: <input type="text" name="author" />
                    </label>
                    <input type="submit" value = "submit" />
                </form>
            );
        }
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
                <button onClick={this.handleChange}>Add Button</button>
                {addContent}
                {content}
            </div>
        );
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired
};



