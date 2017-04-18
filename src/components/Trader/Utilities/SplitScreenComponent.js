import React from 'react';
import ReactDOM from 'react-dom';
import { TableComponent } from '../Table/TableComponent';
import Chart from '../Chart/ChartComponent';

export class SplitScreenComponent extends React.Component {


    switchScreens(event) {
        console.log("IN")
        let button = event.target;
        event.preventDefault();
        $(".floating-content").addClass("active");
        $(".sing-in-panel").addClass("active");
        $(".sing-up-panel").removeClass("active");
    }

    switchToChart(event) {
        let button = event.target;
        console.log("IN222")
        event.preventDefault();
        $(".floating-content").removeClass("active");
        $(".sing-in-panel").removeClass("active");
        $(".sing-up-panel").addClass("active");

    }


    render() {
        return (
            <div className="content-wrapper">
                <div className="background background-left"></div>
                <div className="background background-right"></div>
                <div className="sing-up-panel active">
                    <div className="button-wrapper">
                        <button className="button-transparent sing-in" onClick={this.switchScreens.bind(this)} type="submit">CHARTS</button>
                        <button className="sing-up" type="submit">TABLE</button>
                    </div>
                    <TableComponent {...this.props} />

                </div>
                <div className="sing-in-panel">
                    <div className="button-wrapper">
                        <button className="sing-in" type="submit" >CHARTS</button>
                        <button className="button-transparent sing-up" onClick={this.switchToChart.bind(this)} type="submit">TABLE</button>
                    </div>
                    <Chart {...this.props} />

                </div>
                <div className="floating-content"></div>
            </div>
        )
    }
}


