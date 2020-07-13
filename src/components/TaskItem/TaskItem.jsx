import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemIcon,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  listItemText: {
    display: "block",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  listItemAction: {
    top: "50% !important",
    [theme.breakpoints.down("md")]: {
      top: "10% !important",
    },
  },
}));

const TaskItem = ({ task, handleDeleteTask, handleEditTask }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.listItem}>
      <ListItemIcon className={classes.listItemText}>
        <Checkbox
          edge="start"
          checked={task.conclusion}
          onChange={() => {
            task.conclusion = !task.conclusion;
          }}
          tabIndex={-1}
          disableRipple
          inputProps={{
            "aria-labelledby": `checkbox-list-label-${task.id}`,
          }}
        />
      </ListItemIcon>

      <ListItemText
        className={classes.listItemText}
        primary={task.title}
        secondary={task.comment}
      />

      <ListItemText
        className={classes.listItemText}
        primary="Responsável"
        secondary={task.owner}
      />

      <ListItemText
        className={classes.listItemText}
        primary="Prioridade"
        secondary={
          task.priority === 1 ? "BAIXA" : task.priority === 2 ? "MÉDIA" : "ALTA"
        }
      />

      <ListItemText
        className={classes.listItemText}
        primary="Concluído"
        secondary={`${task.progress}%`}
      />

      <ListItemText
        className={classes.listItemText}
        primary="Data Inicio"
        secondary="13/07/2020 00:30"
      />

      <ListItemText
        className={classes.listItemText}
        primary="Data Termino"
        secondary={"13/07/2020 14:00"}
      />

      <ListItemSecondaryAction className={classes.listItemAction}>
        <IconButton
          edge="start"
          aria-label="editar"
          onClick={() => handleEditTask(task)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="deletar"
          onClick={() => handleDeleteTask(task.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;
