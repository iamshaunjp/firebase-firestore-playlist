
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
const updateForm = document.querySelector('#update-cafe-form');

// create element and render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    let updateB = document.createElement('a');
    

    li.setAttribute('data-id', doc.id);

    name.textContent= doc.data().name;
    city.textContent= doc.data().city;
    cross.textContent = 'x';
    updateB.textContent = 'Update';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    li.appendChild(updateB);

    cafeList.appendChild(li);
    // deleting data

    cross.addEventListener('click', (e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
//updating
    updateB.addEventListener('click', (e)=>{
        e.stopPropagation();
        var id = e.target.parentElement.getAttribute('data-id');
        updateCafes(id);
    })
}

// getting the data
// var cafes = db.collection('cafes').get()
// this request is asynchronous which requires some time to fetch data
// where('city', '>', 'G')


// var cafes = db.collection('cafes').where('city','==', 'Gwalior').orderBy('name').get().then((snapshot)=> {
//     //here get fethces the data from cafe collection from firestore
//     snapshot.docs.forEach(doc => {
//         // snapshot is the parameter with object 
//         renderCafe(doc);
//         // console.log(doc.data());
//     })
    
// })





//saving the data
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value,

    });
    form.name.value = ''
    form.city.value = ''
})


// real time listner

db.collection('cafes').orderBy('city').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    console.log(changes);
    changes.forEach(change =>{
       if(change.type == 'added'){
           renderCafe(change.doc);
       }else if(change.type == 'removed'){
           let li = cafeList.querySelector('[data-id='+ change.doc.id+']');
           cafeList.removeChild(li);
       }else if(change.type == 'modified'){
             li = cafeList.querySelector('[data-id='+ change.doc.id+']');
            //  renderCafe(change.doc)
            updateCafes(change.doc.id);
            form.removeAttribute('hidden');
            updateForm.setAttribute('hidden', true);



       }
    })
    
})

// updating restaurent
function updateCafes(id){

    updateForm.removeAttribute('hidden');
    form.setAttribute('hidden',true);
        updateForm.addEventListener('submit', (e)=>{
        e.preventDefault();
     
        db.collection('cafes').doc(id).update({
            name: updateForm.name.value,
            city: updateForm.city.value,
    
        });
        updateForm.name.value = ''
        updateForm.city.value = ''
    })
}


