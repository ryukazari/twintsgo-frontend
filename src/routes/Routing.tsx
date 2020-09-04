import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from 'lodash';
import configRouting from './configRouting';

interface IProps{
    setRefreshCheckLogin: (bool: boolean) => void;
}

const Routing = (props: IProps) => {
    const { setRefreshCheckLogin } = props;
    return (
        <Router>
            <Switch>
                {
                    map(configRouting, (route, index) => (
                            <Route key={index} path={route.path} exact={route.exact}>
                                <route.page setRefreshCheckLogin={setRefreshCheckLogin}/>
                            </Route>
                    ))
                }
            </Switch>
        </Router>
    )
}

export default Routing;
