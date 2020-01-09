import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';

export class BookForm  extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleUpdateForm = this.handleUpdateForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            updatedForm: false,
            bookId: this.props.book.bookId,
            title:this.props.book.title,
            author:this.props.book.author,
        }
    }
    handleUpdateForm()
    {
        //console.log(this.state.updatedForm);
        this.setState(state => ({ updatedForm: !state.updatedForm}));
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
        const book = {"title":this.state.title, "author":this.state.author, "bookId":this.props.book.bookId};
        //console.log(book);
        BookActions.updateBook(book);
        this.setState({updatedForm: false});
    }

    handleDelete(event)
    {
        event.preventDefault();
        const book = {"bookId": this.props.book.bookId};
        BookActions.deleteBook(book);
        this.setState({updatedForm: false});
    }
    render()
    {
        let content = '';
        content = (
            <tr key={this.props.book.bookId}>
                <td> {this.props.book.bookId} </td>
                <td> {this.props.book.title} </td>
                <td> {this.props.book.author} </td>
                <td>
                    <button onClick={this.handleUpdateForm}>Update</button>
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        );
        if(this.state.updatedForm)
        {
            content =(
            <tr key={this.props.book.bookId}>
                <td> 
                    {this.props.book.bookId} 
                </td>
                <td> 
                    <form id="updateBook" onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                    </form> 
                </td>
                <td> 
                    <input type="text" value={this.state.author} onChange={this.handleAuthorChange} /> 
                </td>
                <td>
                    <input type="submit" form="updateBook" />
                    <button onClick={this.handleUpdateForm}>Cancel</button>
                </td>
            </tr>
            );
        }
        return content;
    }
}

BookForm.propTypes = {
    book: PropTypes.object.isRequired
};