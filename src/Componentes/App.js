import React, { Component } from 'react';
import Header from './Header';
import '../css/App.css'
import FormularioGasto from './Formulario';
import Listado from './Listado';
import {validarPresupuesto} from '../helper'
import ControlPresupuesto from './ControlPresupuesto';

class App extends Component {

  constructor(props){
    super(props);
      this.state = {
        presupuesto:'',
        restante: '',
        gastos: {}
    }
  }

  componentDidMount(){
    this.obtenerPresupuesto()
  }

  obtenerPresupuesto = () => {
    let presupuesto = prompt('Cual es el presupuesto')

    let resultado = validarPresupuesto(presupuesto);
    if(resultado){
      this.setState({
        presupuesto:presupuesto,
        restante:presupuesto
      })
    }else{
      this.obtenerPresupuesto()
    }
  }

  agregarGasto = gasto => {
    //tomar una copia del state actual
    const gastos = {...this.state.gastos}
    
    //agregar al gasto al objeto del state
    gastos[`gasto${Date.now()}`] = gasto;

    //Restar al presupuesto
    this.restarPresupuesto(gasto.cantidadGasto)

    //ponerlo en state
    this.setState({
      gastos:gastos
    })
  }

  //Restar el presupuesto cuando el gasto se crea

  restarPresupuesto = cantidad =>{
    //Leer el gasto
    let restar = Number(cantidad)

    //Tomar una copia del state actual
    let restante = this.state.restante

    //Lo restamos
    restante -= restar;

    //agregamos al nuevo state
    this.setState({
      restante
    })

  }

  render() {
    return (
      <div className='App container'>
        <Header 
          titulo='Gasto Semanal'
        /> 
        <div className='contenido-principal contenido'>
          <div className='row'>
            <div className='one-half column'>
              <FormularioGasto
                agregarGasto = {this.agregarGasto}
              />
            </div>
            <div className='one-half column'>
              <Listado 
                gastos={this.state.gastos}
              />
              <ControlPresupuesto 
                presupuesto={this.state.presupuesto}
                restante={this.state.restante}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
