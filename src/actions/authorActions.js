import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const AuthorActions = 
{
    readAuthors: function(){
        Dispatcher.dispatch({
            actionType: 'read_authors_started'
        });
        axios.get('http://www.mocky.io/v2/5e13a94e310000598ad478c0')
        .then(res => {
            Dispatcher.dispatch({
                actionType: 'read_authors_successful',
                data:  res.data
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_authors_failed'
            });
        });
    }
}

module.exports= AuthorActions;