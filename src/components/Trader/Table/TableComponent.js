import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable } from 'react-bootstrap-table'
import css from 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import moment from 'moment';
import {orderUrl} from '../../../app.config';
export class TableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            //loadFilters: false
        }
    }



    componentDidMount() {
        this.props.fetchData(orderUrl);

    }

    searchItems(event) {
        let criteria = ReactDOM.findDOMNode(this.refs.criteria).value;
        let key = event.target.value;
        if (key == "") {
            this.setState({ loadItems: true })
        }
        else {
            this.props.searchOrders(key, criteria, this.props.items);
            this.setState({ loadItems: false })
        }
    }
    afterSearch = (searchText, result) => {
        
        this.props.fetchData(orderUrl);

    }
    
    expandComponent(row) {
        return (
            <div id="myModal" role="dialog">
                <div className="modal-dialog">


                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Details</h4>
                        </div>
                        <div className="modal-body">
                            <p>Id :{row.id}</p>
                            <p>Creation Time : {row.creationTime}</p>
                            <p>Side : {row.side}</p>
                            <p>Symbol : {row.symbol}</p>
                            <p>Quantity : {row.quantity}</p>
                            <p>Placed : {row.quantityPlaced}</p>
                            <p>Executed : {row.quantityExecuted}</p>
                            <p>Limit Price : {row.limitPrice}</p>
                            <p>Priority : {row.priority}</p>
                            <p>Status : {row.status}</p>
                            <p>Trader : {row.traderId}</p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    render() {
        var data = [];
        const options = {
            afterSearch: this.afterSearch,
            expandRowBgColor: '#C0C0E4'
        };
        const selectRowProp = {
            mode: 'checkbox',
            clickToSelect: true,
            hideSelectColumn: true,
            clickToExpand: true,   // you should add this to trigger selection and expand both on clicking
            bgColor: 'pink'
        };
        let orderRow, searchRow;
        this.state.loadItems == false
            ?
            data = this.props.searchResults
            :
            data = this.props.items;
        return (
            <div>
                <form >
                    <div className="col-xs-9 form-group">
                        <input onChange={this.searchItems.bind(this)} type="text" className="form-control" id="search" placeholder="Search...." />
                    </div>
                    <div className="form-group col-xs-3">
                        <select ref="criteria" className="form-control" id="sel1">
                            <option>Search By</option>
                            <option value="ID">ID</option>
                            <option value="SIDE">Side</option>
                            <option value="SYMBOL">Symbol</option>
                            <option value="QUANTITY">Quantity</option>
                            <option value="PRIORITY">Priority</option>
                            <option value="STATUS">Status</option>
                            <option value="TRADER">Trader</option>
                        </select>
                    </div>

                </form>
                < div className="col-md-12 hidden-xs  hidden-sm">
                    <BootstrapTable data={data} options={options} pagination={true}>
                        <TableHeaderColumn dataField='id' isKey={true} dataSort width='48'>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='creationTime' width='140' dataSort  >Time</TableHeaderColumn>
                        <TableHeaderColumn dataField='side' dataSort >Side</TableHeaderColumn>
                        <TableHeaderColumn dataField='symbol' dataSort >Symbol</TableHeaderColumn>
                        <TableHeaderColumn dataField='quantity' dataSort >Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataField='quantityPlaced' dataSort >Placed</TableHeaderColumn>
                        <TableHeaderColumn dataField='quantityExecuted' dataSort >Executed</TableHeaderColumn>
                        <TableHeaderColumn dataField='limitPrice' dataSort >Limit Price</TableHeaderColumn>
                        <TableHeaderColumn dataField='priority' dataSort >Priority</TableHeaderColumn>
                        <TableHeaderColumn dataField='status' dataSort >Status</TableHeaderColumn>
                        <TableHeaderColumn dataField='traderId' dataSort >Trader</TableHeaderColumn>
                    </BootstrapTable>
                </div>

                < div className="col-md-12 hidden-md hidden-lg  hidden-xs">
                    <BootstrapTable data={data} options={options} pagination={true} hover>
                        <TableHeaderColumn dataField='id' isKey={true} dataSort width='48'>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='creationTime' width='140' dataSort >Time</TableHeaderColumn>
                        <TableHeaderColumn dataField='side' dataSort >Side</TableHeaderColumn>
                        <TableHeaderColumn dataField='symbol' dataSort >Symbol</TableHeaderColumn>
                        <TableHeaderColumn dataField='quantity' dataSort >Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataField='quantityPlaced' dataSort >Placed</TableHeaderColumn>
                        <TableHeaderColumn dataField='quantityExecuted' dataSort >Executed</TableHeaderColumn>
                        <TableHeaderColumn dataField='limitPrice' dataSort >Limit Price</TableHeaderColumn>
                        <TableHeaderColumn dataField='status' dataSort >Status</TableHeaderColumn>
                    </BootstrapTable>
                </div>

                < div className="col-md-12 hidden-md hidden-lg  hidden-sm">

                    <BootstrapTable data={data} options={options} pagination={true} selectRow={selectRowProp}
                        expandableRow={(row) => { return true; }} expandComponent={this.expandComponent} hover >
                        <TableHeaderColumn dataField='id' isKey={true} dataSort width='48'>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='side' dataSort width='70'>Side</TableHeaderColumn>
                        <TableHeaderColumn dataField='symbol' dataSort >Symbol</TableHeaderColumn>
                        <TableHeaderColumn dataField='quantity' dataSort >Quantity</TableHeaderColumn>
                        <TableHeaderColumn dataField='limitPrice' dataSort >Limit Price</TableHeaderColumn>
                    </BootstrapTable>
                </div>


            </div>
        );

    }


}
