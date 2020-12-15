import React from "react";

import { useForm } from "react-hook-form";
import ToastContext from "../../context/ToastContext";

const CommentForm = ({ articleId, fetchComments }) => {
  const { setMessage } = React.useContext(ToastContext);

  const onSubmit = (values) => {
    setMessage(`Sending...`);

    const requestBody = { ...values, article: articleId };

    fetch(`${process.env.GATSBY_API_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }

        setMessage(`Comment Submitted!`);
        formRef.current.reset();
        fetchComments();
      })
      .catch((error) => {
        setMessage(`Something Went Wrong :(`);
      });
  };

  const autoResize = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const formRef = React.useRef();
  const { register, handleSubmit, errors } = useForm();

  return (
    <form
      className="ca-form -comment"
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    >
      <div className="ca-input-group">
        <div className="ca-input-wrap">
          <input
            className="ca-input"
            type="email"
            name="email"
            placeholder="Your Email - Will Not Be Displayed Or Publicly Available"
            ref={register({
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              maxLength: 80,
            })}
          />

          <div className="ca-input-circle" />

          <span className="ca-input-error">
            {errors.email && `Please provide a valid email address`}
          </span>
        </div>

        <div className="ca-input-spacer"></div>

        <div className="ca-input-wrap">
          <input
            className="ca-input"
            type="text"
            name="name"
            placeholder="Your Name"
            ref={register({
              required: true,
              maxLenght: 80,
            })}
          />

          <div className="ca-input-circle" />

          <span className="ca-input-error">
            {errors.name && `Please provide your name`}
          </span>
        </div>

        <div className="ca-input-spacer"></div>

        <div className="ca-input-wrap">
          <textarea
            className="ca-input"
            type="textarea"
            name="content"
            placeholder="Your Comment"
            ref={register({
              required: true,
              maxLength: 600,
            })}
            onChange={autoResize}
          />

          <div className="ca-input-circle" />

          <span className="ca-input-error">
            {errors.content && `Please provide a valid comment (length < 600)`}
          </span>
        </div>
      </div>

      <button className="ca-link-inked" type="submit">
        <span>Submit</span>
      </button>
    </form>
  );
};

export default CommentForm;
