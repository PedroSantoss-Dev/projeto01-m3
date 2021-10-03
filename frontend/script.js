const api = 'http://localhost:3003'
const card = document.getElementById('card');
let edicao = false;
let idEdicao = 0;


const getFilmes = async () => {
  const response = await fetch(api);
  const data = await response.json();
  console.log(data);
  data.map((filme) => {
    card.insertAdjacentHTML('beforeend', `
        <div class="card">
         <img class="img"src=${filme.img} >
             <div class="cardInfo">
                 <h3 class="nome">${filme.nome}</h3>
                 <p class="genero">${filme.genero}</p>
                 <p class="nota">${filme.nota}</p>
                 <button type="button" class="btn btn1" onclick="putFilme(${filme.id})">Editar</button>
                 <button type="button" class="btn btn2" onclick="deleteFilme(${filme.id})">Excluir</button>
             </div>   
      </div>
      `)
  })
}
getFilmes();
const submitForm = async (evento) => {
  evento.preventDefault();

  let nome = document.getElementById('nome');
  let img = document.getElementById('img');
  let genero = document.getElementById('genero');
  let nota = document.getElementById('nota');

  
  const filme = {
    nome: nome.value,
    img: img.value,
    genero: genero.value,
    nota: nota.value
  }

  if(!edicao) { 
    const request = new Request(`${api}/add`, {
      method: 'POST',
      body: JSON.stringify(filme),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    
    const response = await fetch(request);
    const result = await response.json();

    if(result) {
      getFilmes();
    }

  } else {
    
    const request = new Request(`${api}/${idEdicao}`, {
      method: 'PUT',
      body: JSON.stringify(filme),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })

    const response = await fetch(request);
    
    const result = await response.json();

    if(result) {
      getFilmes();
    }
  }

  nome.value = '';
  img.value = '';
  genero.value = '';
  nota.value = '';

  lista.innerHTML = '';
}


const getFilmeById =  async (id) => {
  const response =  await fetch(`${api}/${id}`);
  return filme = response.json();
}


const putFilme = async (id) => {
  edicao = true;
  idEdicao = id;
  const filme = await getFilmeById(id);

  let nomeEl = document.getElementById('nome');
  let imgEl = document.getElementById('img');
  let generoEl = document.getElementById('genero');
  let notaEl = document.getElementById('nota');
  
  nomeEl.value = filme.nome;
  imgEl.value = filme.img;
  generoEl.value = filme.genero;
  notaEl.value = filme.nota;

 getFilmes()

}

const deleteFilme = async (id) => {

 const request = new Request(`${api}/${id}`, {
   method: 'DELETE',
 })
 const response = await fetch(request);
 const data = await response.json();
 console.log(data.me)
 card.innerHTML = '';
 getFilmes()
}

