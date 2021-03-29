import React from "react"
import { Link, Redirect } from "react-router-dom"
import { postRequest } from "../../../../utils/axios"
import { Button, Divider, Grid, Snackbar, TextField } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert';
import "./newStation.css"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class newStation extends React.Component {
    state = {
        form: {
            name: "",
            country: "",
            city: "",
            latitude: "",
            longitude: "",
            status: "",
        },
        errors: {
            name: "",
            country: "",
            city: "",
            latitude: "",
            longitude: "",
            status: "",
        },
        openSnackbar: false,
        snackMessage: { message: "", success: false },
        submitted: false
    }

    onChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {
            name: "",
            country: "",
            city: "",
            latitude: "",
            longitude: "",
            status: "",
        }
        let isValid = true
        let form = this.state.form

        Object.keys(form).forEach(field => {
            if (!form[field]) {
                errors[field] = "Este campo es obligatorio"
                isValid = false
            }
        })
        if (form.name.length < 8 || form.name.length > 15) {
            errors.username = "Nombre debe tener entre 8 a 15 carácteres"
            isValid = false
        }
        if (!Number(form.latitude)) {
            errors.latitude = "Debe ingresar una latitud correcta. Ej: -35.43"
            isValid = false
        }
        if (!Number(form.longitude)) {
            errors.longitude = "Debe ingresar una longitud correcta. Ej: -71.67 "
            isValid = false
        }
        if (!form.status) {
            errors.status = "Debe ingresar un estado"
            isValid = false
        }
        this.setState({ errors })
        if (isValid) {
            //Post
            try {
                const response = await postRequest(`${process.env.REACT_APP_API_URL}/api/stations/new`, form);
                if (response.status === 201) {
                    this.setState({ snackMessage: { message: "Estación creada!", success: true }, submitted: true, })
                }
            } catch (e) {
                this.setState({
                    snackMessage: { message: e.response.data.message, success: false }, openSnackbar: true
                })
            }


        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    };

    render() {
        if (this.state.submitted) {
            return <Redirect to="/admin/estaciones" />
        }
        return (
            <div className="Container">
                <Snackbar open={this.state.openSnackbar} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={this.state.snackMessage.success ? "success" : "error"}>
                        {this.state.snackMessage.message}
                    </Alert>
                </Snackbar>
                <div className="Container__header">
                    <div className="Container__header_row">
                        <h3>Nueva estación</h3>
                        <div className="Container__header_row_button">
                            <Button color="primary" variant="contained" component={Link} to="/admin/estaciones/"> Volver</Button>
                        </div>
                    </div>
                    <Divider />
                </div>
                <form className="form">
                    <h4 className="text__left">Información:</h4>
                    <Grid container spacing={4} justify="center">
                        <Grid item xs={12} md={5}>
                            <TextField name="name" label="Nombre" variant="outlined" fullWidth size="small" onChange={this.onChange} helperText={this.state.errors.name} error={Boolean(this.state.errors.name)} />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField name="status" label="Estado" variant="outlined" fullWidth size="small" onChange={this.onChange} helperText={this.state.errors.status} error={Boolean(this.state.errors.status)} />
                        </Grid>
                    </Grid>
                    <h4 className="text__left">Ubicación:</h4>
                    <Grid container spacing={4} justify="center">
                        <Grid item xs={12} md={5}>
                            <TextField name="country" label="País" variant="outlined" fullWidth size="small" onChange={this.onChange} helperText={this.state.errors.country} error={Boolean(this.state.errors.country)} />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField name="city" label="Ciudad" variant="outlined" fullWidth size="small" onChange={this.onChange} helperText={this.state.errors.city} error={Boolean(this.state.errors.city)} />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField name="latitude" label="Latitud" variant="outlined" fullWidth size="small" onChange={this.onChange} helperText={this.state.errors.latitude} error={Boolean(this.state.errors.latitude)} />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <TextField name="longitude" label="Longitud" variant="outlined" fullWidth size="small" onChange={this.onChange} helperText={this.state.errors.longitude} error={Boolean(this.state.errors.longitude)} />
                        </Grid>
                    </Grid>
                    <div className="form__row_button">
                        <Button className="form_button" type="submit" variant="contained" color="primary" onClick={this.handleSubmit} >Agregar</Button>
                    </div>
                </form>
            </div>
        )
    }
}