import * as Yup from 'yup';

const changePasswordSchema = Yup.object().shape({
  email: Yup.string().email().required("Email Required"),
  oldPassword: Yup.string().required("Old Password Required"),
  newPassword: Yup.string().required("New Password Required"),
  confirmPassword:Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required("Confirm Password!")
});


export default changePasswordSchema