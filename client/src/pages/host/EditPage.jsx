import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const [listing, setListing] = useState("");
  //   const [msg, setMsg] = useState("");
  //   const [brand, setBrand] = useState("");
  //   const [model, setModel] = useState("");
  //   const [type, setType] = useState("");
  //   const [price, setPrice] = useState("");
  //   const [transmission, setTransmission] = useState("");
  //   const [fuel, setFuel] = useState("");
  //   const [availability, setAvailability] = useState("");
  //   const [image, setImage] = useState("");
  //   const [location, setLocation] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/reservation/retrive/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setListing(result);
      } catch (error) {
        console.log({ msg: "error" });
      }
    };
    fetchData();
  }, []);

  console.log({ id });
  return (
    <>
      <Formik
        initialValues={{
          brand: "",
          model: "",
          type: "",
          price: "",
          transmission: "",
          fuel: "",
          availability: "",
          image: "",
          location: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditPage;
