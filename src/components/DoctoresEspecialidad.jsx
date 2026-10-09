import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';

export default class DoctoresEspecialidad extends Component {
  urlApiDoctoresRoutes = Global.urlApiDoctoresRoutes;
  
  state = {
    doctores: null
  };

  loadDoctores = () => {
    this.setState({ doctores: null }); 
    
    let request = "api/Doctores/" + this.props.especialidad;
    axios.get(this.urlApiDoctoresRoutes + request).then((response) => {
      this.setState({ doctores: response.data });
    });
  };

  componentDidMount() {
    this.loadDoctores();
  }

 
  componentDidUpdate(prevProps) {
    if (prevProps.especialidad !== this.props.especialidad) {
      this.loadDoctores();
    }
  }

  render() {
    if (!this.state.doctores) {
      return <p>Cargando doctores...</p>;
    }

    return (
      <div>
        <h2>Especialidad: {this.props.especialidad}</h2>
        <ul>
          {/* 3. Mapeamos el array de doctores recibido de la API */}
          {this.state.doctores.map((doctor, index) => (
            <li key={index}>
              {doctor.apellido} - {doctor.especialidad}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}