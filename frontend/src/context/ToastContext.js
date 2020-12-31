import React from "react";

const ToastContext = React.createContext();

class ToastProvider extends React.Component {
  state = {
    message: "",
  };

  setMessage = (message) => {
    this.setState({ message });
  };

  render() {
    return (
      <ToastContext.Provider
        value={{
          ...this.state,
          setMessage: this.setMessage,
        }}
      >
        {this.props.children}
      </ToastContext.Provider>
    );
  }
}

export default ToastContext;

export { ToastProvider };
