/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')
require('./site/events');


import TradeModel from './site/mvc/models/trade/TradeModel';
import Tradeview from './site/mvc/views/trade/Tradeview';
import TradeController from './site/mvc/controllers/trade/TradeController';



let tradeModel = new TradeModel();
let grid={

id:'tradeGrid',
columns:[
  {
    header:'Name',
    value:'name',
    type: 'string'
  },
  {
    header:'Current Best bid price',
    value:'bestBid',
    type: 'number'
  },
  {
    header:'Current Best Ask price',
    value:'bestAsk',
    type: 'number'
  },
   {
    header:'Best bid last changed',
    value:'lastChangeBid',
    type: 'number'
  },
   {
    header:'Best ask last changed',
    value:'lastChangeAsk',
    type: 'number'
  },
  {
    header:'Mid price',
    component:(id,row)=>{
   
      Sparkline.draw(id, row.midPrice)},
    type: 'Array'
  },
]

};

let tradeView = new Tradeview(tradeModel,grid);
let traceController = new TradeController(tradeModel, tradeView);


// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {

  document.getElementById('stomp-status').innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs."
  var subscription = client.subscribe('/fx/prices',
    function (message) {
      
      traceController.addItem(message.body);
     

    })
    ;
  client.send("/fx/prices", {}, { name: 'hitehs' });
}

client.connect({}, connectCallback, function (error) {
  alert(error.headers.message)
})






/*
const exampleSparkline = document.getElementById('example-sparkline')
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])*/