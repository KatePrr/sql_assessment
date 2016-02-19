var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var connectionString = '';
var random = require('./routes/random');

if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/SQLAssessment';
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);

app.use('/random', random);


app.post('/animal', function(req, res) {
    var addAnimal = {
        animal_type: req.body.animal_type,
        animal_number: req.body.animal_number
    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO zoo_animals (animal_type, animal_number) VALUES ($1, $2)",
            [addAnimal.animal_type, addAnimal.animal_number],
            function (err, result) {
                done();

                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }

            });
    })
    });


// get data route
app.get('/result', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM zoo_animals ORDER BY id DESC;');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

app.get('/*', function(req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});