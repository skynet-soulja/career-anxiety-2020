import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { useForm } from "react-hook-form";
import ToastContext from "../../context/ToastContext";

const ContactForm = () => {
  console.log(`API_URL -> ${process.env.API_URL}`);
  console.log(`GATSBY_API_URL -> ${process.env.GATSBY_API_URL}`);
  console.log(`ROOT_URL -> ${process.env.ROOT_URL}`);
  console.log(`GATSBY_ROOT_URL -> ${process.env.GATSBY_ROOT_URL}`);
  const { setMessage } = React.useContext(ToastContext);

  const onSubmit = (values) => {
    setMessage(`Sending...`);

    fetch(`${process.env.API_URL}/requests-personals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        setMessage(`Message Recieved!`);
        formRef.current.reset();
      })
      .catch((error) => {
        setMessage(`Something Went Wrong :(`);
      });
  };

  const autoResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const { register, handleSubmit, errors } = useForm();
  const formRef = React.useRef();

  const data = useStaticQuery(query);
  const radioOptions = [
    { id: "Radio__General", name: "General" },
    ...data.allStrapiWriter.nodes,
  ];

  return (
    <form className="ca-form" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <div className="ca-input-radio-wrap">
        {radioOptions.map((node, index) => {
          return (
            <div key={node.id} className="ca-input-radio-group">
              <input
                className="ca-input-radio"
                type="radio"
                name="recipient"
                id={node.name}
                value={node.name}
                ref={register({
                  required: true,
                })}
                defaultChecked={index === 0 ? true : false}
              />
              <label className="ca-input-radio-label" htmlFor={node.name}>
                <span>{node.name}</span>
              </label>
            </div>
          );
        })}

        <span className="ca-input-error">
          {errors.recipient && `Please choose a recipient`}
        </span>
      </div>

      <div className="ca-input-group">
        <div className="ca-input-wrap">
          <input
            className="ca-input"
            type="text"
            name="name"
            placeholder="Your name"
            ref={register({
              required: true,
              maxLenght: 160,
            })}
          />

          <div className="ca-input-circle" />

          <span className="ca-input-error">
            {errors.fullName && `Please provide your name`}
          </span>
        </div>

        <div className="ca-input-spacer"></div>

        <div className="ca-input-wrap">
          <input
            className="ca-input"
            type="email"
            name="email"
            placeholder="Your email"
            ref={register({
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />

          <div className="ca-input-circle" />

          <span className="ca-input-error">
            {errors.emailAddress && `Please provide a valid email address`}
          </span>
        </div>

        <div className="ca-input-spacer"></div>

        <div className="ca-input-wrap">
          <textarea
            className="ca-input"
            type="textarea"
            name="message"
            placeholder="What would you like to relay?"
            ref={register({
              required: true,
              maxLength: 600,
            })}
            onChange={autoResize}
          />

          <div className="ca-input-circle" />

          <span className="ca-input-error">
            {errors.message && `Please provide a valid message (length < 600)`}
          </span>
        </div>
      </div>

      <button className="ca-link-inked" type="submit">
        <span>Submit</span>
      </button>
    </form>
  );
};

export default ContactForm;

const query = graphql`
  {
    allStrapiWriter {
      nodes {
        id
        name
      }
    }
  }
`;
