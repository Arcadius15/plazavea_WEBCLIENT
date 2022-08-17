import * as Yup from 'yup'

const dniRegex = /^\d{8}$/;
const telefonoRegex = /^\d{9}$/;
const placaRegex = /^[a-zA-Z0-9]{6}$/;

const RepartidorSchema = Yup.object().shape({
    email:Yup.string().email().required(),
    password:Yup.string().required(),
    repartidor:Yup.object().shape({
        nombre:Yup.string().required(),
        apellidos:Yup.string().required(),
        dni:Yup.string()
            .trim()
            .matches(dniRegex,'Numero de DNI invalido')
            .required(),
        numTelefonico:Yup.string()
            .trim()
            .matches(telefonoRegex,'Numero de Telefono Invalido')
            .required(),
        direccion:Yup.string().required(),
        placa:Yup.string()
            .trim()
            .matches(placaRegex,'Numero de Placa invalido')
            .required(),
        tienda:Yup.object().shape({
            idTienda:Yup.string().required()
        })
    })
})

export default RepartidorSchema