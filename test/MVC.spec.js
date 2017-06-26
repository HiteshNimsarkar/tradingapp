import Event from '../site/events/Event';
import TradeModel from '../site/mvc/models/trade/TradeModel';
import TradeController from '../site/mvc/controllers/trade/TradeController';
describe('Event', () => {
  it('Create Event', () => {
    let event = new Event(this);
    event.attach((args) => {
      expect(args).to.equal('input');

    });
    event.notify('input');


  });
  it('Notify with arguments', () => {
    let event = new Event(this);
    event.attach((args) => {
      expect(args).to.equal('input');
      expect(args).to.be.not.equal('input1');

    });
    event.notify('input');


  });
  it('Add item to TradeModel ', () => {
    let tradeModel = new TradeModel();
    tradeModel.addItem('{"name":"gbpaud","bestBid":1.9054252462838606,"bestAsk":1.9554389041092994,"openBid":1.9106762937083879,"openAsk":1.9107237062916123,"lastChangeAsk":0.04471519781768718,"lastChangeBid":-0.005251047424527311}');
    expect(tradeModel.items.length).to.equal(1);


  });
  it('MVC use case: Call addItem Action from TradeController , update TradeModel and notify TradeView. ', () => {
    let tradeModel = new TradeModel();
    class TradeView {

      constructor(model) {

        this.model = model;

        this.model.itemAdded.attach((args) => {
          expect(args.items[0].name).to.equal('gbpaud');
         });

      }

    }

    let traceController = new TradeController(tradeModel, new TradeView(tradeModel));
    traceController.addItem('{"name":"gbpaud","bestBid":1.9054252462838606,"bestAsk":1.9554389041092994,"openBid":1.9106762937083879,"openAsk":1.9107237062916123,"lastChangeAsk":0.04471519781768718,"lastChangeBid":-0.005251047424527311}');


  });
});

