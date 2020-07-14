import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { TextField, Container } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ProjectDialog = ({ open, project, handleClose, handleSave }) => {
  const classes = useStyles();
  const [projectNewEdit, setProjectNewEdit] = useState(project);
  useEffect(() => {
    setProjectNewEdit(project);
  }, [project]);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="project-dialog-title"
      open={open}
    >
      <DialogTitle id="project-dialog-title" onClose={handleClose}>
        {project && "id" in project ? "Editar Projeto" : "Criar Novo Projeto"}
      </DialogTitle>
      <DialogContent dividers>
        <Container className={classes.form}>
          <TextField
            required
            id="title-project-required"
            label="Titulo"
            value={projectNewEdit.title}
            variant="filled"
            onChange={(event) =>
              setProjectNewEdit({
                ...projectNewEdit,
                title: event.currentTarget.value,
              })
            }
          />
          <TextField
            required
            id="dateStart-required"
            label="Data de Inicio"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={projectNewEdit.dateStart}
            variant="filled"
            onChange={(event) =>
              setProjectNewEdit({
                ...projectNewEdit,
                dateStart: event.currentTarget.value,
              })
            }
          />
          <TextField
            required
            id="dateEnd-required"
            label="Data de Termino"
            value={projectNewEdit.dateEnd}
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            onChange={(event) =>
              setProjectNewEdit({
                ...projectNewEdit,
                dateEnd: event.currentTarget.value,
              })
            }
          />
        </Container>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose()}
          color="secondary"
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button
          autoFocus
          onClick={() => {
            handleClose();
            handleSave(projectNewEdit);
          }}
          color="primary"
          variant="outlined"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
ProjectDialog.defaultProps = {
  open: false,
  project: {
    title: "",
    dateStart: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    dateEnd: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
  },
  handleClose: function () {},
  handleSave: function () {},
};

ProjectDialog.propTypes = {
  // Properties
  open: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,

  // Events
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};
export default ProjectDialog;
