import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { auth } from "../../firebase";

import authentication from "../../services/authentication";

import EmptyState from "../../components/EmptyState";

import { ReactComponent as CabinIllustration } from "../../assets/illustrations/cabin.svg";
import { ReactComponent as InsertBlockIllustration } from "../../assets/illustrations/insert-block.svg";

class HomePage extends Component {
  signInWithEmailLink = () => {
    const { user } = this.props;

    if (user) {
      return;
    }

    const emailLink = window.location.href;

    if (!emailLink) {
      return;
    }

    if (auth.isSignInWithEmailLink(emailLink)) {
      let emailAddress = localStorage.getItem("emailAddress");

      if (!emailAddress) {
        this.props.history.push("/");

        return;
      }

      authentication
        .signInWithEmailLink(emailAddress, emailLink)
        .then((value) => {
          const user = value.user;
          const displayName = user.displayName;
          const emailAddress = user.email;

          this.props.openSnackbar(
            `Autenticado como ${displayName || emailAddress}`
          );
        })
        .catch((reason) => {
          this.props.openSnackbar(authentication.getErrorFirebase(reason));
        })
        .finally(() => {
          this.props.history.push("/");
        });
    }
  };

  render() {
    const { user } = this.props;

    if (user) {
      return <EmptyState image={<CabinIllustration />} />;
    }

    return (
      <EmptyState
        image={<InsertBlockIllustration />}
        title="ToDoList Project Manager"
        description="Lista de tarefas para gerenciar projetos simples."
      />
    );
  }

  componentDidMount() {
    this.signInWithEmailLink();
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
};

export default withRouter(HomePage);
