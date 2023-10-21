import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addUser } from "./userSlice";
import UserList from "./UserList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css"; //

export default function AddUser() {
  const dispatch = useDispatch();
  const [addressInputs, setAddressInputs] = useState([]);
  const [addressValues, setAddressValues] = useState({});
  const allUsers = useSelector((state) => state.user.users);
  console.log(allUsers);
  // Create a Yup validation schema for the combined form
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits"),
    dateOfBirth: Yup.string()
      .required("Date of Birth is required")
      .test("minAge", "User must be 18 years old", function (value) {
        const currentDate = new Date();
        const birthDate = new Date(value);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          return false;
        }
        return true;
      }),
    gender: Yup.string().required("Gender is required"),
    ...addressInputs.reduce((schema, field) => {
      schema[field] = Yup.string().required(`${field} is required`);
      if (field === "postalCode") {
        schema[field] = schema[field].matches(
          /^[0-9]{6}$/,
          "Postal Code must be 6 digits"
        );
      }
      return schema;
    }, {}),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      ...addressValues,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Dispatch the user data and address data together
      dispatch(addUser({ id: Date.now(), ...values }));
      // Reset the form and state after submission
      resetForm();
      setAddressInputs([]);
      setAddressValues({});
      setSubmitting(false);
    },
  });

  const addField = (field) => {
    if (!addressInputs.includes(field)) {
      setAddressInputs([...addressInputs, field]);
    }
  };

  const removeField = (field) => {
    setAddressInputs(addressInputs.filter((input) => input !== field));
    formik.setFieldValue(field, "");
  };

  return (
    <div className="add-user-form">
      <h1>Add User</h1>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3 row">
            <div className="col-lg-6 col-md-12 mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-control ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="invalid-feedback">
                  {formik.errors.firstName}
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`form-control ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-lg-6 col-md-12 mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                className={`form-control ${
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="invalid-feedback">
                  {formik.errors.phoneNumber}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-lg-6 col-md-12 mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth:
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className={`form-control ${
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className="invalid-feedback">
                  {formik.errors.dateOfBirth}
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <label htmlFor="gender" className="form-label">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                className={`form-select ${
                  formik.touched.gender && formik.errors.gender
                    ? "is-invalid"
                    : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
              >
                <option value="" label="Select Gender" />
                <option value="male" label="Male" />
                <option value="female" label="Female" />
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="invalid-feedback">{formik.errors.gender}</div>
              )}
            </div>
          </div>
          <div className="row">
            {addressInputs.map((input) => (
              <div className="col-lg-6 col-md-6 col-sm-12 mb-3" key={input}>
                <label htmlFor={input} className="sr-only">
                  {input}
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    id={input}
                    name={input}
                    className={`form-control ${
                      formik.touched[input] && formik.errors[input]
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[input]}
                    placeholder={input}
                    aria-label={input}
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeField(input)}
                    >
                      Remove
                    </button>
                  </div>
                  {formik.touched[input] && formik.errors[input] && (
                    <div className="invalid-feedback">
                      {formik.errors[input]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-3">
            {["streetAddress", "city", "state", "postalCode", "country"].map(
              (field) =>
                !addressInputs.includes(field) ? (
                  <div className="mb-2">
                    <button
                      key={field}
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => addField(field)}
                    >
                      Add {field}
                    </button>
                    <br />
                  </div>
                ) : null
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
      <UserList />
    </div>
  );
}
