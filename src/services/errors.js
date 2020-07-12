const errors = {};
errors.getErrorFirebase = (reason) => {
  let error = "Ocorreu um erro não esperado. Tente atualizar sua página.";
  if (!reason) {
    return error;
  }
  const { code, message } = reason;
  switch (code) {
    case "auth/wrong-password":
      error = "A senha está incorreta ou inválida";
      break;
    case "auth/argument-error":
      error = "Ocorreu um erro nos argumentos utilizados";
      break;
    case "auth/missing-android-pkg-name":
      error = "Está faltando o nome do pacote do aplicativo android";
      break;
    case "auth/missing-continue-uri":
      error = "Está faltando a URL para continuar a operação";
      break;
    case "auth/missing-ios-bundle-id":
      error = "Está faltando o nome do pacote do aplicativo ios";
      break;
    case "auth/invalid-continue-uri":
      error = "A URL para continuar a operação é inválida";
      break;
    case "auth/unauthorized-continue-uri":
      error = "Não está autorizado continuar para a URL informada";
      break;
    case "auth/email-already-in-use":
      error = "Esse endereço de email já está sendo usado.";
      break;
    case "auth/weak-password":
      error =
        "A senha é muito fraca para ser usada. Tente com uma senha mais segura.";
      break;
    case "auth/id-token-expired":
    case "auth/expired-action-code":
      error =
        "Sua sessão expirou. Será necessário sair e efetuar login novamente.";
      break;
    case "auth/invalid-email":
      error = "E-mail inválido ou não formatado como um email válido.";
      break;
    case "auth/user-disabled":
      error = "Usuário desativado. Apenas usuários ativos têm acesso.";
      break;
    case "auth/invalid-credential":
      error =
        "Esta operação é sensível e requer autenticação recente. Efetue login novamente antes de tentar novamente esta solicitação.";
      break;
    case "auth/user-not-found":
      error =
        "Não há registro de usuário existente correspondente ao identificador fornecido.";
      break;
    case "auth/account-exists-with-different-credential":
      error = "Essa conta já existe com credenciais diferentes.";
      break;
    case "auth/operation-not-allowed":
      error = "O método de login usado não está habilitado para este projeto.";
      break;
    case "auth/popup-blocked":
      error =
        "Pop-up do navegador bloqueado. Após liberar os pop-ups tente novamente.";
      break;
    case "auth/popup-closed-by-user":
      error =
        "O pop-up foi fechado pelo usuário antes de finalizar a operação.";
      break;
    case "auth/cancelled-popup-request":
      error = "Operação realizada pelo pop-up foi cancelada ou abortada";
      break;
    case "auth/operation-not-supported-in-this-environment":
      error = "Essa operação não é suportada dentro desse contexto de sistema.";
      break;
    case "auth/auth-domain-config-required":
      error = "Definir um método de login é obrigatórias.";
      break;
    case "auth/unauthorized-domain":
      error = "Método de Login não autorizado";
      break;
    default:
      error = message;
      break;
  }
  return error;
};
export default errors;
