import { analytics, auth, firestore } from "../firebase";
import errors from "./errors";
import moment from "moment";

const todolist = {};

todolist.createTask = (task, projectId) => {
  return new Promise((resolve, reject) => {
    // if (!task) {
    //   reject();
    //   return;
    // }
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
    } = task ?? {
      title: "Tarefa Exemplo",
      owner: "Fulano",
      comment: "Aproveite ao máximo a vida",
      dateStart: moment(),
      dateEnd: moment(),
      priority: 1,
      progress: 10,
      conclusion: false,
    };
    // if (!title || !owner || !comment || !dateStart || !dateEnd || !progress) {
    //   reject();
    //   return;
    // }

    const tasksDocumentReference = firestore.collection("tasks").doc();
    tasksDocumentReference
      .set({
        title: title,
        owner: owner,
        comment: comment,
        dateStart: dateStart.format("X"),
        dateEnd: dateEnd.format("X"),
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

todolist.updateTask = (task, taskId) => {
  return new Promise((resolve, reject) => {
    // if (!task) {
    //   reject();
    //   return;
    // }
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
    } = task ?? {
      title: "Tarefa Exemplo Updated",
      owner: "Fulano",
      comment: "Aproveite ao máximo a vida",
      dateStart: moment(),
      dateEnd: moment(),
      priority: 1,
      progress: 10,
      conclusion: false,
    };
    // if (!title || !owner || !comment || !dateStart || !dateEnd || !progress) {
    //   reject();
    //   return;
    // }

    const tasksDocumentReference = firestore.collection("tasks").doc(taskId);
    tasksDocumentReference
      .set({
        title: title,
        owner: owner,
        comment: comment,
        dateStart: dateStart.format("X"),
        dateEnd: dateEnd.format("X"),
        priority: priority,
        progress: progress,
        conclusion: conclusion,
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

todolist.createProject = (project) => {
  return new Promise((resolve, reject) => {
    // if (!project) {
    //   reject();
    //   return;
    // }

    const { title, dateStart, dateEnd } = project ?? {
      title: "Exemplo",
      dateStart: moment(),
      dateEnd: moment(),
    };
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
      dateStart: dateStart.format("x"),
      dateEnd: dateEnd.format("x"),
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
            dateStart: moment(data.dateEnd.toDate()).format(
              "DD/MM/YYYY HH:mm:ss"
            ),
            dateEnd: moment(data.dateEnd.toDate()).format(
              "DD/MM/YYYY HH:mm:ss"
            ),
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
