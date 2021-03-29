import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../common/PrivateRoute";
import Home from "../../views/Home";
import { Admins, newAdmin } from "../../views/Admin/Admins"
import { Stations, newStation } from "../../views/Admin/Stations"
// import FooterPage from "./Footer";

export default class Page extends React.Component {
    render() {
        return (
            <div style={{ width: 'calc(100% - 58px)', paddingLeft: "58px" }}>
                <Switch>
                    <PrivateRoute exact path="/admin/" component={Home} />

                    {/*  Admins   */}
                    <PrivateRoute exact path="/admin/administradores" component={Admins} />
                    <PrivateRoute exact path="/admin/administradores/nuevo" component={newAdmin} />
                    {/*  Stations   */}
                    <PrivateRoute exact path="/admin/estaciones" component={Stations} />
                    <PrivateRoute exact path="/admin/estaciones/nueva" component={newStation} />
                </Switch>
            </div>
        );
    }
}