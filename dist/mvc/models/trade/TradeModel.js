'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Event = require('../../../events/Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TradeModel = function TradeModel(name, bestBid, bestAsk, openBid, openAsk, lastChangeAsk, lastChangeBid) {
    _classCallCheck(this, TradeModel);

    this.name = name;
    this.bestBid = bestBid;
    this.bestAsk = bestAsk;
    this.openBid = openBid;
    this.openAsk = openAsk;
    this.lastChangeAsk = lastChangeAsk;
    this.lastChangeBid = lastChangeBid;
};

exports.default = TradeModel;


var tradeModel = new TradeModel();
tradeModel.bestBid = 'test';