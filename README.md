# siteweb_mcbeauty

Site institucional + landing page de conversão da **Mayara Cabral Beauty Clinic**
(Teixeira de Freitas / BA). HTML5, CSS3 e JavaScript puro — estático, sem build,
pronto para GitHub Pages.

## Estrutura

```
index.html            Landing institucional (hero, sobre, procedimentos, resultados, guia, FAQ, contato)
procedimentos.html    Ficha completa dos 17 procedimentos, com filtro por categoria
assets/css/style.css  Design system completo (tokens de cor, tipografia, componentes)
assets/js/main.js     Navegação, reveal, FAQ, filtros e o "Guia do seu olhar"
assets/img/           Logo em SVG, favicon, fotos otimizadas em WebP e capa OG
CNAME                 Domínio customizado (mayaracabralbeauty.com.br)
robots.txt sitemap.xml
.nojekyll             Impede o Jekyll de processar a pasta no GitHub Pages
```

## Publicação no GitHub Pages

1. Suba o conteúdo desta pasta na raiz do repositório `siteweb_mcbeauty`.
2. Settings → Pages → Source: `Deploy from a branch` → branch `main`, pasta `/ (root)`.
3. Em **Custom domain**, informe `mayaracabralbeauty.com.br` e marque *Enforce HTTPS*.
4. No provedor do domínio, aponte:
   - `A` → 185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153
   - `CNAME` do `www` → `SEU-USUARIO.github.io`

## Dois ajustes que você pode querer fazer

**1. Mostrar ou esconder os preços** — `assets/js/main.js`, primeira linha da configuração:

```js
var SHOW_PRICES = false;   // true = exibe os valores já cadastrados nas fichas
```

Os valores de todos os procedimentos já estão no HTML, dentro de `<p class="proc__price price">`.
Com `false`, ficam invisíveis e o lead é levado a perguntar no WhatsApp.

**2. Trocar o número do WhatsApp** — mesma seção:

```js
var WHATSAPP = '5573999267426';
```

Cada botão do site tem sua própria mensagem pronta, definida no atributo `data-wa` do HTML.

## Depoimentos

A seção de prova social usa **apenas comentários públicos reais** publicados no
Instagram da clínica. Dentro do `index.html`, logo abaixo desses cards, há um bloco
comentado com o modelo para colar novos depoimentos reais (WhatsApp, Google ou Instagram).

## Conteúdo pendente

- Fotos de resultado de: lash lifting, hidra gloss, nanofios, brows repair, epilação, penteado e remoção a laser.
- Endereço completo da clínica (hoje o site informa apenas a cidade).
- Depoimentos escritos por clientes.
