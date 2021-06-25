var mongoose = require('mongoose');
var data = [];

mongoose.connect('mongodb+srv://user1:test1@to-do.isbx6.mongodb.net/to-do'
                    ,{useNewUrlParser: true });

var schema = new mongoose.Schema({
    item:String
});

var Todo = mongoose.model('Todo', schema);

module.exports = function(app) {

    app.get('/todo', function(request, response) {//gets data from mongodb and pass it to view

        Todo.find({}, function(err,data){
            if(err) throw err;
            response.render('todo',{todos:data});
        });
    });

    app.post('/todo', function(request, response) {//get data from view and add it to mongodb
        var newItem = Todo(request.body).save(function(err, data){
            if (err) throw err;
            response.json({todos: data})
        });
        // data.push(request.body);
        // response.json({todos: data})
    });

    app.delete('/todo/:item', function(request, response) {//delete requested itm from mongodb

        Todo.find({item: request.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            response.json({todos:data});
        });
        //data = data.filter(function(todo) {
            //return todo.item.replace(/ /g, '-') !== request.params.item;
        //});
        //response.json({todos:data});
    });
};