import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux";
import { DataTypes } from "../data/dataTypes/Types";
import { Shop } from "./Shop";
import * as ShopActions from "../data/actions/ActionCreators";
import * as CartActions from "../data/actions/CartActionCreators";
import { CartDetails } from "./CartDetails";
import { DataGetter } from "../data/remote/DataGetter";
import { Checkout } from "./Checkout";
import { Thanks } from "./Thanks";

const mapDispatchToProps = { ...ShopActions, ...CartActions };

class ShopConnectorContent extends Component {

    selectComponent = (routeProps) => {
        const wrap = (Component, Content) =>
            <Component {...this.props} {...routeProps}>
                {Content && wrap(Content)}
            </Component>
            
        switch (routeProps.match.params.section) {
            case "products":
                return wrap(DataGetter, Shop);
            case "cart":
                return wrap(CartDetails);
            case "checkout":
                return wrap(Checkout);
            case "thanks":
                return wrap(Thanks);
            default:
                return <Redirect to="/shop/products/all/1" />
        }
    }

    componentDidMount = () => this.props.loadData(DataTypes.CATEGORIES);

    render() {
        return <Switch>
            <Redirect
                from="/shop/products/:category"
                to="/shop/products/:category/1"
                exact={true} />
            <Route 
                path={"/shop/:section?/:category?/:page?"}
                render={routeProps => this.selectComponent(routeProps)} />
        </Switch>
    }

}

export const ShopConnector = connect(ds => ds, mapDispatchToProps)(ShopConnectorContent);