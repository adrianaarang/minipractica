import axios from 'axios';
import Global from '../Global';
import DoctoresEspecialidad from './DoctoresEspecialidad';
import React, { Component } from 'react';

export default class HomeComponent extends Component {
    
    selectDoctor = React.createRef();
    urlApiDoctoresRoutes = Global.urlApiDoctoresRoutes;

    state = {
        doctores: [],
        idSeleccionado: null // 1. Cambiado de 'especialidad' a 'idSeleccionado' para coincidir con el render
    }

    loadDoctor = () => {
        let request = "api/Doctores";
        axios.get(this.urlApiDoctoresRoutes + request).then((response) => {
            console.log("Leyendo doctores");
            this.setState({
                doctores: response.data
            });
        });
    }

    componentDidMount() {
        this.loadDoctor();
    }

    mostrarEspecialidad = (event) => {
        event.preventDefault();
        let id = this.selectDoctor.current.value;
        this.setState({
            idSeleccionado: id
        });
    }

    render() {
        return (
            <div>
                <h1>Doctores</h1>
                <form onSubmit={this.mostrarEspecialidad}> {/* 3. Es mejor controlar el submit en el form */}
                    <select ref={this.selectDoctor}>
                        {
                            this.state.doctores.map((doctor, index) => {
                                return (
                                    <option key={index} value={doctor.especialidad}>
                                        {doctor.especialidad}
                                    </option>
                                );
                            })
                        }
                     </select>
                    {/* 2. Cambiado 'onClick={this.mostrarDoctor}' por el método correcto */}
                    <button type="submit">Ver Doctor</button> 
                </form>
                {
                    this.state.idSeleccionado &&
                    <DoctoresEspecialidad especialidad={this.state.idSeleccionado} />
                }
            </div>
        )
    }
}
