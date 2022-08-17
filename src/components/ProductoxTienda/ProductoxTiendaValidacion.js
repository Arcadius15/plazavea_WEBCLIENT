import * as Yup from 'yup'

const productoxtiendaSchema = Yup.object().shape({
    idProducto: Yup.string().trim().required(),
    idTienda: Yup.string().trim().required(),
    stock: Yup.number().min(1).max(50)
})

export default productoxtiendaSchema;