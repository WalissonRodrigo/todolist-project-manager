import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { TextField, Container } from "@material-ui/core";

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

export default function ProjectDialog({
  open,
  project,
  handleClose,
  handleSave,
}) {
  const [projectNewEdit, setProjectNewEdit] = useState(project);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="project-dialog-title"
      open={open}
    >
      <DialogTitle id="project-dialog-title" onClose={handleClose}>
        {project ? "Editar Projeto" : "Criar Novo Projeto"}
      </DialogTitle>
      <DialogContent dividers>
        <Container>
          <TextField
            required
            id="filled-required"
            label="Titulo"
            defaultValue="Titulo do seu Projeto"
            value={projectNewEdit.title}
            variant="filled"
            onChange={(event) =>
              setProjectNewEdit({
                ...projectNewEdit,
                title: event.currentTarget.value,
              })
            }
          />
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="secondary">
          Cancelar
        </Button>
        <Button
          autoFocus
          onClick={() => handleSave(projectNewEdit)}
          color="primary"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
