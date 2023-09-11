// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqi8EioZAZgTT5MAhxqBUqYTpcEPUtO3M",
  authDomain: "decimal-solutions-8c191.firebaseapp.com",
  projectId: "decimal-solutions-8c191",
  storageBucket: "decimal-solutions-8c191.appspot.com",
  messagingSenderId: "674398346861",
  appId: "1:674398346861:web:0f1d877901c2d7e30da964",
  measurementId: "G-C7V3M8PVCB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

export const uploadSingleFile = ({ file, folderName, urlSetter, setProgress }) => {
  folderName = folderName || "uploads";
  if (!file) return;
  const storageRef = ref(storage, `/${folderName}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog);
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(
        (url) => urlSetter(url)
        // url fetched... store it
        // handleChangeCategory({ name: "image", value: url })
      );
    }
  );
};
