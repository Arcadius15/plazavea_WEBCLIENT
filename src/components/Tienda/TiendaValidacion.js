import * as Yup from 'yup';

const telefonoRegex = /^\d{9}$/;

const TiendaSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    direccion: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
    numeroTelefonico: Yup.string()
      .trim()
      .matches(telefonoRegex,'Numero telefonico Incorrecto')
      .required(),
    lat:Yup.number().notOneOf([0]).required(),
    lng:Yup.number().notOneOf([0]).required()
  });


  export default TiendaSchema