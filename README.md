## 📌 Requisitos Funcionais

- [x] O usuário poderá criar uma conta (registro com e-mail e senha).  
- [ ] O usuário poderá fazer login no sistema.  
- [ ] O usuário poderá registrar seu humor do dia.  
- [ ] O sistema deve impedir que o mesmo usuário registre dois humores no mesmo dia.  
- [ ] O usuário poderá visualizar o humor registrado no dia atual.  
- [ ] O sistema deve calcular e exibir a média dos últimos 5 dias registrados.  
- [ ] O usuário poderá listar seus registros de humor em ordem cronológica.  

---

## 📌 Regras de Negócio

- [ ] Cada usuário deve ter apenas um registro de humor por dia.  
  → Se já registrou, não pode duplicar para o mesmo dia.  
- [ ] O humor só pode ser registrado se o usuário estiver autenticado.  
- [ ] A média exibida deve ser sempre dos últimos 5 registros.  
- [ ] O humor do dia deve ser categorizado em uma escala fixa  
  _(exemplo: 1 a 5, ou opções como “muito triste, triste, neutro, feliz, muito feliz”)._  
- [ ] Se o usuário não registrar o humor em um dia, o sistema não gera valores automáticos.  
- [ ] Os dados de humor pertencem exclusivamente ao usuário que os criou  
  _(não pode ver/alterar de outro usuário)._  

# Config DataBase

## 🐳 Como usar Docker e Docker Compose

### 1. Instalar o Docker

- Acesse [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) e baixe o Docker Desktop para seu sistema operacional (Windows, Mac ou Linux).
- Siga as instruções de instalação do site oficial.

### 2. Iniciar o banco de dados com Docker Compose

O projeto já possui o arquivo [`docker-compose.yml`](docker-compose.yml) configurado para subir o PostgreSQL.

No terminal, execute:

```sh
docker compose up -d
```

Isso irá baixar a imagem do PostgreSQL e iniciar o banco em segundo plano.

### 3. Parar o banco de dados

Para parar e remover os containers criados:

```sh
docker compose down
```

### 4. Acessar o banco de dados

- O banco estará disponível em `localhost:5432`.
- Usuário: `docker`
- Senha: `docker`
- Banco: `my_mood`

Essas credenciais já estão configuradas no arquivo `.env.example`.

---

> **Obs:** Certifique-se de que o Docker está rodando antes de iniciar o projeto ou rodar as migrations do Prisma.


## ⚡️ Instalação e uso do Prisma

### 1. Instalar dependências

O Prisma já está listado nas dependências do projeto. Para instalar, basta rodar:

```sh
npm install prisma 
para CLI
npx prisma init 
para iniciar no projeto
```

### 2. Configurar o banco de dados

Edite o arquivo `.env` com sua string de conexão do banco de dados PostgreSQL. 

Exemplo:

```
DATABASE_URL="postgresql://docker:docker@localhost:5432/my_mood?schema=public"
```

### 3. Rodar as migrations

Para criar as tabelas no banco conforme o schema do Prisma, execute:

```sh
npx prisma migrate 
```

Ou, para rodar as migrations em ambiente de desenvolvimento e criar uma nova migration se houver mudanças:

```sh
npx prisma migrate dev
```

### 4. Abrir o Prisma Studio

Para visualizar e editar os dados do banco via interface web:

```sh
npx prisma studio
```

O Prisma Studio abrirá no navegador, permitindo visualizar e editar os dados das tabelas.

---
