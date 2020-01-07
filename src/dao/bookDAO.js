var db = require('./db');

exports.getAllBooks = function()
{
    return new Promise( (resolve, reject) => 
    {
        db.query('select * from tbl_book', 
        (err, result) => {return err ? reject(err) : resolve(result)});
    });
}

exports.addBook = function(book)
{
    return new Promise( (resolve, reject) => 
    {
        db.beginTransaction( function(err) {
            db.query('insert into tbl_book(title) values(?)', 
                [book.title],
                (err, result) => {
                    if(err)
                        db.rollback( (err, result) => {return err ? reject(err) : resolve(result)});
                    else
                        db.commit( (err, result) => {return err ? reject(err) : resolve(result)});
            });
            
        });
    });
}

exports.deleteBook = function(book)
{
    return new Promise( (resolve, reject) => 
    {
        db.beginTransaction( function(err) {
        db.query('delete from tbl_book where bookId = ?', [book.id], 
        (err, result) => {
            if(err)
                db.rollback( (err, result) => {return err ? reject(err) : resolve(result)});
            else
                db.commit( (err, result) => {return err ? reject(err) : resolve(result)});
            });
        });
    });
}

exports.updateBook = function(book)
{
    return new Promise( (resolve, reject) => 
    {
        db.beginTransaction( function(err){
            db.query('insert into tbl_book(title) values (?) where bookId = ?',
                [book.title, book.id],
                (err, result) => {
                    if(err)
                        db.rollback( (err, result) => {return err ? reject(err) : resolve(result)});
                    else
                        db.commit( (err, result) => {return err ? reject(err) : resolve(result)});
            });
        });
    });
}
