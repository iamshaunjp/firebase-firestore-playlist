const itemList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//create element and render it
function renderItem(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let location = document.createElement('span');
    let difficulty = document.createElement('span');
    let isCompleted = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    location.textContent = doc.data().location;
    difficulty.textContent = doc.data().difficulty;
    isCompleted.textContent = doc.data().isCompleted || doc.data().completed;

    li.appendChild(name);
    li.appendChild(location);
    li.appendChild(difficulty);
    li.appendChild(isCompleted);

    itemList.append(li);
}

//get data
dataBase.collection('list-items').get().then((databaseSnapshot) => {
    databaseSnapshot.docs.forEach(doc => {
        renderItem(doc);
    });
})

//create data
form.addEventListener