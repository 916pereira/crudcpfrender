// Express serve os HTMLs e o roteador JSON Server persiste o CRUD em db.json.
const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const app = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/health', (req, res) => res.json({status:'ok'}));
app.use(jsonServer.bodyParser);
// Normaliza CPF e impede duplicação no cadastro e na edição.
app.use('/pessoas', (req, res, next) => {
  if (['POST','PUT'].includes(req.method)) {
    const fields = ['cpf','nome','sobrenome','email','idade','telefone','rua','bairro','cidade','estado','rg'];
    if (fields.some(f => req.body[f] === undefined || String(req.body[f]).trim() === '')) return res.status(400).json({error:'Preencha todos os campos.'});
    req.body.cpf = String(req.body.cpf).replace(/\D/g, '');
    if (req.body.cpf.length !== 11) return res.status(400).json({error:'Informe um CPF com 11 dígitos.'});
    req.body.idade = Number(req.body.idade);
    if (!Number.isInteger(req.body.idade) || req.body.idade < 0 || req.body.idade > 130) return res.status(400).json({error:'Idade inválida.'});
    const id = req.path.split('/')[1];
    if (router.db.get('pessoas').value().some(p => p.cpf === req.body.cpf && String(p.id) !== id)) return res.status(409).json({error:'CPF já cadastrado.'});
  }
  next();
});
app.use(router);
const porta = process.env.PORT || 3000;
app.listen(porta, '0.0.0.0', () => console.log(`Servidor iniciado na porta ${porta}`));
