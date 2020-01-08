import React from 'react';
import {BookActions} from '../actions/bookActions';

export class BookForm  extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleUpdateForm = this.handleUpdateForm.bind(this);
        this.state = {
            updatedForm: false,
            title:'',
            author:'',
            submit: false,
        }
    }
    handleUpdateForm()
    {
        console.log(this.state.updatedForm);
        this.setState(state => ({ updatedForm: !state.updatedForm}));
    }
    handleSubmit(event)
    {
        event.preventDefault();
        this.setState({submit: true});
        const book = {"title":this.state.title, "author":this.state.author};
        BookActions.addBooks(book);
    }
    render()
    {
        let content = '';
        content = (
            <tr key={this.props.book.bookId}>
                <td> {this.props.book.bookId} </td>
                <td> {this.props.book.title} </td>
                <td> {this.props.book.author} </td>
                <td><button onClick={this.handleUpdateForm}>+</button></td>
            </tr>
        );
        if(this.state.updatedForm)
        {
            content =(
            <tr key={this.props.book.bookId}>
                <td> {this.props.book.bookId} </td>
                <td> 
                    <form id="updateBook" onSubmit={this.handleSubmit}>
                        <input type="text" value={this.props.book.title} />
                    </form> 
                </td>
                <td> <input type="text" value={this.props.book.author} form="updateBook" /> </td>
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

