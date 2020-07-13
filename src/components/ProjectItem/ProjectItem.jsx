import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import { List, ListItem, ListItemSecondaryAction } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItemAction: {
    top: "50% !important",
    [theme.breakpoints.down("md")]: {
      top: "10% !important",
    },
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
        <Typography gutterBottom variant="h5" component="h3">
          {project ? project.title + " " : " "}
        </Typography>
      </ListItem>
      <ListItemSecondaryAction className={classes.listItemAction}>
        <IconButton
          color="primary"
          edge="start"
          aria-label="add new task"
          onClick={() => handleCreateTask(null, project.id)}
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
export default ProjectItem;
