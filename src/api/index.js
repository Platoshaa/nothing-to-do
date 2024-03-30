import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  increment,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBRxs1njmWb4mZg5pa07WFRNYz0bodDP-k",
  authDomain: "basic-base-c7a6d.firebaseapp.com",
  projectId: "basic-base-c7a6d",
  storageBucket: "basic-base-c7a6d.appspot.com",
  messagingSenderId: "721147494458",
  appId: "1:721147494458:web:ee2a9fbd2867c7849db503",
};
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
export const au = getAuth(app);
const db = getFirestore(app);

export const skillAPI = {
  async getSkills() {
    const q = query(
      collection(
        db,
        "users",
        JSON.parse(localStorage.getItem("token")),
        "skills"
      )
    );
    const querySnapshot = await getDocs(q);
    const res = [];
    querySnapshot.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });

    return res;
  },
  async addSkill(name, isRecommend) {
    await addDoc(
      collection(
        db,
        "users",
        JSON.parse(localStorage.getItem("token")),
        "skills"
      ),
      {
        name,
        isRecommend,
        lastTimeDone: null,
      }
    );
    return skillAPI.getSkills();
  },
  async deleteSkill(id) {
    let t = JSON.parse(localStorage.getItem("token"));
    const tasks = await taskAPI.getAllTasks();
    for (let i = 0; i < tasks.length - 1; i++) {
      if (tasks[i].skillId === id) {
        await deleteDoc(doc(db, "users", t, "tasks", tasks[i].id));
      }
    }
    await deleteDoc(doc(db, "users", t, "skills", id));
    return skillAPI.getSkills();
  },
};

export const taskAPI = {
  async getAllTasks() {
    const q = query(
      collection(
        db,
        "users",
        JSON.parse(localStorage.getItem("token")),
        "tasks"
      )
    );
    const querySnapshot = await getDocs(q);
    const res = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();

      res.push({ ...data, id: doc.id });
    });

    return res;
  },
  async addTask(name, skillId) {
    await addDoc(
      collection(
        db,
        "users",
        JSON.parse(localStorage.getItem("token")),
        "tasks"
      ),
      {
        name,
        lastTimeDone: null,
        skillId,
      }
    );
    return taskAPI.getAllTasks();
  },
  async completeTask(id, d) {
    await updateDoc(
      doc(
        db,
        "users",
        JSON.parse(localStorage.getItem("token")),
        "tasks",
        id
      ),
      {
        lastTimeDone: d,
      }
    );
    return taskAPI.getAllTasks();
  },
  async deleteTask(id) {
    await deleteDoc(
      doc(
        db,
        "users",
        JSON.parse(localStorage.getItem("token")),
        "tasks",
        id
      )
    );
    return taskAPI.getAllTasks();
  },
};
export const authAPI = {
  async signIn() {
    const res = await signInWithPopup(au, provider);

    return res.user;
  },
  async signOut() {
    await signOut(au);
  },
};
