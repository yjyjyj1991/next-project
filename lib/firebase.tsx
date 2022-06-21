// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  getDocs,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { format } from "date-fns";

const firebaseConfig = {
  apiKey: "AIzaSyBZ81CKbFm2eLk6zsJlv9NKR_Z6ermrpAY",
  authDomain: "yj-toy-project.firebaseapp.com",
  projectId: "yj-toy-project",
  storageBucket: "yj-toy-project.appspot.com",
  messagingSenderId: "207181361295",
  appId: "1:207181361295:web:05fac3bc554df78fef40fa",
  measurementId: "G-BZJC0JBMSR",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const firestore = getFirestore();
const forumRef = collection(firestore, "forum");

export async function addForm(data: {
  title: string;
  content: string;
  uid: string;
  author: string;
}) {
  const createdAt = format(new Date(), "yyyy/dd/MM HH:mm");
  const { id } = await addDoc(forumRef, {
    title: data.title,
    uid: data.uid,
    author: data.author,
    createdAt,
    updatedAt: createdAt,
  });
  const detailRef = doc(firestore, `forumDetail/${id}`);
  setDoc(detailRef, {
    ...data,
    createdAt,
    updateAt: createdAt,
  });
}

export async function getArticles() {
  const articlesQuery = query(
    collection(firestore, "forum"),
    orderBy("createdAt")
  );
  const querySnapshot = await getDocs(articlesQuery);
  const articles: any[] = [];
  querySnapshot.forEach((snap) =>
    articles.push({ ...snap.data(), id: snap.id })
  );
  return JSON.stringify(articles);
}

export async function getAllArticleIds() {
  const querySnapshot = await getDocs(collection(firestore, "forum"));
  const ids: any[] = [];
  querySnapshot.forEach((snap) => ids.push({ params: { id: snap.id } }));
  return ids;
}

export async function getArticleData(id: string) {
  const docRef = doc(firestore, `forumDetail/${id}`);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return snapshot.data();
  } else {
    return "document doesn't exist";
  }
}

export async function getComments(id: string) {
  const commentsQuery = query(
    collection(firestore, `forumDetail/${id}/comments`),
    orderBy("updatedAt")
  );
  const querySnapshot = await getDocs(commentsQuery);
  const comments: any[] = [];
  querySnapshot.forEach((snap) =>
    comments.push({ ...snap.data(), id: snap.id })
  );
  return comments;
}
