const form = document.querySelector('#queryform');
const rowDiv = document.querySelector('#results');
const cardDiv = document.createElement('DIV');
const input = document.querySelector('input');
cardDiv.classList.add('d-flex','justify-content-around','align-items-center','flex-fill','flex-wrap');



form.addEventListener('submit',async function (e){
    e.preventDefault();
    
    const searchTerm = form.elements.query.value;
    const config = {params:{q:searchTerm}}
    
    
    
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    for(result of shows){
        if(result.show.image){
            const a = document.createElement('a');
            var link = document.createTextNode("Watch Now");
            a.appendChild(link);
            a.target = 'blank';
            const linkbutton = document.createElement("button");
            linkbutton.classList.add("watch")
            linkbutton.classList.add("btn","btn-outline-dark");
            const elmnt = document.createElement('DIV');
            elmnt.style.backgroundColor = '#918b76';
            elmnt.style.margin = '10px';
            const title = document.createElement('h5');
            // const desc = document.createElement('p');
            const img = document.createElement('IMG');
            const body = document.createElement('DIV');
            elmnt.style.width = '18rem';
            cardDiv.classList.add('col');
            body.classList.add('card-body');
            img.classList.add('card-img-top');
            title.classList.add('card-title');
            elmnt.classList.add('card');
            // desc.classList.add('card-text');
            title.textContent = result.show.name;
            a.href = result.show.officialSite;
            linkbutton.append(a);
            // desc.textContent = result.show.summary.slice(3,result.show.summary.length-4);
            img.src = result.show.image.medium;
            elmnt.append(img);
            body.append(title);
            // body.append(desc);
            body.append(linkbutton);
            elmnt.append(body);
            
            cardDiv.append(elmnt);
            rowDiv.append(cardDiv);
        }
        
    }
}