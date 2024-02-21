const express = require('express')
const cors = require('cors')

const app = express()

// Configuração do CORS para permitir solicitações de origem específica
app.use(
  cors({
    origin: 'https://juliacakes.vercel.app',
  }),
)

// Restante do código do servidor...

const port = process.env.PORT || 3001

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`)
})
