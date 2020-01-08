import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios';
const BooksActions = {
    readBooks: function(){
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
        axios.get(`http://localhost:3000/book`)
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'read_books_successful',
                data:  res.data
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_books_failure'
            });
        });
    },
    addBooks: function(book){
        Dispatcher.dispatch({
            actionType: 'add_books_started'
        });
        axios.post('http://localhost:3000/book', { "title":book.title, "author":book.author})
        .then( () =>{
            axios.get(`http://localhost:3000/book`)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: 'read_books_successful',
                    data:  res.data
                });
            })
            .catch( (error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'read_books_failure'
                });
            });
            }
        )
        .catch( (error) =>
        {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'add_books_failure'
            })
        });
    },
    updateBook: function(book)
    {
        Dispatcher.dispatch({
            actionType: 'add_books_started'
        });
        axios.put('http://localhost:3000/book', { "title":book.title, "author":book.author, "bookId":book.bookId})
        .then( () =>{
            axios.get(`http://localhost:3000/book`)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: 'read_books_successful',
                    data:  res.data
                });
            })
            .catch( (error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'read_books_failure'
                });
            });
            }
        )
        .catch( (error) =>
        {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'add_books_failure'
            })
        });
    },
    deleteBook: function(book)
    {
        Dispatcher.dispatch({
            actionType: 'add_books_started'
        });
        axios.delete('http://localhost:3000/book/:id', {data: {id: book.bookId}})
        .then( res =>{
            axios.get(`http://localhost:3000/book`)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: 'read_books_successful',
                    data:  res.data
                });
            })
            .catch( (error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'read_books_failure'
                });
            });
            }
        )
        .catch( (error) =>
        {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'add_books_failure'
            })
        });
    }
}

module.exports = BooksActions;