const express = require('express')
const routes = express.Router();
//ARRAY DE OBJETOS(FILMES)
const filmes = [
    {
        id: 1,
        nome:"Homem Aranha",
        img:"https://cdn.ome.lt/legacy/imagens/cinema/news/homem-aranha3/arte_promo.jpg",
        genero:"Ficção Cientifica",
        nota:"8"
    }
    ,
    
    {
        id: 2,
        nome:"Homem de Ferro",
        img:"https://hqrock.files.wordpress.com/2013/02/iron-man-3-official-poster-damaged-armor-and-others-armors.jpg?w=371&h=549",
        genero:"Ficção Cientifica",
        nota:"8"
    }
    ,
    
    {
        id: 3,
        nome:"Thor",
        img:"http://pm1.narvii.com/6358/35af8d7019e21f45b8c65d9808770225f2cf331a_00.jpg",
        genero:"Ficção Cientifica",
        nota:"8"
    }
    , 
    {
        id: 4,
        nome:"Loki",
        img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yM58i3DhSJDkYSB3LwtJ75pFBap.jpg",
        genero:"Ficção Cientifica",
        nota:"9"
    }
    ,
    
    {
        id: 5,
        nome:"O Culpado",
        img:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2/AvKkinYwfAHzpT7GvvdKAdoVFWL.jpg",
        genero:"Ficção Cientifica",
        nota:"10"
    }
];
//[GET] LISTAR TODOS
routes.get('/', (req, res) =>{
    res.send(filmes);
    
});
//[GET] LISTAR POR ID
routes.get('/:id', (req, res) => {
    const id = req.params.id;
    const index = filmes.findIndex(filme => filme.id == id);
    const filme = filmes[index];
    res.send(filme);
  })
//[POST] CREATE CRIAR UM FILME
routes.post('/add', (req, res) =>{
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
      message: 'cadastrado com sucesso',
      data: filme
    });
    
})
  //[PUT] UPDATE ATUALIZAR FILME
  routes.put('/:id', (req, res) => {
   const filmeEditado = req.body;
   const id = req.params.id;
   let filmePreCadastrado = filmes.find((filme) => 
   filme.id  == id);

   filmePreCadastrado.nome = filmeEditado.nome;
   filmePreCadastrado.img = filmeEditado.img;
   filmePreCadastrado.genero = filmeEditado.genero;
   filmePreCadastrado.nota = filmeEditado.nota;
  
    res.send({
      message:`filme${filmePreCadastrado.id} atualizado`,
      data:filmePreCadastrado
    })
  })
  //[DELETE] DELETAR FILME 
  routes.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = filmes.findIndex((filme) => filme.id == id);
    filmes.splice(index, 1);

    res.send({
        message: `filme excluida com sucesso`,
      })
    })

module.exports = routes