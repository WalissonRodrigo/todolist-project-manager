import { analytics, auth, firestore } from "../firebase";
import errors from "./errors";
import moment from "moment";

const todolist = {};

todolist.createTask = (task, projectId) => {
  return new Promise((resolve, reject) => {
    if (!task) {
      reject();
      return;
    }
    const currentUser = auth.currentUser;
    if (!currentUser) {
      reject();
      return;
    }

    const uid = currentUser.uid;
    if (!uid) {
      reject();
      return;
    }

    const {
      title,
      owner,
      comment,
      dateStart,
      dateEnd,
      priority,
      progress,
      conclusion,
    } = task;
    const tasksDocumentReference = firestore.collection("tasks").doc();
    tasksDocumentReference
      .set({
        title: title,
        owner: owner,
        comment: comment,
        dateStart: moment(dateStart).format("YYYY-MM-DD[T]HH:mm:ss"),
        dateEnd: moment(dateEnd).format("YYYY-MM-DD[T]HH:mm:ss"),
        priority: priority,
        progress: progress,
        conclusion: conclusion,
        userId: uid,
        projectId: projectId,
      })
      .then((res) => {
        analytics.logEvent("task_store", {
          method: "add_new",
          user: uid,
        });
        resolve(res);
      })
      .catch((failStore) => {
        reject(failStore);
      });
  });
};

todolist.updateTask = (task) => {
  return new Promise((resolve, reject) => {
    if (!task) {
      reject();
      return;
    }
    const currentUser = auth.currentUser;
    if (!currentUser) {
      reject();
      return;
    }

    const uid = currentUser.uid;
    if (!uid) {
      reject();
      return;
    }

    const {
      title,
      owner,
      comment,
      dateStart,
      dateEnd,
      priority,
      progress,
      conclusion,
    } = task;
    const tasksDocumentReference = firestore.collection("tasks").doc(task.id);
    tasksDocumentReference
      .set({
        title: title,
        owner: owner,
        comment: comment,
        dateStart: moment(dateStart).format("YYYY-MM-DD[T]HH:mm:ss"),
        dateEnd: moment(dateEnd).format("YYYY-MM-DD[T]HH:mm:ss"),
        priority: priority,
        progress: progress,
        conclusion: conclusion,
        userId: uid,
        projectId: task.projectId,
      })
      .then((res) => {
        analytics.logEvent("task_update", {
          method: "update",
          user: uid,
          taskId: task.id,
        });
        resolve(res);
      })
      .catch((failStore) => {
        reject(failStore);
      });
  });
};

todolist.createProject = (project) => {
  return new Promise((resolve, reject) => {
    if (!project) {
      reject();
      return;
    }

    const { title, dateStart, dateEnd } = project;
    if (!title || !dateStart || !dateEnd) {
      reject();
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      reject();
      return;
    }

    const uid = currentUser.uid;
    if (!uid) {
      reject();
      return;
    }
    const newProject = {
      title: title,
      dateStart: moment(dateStart).format("YYYY-MM-DD[T]HH:mm:ss"),
      dateEnd: moment(dateEnd).format("YYYY-MM-DD[T]HH:mm:ss"),
      userId: uid,
    };
    const projectsDocumentReference = firestore.collection("projects").doc();
    projectsDocumentReference
      .set(newProject)
      .then((proj) => {
        analytics.logEvent("project_store", {
          method: "add_new",
          user: uid,
        });
        resolve(proj);
      })
      .catch((failStore) => {
        reject(failStore);
      });
  });
};

todolist.updateProject = (project) => {
  return new Promise((resolve, reject) => {
    if (!project) {
      reject();
      return;
    }
    const currentUser = auth.currentUser;
    if (!currentUser) {
      reject();
      return;
    }

    const uid = currentUser.uid;
    if (!uid) {
      reject();
      return;
    }

    const { title, dateStart, dateEnd } = project;

    const tasksDocumentReference = firestore
      .collection("projects")
      .doc(project.id);
    tasksDocumentReference
      .set({
        title: title,
        dateStart: moment(dateStart).format("YYYY-MM-DD[T]HH:mm:ss"),
        dateEnd: moment(dateEnd).format("YYYY-MM-DD[T]HH:mm:ss"),
        userId: uid,
      })
      .then((res) => {
        analytics.logEvent("project_update", {
          method: "update",
          user: uid,
          projectId: project.id,
        });
        resolve(res);
      })
      .catch((failStore) => {
        reject(failStore);
      });
  });
};

todolist.deleteProject = (projectId) => {
  return new Promise((resolve, reject) => {
    const projectsDocumentReference = firestore
      .collection("projects")
      .doc(projectId);
    projectsDocumentReference.delete().then(resolve).catch(reject);
  });
};

todolist.deleteTask = (taskId) => {
  return new Promise((resolve, reject) => {
    const tasksDocumentReference = firestore.collection("tasks").doc(taskId);
    tasksDocumentReference.delete().then(resolve).catch(reject);
  });
};

todolist.getAll = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      reject();
      return;
    }

    const uid = currentUser.uid;
    if (!uid) {
      reject();
      return;
    }
    const projectDocument = firestore
      .collection("projects")
      .where("userId", "==", uid);

    projectDocument.onSnapshot(
      (snapshot) => {
        let projects = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const project = {
            id: doc.id,
            ...data,
          };
          projects.push(project);
        });

        const taskDocument = firestore
          .collection("tasks")
          .where("userId", "==", uid);

        taskDocument.onSnapshot(
          (snapshotTask) => {
            let tasks = [];
            snapshotTask.forEach((doc) => {
              const data = doc.data();
              tasks.push({ id: doc.id, ...data });
            });
            resolve({
              projects: projects,
              tasks: tasks,
            });
          },
          (errorTasks) => {
            reject(errorTasks);
          }
        );
      },
      (errors) => {
        reject(errors);
      }
    );
  });
};

todolist.getErrorFirebase = errors.getErrorFirebase;

export default todolist;
