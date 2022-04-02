const express = require('express');

const server = express();

server.use(express.json());

//            Criar   Ler   Atualizar   Apagar
// Express -> POST    GET      PUT      DELETE

// Query Params = /curso/?nome=NodeJS
// Route Params = /curso/:nome
// Request Body = { nome: 'NodeJS' }

// CRUD => CREATE, READ, UPDATE, DELETE

const cursos = ['Node JS', 'JavaScript', 'React Native'];

// Middleware Global
server.use((req, res, next) => {
    console.log(`URL CHAMADA ${req.url}`);

    return next();
});

function checkCurso(req, res, next) {
    if (!req.body.curso) {
        return res.status(400).json({ error: 'O campo curso precisa ser preenchido' });
    }

    return next();
};

function checkIndexCurso(req, res, next) {
    const curso = cursos[req.params.index];

    if (!curso) {
        return res.status(400).json({ error: 'O curso não existe' });
    }

    req.curso = curso;

    return next();
};

// CREATE
server.post('/cursos/', checkCurso, (req, res) => {
    cursos.push(req.body.curso);

    return res.json({ cursos })
});

// READ
server.get('/cursos/', (req, res) => {
    // localhost:3002/cursos/
    return res.json({ cursos });
});

// READ
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
    // const nome = req.query.nome;
    // const { index } = req.params;
    return res.json({ curso: req.curso });
});

// UPDATE
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    const { index } = req.params;

    cursos[index] = req.body.curso;

    return res.json(cursos);
});

// DELETE
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;

    cursos.splice(index, 1);

    return res.json({
        message: "Curso deletado com sucesso",
    });
});

// localhost:3002
server.listen(3002);