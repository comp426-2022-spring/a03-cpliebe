const express = require('express')
const { count } = require('yargs')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args["port"]
var port = args.port || 5000 || process.env.PORT

// one random coin flip
function coinFlip() {
    var random = Math.random()
    if (flip > 0.5){
      return "heads"
    } else {
      return "tails"
    }
}

//many random coin flips
function coinFlips(flips) {
    if (flips<0||flips==0||typeof flips==="undefined"){flips = 1};
  const results = [];
  for (var i = 0; i < flips; i++) {
    results.push(coinFlip());
  }
  return results;

}

// flip a coin with a call to see if it matches the call
function flipACoin(call) {

    var result = ""
    var flip = ""
    var num = Math.random()
        
    if (num < 0.5){
        flip = "heads"
    } else {
        flip = "tails"
    }
        
    if (flip == call){
        result = "win"
    } else {
        result = "lose"
    }
        
    return {"call": call, "flip": flip, "result": result}
}

// an array that tallies the random coin flips
function countFlips(array) {
    
    const counts = {
        heads: 0,
        tails: 0
      }
    
      
      for (var i = 0; i < array.length; i++) {
        if (array[i] == "heads") {
          counts.heads++;
        } else if (array[i] == "tails") {
          counts.tails++;
      }
    }
      return counts
}

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

//default check endpoint
app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

//flip endpoint (one flip)
app.get('/app/flip', (req, res) => {
    
    const result = coinFlip()
    res.status(200).json({"flip": result})

    });

//flips endpoint (many flips)
app.get('/app/flips/:number', (req, res) => {
    
    const results = coinFlips(req.params.number)
    const summary = countFlips(results)
    res.status(200).json({"raw": results, "summary": summary})

    });

//flip while calling heads endpoing
app.get('/app/flip/call/heads', (req, res) => {
    var resStatusCode = 200

    res.status(200).json(flipACoin("heads"))
    });

//flip while calling tails endpoint
app.get('/app/flip/call/tails', (req, res) => {
    var resStatusCode = 200

    res.status(200).json(flipACoin("tails"))
    });

//default error message
app.use(function(req,res){
    res.status(404).send("endpoint does not Exist")
    res.type("text/plain")
}
)