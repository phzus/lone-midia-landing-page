# Referência — otusmedia.com → adaptação Lone Mídia

> Análise da referência estética que o cliente ama, mapeada para a Lone Mídia. Insumo de [DESIGN.md](DESIGN.md).
> **Princípio de tradução:** o que na Otus é **laranja `#FF4A1C`** (cor única de ação), na Lone é **azul `#0040FF`**.
> A Otus alterna seções **claras e escuras**; a Lone fica **toda dark** (alterna só `bg-base`/`bg-elevated`) —
> de propósito **mais sombria/"sinistra"** que a própria Otus. Stack da Otus: Webflow + CSS keyframes nativo
> (sem GSAP/Lottie/Swiper) → na Lone: CSS + Framer Motion pontual (perf-first), respeitando `prefers-reduced-motion`.

## Mapa de padrões (manter / adaptar / dropar)
| Padrão Otus | Útil? | Adaptação Lone Mídia |
|---|---|---|
| **Hero full-bleed com foto emocional** (olho = "atenção") + headline split (linha leve + linha pesada) | ✅ Forte | Foto dos **fundadores** com duotone azul nas sombras + scrim preto na base. Headline em 2 pesos: linha leve + palavra-chave pesada/grifada (gradiente azul→cyan). |
| **CTA pill com ícone-logo que gira** (laranja, único colorido na tela) | ✅ | Mesmo conceito em **azul-glow**: pill com o símbolo Lone à esquerda (spin sutil no hover). Único elemento saturado da dobra. |
| **Scroll marquee / sticky reveal** (texto pinado enquanto conteúdo se revela) | ✅ Adaptar | Usar no bloco do **método Lone Growth**: frase-âncora ("Cada anúncio tem um propósito…") pinada enquanto os 4 pilares entram. |
| **Logo ticker infinito** (loop CSS, logos duplicados) | ✅ | Faixa de logos de clientes, dessaturada (cor no hover), `mask` fade lateral. ⚠️ placeholder até receber logos. |
| **Serviços numerados 01–05** (nº \| nome grande \| descrição, `hr`, texto "pre-reveal" esmaecido) | ✅ Forte | **4 pilares 01–04** exatamente nesse layout. Texto entra de cinza→branco no scroll. (Já no DESIGN.) |
| **Seção CEO/fundador 50/50** (foto + card de bio com credenciais "550 empresas / 60 mi") | ✅ | Bloco dos **fundadores** + credenciais Lone (+R$10mi / +100% / +40 negócios) como prova de autoridade. Humaniza. |
| **Scroll gigante com clipping-mask** (texto display "PERFORMANCE/CRESCIMENTO" + janela de imagem) | ✅ Adaptar | Momento cinematográfico: palavra display gigante (ex.: **"PREVISIBILIDADE"** / **"ESCALA"**) com máscara revelando imagem/vídeo. Pausa dramática antes do form. |
| **Depoimentos: avatar circular + @Instagram clicável** (autenticidade verificável) | ✅ Forte | Cards de vidro com foto + nome + **@ clicável** + resultado em número. ⚠️ conteúdo real pendente (placeholder honesto agora). |
| **CTA final full-bleed** ("O Mercado Não Espera") imagem sombria + overlay + CTA centralizado | ✅ | Faixa de **urgência final** antes do footer, fundo escuro/vinheta, CTA azul → form/WhatsApp. |
| **Footer com logotipo GIGANTE** (marca como elemento decorativo) | ✅ | "LONE MÍDIA" / símbolo em display gigante no footer (`bg-sunken`), social 44×44, mote, voltar ao topo. |
| **Navbar "cápsula"** (pill preta central, menu escondido, WhatsApp pré-preenchido) | ✅ Adaptar | Navbar flutuante glass `rounded-full`; **link WhatsApp com mensagem pré-preenchida**. CTA outline (azul só na borda). |
| **Alternância seções claras/escuras** (respiro) | ⚠️ Dropar p/ all-dark | Manter ritmo só com `bg-base`↔`bg-elevated` + divisores hairline. Sem seção clara (preserva o noir). |
| **Sem libs pesadas; scroll-driven nativo** | ✅ | CSS keyframes p/ tickers/glow; Framer Motion só onde precisa; testar `animation-timeline: scroll()` com fallback. |

## O que NÃO copiar
- A **cor laranja** (é a marca da Otus) — Lone é azul.
- O **fundo claro** das seções de serviço/depoimento/CEO/blog — manter dark.
- **Blog** (fora de escopo agora) — a Otus tem; a Lone não precisa no MVP.
- Menu hamburger central "escondido" no **desktop** — em telas grandes, navbar com links visíveis converte melhor p/ LP; cápsula/hamburger fica no mobile.

## Síntese
A Otus entrega "premium sombrio" via: **1 cor de ação**, **tipografia display gigante com contraste de peso**, **scroll cinematográfico** (sticky/parallax/mask), **prova social verificável** (@ do Instagram) e **autoridade do fundador com números**. Tudo isso traduz direto pra Lone trocando laranja→azul e mantendo a página **inteira escura** — o que nos deixa até mais "sinistros" que a referência. A estrutura focada em formulário de qualificação (objetivo da Lone) é preservada: os CTAs cinematográficos levam todos ao mesmo diagnóstico.
