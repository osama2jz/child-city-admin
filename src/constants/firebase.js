// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
// import { getAnalytics } from "firebase/analytics";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAqi8EioZAZgTT5MAhxqBUqYTpcEPUtO3M",
//   authDomain: "decimal-solutions-8c191.firebaseapp.com",
//   projectId: "decimal-solutions-8c191",
//   storageBucket: "decimal-solutions-8c191.appspot.com",
//   messagingSenderId: "674398346861",
//   appId: "1:674398346861:web:0f1d877901c2d7e30da964",
//   measurementId: "G-C7V3M8PVCB",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDaT-o92wqrvZsCi4vigDwY2y5YdpiNb7s",
  authDomain: "child-city.firebaseapp.com",
  projectId: "child-city",
  storageBucket: "child-city.appspot.com",
  messagingSenderId: "643411160558",
  appId: "1:643411160558:web:49a0134538e98f4d0f72ff",
  measurementId: "G-PMK5HTF33V"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

export const uploadSingleFile = ({
  file,
  folderName,
  urlSetter,
  setProgress,
}) => {
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
export const uploadMultipleImages = async (files, folderName) => {
  const urls = [];
  return Promise.all(
    files.map(async (file) => {
      if (file == null || file === "" || file?.length == 0) {
        urls.push("");
      } else if (typeof file === "string") {
        urls.push(file);
      } else {
        const storageRef = ref(
          storage,
          `${folderName}/${uuidv4() + file.name}`
        );
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        urls.push(url);
      }
    })
  ).then(() => {
    return urls;
  });
};
