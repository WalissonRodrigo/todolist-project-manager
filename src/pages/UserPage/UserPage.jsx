import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { Grid, Fab, Box } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { Refresh as RefreshIcon, Home as HomeIcon } from "@material-ui/icons";

import { firestore } from "../../firebase";

import EmptyState from "../../components/EmptyState";

import Loader from "../../components/Loader";
import UserCard from "../../components/UserCard";

import { ReactComponent as ErrorIllustration } from "../../illustrations/error.svg";
import { ReactComponent as NoDataIllustration } from "../../illustrations/no-data.svg";

const useStyles = makeStyles({
  grid: {
    margin: 0,
    width: "100%",
  },
});

function UserPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    return firestore
      .collection("users")
      .doc(userId)
      .onSnapshot(
        (snapshot) => {
          setLoading(false);
          setUser(snapshot.data());
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  }, [userId]);

  if (error) {
    return (
      <EmptyState
        image={<ErrorIllustration />}
        title="Não foi possível recuperar o usuário"
        description="Ocorreu um erro ao tentar recuperar o usuário solicitado"
        button={
          <Fab
            variant="extended"
            color="primary"
            onClick={() => window.location.reload()}
          >
            <Box clone mr={1}>
              <RefreshIcon />
            </Box>
            Tentar Novamente
          </Fab>
        }
      />
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <EmptyState
        image={<NoDataIllustration />}
        title="Usuário não existe"
        description="O usuário solicitado não existe"
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

  return (
    <Grid className={classes.grid} container justify="center" spacing={5}>
      <Grid item xs={6}>
        <UserCard user={user} />
      </Grid>
    </Grid>
  );
}

export default UserPage;
