const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//create elelment and render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.innerHTML = doc.data().name;
    city.innerHTML = doc.data().city;
    cross.innerHTML = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li)

    cross.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id =e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete()
    })

}
//geitting data
// db.collection('cafes').orderBy('name').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     })
// })

//saving data
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('cafes').add({
        name:form.name.value,
        city:form.city.value
    })
    form.name.value ='';
    form.city.value ='';
})

//realtime listeners
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change =>{
        
        if(change.type == 'added'){
            renderCafe(change.doc)
        }else if(change.type == 'removed'){
            let li = document.querySelector('[data-id='+ change.doc.id +']');
            cafeList.removeChild(li)
        }
    })
})