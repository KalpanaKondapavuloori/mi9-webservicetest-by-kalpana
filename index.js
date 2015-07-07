//adding modules
var express = require('express'); //express mvc web framework
var app = express();
var bodyParser = require('body-parser');//to parse posted json responses
var utils = require('./utils.js');// custom utils class

app.set('port', (process.env.PORT || 5000));// setting port

app.use(bodyParser.text({
    type: 'application/json'
}));

//adding post method to root request
app.post('/', function(request, response) {
    response.setHeader('Content-Type', 'application/json');

    //validating & parsing request body
    var payload = request.body;
    try {
        payload = JSON.parse(request.body).payload;
    } catch (e) {
        //returning 400 status with error message
        response.status(400);
        return response.send({error: 'Could not decode request: JSON parsing failed'});
    }

    var shows = [];
    if (payload) {
        //instead of using json filters, custom filtering is added to validate attribute values for undefined case also
        //for ex: In payload, if image attribute is undefined, showImage value cant be retrieved. (so more data validations has been added
        for (var i = 0; i < payload.length; i++) {
            //filter records based on criteria
            if (utils.isValidRecord(payload[i])) {
                //get response record format
                var record = utils.getResponseRecordFormat();
                //get necessary attribute values
                record.image = utils.getLevelTwoJsonProperty(payload[i], "image", "showImage");
                record.slug = utils.getJsonProperty(payload[i], "slug");
                record.title = utils.getJsonProperty(payload[i], "title");
                shows.push(record);
            }
        }
    }
    //writing valid response    
    response.status(200);
    response.send(JSON.stringify({"response": shows}));
});


app.listen(app.get('port'), function() {
    console.log('"MI9 Webservice" for coding challange - Developed by Kalpana is running on port', app.get('port'));
});

//error handler for runtime errors
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


