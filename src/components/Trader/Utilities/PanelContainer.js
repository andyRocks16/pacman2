import React from 'react';
import { TraderHeaderComponent } from './TraderHeaderComponent';

export class PanelContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="container-fluid">
            <div className="panel filterable">
                <div className="panel-heading">
                    <TraderHeaderComponent {...this.props} />
                </div>
                <div className="panel-body">
                    {React.cloneElement(this.props.children, this.props)}
                </div>
                <div className="panel-footer">
                </div>
            </div>
        </div>);
    }
}