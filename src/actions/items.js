import axios from 'axios';

export var responseOrder = [];

export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function stockFetchDataSuccess(stocks) {
    return {
        type: 'STOCK_FETCH_DATA_SUCCESS',
        stocks
    };
}

export function orderPlaceDataSuccess(order) {
    return {
        type: 'ORDER_PLACE_DATA_SUCCESS',
        orders
    };
}

export function deleteOrderSuccess() {
    return {
        type: 'DELETE_ORDER_SUCCESS',
    };
}

export function updateSearch(newOrder, searchResults) {
    console.log("in update seatch")
    return {
        type: 'UPDATE_SEARCH_DATA',
        newOrder,
        searchResults
    };
}

export function notify(notificationMsg, notifications) {
    console.log("in update seatch")
    return {
        type: 'NOTIFY_USER',
        notificationMsg,
        notifications
    };
}

export function updateOrder(msg, orders, newOrder, searchResults) {
    return {
        type: msg,
        orders,
        newOrder
    };
}

export function stockFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
            .then((response) => { return response.data; })
            .then((stocks) => dispatch(stockFetchDataSuccess(stocks)))
            .catch((err) => {
                dispatch(itemsHasErrored(true))
                console.log(err.message)
            });
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        return axios({
            url: url,
            timeout: 20000,
            method: 'get',
            responseType: 'json'
        })
            .then((response) => response.data)
            .then((items) => {
              //  dispatch(updateSearch(items))
                return dispatch(itemsFetchDataSuccess(items))})
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function orderPostData(url, data) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));


        return axios({
            url: url,
            timeout: 20000,
            data,
            method: 'post',
            responseType: 'json'
        })
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .then((orders) => { console.log(responseOrder); responseOrder.push(orders); dispatch(orderPlaceDataSuccess(responseOrder)) })
            .catch((err) => { console.log(err.message); dispatch(itemsHasErrored(true)) });
    };
}


export function deleteOrders(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));


        return axios({
            url: url,
            timeout: 20000,
            method: 'delete',
            responseType: 'json'
        })
            .then((response) => {
                console.log(response);
                dispatch(updateSearch([]))
                return response.data;
            })
            .catch((err) => { console.log(err.message); dispatch(itemsHasErrored(true)) });
    };
}

export function searchItems(key, criteria, items){
    let type = "SEARCH_DATA_" + criteria;
        console.log(key, criteria, items, type)
    return {
        type,
        items,
        key
    }
}

export function show(opts = {}, level = 'success') {
    console.log("called show")
  return {
    type: "RNS_SHOW_NOTIFICATION",
    ...opts,
    uid: opts.uid || Date.now(),
    level
  };
}

export function success(opts) {
    console.log("in", "insijdskjfkadfjkadjfkadfkadfkdfmk")
  return show(opts, 'success');
}

export function error(opts) {
  return show(opts, 'error');
}

export function warning(opts) {
  return show(opts, 'warning');
}

export function info(opts) {
  return show(opts, 'info');
}

export function hide(uid) {
  return {
    type: RNS_HIDE_NOTIFICATION,
    uid
  };
}
