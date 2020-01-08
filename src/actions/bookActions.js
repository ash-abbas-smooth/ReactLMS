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
        axios.post('http://localhost:3000/book', { "title":book.title, "author":book.author})
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'add_books_successful',
                data: res.data
            });
        })
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