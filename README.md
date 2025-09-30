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
