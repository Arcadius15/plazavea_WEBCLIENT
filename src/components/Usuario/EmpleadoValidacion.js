import * as Yup from 'yup'

const dniRegex = /^\d{8}$/;
const telefonoRegex = /^\d{9}$/;

const EmpleadoSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    empleado: Yup.object().shape({
        nombres: Yup.string().required(),
        apellidos: Yup.string().required(),
        dni: Yup.string()
            .trim()
            .matches(dniRegex, 'Numero de DNI invalido')
            .required(),
        numTelefonico: Yup.string()
            .trim()
            .matches(telefonoRegex, 'Numero de Telefono Invalido')
            .required(),
        tienda: Yup.object().shape({
            idTienda: Yup.string().required()
        })
    }),
})

export default EmpleadoSchema



