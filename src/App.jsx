import "./index.css";

import { useState, useEffect } from "react";

// -------
// Imports
// -------
// - our database
import { db } from "./firebase-config";
// collection - establish connection to our collection
//              in the database
// getDocs    - get all the docs from our collection
//              in the database
// addDoc     - adding data (document) to our database
// doc        - getting access to current document in
//              the database
// updateDoc  - update current document from database
// deleteDoc  - delete specific document from database
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  // --------
  // Firebase
  // --------

  //  - Firebase is a service that  let's you
  //    implement database, authentication,
  //    messaging, and other services into your
  //    project with ease, without the need to
  //    create your backend.

  // -----------------------------------------
  // Implement CRUD functionality by using our
  // database.
  // -----------------------------------------

  // -----------------------------------------
  // 1. READ
  // -------

  // Create a state that will hold our users
  // data that we get read from our database.
  const [users, setUsers] = useState([]);

  // Create a reference to our database
  // collection (! we need to specify the collection
  // as there can much more than one)
  // collection(database, collection)
  const usersCollectionRef = collection(db, "users");

  // Getting data with useEffect() and async
  // function inside
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      // There's a lot of info in our data variable
      // which we do not really need for our purposes,
      // so we can use a special function which takes
      // only the information we currently need.

      // Map through all the documents in our database,
      // and return an object with all the entries plus
      // our id, which is not inside our document, so we
      // add it by using destructuring
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  // ------------------------------------------------
  // 2. Create
  // ---------

  // Store our inputs data in order to send it to our
  // database for creating a new user
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newEyesColor, setNewEyesColor] = useState("");

  // creating a new user function
  const createUser = async () => {
    // addDoc - add data to database function
    await addDoc(usersCollectionRef, {
      first_name: newFirstName,
      last_name: newLastName,
      age: Number(newAge),
      eyes_color: newEyesColor,
    });
  };

  // -------------------------------------------------
  // 3. Update
  // ---------

  // Create a button that increases the age of each user:
  const updateAge = async (id, age) => {
    // get our current document in the
    // database(we need it as a reference
    // into our updateDoc() function)
    const userDoc = doc(db, "users", id);
    // create the update data
    const updatedField = { age: age + 1 };
    // specifying the document and the data
    // we currently update
    await updateDoc(userDoc, updatedField);
  };
  // -------------------------------------------------
  // 4. Delete
  // ---------

  // Create a function that deletes the user we want to
  const deleteUser = async (id) => {
    // grab the reference to the user
    // (which is the doc by the way)
    const userDoc = doc(db, "users", id);
    // deleteDoc function which deletes the document
    await deleteDoc(userDoc);
  };

  return (
    <div className="App">
      {/* ------------------------------------------------ 
         Create inputs and a button for creating a user, 
         and set our states on change.   
      */}
      <div className="create-user">
        <h3>Create a new user:</h3>
        <input
          placeholder="first name"
          onChange={(e) => setNewFirstName(e.target.value)}
        />
        <input
          placeholder="last name"
          onChange={(e) => setNewLastName(e.target.value)}
        />
        <input
          type="number"
          placeholder="age"
          onChange={(e) => setNewAge(e.target.value)}
        />
        <input
          placeholder="eyes"
          onChange={(e) => setNewEyesColor(e.target.value)}
        />
        <button onClick={createUser}>Create user</button>
      </div>
      {/* ------------------------------------------------- */}
      {users.map((user) => {
        return (
          <div className="user" key={user.id}>
            <h1>Name: {`${user.first_name + " " + user.last_name} `}</h1>
            <h2>Age: {user.age} year(s)</h2>
            <h2>Eyes: {user.eyes}</h2>
            {/* 
               To update the user data we need to know 
               the user id 
            */}
            <button onClick={() => updateAge(user.id, user.age)}>
              Increase age
            </button>
            {/* 
               To delete the user data we need to know 
               the user id 
            */}
            <button onClick={() => deleteUser(user.id)}>Delete user</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
