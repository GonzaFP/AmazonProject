import * as yup from 'yup'

export const schema = yup.object().shape({
name:yup.string().required("Enter your name"),
email:yup
        .string()
        .email("Enter a valid email address.")
        .required("Enter your email address."),
  password:yup
          .string()
          .min(6, "Passwords must be at least 6 characters.")
          .required("Enter a password"),
  confirmPassword:yup
                  .string()
                  .oneOf([yup.ref('password')], "Passwords must match")
                  .required('Confirm password')
})