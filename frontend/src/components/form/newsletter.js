import React from "react";

import { useForm } from "react-hook-form";
import ToastContext from "../../context/ToastContext";

const Newsletter = () => {
  const { setMessage } = React.useContext(ToastContext);

  const onSubmit = (values) => {
    setMessage(`Sending...`);

    fetch(`${process.env.GATSBY_API_URL}/requests-newsletters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        setMessage(`Successfully Subscribed!`);
        formRef.current.reset();
      })
      .catch((error) => {
        setMessage(`Something Went Wrong :(`);
      });
  };

  const formRef = React.useRef();
  const { register, handleSubmit, errors } = useForm();

  return (
    <form className="ca-form" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <div className="ca-input-group">
        <div className="ca-input-wrap">
          <input
            className="ca-input"
            type="email"
            name="email"
            placeholder="Your email"
            ref={register({
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              maxLength: 80,
            })}
          />

          <div className="ca-input-circle" />

          <span className="ca-input-error">
            {errors.email && `Please provide a valid email`}
          </span>
        </div>
      </div>

      <button className="ca-link-inked" type="submit">
        <span>Submit</span>
      </button>
    </form>
  );
};

export default Newsletter;
