// ==========================================
// 1. NAVEGACIÓN Y MENÚ RESPONSIVO
// ==========================================
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');

// Alternar menú desplegable
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  navigation.classList.toggle('open', open);
});

// Cerrar menú al hacer clic en un enlace
navigation.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    navigation.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Cerrar menú al presionar la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navigation.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// ==========================================
// 2. PIE DE PÁGINA Y NAVEGACIÓN ACTIVA
// ==========================================
// Actualizar el año dinámicamente en el footer
document.querySelector('#year').textContent = new Date().getFullYear();

// Marcar la página actual en la navegación
const currentPage = location.pathname.endsWith('sobre-nosotros.html')
  ? 'sobre-nosotros.html'
  : 'index.html';

document.querySelectorAll('nav a').forEach((a) => {
  if (a.getAttribute('href') === currentPage) {
    a.setAttribute('aria-current', 'page');
  }
});

// ==========================================
// 3. CARRUSEL / HERO SLIDER
// ==========================================
const slides = [
  {
    eyebrow: 'NATURALEZA QUE ACOMPAÑA',
    title: 'Una pausa para ti.<br>Un momento para <em>florecer.</em>',
    copy: 'Velas, jabones y sales de baño hechos a mano, para encontrar bienestar en los pequeños momentos.',
    link: '#productos',
    label: 'Descubre nuestros productos',
    image: 'assets/hero.png',
    alt: 'Velas y jabones artesanales entre flores y lino'
  },
  {
    eyebrow: 'CALIDEZ PARA TUS MOMENTOS',
    title: 'Enciende la calma.<br>Disfruta lo <em>simple.</em>',
    copy: 'Descubre nuestras velas artesanales y encuentra el aroma que acompañará tu próxima pausa.',
    link: '#productos',
    label: 'Explora nuestras velas',
    image: 'assets/velas.jpg',
    alt: 'Velas artesanales encendidas con pétalos de rosa'
  },
  {
    eyebrow: 'EL DETALLE DE LO HECHO A MANO',
    title: 'Regala un instante.<br>Comparte <em>bienestar.</em>',
    copy: 'Jabones y sales de baño para llenar la rutina de aromas, texturas y pequeños detalles.',
    link: '#productos',
    label: 'Encuentra tu próximo ritual',
    image: 'assets/jabones.jpg',
    alt: 'Jabones artesanales de inspiración botánica'
  }
];

if (document.querySelector('.hero')) {
  let active = 0;
  let timer = null;
  let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const dots = [...document.querySelectorAll('.dots button')];
  const pause = document.querySelector('#pause');

  function show(i) {
    active = (i + slides.length) % slides.length;
    const s = slides[active];

    document.querySelector('#hero-eyebrow').textContent = s.eyebrow;
    document.querySelector('#hero-title').innerHTML = s.title;
    document.querySelector('#hero-copy').textContent = s.copy;

    const link = document.querySelector('#hero-link');
    link.href = s.link;
    link.innerHTML = s.label + ' <span>↗</span>';

    const img = document.querySelector('.hero-image');
    img.src = s.image;
    img.alt = s.alt;

    dots.forEach((d, j) => d.setAttribute('aria-current', String(j === active)));
    document.querySelector('#slide-number').textContent = `0${active + 1} / 03`;
  }

  function start() {
    clearInterval(timer);
    if (!paused) {
      timer = setInterval(() => show(active + 1), 6500);
    }
    pause.textContent = paused ? '▷' : 'Ⅱ';
    pause.setAttribute('aria-label', paused ? 'Reanudar carrusel' : 'Pausar carrusel');
  }

  // Event Listeners de Controles
  dots.forEach((d, i) =>
    d.addEventListener('click', () => {
      show(i);
      start();
    })
  );

  document.querySelector('#previous').addEventListener('click', () => {
    show(active - 1);
    start();
  });

  document.querySelector('#next').addEventListener('click', () => {
    show(active + 1);
    start();
  });

  pause.addEventListener('click', () => {
    paused = !paused;
    start();
  });

  // Pausar al enfocar elementos del carrusel o cambiar de pestaña
  document.querySelector('.hero').addEventListener('focusin', () => clearInterval(timer));
  document.querySelector('.hero').addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () =>
    document.hidden ? clearInterval(timer) : start()
  );

  start();
}

// ==========================================
// 4. FORMULARIO DE CONTACTO (WHATSAPP)
// ==========================================
const form = document.querySelector('#contact-form');

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.elements.name.value.trim();
  if (!name) {
    form.elements.name.focus();
    return;
  }

  const text = `Hola, soy ${name}. Me interesa: ${form.elements.interest.value}. ${form.elements.message.value.trim()}`;
  window.open(
    'https://wa.me/56930549400?text=' + encodeURIComponent(text),
    '_blank',
    'noopener,noreferrer'
  );
});

// ==========================================
// 5. LIGHTBOX / GALERÍA
// ==========================================
const lightbox = document.querySelector('#lightbox');

document.querySelectorAll('[data-image]').forEach((button) =>
  button.addEventListener('click', () => {
    const img = lightbox.querySelector('img');
    img.src = button.dataset.image;
    img.alt = button.querySelector('img').alt;
    lightbox.showModal();
  })
);

document.querySelector('#close-lightbox')?.addEventListener('click', () => lightbox.close());

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.close();
  }
});