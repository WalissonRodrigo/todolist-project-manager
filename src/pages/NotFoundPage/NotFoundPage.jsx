import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Fab, Box } from "@material-ui/core";

import { Home as HomeIcon } from "@material-ui/icons";

import EmptyState from "../../components/EmptyState";

import { ReactComponent as NotFoundIllustration } from "../../assets/illustrations/not-found.svg";

class NotFoundPage extends Component {
  render() {
    return (
      <EmptyState
        image={<NotFoundIllustration />}
        title="A página não existe"
        description="A página que você está tentando acessar não existe"
        button={
          <Fab variant="extended" color="primary" component={Link} to="/">
            <Box clone mr={1}>
              <HomeIcon />
            </Box>
            Página Inicial
          </Fab>
        }
      />
    );
  }
}

export default NotFoundPage;
