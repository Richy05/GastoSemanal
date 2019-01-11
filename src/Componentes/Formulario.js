import React, {Component} from 'react'
import PropTypes from 'prop-types'

class FormularioGasto extends Component{
    //refs para campos del formulario

    nombreGasto = React.createRef();
    cantidadGasto = React.createRef();

    crearGasto = (e) => {
        //Prevenir Default
        e.preventDefault();

        //crear el obejto con los datos
        const gasto = {
            nombreGasto: this.nombreGasto.current.value,
            cantidadGasto: this.cantidadGasto.current.value
        }

        //Agregarlo y enviarlo por los props
        this.props.agregarGasto(gasto)

        //Resetear el formulario (Opcional)
        e.currentTarget.reset();

    }

    render(){
        return(
            <form onSubmit={this.crearGasto}>
                <h2>Agrega tus gastos aquí</h2>
                <div className='campo'>
                    <label>Nombre Gasto</label>
                    <input ref={this.nombreGasto} className='u-full-width' type='text' placeholder='Ej. Trasporte' />
                </div>
                <div className='campo'>
                    <label>Cantidad</label>
                    <input ref={this.cantidadGasto} className='u-full-width' type='text' placeholder='Ej. 300' />
                </div>

                <input className='button-primary u-full-width' type='submit' value='Agregar' />
            </form>
        )
    }
}

FormularioGasto.propTypes = {
    agregarGasto: PropTypes.func.isRequired
}

export default FormularioGasto;