// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc,query, where ,orderBy,limit,onSnapshot,updateDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
// import {getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmTHDnIBAYh7rHWDAvpTMvrOyOIXPgInQ",
  authDomain: "avian-mile-315111.firebaseapp.com",
  projectId: "avian-mile-315111",
  storageBucket: "avian-mile-315111.appspot.com",
  messagingSenderId: "412270154473",
  appId: "1:412270154473:web:15231f2e6eeef8f54b1678",
  measurementId: "G-BSFTB5JHZY"
};
let form=document.getElementById("cafe_form");
let cafe_list=document.getElementById("cafe-list");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
// console.log(db); //db contains the entire database
//does not work in real time
async function printList()
{
  const coll = collection(db, 'Cafes');
  const documents = await getDocs(coll);
  const List = documents.docs.map(doc => doc.data());
  const key = documents.docs.map(doc => doc.id)
  console.log(typeof(documents.docs),documents.docs);
  for(var i in List)
  {
    var li = document.createElement("li");
    li.setAttribute('data-id',key[i]);
    li.appendChild(document.createTextNode(List[i]["Name"]+"  "+List[i]["Rating"]+" "));
    var cross=document.createElement("button");
    cross.className="cross";
     cross.appendChild(document.createTextNode("X"));
     li.appendChild(cross);
   cafe_list.appendChild(li);

  //  adding event listeners for delete
    cross.addEventListener("click",(e)=>{
      let id=e.target.parentElement.getAttribute("data-id");
      console.log(id);
      deleteDocument(id);
    })
  }

  
}
// printList();

function addList(doc)
{
  var li = document.createElement("li");
  li.setAttribute('data-id',doc.id);
  li.appendChild(document.createTextNode(doc.data().Name+"  "+doc.data().Rating+" "));
  var cross=document.createElement("button");
  cross.className="cross";
   cross.appendChild(document.createTextNode("X"));
   li.appendChild(cross);
   var edit=document.createElement("button");
  edit.className="edit";
   edit.appendChild(document.createTextNode("Edit"));
   
   li.appendChild(edit);
 cafe_list.appendChild(li);

//  adding event listeners for delete
  cross.addEventListener("click",(e)=>{
    let id=e.target.parentElement.getAttribute("data-id");
    console.log(id);
    deleteDocument(id);
  })
}
async function writeData(name, rating) {
  
try {
  const docRef = await addDoc(collection(db, "Cafes"), {
    Name:name,
    Rating:rating
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
}
// writeData("Hamilton Cafe",3.9);

form.addEventListener('submit', (e)=>{
e.preventDefault(); //default is refreshing the page
writeData(form.Name.value,form.Rating.value);
clearData(form.Name,form.Rating);
})

function clearData(fst,scd)
{
  fst.value="";
  scd.value="";
}

async function deleteDocument(id)
{

  await deleteDoc(doc(db, "Cafes", id));
console.log("delete done");

}

async function queryName(Name)
{
  const coll = collection(db, 'Cafes')
  const q = query(coll, where("Name", "==", Name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
async function queryRating(rating)
{
  const coll = collection(db, 'Cafes')
  const q = query(coll, where("Rating", ">=", rating));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined fosr query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
async function Ordering()
{
  const coll = collection(db, 'Cafes')
  const q = query(coll, orderBy("Name"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined fosr query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
async function OrderingByLimit(l)
{
  const coll = collection(db, 'Cafes')
  const q = query(coll, orderBy("Name"),limit(l));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined fosr query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
// OrderingByLimit(3);

// Ordering();
// queryName("");
// queryRating(6);
//listening for changes 
const q = query(collection(db, "Cafes"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
        console.log("New cafe: ", change.doc.data());
        addList(change.doc);
    }
    if (change.type === "modified") {
        console.log("Modified : ", change.doc.data());
    }
    if (change.type === "removed") {
        console.log("Removed : ", change.doc.data());
        let li=cafe_list.querySelector('[data-id='+change.doc.id+']');
        cafe_list.removeChild(li);
    }
  });
});

async function UpdateData(id,Name,Rating) {
  await updateDoc(doc(db, "Cafes", id), {
    // Name: Name,
    Rating: Rating,
  });
  
}

UpdateData("0XinUNj9geNVXiuL59Vg","Best Onessss","3.8");