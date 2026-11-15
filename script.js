const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const cityButtons = [...document.querySelectorAll('.city-tab')];
const outletCards = [...document.querySelectorAll('.outlet-card')];
const searchInput = document.querySelector('#outlet-search');
let activeCity = 'all';
function filterOutlets() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  let visible = 0;
  outletCards.forEach(card => {
    const cityMatch = activeCity === 'all' || card.dataset.city === activeCity;
    const searchMatch = !query || `${card.dataset.name} ${card.textContent}`.toLowerCase().includes(query);
    const show = cityMatch && searchMatch;
    card.hidden = !show;
    if (show) visible++;
  });
  document.querySelector('#no-results').hidden = visible !== 0;
}
cityButtons.forEach(button => button.addEventListener('click', () => {
  activeCity = button.dataset.city;
  cityButtons.forEach(item => item.classList.toggle('active', item === button));
  filterOutlets();
}));
searchInput?.addEventListener('input', filterOutlets);

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#enquiry-form')?.addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('#form-feedback').textContent = 'Thanks — this is a concept demonstration. Connect the approved brand contact or CRM to receive live enquiries.';
});
