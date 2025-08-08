# Projeto ABQM - Calendários

Este projeto é parte do ecossistema ABQM e utiliza os pacotes da biblioteca `@abqm-ds` para construção da interface (tokens, ícones e componentes React).

---

## 🚀 Tecnologias utilizadas

- React 19+
- TypeScript
- Vite
- Styled-components
- @abqm-ds/icons
- @abqm-ds/react
- @abqm-ds/tokens

---

## 📦 Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_RESULTADOS>
   cd resultados
   ```

   2.0 Instalar versão 22.14.0 do node

2.1 Instale as dependências:

```bash
npm install
```

3.0 Atualizar o pacote abqm

````bash
   npm run upgrade:ui
   ```

3.1 Rode o projeto:
```bash
npm run dev
````

---

## 📂 Scripts disponíveis

Todos os scripts podem ser executados com `npm run <nome-do-script>`.

| Script       | Descrição                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dev`        | Inicia o servidor de desenvolvimento com Vite.                                                                                                         |
| `build`      | Gera a versão final otimizada do projeto.                                                                                                              |
| `preview`    | Executa uma prévia local do projeto já empacotado.                                                                                                     |
| `update:ui`  | Atualiza os pacotes `@abqm-ds/icons`, `react`, `tokens` para últimas versões **permitidas** no `package.json`. Usa `npm update`.                       |
|              |
| `upgrade:ui` | Atualiza os pacotes `@abqm-ds/*` para a **última versão publicada** no NPM, inclusive versões major. Usa `npm-check-updates`. Requer commit posterior. |

---

## 🛠 Scripts internos (`package.json`)

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "update:ui": "npm update @abqm-ds/icons @abqm-ds/react @abqm-ds/tokens",
  "upgrade:ui": "npx npm-check-updates -u @abqm-ds/icons @abqm-ds/react @abqm-ds/tokens && npm install",
}
```

> 💡 Recomenda-se executar `upgrade-ui` somente em ambientes locais e revisar manualmente as mudanças antes de comitar.

---

## ✅ Requisitos

- Node.js `>=22`
- NPM `>=8`

---

## 📄 Licença

Este projeto é privado e de uso interno da ABQM. Todos os direitos reservados.
