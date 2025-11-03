# Fabrica de Automóveis 2025

**Sistema de gerenciamento de vendas de automóveis para concessionárias.**  
Gerencie o pátio de veículos, visualize áreas de estacionamento e controle as vendas de forma prática e eficiente.

---

##  Visão Geral  
O sistema foi desenvolvido com foco em **organização, performance e usabilidade**, permitindo que concessionárias gerenciem automóveis e acompanhem o status de cada veículo (vendido ou disponível) em tempo real.

---

##  Tecnologias Utilizadas  

###  Frontend  
- **HTML5**  
- **CSS3**  
- **JavaScript (ES6+)**  
- **Fetch API**

###  Backend  
- **API REST local**  
- **MySQL**  
- **Prisma ORM**

---

##  Como Executar  

###  Pré-requisitos  
- Servidor da **API local** rodando na porta `3000`  
- Um **navegador web moderno** (Chrome, Edge, Firefox, etc.)

---

###  Instruções de Execução  

####  Iniciar o Backend  
```bash
npm start
# ou
node server.js
````

####  Executar o Frontend

**Método 1:**
Abra o arquivo `index.html` diretamente no navegador

**Método 2 (recomendado):**
Use um servidor local:

```bash
python -m http.server 8000
# ou
npx http-server
```

Depois acesse no navegador:
 [http://localhost:3000](http://localhost:3000)

---

##  Funcionalidades

 Visualização de **11 áreas de estacionamento**
 **Áreas azuis:** carros alocados para venda
 **Áreas brancas:** áreas vazias
 **Modal interativo** exibindo a lista completa de carros por área
 **Sistema de vendas** com seleção de cliente e concessionária
 Identificação de veículos com **status “Vendido”**
 Interface **responsiva e moderna**, com **modais sobrepostos**

---

##  Observação

Este projeto foi desenvolvido como parte de uma atividade prática para aplicar conceitos de **integração entre front-end e back-end**, **persistência de dados com MySQL** e **organização visual em HTML/CSS.**

---

##  Autor

Desenvolvido por **Milena Felisbelo**
 [GitHub](https://github.com/Milenafelisbelo)
