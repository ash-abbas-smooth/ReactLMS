import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';

export class AddBook extends React.Component
{
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

    render()
    {
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
        return addContent;
    }
}


AddBook.propTypes = {
    book: PropTypes.object.isRequired
};