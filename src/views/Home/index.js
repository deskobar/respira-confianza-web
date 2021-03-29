import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import "./Home.css"
import {
    SupervisorAccount as AdminIcon,
    Equalizer as Umbrals,
    Storage as Readings,
    SettingsRemote as Station,
    NetworkCheck as Sensor
} from "@material-ui/icons";

class HomeItem extends React.Component {
    state = {
        text: this.props.item.text,
        url: this.props.item.url
    }
    render() {
        const Icon = this.props.item.Icon
        return (
            <Link to={this.state.url}>
                <div className="HomeItem">
                    <Icon className="HomeItem__icon" />
                    <h4 className="HomeItem__text">{this.state.text}</h4>
                </div>
            </Link>
        )
    }
}

class Home extends React.Component {
    state = {
        user: this.props.auth.user,
        homeItems: [
            { text: "Administradores", Icon: AdminIcon, url: "/admin/administradores" },
            { text: "Estaciones", Icon: Station, url: "/admin/estaciones" },
            { text: "Sensores", Icon: Sensor, url: "/admin/tipos-de-sensores" },
            { text: "Umbrales", Icon: Umbrals, url: "/admin/umbrales" },
            { text: "Lecturas", Icon: Readings, url: "/admin/lecturas" },
        ]
    }
    render() {
        return (
            <div className="Container">
                <h2>Bienvenido {this.state.user.first_name} {this.state.user.last_name} a Respira Confianza </h2>
                <p>Respira confianza es una red comunitaria de monitoreo de la calidad del aire. Actualmente monitorea
                las zonas de Quintero y Puchuncaví en Chile.
                </p>

                <div className="Container__items">
                    {
                        this.state.homeItems.map(item => <HomeItem key={item.text} item={item} />)
                    }
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Home)