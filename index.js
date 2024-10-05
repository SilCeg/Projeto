import http from 'http'

const PORT = 7777; 

const rotas = {
    '/': "Rota principal",
    '/level1': "Teste de rota 1",
    '/level2': "Teste de rota 2"
}

const anus = http.createServer ((req,res)=>{
    res.writeHead(200, {'content-type': 'text/plain'})
    res.end (rotas[req.url])
})

anus.listen(PORT, () => {
    console.log('Deu certo!')
})