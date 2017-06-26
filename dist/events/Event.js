'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TradeStore = require('../mvc/store/trade/TradeStore');

var _TradeStore2 = _interopRequireDefault(_TradeStore);

var _Tradeview = require('../mvc/views/trade/Tradeview');

var _Tradeview2 = _interopRequireDefault(_Tradeview);

var _TradeController = require('../mvc/controllers/trade/TradeController');

var _TradeController2 = _interopRequireDefault(_TradeController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
    function Event(sender) {
        _classCallCheck(this, Event);

        this.sender = sender;
        this.listener = [];
    }

    _createClass(Event, [{
        key: 'attach',
        value: function attach(listener) {

            this.listener.push(listener);
        }
    }, {
        key: 'notify',
        value: function notify(args) {
            console.log('calling notify');

            for (var index = 0; index < this.listener.length; index++) {
                this.listener[index](args);
            }
        }
    }]);

    return Event;
}();

exports.default = Event;


var tradeModel = new _TradeStore2.default(['hitesh']);
var tradeView = new _Tradeview2.default(tradeModel);
var traceController = new _TradeController2.default(tradeModel, tradeView);
traceController.addItem('rajnish');