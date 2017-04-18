import React from 'react';

var Legend = require('react-d3-core').Legend;
var BarStackChart = require('react-d3-basic').BarStackChart;
var BarStackHorizontalChart = require('react-d3-basic').BarStackHorizontalChart;
import { WindowResizeListener } from 'react-window-resize-listener'

export default class Chart extends React.Component {


    constructor(props) {
        super(props);
        this.p;
    }

    componentDidMount() {
        this.props.fetchData("http://localhost:8080/orders");

    }

    changeWidth(size) {
        console.log(size);
        var innerWidth = size.windowWidth;
        if (innerWidth > 768) {
            this.p = 1000 - (1366 - innerWidth);
        }
        else {
            this.p = innerWidth - 10;
        }
        console.log("inside cons", this.p)
        this.setState({});
    }



    render() {
        var item = this.props.items;
        var cc = [];
        for (var i = 0; i < item.length; i++) {
            var quantityPlaced = item[i].quantityPlaced - item[i].quantityExecuted;
            var quantity = item[i].quantity - item[i].quantityPlaced;
            var obj = { "Executed": (item[i].quantityExecuted / item[i].quantity) * 100, "Placed": (quantityPlaced / item[i].quantity) * 100, "Total": (quantity / item[i].quantity) * 100, "State": item[i].id };
            // if (quantity != 0 && quantityPlaced != 0) 
            // {
            cc.push(obj);
            // }
            console.log("Item inserted", obj);

        }
        var height;

        if (cc.length > 2) {
            height = (cc.length * 55);
        }
        if (cc.length === 2) {
            height = (cc.length * 75);
        }
        if (cc.length === 1) {
            height = (cc.length * 115);
        }

        var width = 900,

            chartSeries = [
                {
                    field: 'Executed',
                    name: 'Executed',
                    color: '#ff8000',
                },
                {
                    field: 'Placed',
                    name: 'Placed',
                    color: '#febb68',
                }, {
                    field: 'Total',
                    name: 'Total',
                    color: '#ffefbf',
                }
            ],
            y = function (d) {
                return d.State;
            },
            yScale = 'ordinal',
            xTicks = [2, "%"],
            x = function (d) {

                return +d / 100;
            },
            xTickFormat = d3.format("%");
        var widthL = 140,

            margins = { top: 50, right: 50, bottom: 50, left: 50 },
            legendClassName = "test-legend-class",
            legendPosition = 'left',
            legendOffset = 90;



        var widthLg = 300;
        console.log(window.innerWidth);
        if (window.innerWidth > 768) {
            this.p = 1000 - (1366 - window.innerWidth) / 1.3;
        }
        else {
            this.p = window.innerWidth - 10;
        }
        width = this.p;
        if (cc.length > 0) {
            return (
                <div>
                    <div className="col-xs-5 col-xs-offset-5  hidden-md hidden-lg hidden-xl ">
                        <Legend width={widthLg} height={height} legendClassName={legendClassName} legendPosition={legendPosition}
                            legendOffset={legendOffset}
                            chartSeries={chartSeries} />
                    </div>
                    <WindowResizeListener onResize={this.changeWidth.bind(this)} />
                    <div className="col-sm-9 col-xs-12">
                        <BarStackHorizontalChart width={width} height={height} data={cc} chartSeries={chartSeries}
                            y={y}
                            yLabel="Order id"
                            xTicks={xTicks}
                            yScale={yScale}
                            x={x}
                            xTickFormat={xTickFormat}
                            horizontal={true}
                            showLegend={false} />
                    </div>

                    <div className="col-sm-2 hidden-sm hidden-xs pull-left">
                        <Legend width={widthL} height={height} legendClassName={legendClassName} legendPosition={legendPosition}
                            legendOffset={legendOffset} xTicks={xTicks}
                            chartSeries={chartSeries} />
                    </div>


                </div>
            );
        }
        else {
            return (<h1>No incomplete Order</h1>);
        }

    }
}