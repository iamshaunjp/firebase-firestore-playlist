const cafeList = document.getElementById('cafe-list')
const form = document.getElementById('add-cafe-form')

function renderCafe(element) {
    // create li,spans 
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    let cross = document.createElement('div')

    //add the spans to the li
    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)

    //add to ul
    cafeList.appendChild(li)

    //add a key to li
    li.setAttribute('element-id', element.id)

    //add the text to the spans
    name.textContent = element.data().name;
    city.textContent = element.data().city
    cross.textContent = 'x'
    
    
    
    // deleting
    
    cross.addEventListener('click',(e) => {
        e.stopPropagation()
        let id = e.target.parentElement.getAttribute('element-id');
        db.collection('cafes').doc(id).delete()
    })
}

//getting data
db.collection('cafes').get()
    .then(newdoc => {
        console.log(newdoc.docs)
        newdoc.docs.forEach(element => {
            console.log(element.data())
            renderCafe(element)

        });
    })

//saving data

form.addEventListener('submit',(e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name:form.name.value,
        city:form.city.value
    });
    form.name.value = ''
    form.city.value = ''

   console.log(form.name.value) 
   console.log(form.city.value) 
   
} )
