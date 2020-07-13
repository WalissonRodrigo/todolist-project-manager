import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemIcon,
  Checkbox,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";

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
          disabled={true}
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
      <Grid item xs={12}>
        <ListItemText
          className={classes.listItemText}
          primary={task.title}
          secondary={task.comment}
        />
      </Grid>
      <Grid item xs={12}>
        <ListItemText
          className={classes.listItemText}
          primary="Responsável"
          secondary={task.owner}
        />
      </Grid>

      <Grid item xs={6}>
        <ListItemText
          className={classes.listItemText}
          primary="Prioridade"
          secondary={
            task.priority === 1
              ? "BAIXA"
              : task.priority === 2
              ? "MÉDIA"
              : "ALTA"
          }
        />
      </Grid>

      <Grid item xs={6}>
        <ListItemText
          className={classes.listItemText}
          primary="Concluído"
          secondary={`${task.progress}%`}
        />
      </Grid>

      <Grid item xs={12}>
        <ListItemText
          className={classes.listItemText}
          primary="Data Inicio"
          secondary={moment(task.dateStart).format("DD/MM/YYYY HH:mm:ss")}
        />
      </Grid>

      <Grid item xs={12}>
        <ListItemText
          className={classes.listItemText}
          primary="Data Termino"
          secondary={moment(task.dateEnd).format("DD/MM/YYYY HH:mm:ss")}
        />
      </Grid>

      <ListItemSecondaryAction className={classes.listItemAction}>
        <IconButton
          edge="start"
          aria-label="editar"
          onClick={() => handleEditTask(task, task.projectId)}
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

TaskItem.defaultProps = {
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
  handleEditTask: function () {},
  handleDeleteTask: function () {},
};

TaskItem.propTypes = {
  // Properties
  task: PropTypes.object.isRequired,

  // Events
  handleDeleteTask: PropTypes.func.isRequired,
  handleEditTask: PropTypes.func.isRequired,
};
export default TaskItem;
