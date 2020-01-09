"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import {BookForm} from '../components/BookForm';


export class BookList extends React.Component{

    constructor(props)
    {
        super(props);
        this.handleAddFormChange = this.handleAddFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.state = {
            addBookForm: false,
            title:"",
            author:"",
            submit: false,

        };
    }

    handleAddFormChange()
    {
        this.setState(state => ({ addBookForm: !state.addBookForm}));
        this.setState(({title: ""}));
        this.setState(({ author: ""}));
    }

    handleTitleChange(event)
    {
        this.setState({title: event.target.value});
    }

    handleAuthorChange(event)
    {
        this.setState({author: event.target.value});
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.setState({submit: true});
        this.setState({addBookForm: false});
        const book = {"title":this.state.title, "author":this.state.author};
        BookActions.addBooks(book);
    }

    createBookRow(book){
        return( <BookForm book={book}/>);
    }

    componentDidMount(){
        BookActions.readBooks();
    }


    render() {
        //handle AddButton
        let addContent ='';
        if(!this.state.addBookForm)
        {
            addContent =(
                <button onClick={this.handleAddFormChange}>Add Button</button>
            );
        }
        if(this.state.addBookForm)
        {
            addContent = (
                <table>
                    <tbody>
                        <tr>
                            <td>
                            <form onSubmit={this.handleSubmit} id="addForm">
                                <label>
                                    Title: <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                                </label>
                            </form>
                            </td>
                            <td>
                                <label>
                                    Author: <input type="text" value={this.state.author} onChange={this.handleAuthorChange} form="addForm"/>
                                </label>
                            </td>
                            <td>
                                <input type="submit" value = "submit" form="addForm"/>
                                <button onClick={this.handleAddFormChange}>Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
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
                {addContent}
            </div>
        );
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired
};



