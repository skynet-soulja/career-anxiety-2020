import React, { useCallback } from "react";

const ModalContext = React.createContext();

class ModalProvider extends React.Component {
  state = {
    isActive: null,
    type: null,
    content: {},
  };

  toggleActive = () => this.setState({ isActive: !this.state.isActive });

  setContent = ([type, content]) => {
    this.setState({ type, content });
  };

  render() {
    return (
      <ModalContext.Provider
        value={{
          ...this.state,
          toggleActive: this.toggleActive,
          setContent: this.setContent,
        }}
      >
        {this.props.children}
      </ModalContext.Provider>
    );
  }
}

export default ModalContext;

export { ModalProvider };
