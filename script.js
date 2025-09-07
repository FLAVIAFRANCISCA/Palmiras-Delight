// === IMAGE SLIDESHOW LOGIC FOR DELICACIES ===
document.querySelectorAll('.card').forEach(card => {
  const imgs = card.querySelectorAll('img');
  let idx = 0;
  if (!imgs.length) return;
  imgs[idx].classList.add('active');

  setInterval(() => {
    imgs[idx].classList.remove('active');
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add('active');
  }, 3000);

  card.addEventListener('click', () => {
    const type = card.dataset.type;
    const products = card.dataset.products?.split(',') || [];
    const list = document.getElementById('modal-content-list');
    list.innerHTML = '';
    products.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.trim();
      list.appendChild(li);
    });

    const title = type.charAt(0).toUpperCase() + type.slice(1);
    document.getElementById('modal-title').textContent = `${title} Menu`;
    const modal = document.getElementById('product-modal');
    const content = modal.querySelector('.modal-content');
    modal.style.display = 'flex';
    content.style.animation = 'flipIn 0.4s ease forwards';
  });
});

// === CLOSE MODAL FUNCTION ===
function closeProductModal() {
  const modal = document.getElementById('product-modal');
  const content = modal.querySelector('.modal-content');
  content.style.animation = 'flipOut 0.4s ease forwards';
  setTimeout(() => {
    modal.style.display = 'none';
    content.style.animation = '';
  }, 400);
}

// === GALLERY DYNAMIC IMAGES & MODAL PREVIEW ===
const gallery = document.querySelector('.insta-gallery');

const galleryImages = [
  { src: 'images/cake1.jpg', label: 'Birthday Cake' },
  { src: 'images/cake2.jpg', label: 'Sweet 16' },
  { src: 'images/cake3.jpg', label: 'Welcome Baby Cake' },
  { src: 'images/bentobox.jpg', label: 'Heart Cake & Cupcakes' },
  { src: 'images/cupcake1.jpg', label: 'Blue Ombre Cake' },
  { src: 'images/samosas1.jpg', label: 'Truffle Temptation' },
  { src: 'images/cake4.jpg', label: 'Confetti Charm' },
  { src: 'images/cake5.jpg', label: 'Berry Crepe Love' },
  { src: 'images/cake6.jpg', label: 'Confetti Charm' },
  { src: 'images/bentobox2.jpg', label: 'Berry Crepe Love' },
  { src: 'images/cupcake2.jpg', label: 'Confetti Charm' },
  { src: 'images/samosas2.jpg', label: 'Berry Crepe Love' },
  { src: 'images/cake7.jpg', label: 'Confetti Charm' },
  { src: 'images/cake8.jpg', label: 'Berry Crepe Love' },
  { src: 'images/cake9.jpg', label: 'Confetti Charm' },
  { src: 'images/hero1.jpg', label: 'Berry Crepe Love' },
  { src: 'images/cupcake3.jpg', label: 'Confetti Charm' },
  { src: 'images/hero2.jpg', label: 'Berry Crepe Love' },
  { src: 'images/cake10.jpg', label: 'Confetti Charm' },
  { src: 'images/cake11.jpg', label: 'Berry Crepe Love' },
  { src: 'images/cake12.jpg', label: 'Confetti Charm' },
  { src: 'images/cake13.jpg', label: 'Berry Crepe Love' },
  { src: 'images/cake14.jpg', label: 'Confetti Charm' },
  { src: 'images/cake15.jpg', label: 'Berry Crepe Love' },
  { src: 'images/cake16.jpg', label: 'Confetti Charm' },
  { src: 'images/cake17.jpg', label: 'Berry Crepe Love' },
  { src: 'images/cake18.jpg', label: 'Confetti Charm' },
  { src: 'images/cake19.jpg', label: 'Berry Crepe Love' }
];

galleryImages.forEach(imgObj => {
  const post = document.createElement('div');
  post.classList.add('insta-post');

  const img = document.createElement('img');
  img.src = imgObj.src;
  img.alt = imgObj.label;

  const overlay = document.createElement('div');
  overlay.classList.add('insta-icons');
  overlay.innerHTML = `❤️`;

  post.appendChild(img);
  post.appendChild(overlay);
  gallery.appendChild(post);

  post.addEventListener('click', () => {
    const modal = document.getElementById('product-modal');
    const title = document.getElementById('modal-title');
    const list = document.getElementById('modal-content-list');

    title.textContent = imgObj.label;
    list.innerHTML = `<li style="list-style:none;"><img src="${imgObj.src}" style="max-width:100%; border-radius:12px;"></li>`;

    modal.style.display = 'flex';
    modal.querySelector('.modal-content').style.animation = 'flipIn 0.4s ease forwards';
  });
});

// === HAMBURGER MENU TOGGLE ===
const hamburger = document.querySelector('.hamburger');
const dropdownMenu = document.querySelector('.dropdown-menu');
const menuLinks = document.querySelectorAll('.dropdown-menu a');

hamburger.addEventListener('click', () => {
  dropdownMenu.style.display = 
    dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Close dropdown when a menu item is clicked
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    dropdownMenu.style.display = 'none';
  });
});

const orderForm = document.querySelector('form');

function closeThankYouModal() {
  document.getElementById('thank-you-modal').style.display = 'none';
}

orderForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Show the modal
  document.getElementById('thank-you-modal').style.display = 'flex';

 // Fire confetti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Reset the form
  orderForm.reset();
});

// === RESTRICT DATE INPUT TO TODAY AND 1 YEAR AHEAD ===
const orderDate = document.getElementById('order-date');
if (orderDate) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;

  const oneYearLater = new Date(today.getTime()); // clone today
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  const maxDate = oneYearLater.toISOString().split('T')[0];

  orderDate.min = minDate;
  orderDate.max = maxDate;
}

