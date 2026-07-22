/* =========================================================
   Mayara Cabral Beauty Clinic — main.js  (vanilla, sem libs)
   ========================================================= */
(function () {
  'use strict';

  /* -------------------------------------------------------
     CONFIGURAÇÃO RÁPIDA
     -------------------------------------------------------
     SHOW_PRICES = false  -> os valores ficam ocultos e o lead
                             precisa chamar no WhatsApp (padrão).
     SHOW_PRICES = true   -> exibe os valores já marcados no HTML.
     Basta trocar esta linha para mudar o site inteiro.
  ------------------------------------------------------- */
  var SHOW_PRICES = false;
  var WHATSAPP = '5573999267426';

  if (SHOW_PRICES) document.body.classList.add('show-prices');

  var wa = function (msg) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
  };
  window.mcWa = wa;

  /* ---------- links de WhatsApp com mensagem pronta ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.setAttribute('href', wa(el.getAttribute('data-wa')));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* ---------- header fixo ---------- */
  var header = document.querySelector('.header');
  var waFloat = document.querySelector('.wa-float');
  var onScroll = function () {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-stuck', y > 40);
    if (waFloat) waFloat.classList.toggle('is-in', y > 560);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- reveal on scroll ---------- */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && rv.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- FAQ ---------- */
  document.querySelectorAll('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var panel = item.querySelector('.faq__a');
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.style.maxHeight = open ? panel.scrollHeight + 'px' : 0;
    });
  });

  /* ---------- filtros da página de procedimentos ---------- */
  var filters = document.querySelectorAll('.filter');
  if (filters.length) {
    var cards = document.querySelectorAll('.proc');
    filters.forEach(function (f) {
      f.addEventListener('click', function () {
        var cat = f.dataset.filter;
        filters.forEach(function (x) {
          x.classList.toggle('is-on', x === f);
          x.setAttribute('aria-pressed', x === f ? 'true' : 'false');
        });
        cards.forEach(function (c) {
          c.classList.toggle('is-hidden', cat !== 'all' && c.dataset.cat !== cat);
        });
      });
    });
    // abre o filtro correspondente à âncora recebida da home
    if (location.hash) {
      var target = document.querySelector(location.hash);
      if (target) setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }

  /* =======================================================
     GUIA DO SEU OLHAR — recomendação em 2 toques
     Todas as recomendações apontam para procedimentos reais
     da clínica, com as durações informadas pela Mayara.
     ======================================================= */
  var guide = document.querySelector('.guide');
  if (guide) {
    var TREE = {
      start: {
        q: 'O que você quer resolver primeiro?',
        opts: [
          { t: 'Minha sobrancelha não tem desenho', s: 'Falta forma, simetria ou definição', go: 'brow' },
          { t: 'Tenho falhas ou os fios não crescem', s: 'Sobrancelha rala, quebrada ou com espaços', r: 'repair' },
          { t: 'Meus cílios são retos ou ressecados', s: 'Sem curvatura, sem brilho', go: 'lash' },
          { t: 'Tenho um evento chegando', s: 'Festa, casamento, formatura', go: 'event' },
          { t: 'Quero tirar uma micropigmentação ou tatuagem', s: 'Remoção a laser', go: 'laser' },
          { t: 'Quero remover pelos do rosto', s: 'Buço ou rosto inteiro', go: 'epil' }
        ]
      },
      brow: {
        q: 'Por quanto tempo você quer que o resultado dure?',
        opts: [
          { t: 'Só o desenho, sem cor', s: 'Manutenção a cada 15 a 20 dias', r: 'golden' },
          { t: 'Com cor por 1 a 2 semanas', s: 'Henna preenche a pele', r: 'henna' },
          { t: 'Com cor por até 30 dias', s: 'Tintura dura mais nos fios', r: 'tintura' },
          { t: 'Volume alinhado por 4 a 6 semanas', s: 'Camufla falhas sem nada definitivo', r: 'lamination' },
          { t: 'Fio a fio por 4 a 12 meses', s: 'Micropigmentação de alta precisão', r: 'nanofios' }
        ]
      },
      lash: {
        q: 'O que você procura para os cílios?',
        opts: [
          { t: 'Curvatura e alongamento natural', s: 'Sem extensão, sem manutenção semanal', r: 'lifting' },
          { t: 'Hidratação e nutrição dos fios', s: 'Cílios ressecados ou quebradiços', r: 'hidragloss' }
        ]
      },
      event: {
        q: 'Que tipo de produção você precisa?',
        opts: [
          { t: 'Maquiagem leve para o dia a dia', s: 'Acabamento natural', r: 'express' },
          { t: 'Maquiagem de festa', s: 'Pele resistente, produção completa', r: 'social' },
          { t: 'Penteado', s: 'Social ou estilizado', r: 'hair' },
          { t: 'Maquiagem + penteado', s: 'Produção completa em um só atendimento', r: 'combo' },
          { t: 'Produção para criança', s: 'Make e penteado infantil', r: 'infantil' }
        ]
      },
      laser: {
        q: 'O que você quer remover?',
        opts: [
          { t: 'Micropigmentação de sobrancelha', s: 'Clarear ou remover', r: 'remocaomicro' },
          { t: 'Tatuagem de até 10 cm', s: 'Atendida no laser-D', r: 'remocaotattoo' }
        ]
      },
      epil: {
        q: 'Qual região?',
        opts: [
          { t: 'Buço', s: 'Epilação egípcia com linha', r: 'buco' },
          { t: 'Rosto inteiro', s: 'Epilação egípcia full face', r: 'fullface' }
        ]
      }
    };

    var RESULT = {
      golden: ['Golden Brows', 'O design personalizado da clínica: limpeza e desenho pensados para o formato do seu rosto. Sessão de cerca de 50 minutos, com manutenção a cada 15 a 20 dias.', 'golden-brows'],
      henna: ['Golden Brows com Henna', 'Design personalizado com henna para colorir os fios e preencher a pele. Efeito mais cheio, com duração de 7 a 14 dias na pele.', 'golden-brows-henna'],
      tintura: ['Golden Brows com Tintura', 'Design com tintura, que segura a cor por até 30 dias nos fios. Ideal para quem quer coloração mais duradoura.', 'golden-brows-tintura'],
      lamination: ['Brow Lamination', 'Alinha, levanta e dá volume aos fios, camuflando falhas. Resultado de 4 a 6 semanas, com manutenção recomendada a cada 45 dias.', 'brow-lamination'],
      nanofios: ['Nanofios', 'Micropigmentação fio a fio de alta precisão, feita de forma superficial na pele. Dura de 4 a 12 meses e tem retoque entre 30 e 40 dias.', 'nanofios'],
      repair: ['Brows Repair', 'Tratamento de crescimento com PDRN e exossomos associados ao microagulhamento. Antes de começar é feita uma avaliação com tricoscópio para verificar se o folículo está ativo.', 'brows-repair'],
      lifting: ['Lash Lifting', 'Curva e levanta os seus próprios cílios, sem implantar fios. Resultado de 4 a 6 semanas.', 'lash-lifting'],
      hidragloss: ['Hidra Gloss', 'Hidratação e nutrição dos cílios naturais. O protocolo de 3 sessões entrega o resultado mais completo.', 'hidra-gloss'],
      express: ['Express Makeup', 'Maquiagem leve e rápida, com acabamento natural. Ideal para o dia a dia e eventos simples.', 'express-makeup'],
      social: ['Social Makeup', 'Produção completa, com pele resistente e acabamento sofisticado para festas e eventos.', 'social-makeup'],
      hair: ['HairStyle', 'Penteado social ou estilizado, montado conforme o look que você quer.', 'hairstyle'],
      combo: ['Combo Make + Hair', 'Maquiagem social e penteado no mesmo atendimento, com economia em relação a contratar separado.', 'combo-make-hair'],
      infantil: ['Produção Infantil', 'Maquiagem e penteado pensados para crianças, para festas e eventos.', 'producao-infantil'],
      remocaomicro: ['Remoção de Micropigmentação a Laser', 'Remoção ou clareamento de micropigmentação, com intervalo de cerca de 30 dias entre as sessões.', 'remocao-micropigmentacao'],
      remocaotattoo: ['Remoção de Tatuagem a Laser', 'Para peças de até 10 cm, realizada no laser-D — o dia exclusivo da clínica para esse procedimento.', 'remocao-tatuagem'],
      buco: ['Epilação Egípcia — Buço', 'Epilação com linha na região do buço. Pode ser feita junto com o design de sobrancelhas.', 'epilacao-buco'],
      fullface: ['Epilação Egípcia — Full Face', 'Epilação com linha em todo o rosto, também combinável com o design no mesmo atendimento.', 'epilacao-full-face']
    };

    var stepsEl = guide.querySelector('[data-guide-steps]');
    var stack = ['start'];

    function dots(n) {
      var h = '<div class="guide__dots">';
      for (var i = 0; i < 3; i++) h += '<i class="' + (i < n ? 'on' : '') + '"></i>';
      return h + '</div>';
    }

    function renderNode() {
      var node = TREE[stack[stack.length - 1]];
      var h = dots(stack.length) + '<p class="guide__q">' + node.q + '</p><div class="guide__opts">';
      node.opts.forEach(function (o) {
        h += '<button class="guide__opt" type="button" data-go="' + (o.go || '') + '" data-r="' + (o.r || '') + '">' +
          o.t + '<small>' + o.s + '</small></button>';
      });
      h += '</div>';
      if (stack.length > 1) h += '<button class="guide__back" type="button" data-back>&larr; Voltar</button>';
      stepsEl.innerHTML = '<div class="guide__step is-active">' + h + '</div>';
    }

    function renderResult(key) {
      var r = RESULT[key];
      var msg = 'Olá, Mayara! Vim pelo site. Fiz o guia e ele indicou o procedimento ' + r[0] +
        '. Gostaria de saber o valor e os horários disponíveis.';
      var h = dots(3) +
        '<div class="guide__result">' +
        '<p class="eyebrow" style="margin-bottom:1rem">Indicação para o seu caso</p>' +
        '<h3>' + r[0] + '</h3><p>' + r[1] + '</p>' +
        '<a class="btn" href="' + wa(msg) + '" target="_blank" rel="noopener">Falar sobre esse procedimento' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.5-1.2-2.9s.7-2 1-2.3c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.9-1c.2-.2.3-.2.6-.1l2 .9c.2.1.4.2.4.3.1.1.1.6-.1 1.3Z"/></svg></a>' +
        '<p style="margin-top:1.2rem;margin-bottom:0;font-size:.82rem">Prefere ver todos os detalhes antes? ' +
        '<a class="link-more" style="display:inline-flex" href="procedimentos.html#' + r[2] + '">Abrir a ficha completa</a></p>' +
        '</div><button class="guide__back" type="button" data-restart>&larr; Refazer o guia</button>';
      stepsEl.innerHTML = '<div class="guide__step is-active">' + h + '</div>';
    }

    stepsEl.addEventListener('click', function (e) {
      var opt = e.target.closest('.guide__opt');
      if (opt) {
        if (opt.dataset.r) { renderResult(opt.dataset.r); }
        else { stack.push(opt.dataset.go); renderNode(); }
        return;
      }
      if (e.target.closest('[data-back]')) {
        if (stack.length > 1) stack.pop();
        renderNode();
        return;
      }
      if (e.target.closest('[data-restart]')) {
        stack = ['start'];
        renderNode();
      }
    });

    renderNode();
  }

  /* ---------- ano no rodapé ---------- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
