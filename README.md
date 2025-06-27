# Aplicação Web de Pesquisa Integrada com APIs Externas

---

## Nome e nº de aluno

- Bruno Valente nº 9088 

---

## Tecnologias e APIs Utilizadas

- **Backend**: Node.js, Express.js  
- **Base de Dados**: MongoDB com Mongoose  
- **Autenticação**: Passport.js, express-session  
- **APIs externas**:  
  - OpenWeatherMap (dados meteorológicos)  
  - Wikipédia (conteúdo informativo)  
  - Pixabay (imagens)  
- **Frontend**: HTML5, CSS3, JavaScript  
- **Outras ferramentas**: dotenv, body-parser

---

## Instruções de Instalação e Configuração

1. **Clonar o repositório:**


git clone https://github.com/PWEB-2425/trabalho2-mashup-apis-bvall0

2. **Instalar dependências:**

npm install

3. **Configurar variáveis de ambiente:**

Na raiz do projeto, criar um ficheiro .env com as seguintes variáveis:


MONGODB_URI=<string de conexão MongoDB>
SESSION_SECRET=<segredo para sessões>
OPENWEATHER_API_KEY=<chave API OpenWeatherMap>
PIXABAY_API_KEY=<chave API Pixabay>
MongoDB: Pode usar MongoDB local ou um serviço cloud como MongoDB Atlas.

4. **Chaves API: Criar conta e obter chaves gratuitas nas plataformas:**

OpenWeatherMap

Pixabay

5. **Comandos para Executar Localmente**

Para iniciar o servidor em modo normal:

npm start

O servidor estará disponível em:

http://localhost:5000

6. **Link de Deployment**
A aplicação está disponível em:

(Ainda falta fazer)
https://seu-app-render.onrender.com