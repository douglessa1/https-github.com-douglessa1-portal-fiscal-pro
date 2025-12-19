# 🧠 PORTAL FISCAL PRO — MASTER PLAN
## Arquitetura de Produto, UX, Segurança e Execução
### Versão: v1.1 (Reforma Tributária)
### Status: CONTEXTO CONGELADO

---

## 0️⃣ OBJETIVO DESTE DOCUMENTO

Este arquivo é o **contrato mestre** do Portal Fiscal Pro.

Ele existe para:
- eliminar improviso
- impedir alucinação de IA
- manter decisões lineares e rastreáveis
- alinhar Produto, UX, Segurança e Tecnologia

❗ Este documento NÃO é um rascunho.
❗ Ele só pode ser EVOLUÍDO por versionamento (v1.2, v1.3…).

---

## 1️⃣ VISÃO DE PRODUTO (IMUTÁVEL)

O Portal Fiscal Pro é uma **plataforma fiscal profissional brasileira**, criada para:

- pessoas leigas em tributação
- MEIs e microempresários
- contadores
- auditores e empresas

📌 Princípio central:
> O usuário brasileiro NÃO entende tributação, NÃO confia em plataformas novas e TEM MEDO de errar.

O produto existe para:
1. educar
2. orientar
3. provar competência
4. só então pedir confiança, dinheiro e dados sensíveis

---

## 2️⃣ TAXONOMIA DE FUNCIONALIDADES (5 CAMADAS)

### 🧠 1. EDUCAÇÃO (Sempre grátis)
- Conteúdo educativo
- Guias práticos
- Notícias fiscais
- Conceitos básicos (MEI, ICMS, Simples, Reforma)

Objetivo: **reduzir ignorância e medo**

---

### 🧪 2. SIMULAÇÃO (Grátis, sem login)
- Cenários hipotéticos
- Valores estimados
- UX deixa explícito: *“simulação educacional”*

Objetivo: **entendimento sem risco**

---

### 🧮 3. CÁLCULO REAL (Grátis, login opcional)
- Cálculos corretos
- Base legal real
- Login apenas para salvar histórico

Objetivo: **provar competência técnica**

---

### 🗂️ 4. PERSISTÊNCIA (Login obrigatório)
- Histórico
- Dashboards
- Comparações
- Exportações

Objetivo: **conveniência profissional**

---

### 🛡️ 5. COMPLIANCE (Plano pago)
- Monitor fiscal
- Alertas
- SPED
- XML
- Certificado digital (sem senha)

Objetivo: **confiança máxima e escala**

---

## 3️⃣ MATRIZ DE PLANOS (ANTI–DARK PATTERN)

### 🟢 FREE — R$ 0
- Ferramentas ilimitadas
- Histórico: 30 dias
- Conteúdo educativo completo
- Sem upload
- Sem certificado

✔️ Free ENTREGA valor real

---

### 🔵 PRO — R$ 79
- Histórico infinito
- Exportações
- Alertas fiscais
- Dashboards completos

---

### 🔴 AUDITOR — R$ 249
- XML
- SPED
- Certificado digital
- API

---

## 4️⃣ JORNADA DE CONFIANÇA (ORDEM OBRIGATÓRIA)

1. Descoberta — usar sem login
2. Experimentação — criar conta voluntariamente
3. Uso profissional — pagar por conveniência
4. Dados sensíveis — confiar CNPJ, XML e certificado

❗ Ordem NÃO pode ser invertida

---

## 5️⃣ ARQUITETURA DE SEGURANÇA (INVIOLÁVEL)

### ❌ PROIBIDO
- Armazenar senha de certificado
- Armazenar XML bruto
- Token em localStorage
- Dados fiscais no frontend

### ✅ PERMITIDO
- Processamento em memória
- Criptografia em repouso
- Segregação por empresa (tenant)
- LGPD: direito ao esquecimento

---

## 6️⃣ FUNIL DE PRODUTO (ANTI-ENGANAÇÃO)

❌ “Cadastre para ver”
❌ Email gate
❌ Bloqueio artificial

✅ Valor primeiro
✅ Login opcional
✅ Free funcional
✅ Upgrade natural

---

## 7️⃣ ESTRUTURA DE PÁGINAS & UX

### Público (sem login)
- /
- /educacao
- /noticias
- /ferramentas
- /ferramentas/simples
- /ferramentas/icms
- /ferramentas/difal
- /ferramentas/reforma-tributaria

### Autenticado
- /dashboard
- /historico
- /comparacoes
- /alertas
- /perfil
- /empresas

---

## 8️⃣ v1.1 — REFORMA TRIBUTÁRIA (IBS / CBS)

### Novos Conceitos Obrigatórios
- IBS (Imposto sobre Bens e Serviços)
- CBS (Contribuição sobre Bens e Serviços)
- Split Payment
- Crédito financeiro amplo
- Fim da cumulatividade

### Aplicação na Taxonomia
- Educação: explicação humana da Reforma
- Simulação: impacto estimado IBS/CBS
- Cálculo Real: valores precisos por regime
- Persistência: comparativos ICMS/PIS/COFINS vs IBS/CBS
- Compliance: monitor de transição 2026–2033

---

## 9️⃣ ARQUITETURA DE LOGIN & BACKEND (SEM CÓDIGO)

### Identidade
- Login por email + senha
- OAuth futuro (não agora)

### Sessão
- Cookie HttpOnly
- Sessão curta
- Refresh seguro

### Modelo de Dados (alto nível)
- User
- Empresa
- Estabelecimento (filial/matriz)
- Cálculo
- Histórico
- Permissão

### Multi-empresa
- Um usuário pode ter N empresas
- Permissões por empresa

### Certificado Digital
- Upload temporário
- Senha nunca armazenada
- Uso apenas em memória

---

## 🔟 VALIDAÇÃO DE PRODUTO (MISSÃO ATUAL)

### Personas obrigatórias
1. MEI leigo
2. Contador
3. Empresário médio

### Perguntas-chave
- O que este site faz?
- Onde fiquei confuso?
- Por que criaria conta?
- Em que ponto desistiria?
- Eu confiaria dados aqui?

---

## 1️⃣1️⃣ MÉTRICAS DE SUCESSO

North Star:
- Cálculos fiscais realizados/mês

Indicadores:
- 60% usam 2+ ferramentas
- 20% criam conta voluntariamente
- 5% Free → Pro

---

## 1️⃣2️⃣ PROMPT DEFINITIVO — ANTIGRAVITY (CONGELADO)

Você é o Arquiteto de Produto Fiscal do Portal Fiscal Pro.

Siga ESTRITAMENTE este documento.
Não implemente código.
Não proponha features fora deste escopo.

Missão:
- Validar UX
- Validar funil
- Identificar quebra de confiança
- Identificar pontos de abandono
- Relatar de forma objetiva e fria

Qualquer decisão fora deste documento é inválida.

---

## 1️⃣3️⃣ PAPEL DO JULES

Jules só pode:
- implementar o que Antigravity validar
- respeitar esta arquitetura
- nunca antecipar features
- nunca simplificar segurança

---

## 🔚 REGRA FINAL

Este documento é:
- a fonte da verdade
- o freio contra caos
- o mapa de escala

Qualquer IA que não siga este plano deve ser descartada.

