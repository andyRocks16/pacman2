import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import {instrumentsUrl,orderUrl} from '../../../app.config';

export class PopUpComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
        this.props.fetchStocks(instrumentsUrl);
    }

    createOrder() {
        var cookies=cookie.load('userDetails');
       
        var number = ReactDOM.findDOMNode(this.refs.tradeInput).value;
        for (let i = 0; i < number; i++) {
            var index = Math.floor(Math.random() * 20);
            var side = Math.floor(Math.random() * 2);
            var s;
            if (side == 1) s = "BUY";
            else s = "SELL";
            var stock = this.props.stocks[i];
            var orderData = {
                symbol: stock.symbol,
                side: s,
                quantity: Math.floor(Math.random() * 100),
                limitPrice: stock.lastTrade - 1,
                traderId: cookies.id
            }
            
            
            this.props.makeOrders(orderUrl, orderData)
        }

        // console.log(responseOrder)
        // this.props.storeOrders(responseOrder);
    }

    render() {
        
        return (
            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">


                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Create Multiple Trades</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="trades">Enter Number of Trades</label>
                                <input ref="tradeInput" type="number" className="form-control" id="trades" />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.createOrder.bind(this)} data-dismiss="modal">Create</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}