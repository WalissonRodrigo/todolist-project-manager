import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { auth } from "../../firebase";

import authentication from "../../services/authentication";

import EmptyState from "../../components/EmptyState";

import { ReactComponent as CabinIllustration } from "../../illustrations/cabin.svg";
import { ReactComponent as InsertBlockIllustration } from "../../illustrations/insert-block.svg";

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
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            case "auth/id-token-expired":
            case "auth/expired-action-code":
              this.props.openSnackbar(
                "Sua sessão expirou. Será necessário sair e efetuar login novamente."
              );
              return;
            case "auth/invalid-email":
              this.props.openSnackbar(
                "E-mail inválido ou não formatado como um email válido."
              );
              return;
            case "auth/user-disabled":
              this.props.openSnackbar(
                "Usuário desativado. Apenas usuários ativos têm acesso."
              );
              return;
            case "auth/invalid-credential":
              this.props.openSnackbar(
                "Esta operação é sensível e requer autenticação recente. Efetue login novamente antes de tentar novamente esta solicitação."
              );
              return;
            case "auth/user-not-found":
              this.props.openSnackbar(
                "Não há registro de usuário existente correspondente ao identificador fornecido."
              );
              return;
            case "auth/account-exists-with-different-credential":
              this.props.openSnackbar(
                "Essa conta já existe com credenciais diferentes."
              );
              return;
            case "auth/operation-not-allowed":
              this.props.openSnackbar(
                "O método de login usado não está habilitado para este projeto."
              );
              return;
            case "auth/popup-blocked":
              this.props.openSnackbar(
                "Pop-up do navegador bloqueado. Após liberar os pop-ups tente novamente."
              );
              return;
            case "auth/popup-closed-by-user":
              this.props.openSnackbar(
                "O pop-up foi fechado pelo usuário antes de finalizar a operação."
              );
              return;
            case "auth/auth-domain-config-required":
            case "auth/cancelled-popup-request":
            case "auth/operation-not-supported-in-this-environment":
            case "auth/unauthorized-domain":
              this.props.openSnackbar(message);
              return;

            default:
              this.props.openSnackbar(message);
              return;
          }
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
