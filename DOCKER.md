# Docker Hot Reload Setup - Code Connect

Este projeto agora está configurado para rodar completamente em containers Docker com hot reload automático.

## 🚀 Início Rápido

### 1. Copiar variáveis de ambiente

```bash
# Backend
copy apps\backend\.env.example apps\backend\.env

# Frontend
copy apps\frontend\.env.example apps\frontend\.env
```

### 2. Iniciar containers

```bash
npm run docker:up
```

Aguarde alguns minutos na primeira execução (instalação de dependências).

### 3. Acessar a aplicação

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **PostgreSQL**: localhost:5432

## 📝 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run docker:up` | Inicia todos os containers em background |
| `npm run docker:down` | Para e remove todos os containers |
| `npm run docker:logs` | Exibe logs de todos os containers |
| `npm run docker:logs:backend` | Exibe apenas logs do backend |
| `npm run docker:logs:frontend` | Exibe apenas logs do frontend |
| `npm run docker:restart` | Reinicia os containers |
| `npm run docker:rebuild` | Reconstrói as imagens do zero (use após mudar dependências) |
| `npm run docker:ps` | Lista status dos containers |

## 🔥 Hot Reload

O hot reload está configurado e funciona automaticamente:

- **Frontend (Vite)**: Qualquer mudança em `apps/frontend/src` é detectada instantaneamente
- **Backend (NestJS)**: Qualquer mudança em `apps/backend/src` reinicia o servidor automaticamente

## 🗄️ Migrations do Prisma

Para executar migrations dentro do container:

```bash
# Entrar no container do backend
docker exec -it code-connect-backend sh

# Executar migration
npx prisma migrate dev

# Sair do container
exit
```

## 🔧 Troubleshooting

### Hot reload não está funcionando

1. Verifique se os containers estão rodando: `npm run docker:ps`
2. Reinicie os containers: `npm run docker:restart`
3. Se ainda não funcionar, reconstrua: `npm run docker:rebuild`

### Erro ao instalar dependências

Se você adicionou novas dependências:

```bash
# Reconstruir containers
npm run docker:rebuild
```

### Limpar tudo e começar do zero

```bash
# Parar containers
npm run docker:down

# Remover volumes (apaga banco de dados!)
docker volume rm react-router-code-connect_postgres_data
docker volume rm react-router-code-connect_backend_node_modules
docker volume rm react-router-code-connect_frontend_node_modules

# Reconstruir tudo
npm run docker:rebuild
```

## 📂 Estrutura de Volumes

- `apps/frontend/src` → Montado no container para hot reload
- `apps/backend/src` → Montado no container para hot reload
- `node_modules` → Volumes nomeados para evitar conflitos Windows/Linux

## 🌐 Rede Docker

Todos os serviços estão na mesma rede (`code-connect-network`), permitindo comunicação entre containers usando seus nomes de serviço.

## ⚠️ Notas Importantes

- A primeira execução demora mais (instalação de dependências)
- Node_modules são gerenciados dentro dos containers
- Use `npm run docker:rebuild` após mudar dependências no package.json
- O PostgreSQL mantém dados persistentes no volume `postgres_data`

