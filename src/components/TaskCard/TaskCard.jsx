/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import todolist from "../../services/todolist";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardHeader,
  Card,
  CardContent,
  Typography,
  List,
  Button,
  IconButton,
  Box,
  ListItem,
  Divider,
  ListItemSecondaryAction,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import TaskItem from "../TaskItem/TaskItem";
import { firestore } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 12,
  },
  grow: {
    flexGrow: 1,
  },
  grid: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
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

const TaskCard = ({ user }) => {
  const [todoList, setTodoList] = useState({ projects: [], tasks: [] });
  const [dialogProject, setDialogProject] = useState(false);
  const [dialogTask, setDialogTask] = useState(false);
  const [project, setProject] = useState(null);
  const [task, setTask] = useState(null);

  const handleOpenDialogProject = (projectEdit = null) => {
    setProject(projectEdit);
    setDialogProject(true);
  };

  const handleCloseDialogProject = () => {
    setProject(null);
    setDialogProject(false);
  };

  const handleCreateProject = (project = null) => {
    todolist.createProject(project);
  };

  const handleCreateTask = (task = null, projectId) => {
    todolist.createTask(task, projectId);
  };

  const handleDeleteProject = (projectId) => {
    todolist.deleteProject(projectId);
  };

  const handleDeleteTask = (taskId) => {
    todolist.deleteTask(taskId);
  };
  const handleEditTask = (taskId) => {
    todolist.updateTask(taskId);
  };

  const classes = useStyles();

  useEffect(() => {
    return firestore
      .collection("projects")
      .where("userId", "==", user.uid)
      .onSnapshot(
        (snapshot) => {
          let projects = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            projects.push({
              id: doc.id,
              ...data,
              dateStart: moment(data.dateEnd).format("DD/MM/YYYY HH:mm:ss"),
              dateEnd: moment(data.dateEnd).format("DD/MM/YYYY HH:mm:ss"),
            });
          });
          firestore
            .collection("tasks")
            .where("userId", "==", user.uid)
            .onSnapshot(
              (snapshotTask) => {
                let tasks = [];
                snapshotTask.forEach((doc) => {
                  const data = doc.data();
                  tasks.push({ id: doc.id, ...data });
                });
                setTodoList({
                  projects: projects,
                  tasks: tasks,
                });
              },
              (errorTasks) => {
                // this.props.openSnackbar(todolist.getErrorFirebase(errorTasks));
              }
            );
        },
        (errors) => {
          // this.props.openSnackbar(todolist.getErrorFirebase(errors));
        }
      );
  }, [user.uid]);

  return (
    <Box className={classes.container}>
      <Card>
        <CardContent>
          <List>
            <ListItem>
              <Typography gutterBottom variant="h5" component="h3">
                Gerenciar Projetos
              </Typography>
            </ListItem>
            <ListItemSecondaryAction className={classes.listItemAction}>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                onClick={() => handleCreateProject()}
              >
                Adicionar Projeto
              </Button>
            </ListItemSecondaryAction>
          </List>
        </CardContent>
      </Card>
      <Typography gutterBottom variant="h5" component="h3">
        Tarefas
      </Typography>
      <Divider />
      {todoList
        ? todoList.projects.map((proj) => (
            <Card key={proj.id} className={classes.container}>
              <List>
                <ListItem>
                  <Typography gutterBottom variant="h5" component="h3">
                    {proj.title + " "}
                  </Typography>
                </ListItem>
                <ListItemSecondaryAction className={classes.listItemAction}>
                  <IconButton
                    color="primary"
                    edge="start"
                    aria-label="add new project"
                    onClick={() => handleCreateTask(null, proj.id)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    edge="start"
                    aria-label="edit project"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete project"
                    onClick={() => handleDeleteProject(proj.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </List>
              <Divider />
              <div>
                <List dense={true}>
                  {todoList.tasks
                    ? todoList.tasks
                        .filter((task) => task.projectId === proj.id)
                        .map((task) => (
                          <TaskItem
                            key={task.id}
                            task={task}
                            handleDeleteTask={handleDeleteTask}
                            handleEditTask={handleEditTask}
                          />
                        ))
                    : null}
                </List>
              </div>
            </Card>
          ))
        : null}
    </Box>
  );
};
TaskCard.defaultProps = {
  context: "standalone",
};

TaskCard.propTypes = {
  user: PropTypes.object.isRequired,
};
export default TaskCard;
