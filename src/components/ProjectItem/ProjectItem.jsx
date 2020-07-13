import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  listItemAction: {
    top: "50% !important",
    [theme.breakpoints.down("md")]: {
      top: "10% !important",
    },
  },
  listItem: {
    fontSize: "bold",
  },
}));

const ProjectItem = ({
  project,
  handleCreateTask,
  handleUpdateProject,
  handleDeleteProject,
}) => {
  const classes = useStyles();
  return (
    <List>
      <ListItem>
        <ListItemText
          className={classes.listItemText}
          primary={project.title}
          secondary={`Data Inicio: ${moment(project.dateStart).format(
            "DD/MM/YYYY HH:mm:ss"
          )} Data de Conclusão: ${moment(project.dateEnd).format(
            "DD/MM/YYYY HH:mm:ss"
          )}`}
        />
      </ListItem>
      <ListItemSecondaryAction className={classes.listItemAction}>
        <IconButton
          color="primary"
          edge="start"
          aria-label="add new task"
          onClick={() =>
            handleCreateTask(
              {
                title: "",
                comment: "",
                owner: "",
                dateStart: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
                dateEnd: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
                priority: 1,
                progress: 0,
                conclusion: false,
              },
              project.id
            )
          }
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="secondary"
          edge="start"
          aria-label="edit project"
          onClick={() => handleUpdateProject(project)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete project"
          onClick={() => handleDeleteProject(project.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </List>
  );
};

ProjectItem.defaultProps = {
  project: {
    title: "",
    dateStart: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    dateEnd: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
  },
  handleCreateTask: function () {},
  handleUpdateProject: function () {},
  handleDeleteProject: function () {},
};

ProjectItem.propTypes = {
  // Properties
  project: PropTypes.object.isRequired,

  // Events
  handleCreateTask: PropTypes.func.isRequired,
  handleUpdateProject: PropTypes.func.isRequired,
  handleDeleteProject: PropTypes.func.isRequired,
};

export default ProjectItem;
