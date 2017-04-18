import React from 'react';
import ReactDOM from 'react-dom';
import { TraderHeaderComponent } from './TraderHeaderComponent';
import { TableComponent } from '../Table/TableComponent';
import imageTable from '../../../image/table.png';
import imageChart from '../../../image/chart.png';
import { Link } from 'react-router';
import { NotificationComponent } from './NotificationComponent';
import { PanelContainer } from './PanelContainer';
import cookie from 'react-cookie';
import Websocket from 'react-websocket';
import firebaseAuth from '../../../firebase/config';
import Notifications from 'react-notification-system-redux';
import { userUrl, websocketUrl } from '../../../app.config';
import {SplitScreenComponent} from './SplitScreenComponent.js';

export class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadScreen: false,
            count: 0
        }
    }

    componentDidMount() {
        this.props.fetchTraders(userUrl);

    }


    inc1(notificationMsg) {
        this.inc(1);
        this.props.notify(notificationMsg, this.props.notificationMsg);
    }
    inc(n) {
        let count = this.state.count + n;
        if (count < 0) count = 0;
        this.setState({
            count: count
        });
    }

    handleData(data) {
        let msg = '';
        for (let i = 0; i < data.length; i++) {
            if (i >= 3)
                msg += data[i];
            if (data[i] == "}" && data[i + 1] != "}")
                break;
        }
        console.log(msg, "msg");
        let result = JSON.parse(msg);
        let notificationMsg = "";
        let type;
        if (result.orderMessage == "placementCreatedEvent") {
            notificationMsg = "Total of " + result.order.quantityPlaced + " Units of \n Order with OrderId : " + result.order.id + " are now placed. \nWaiting for Execution";
            this.inc1(notificationMsg);
        }
        if (result.orderMessage == "executionCreatedEvent") {
            notificationMsg = "Total of " + result.order.quantityExecuted + " Units of \nOrder with OrderId : " + result.order.id + " are executed \nwith price " + result.order.executionPrice;
            this.inc1(notificationMsg);
        }
        if (result.orderMessage == "orderCreatedEvent") {
            notificationMsg = "A new Order with " + result.order.quantity + " Units of and OrderId : " + result.order.id + " is being created by Trader with ID " + result.order.traderId;
            type = 'warning';
            this.props.success({
                // uid: 'once-please', // you can specify your own uid if required
                title: 'Order Created',
                message: notificationMsg,
                position: 'tr',
                autoDismiss: 0,
                // action: {
                //     label: 'Click me!!',
                //     callback: () => alert('clicked!')
                // }
            });
            console.log("called")
        }
        this.props.updateOrder(result.orderMessage, this.props.items, result.order);
        this.props.updateSearch(result.order, this.props.searchResults);
    }


    signOut() {
        cookie.remove('userDetails', { path: '/' });
        this.setState({ loadScreen: false })
    }


    render() {
        let notificationRow, notification;

        var option = this.props.users.map((user) => {
            return (
                <option id="traderList" key={user.id} value={user.id}>{user.name}</option>
            )
        })

        if (typeof this.props.notifications !== 'undefined' && this.props.notifications.length > 0) {
            notification = this.props.notifications.map((item, index) => {
                console.log(item, "notifications")
                return (<NotificationComponent {...this.props} />);
            })
        }

        return (
            <div>
                <SplitScreenComponent {...this.props}/>
                {/*<div className='split-pane col-xs-12 col-sm-6 uiux-side'>
                    <div>
                        <img src='http://bit.ly/BCR-design' />
                        <div className='text-content'>
                            <div>You want</div>
                            <div className='big'>UI/UX?</div>
                        </div>
                        <button>
                            SHOW ME THE DESIGN
                        </button>
                    </div>
                </div>
                <div className='split-pane col-xs-12 col-sm-6 frontend-side'>
                    <div>
                        <img src='http://bit.ly/bcr-dev' />
                        <div className='text-content'>
                            <div>You want</div>
                            <div className='big'>FRONT-END?</div>
                        </div>
                        <a className='button'>
                            SHOW ME THE CODE
                        </a>
                    </div>
                </div>
                <div id='split-pane-or'>
                    <div>
                        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/74452/bcr-white.png' />
                    </div>
                </div>*/}

                {/*<PanelContainer {...this.props} />*/}
                <Websocket url={websocketUrl}
                    onMessage={this.handleData.bind(this)} />
                {notification}
            </div>

        );

    }
}