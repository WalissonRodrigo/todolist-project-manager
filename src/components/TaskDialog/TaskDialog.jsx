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
import {
  Container,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "4px !important",
  },
  formInLine: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    padding: 12,
  },
  input: {
    padding: 12,
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

const TaskDialog = ({ open, task, projectId, handleClose, handleSave }) => {
  const classes = useStyles();
  const [taskNewEdit, setTaskNewEdit] = useState(task);
  const [projectIdLocal, setProjectIdLocal] = useState(projectId);
  useEffect(() => {
    setTaskNewEdit(task);
    setProjectIdLocal(projectId);
  }, [task, projectId]);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="task-dialog-title"
      open={open}
    >
      <DialogTitle id="task-dialog-title" onClose={handleClose}>
        {task && "id" in task ? "Editar Tarefa" : "Criar Nova Tarefa"}
      </DialogTitle>
      <DialogContent dividers>
        <Container className={classes.form}>
          <TextField
            required
            className={classes.input}
            id="title-required"
            label="Titulo"
            value={taskNewEdit.title}
            variant="filled"
            onChange={(event) =>
              setTaskNewEdit({
                ...taskNewEdit,
                title: event.currentTarget.value,
              })
            }
          />
          <TextField
            required
            className={classes.input}
            id="comment-required"
            label="Comentário"
            value={taskNewEdit.comment}
            variant="filled"
            onChange={(event) =>
              setTaskNewEdit({
                ...taskNewEdit,
                comment: event.currentTarget.value,
              })
            }
          />
          <TextField
            required
            className={classes.input}
            id="owner-required"
            label="Responsável"
            value={taskNewEdit.owner}
            variant="filled"
            onChange={(event) =>
              setTaskNewEdit({
                ...taskNewEdit,
                owner: event.currentTarget.value,
              })
            }
          />
          <TextField
            required
            className={classes.input}
            id="dateStart-required"
            label="Data de Inicio"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={moment(taskNewEdit.dateStart).format(
              "YYYY-MM-DD[T]HH:mm:ss"
            )}
            variant="filled"
            onChange={(event) =>
              setTaskNewEdit({
                ...taskNewEdit,
                dateStart: event.currentTarget.value,
              })
            }
          />
          <TextField
            required
            className={classes.input}
            id="dateEnd-required"
            label="Data de Termino"
            value={moment(taskNewEdit.dateEnd).format("YYYY-MM-DD[T]HH:mm:ss")}
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            onChange={(event) =>
              setTaskNewEdit({
                ...taskNewEdit,
                dateEnd: event.currentTarget.value,
              })
            }
          />

          <TextField
            required
            className={classes.input}
            id="progress-required"
            label="Progresso (%)"
            value={taskNewEdit.progress}
            variant="filled"
            onChange={(event) =>
              setTaskNewEdit({
                ...taskNewEdit,
                progress: event.currentTarget.value,
              })
            }
          />
          <InputLabel className={classes.input} id="priority-label-select">
            Prioridade
          </InputLabel>
          <Select
            required
            style={{ marginLeft: 12, marginRight: 12 }}
            labelId="priority-label-select"
            id="priority-select"
            value={taskNewEdit.priority}
            onChange={(event) =>
              setTaskNewEdit({
                ...taskNewEdit,
                priority: event.target.value,
              })
            }
          >
            <MenuItem value={1}>BAIXA</MenuItem>
            <MenuItem value={2}>MÉDIA</MenuItem>
            <MenuItem value={3}>ALTA</MenuItem>
          </Select>
          <Container className={classes.formInLine}>
            <InputLabel id="priority-label-select">Concluido?</InputLabel>
            <Checkbox
              id="conclusion"
              label="Conclusão"
              checked={taskNewEdit.conclusion}
              onChange={() => {
                setTaskNewEdit({
                  ...taskNewEdit,
                  conclusion: !taskNewEdit.conclusion,
                });
              }}
              disableRipple
            />
          </Container>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="secondary">
          Cancelar
        </Button>
        <Button
          autoFocus
          onClick={() => {
            handleSave(taskNewEdit, projectIdLocal);
            handleClose();
          }}
          color="primary"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

TaskDialog.defaultProps = {
  open: false,
  task: {
    title: "",
    comment: "",
    owner: "",
    dateStart: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    dateEnd: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    priority: 1,
    progress: 0,
    conclusion: false,
  },
  projectId: 0,
  handleClose: function () {},
  handleSave: function () {},
};

TaskDialog.propTypes = {
  // Properties
  open: PropTypes.bool.isRequired,
  task: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,

  // Events
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default TaskDialog;
