'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Event = require('../../../events/Event');

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TradeStore = function () {
    function TradeStore(items) {
        _classCallCheck(this, TradeStore);

        this.items = items;
        this.itemAdded = new _Event2.default(this);
    }

    _createClass(TradeStore, [{
        key: 'addItem',
        value: function addItem(item) {
            this.items.push(item);
            this.itemAdded.notify({
                item: item
            });
        }
    }]);

    return TradeStore;
}();

exports.default = TradeStore;