import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, App, ContainerApp } from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { TableComponent } from './components/Trader/Table/TableComponent';
import { LoginComponent } from './components/Login/LoginComponent';
import Chart from './components/Trader/Chart/ChartComponent';
import { SplitScreenComponent } from './components/Trader/Utilities/SplitScreenComponent.js';


const store = configureStore();
let provider = <Provider store={store}>
    <Router history={browserHistory}>
        <Router path="/" component={App}>
            <IndexRoute component={LoginComponent}>
            </IndexRoute>
        </Router>
        <Router path="/users" component={ContainerApp}>
            <IndexRoute component={SplitScreenComponent}>
            </IndexRoute>
            

        </Router>
    </Router>
</Provider>;

render(provider, document.getElementById('app')
);

var $table = $('#table');
$(function () {
    $('#toolbar').find('select').change(function () {
        $table.bootstrapTable('refreshOptions', {
            exportDataType: $(this).val()
        });
    });
})

var trBoldBlue = $("table");

$(trBoldBlue).on("click", "tr", function () {
    $(this).toggleClass("bold-blue");
});