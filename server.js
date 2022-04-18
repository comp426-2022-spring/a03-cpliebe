const express = require ('express');
const app = express();

app.use(express.json());

/** Coin flip functions 
 * This module will emulate a coin flip given various conditions as parameters as defined below
 */

/** Simple coin flip
 * 
 * Write a function that accepts no parameters but returns either heads or tails at random.
 * 
 * @param {*}
 * @returns {string} 
 * 
 * example: coinFlip()
 * returns: heads
 * 
 */

 function coinFlip() {
    var random = Math.random()
 
    if (random > 0.5) {
      return "heads"
    }
    else {
      return "tails"
    }
 }
 
 /** Multiple coin flips
  * 
  * Write a function that accepts one parameter (number of flips) and returns an array of 
  * resulting "heads" or "tails".
  * 
  * @param {number} flips 
  * @returns {string[]} results
  * 
  * example: coinFlips(10)
  * returns:
  *  [
       'heads', 'heads',
       'heads', 'tails',
       'heads', 'tails',
       'tails', 'heads',
       'tails', 'heads'
     ]
  */
 
 function coinFlips(flips) {
     if (flips<0||flips==0||typeof flips==="undefined"){flips = 1};
   const results = [];
   for (var i = 0; i < flips; i++) {
     results.push(coinFlip());
   }
   return results;
 }
 
 /** Count multiple flips
  * 
  * Write a function that accepts an array consisting of "heads" or "tails" 
  * (e.g. the results of your `coinFlips()` function) and counts each, returning 
  * an object containing the number of each.
  * 
  * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
  * { tails: 5, heads: 5 }
  * 
  * @param {string[]} array 
  * @returns {{ heads: number, tails: number }}
  */
 
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
 
 /** Flip a coin!
  * 
  * Write a function that accepts one input parameter: a string either "heads" or "tails", flips a coin, and then records "win" or "lose". 
  * 
  * @param {string} call 
  * @returns {object} with keys that are the input param (heads or tails), a flip (heads or tails), and the result (win or lose). See below example.
  * 
  * example: flipACoin('tails')
  * returns: { call: 'tails', flip: 'heads', result: 'lose' }
  */
 
 function flipACoin(call2) {
   var outcome = ""
   var flip = ""
   var num = Math.random()
 
   if (call2 !== "heads" && call2 !== "tails") {
     console.log("Error: no input. Usage: node guess-flip -- call=[heads|tails]")
     return
   }
   if (num < 0.5) {
     flip = "heads"
   }
   else { 
     flip = "tails"
   }
   
   if (flip == call2) {
     outcome = "win"
   }
   else  {
     outcome = "lose"
   }
   return {call: call2, flip: flip, result: outcome}
 }
 
 
 /** Export 
  * 
  * Export all of your named functions
 */

 export {coinFlip, coinFlips, countFlips, flipACoin}
const args = require ("minimist")(process.argv.slice(2));
args["port"];
var port = args.port || process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.get('/app', (req, res) => {
    res.statusCode = 200;

    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' + res.statusMessage)
});

// end point for many flips
app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number);
    const summary = countFlips(flips);
    res.status(200).json({"raw": flips, "summary": summary});
  })

  //end point for flip
  app.get('/app/flip', (req, res) => {
    const flip = coinFlip();
    res.status(200).json({"flip": flip});
  })

  // end point for flip while calling heada
  app.get('/app/flip/call/heads', (req, res) => {
    const flip = flipACoin("heads");
    res.status(200).json(flip);
  })
  
  // end point for flip while calling tails
  app.get('/app/flip/call/tails', (req, res) => {
    const flip = flipACoin("tails");
    res.status(200).json(flip);
  })
  
  // Default response for any other request
  app.use(function(req, res){
    res.type("text/plain");
    res.status(404).send("404 Not Found");
  });