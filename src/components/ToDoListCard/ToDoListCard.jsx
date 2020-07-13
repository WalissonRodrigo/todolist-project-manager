import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import todolist from "../../services/todolist";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  List,
  Button,
  Box,
  ListItem,
  Divider,
  ListItemSecondaryAction,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import TaskItem from "../TaskItem/TaskItem";
import { firestore } from "../../firebase";
import ProjectItem from "../ProjectItem";
import ProjectDialog from "../ProjectDialog/ProjectDialog";
import TaskDialog from "../TaskDialog/TaskDialog";

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

const ToDoListCard = ({ user }) => {
  const [todoList, setTodoList] = useState({ projects: [], tasks: [] });
  const [dialogProject, setDialogProject] = useState(false);
  const [dialogTask, setDialogTask] = useState(false);
  const [project, setProject] = useState({
    title: "Exemplo",
    dateStart: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    dateEnd: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
  });
  const [task, setTask] = useState({
    title: "Nova Tarefa",
    comment: "Sugestão de nova tarefa",
    owner: "Nome do Responsável",
    dateStart: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    dateEnd: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    priority: 1,
    progress: 0,
    conclusion: false,
  });
  const [projectId, setProjectId] = useState(null);

  const handleOpenDialogProject = (projectEdit) => {
    setProject(projectEdit);
    setDialogProject(true);
  };

  const handleCloseDialogProject = () => {
    setProject({
      title: "",
      dateStart: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
      dateEnd: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
    });
    setDialogProject(false);
  };

  const handleOpenDialogTask = (task, projectId) => {
    setProjectId(projectId);
    setTask(task);
    setDialogTask(true);
  };

  const handleCloseDialogTask = () => {
    setTask({
      title: "",
      comment: "",
      owner: "",
      dateStart: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
      dateEnd: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
      priority: 1,
      progress: 0,
      conclusion: false,
    });
    setDialogTask(false);
  };

  const handleSaveProject = (project) => {
    if (project && "id" in project) {
      todolist.updateProject(project);
    } else {
      todolist.createProject(project);
    }
  };

  const handleDeleteProject = (projectId) => {
    todolist.deleteProject(projectId);
  };

  const handleSaveTask = (task, projectId) => {
    if (task.projectId && task.id) {
      todolist.updateTask(task);
    } else if (projectId) {
      todolist.createTask(task, projectId);
    }
  };

  const handleDeleteTask = (taskId) => {
    todolist.deleteTask(taskId);
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
                  tasks.push({
                    id: doc.id,
                    ...data,
                  });
                });
                setTodoList({
                  projects: projects,
                  tasks: tasks,
                });
              },
              (errorTasks) => {}
            );
        },
        (errors) => {}
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
                onClick={() =>
                  handleOpenDialogProject({
                    title: "",
                    dateStart: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
                    dateEnd: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
                  })
                }
              >
                Adicionar Projeto
              </Button>
            </ListItemSecondaryAction>
          </List>
        </CardContent>
      </Card>
      <ProjectDialog
        open={dialogProject}
        project={project}
        handleClose={handleCloseDialogProject}
        handleSave={handleSaveProject}
      />
      <TaskDialog
        open={dialogTask}
        task={task}
        projectId={projectId}
        handleClose={handleCloseDialogTask}
        handleSave={handleSaveTask}
      />
      <Typography gutterBottom variant="h5" component="h3">
        Tarefas
      </Typography>

      <Divider />
      {todoList
        ? todoList.projects.map((proj) => (
            <Card key={proj.id} className={classes.container}>
              <ProjectItem
                project={proj}
                handleCreateTask={handleOpenDialogTask}
                handleUpdateProject={handleOpenDialogProject}
                handleDeleteProject={handleDeleteProject}
              />
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
                            handleEditTask={handleOpenDialogTask}
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
ToDoListCard.defaultProps = {
  context: "standalone",
};

ToDoListCard.propTypes = {
  user: PropTypes.object.isRequired,
};
export default ToDoListCard;
