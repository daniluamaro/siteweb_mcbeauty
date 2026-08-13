# Mayara Cabral Beauty Clinic — landing page

Protótipo de apresentação. HTML/CSS/JS estático, sem framework, sem build.

## Estrutura

```
index.html            Landing de conversão (13 seções)
procedimentos.html    Catálogo completo, com filtro por categoria
assets/css/style.css  Sistema visual completo (~29 KB)
assets/js/main.js     Menu, reveal, sliders, filtro (~4 KB)
assets/img/           14 imagens em WebP + logo em SVG (~390 KB)
```

Peso total: **464 KB**, incluindo todas as imagens.

## Publicar

Não precisa de build. Sobe a pasta inteira em qualquer host estático:

- **GitHub Pages** — commit na branch `main`, Settings → Pages → Deploy from branch → `/ (root)`
- **Netlify / Vercel / Cloudflare Pages** — arrasta a pasta, sem configuração
- **Hospedagem comum** — envia por FTP para `public_html/`

Único requisito: servir por HTTP. Abrir o `index.html` direto do disco (`file://`) faz o mapa do Google não carregar.

## Trocar as imagens

Todos os nomes são semânticos. Para substituir por versões em alta, mantenha o nome do
arquivo e a proporção 3:4 (retrato):

| Arquivo | Onde aparece |
|---|---|
| `hero.webp` | Hero |
| `mayara.webp` | Seção "Sobre a Mayara" |
| `metodo-1/2/3.webp` | Faixa de fotos do método |
| `ad-design-1/2/3.webp` | Antes e depois — design |
| `ad-lamination-1/2.webp` | Antes e depois — Brow Lamination |
| `ad-make-1.webp` | Antes e depois — make + penteado |
| `espaco-1/2/4.webp` | Galeria da clínica |

Para converter novas fotos:
`cwebp -q 84 foto.jpg -o assets/img/nome.webp`

## Slots reservados

Na seção de resultados existem três cards com moldura tracejada aguardando foto:
**Nanofios**, **Brows Repair** e **Lash Lifting**. Estão em `index.html`, marcados com
o comentário `<!-- SLOTS RESERVADOS -->`. Para ativar, troque o `<article class="ad-card ad-card--empty">`
por um card normal seguindo o padrão dos anteriores.

## Rastreamento

Nenhum pixel instalado. Para medir depois, cole o script do GA4 ou do Meta Pixel antes de
`</head>` nos dois arquivos. Os links de WhatsApp já têm mensagem diferente por seção, então
dá para saber qual bloco gerou o contato só lendo a primeira mensagem que chega.

## Pendências

- [ ] Resposta da Mayara: **"dói?"** — pergunta removida do FAQ por falta de resposta
- [ ] Resposta da Mayara: **"preciso deixar crescer antes?"** — idem
- [ ] Confirmar se **Hidra Gloss** é de cílios (arquivo de dados) ou de lábios (post do Instagram)
- [ ] Confirmar qual Instagram é o oficial: `@mcbeautyclinic_` ou `@mayaracabralbeauty_`
- [ ] 1 ou 2 frases sobre a história da **Flórida**
- [ ] Fotos em alta resolução
- [ ] Antes e depois de Nanofios, Brows Repair e Lash Lifting
- [ ] Domínio
- [ ] Perfil no Google Meu Negócio (o bloco de avaliação não existe na página justamente porque
      não há dado real — quando existir, é a prova social mais forte que a página pode receber)
