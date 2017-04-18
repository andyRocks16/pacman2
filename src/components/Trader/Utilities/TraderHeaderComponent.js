import React from 'react';
import { Link } from 'react-router';
import { PopUpComponent } from './PopUpComponent';
import imageTable from '../../../image/table.png';
import imageChart from '../../../image/chart.png';
import cookie from 'react-cookie';
import Websocket from 'react-websocket';
import {orderUrl} from '../../../app.config';



export class TraderHeaderComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showComponent: false,
		};
	}

	deleteAllOrders() {
		this.props.deleteOrder(orderUrl)
	}

	refershOrders() {
		this.props.fetchData(orderUrl);
	}

	createTrades() {
		this.setState({
			showComponent: true,
		});
	}



	render() {
		
		return (
			<div className="panel-nav">
				<ul className="nav nav-bar nav-pills">
					<li><button className="btn tableFunctionality" data-toggle="modal" data-target="#myModal" >Create</button>
					</li>
					<li><button className="btn tableFunctionality" onClick={this.deleteAllOrders.bind(this)}>Delete</button>
					</li>
					<li><button className="btn tableFunctionality" onClick={this.refershOrders.bind(this)}>Refresh</button>
					</li>
				</ul>
				<ul className="nav nav-bar nav-pills pull-right">
					<li><ul className="nav nav-bar nav-pills">
						<Link to={`/users`}>
							<li><button className="btn pull-right tableFunctionality"><img src={imageTable} /></button></li>
						</Link>
					</ul> </li>
					<li><ul className="nav nav-bar nav-pills">
						<Link to={`/users/charts`}>
							<li><button className="btn pull-right tableFunctionality"><img src={imageChart} /></button></li>
						</Link>
					</ul></li>
				</ul>
				<PopUpComponent {...this.props} />
			
			</div>
		);
	}
}