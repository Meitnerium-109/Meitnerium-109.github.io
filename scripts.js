document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector('.gallery-slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;

  function updateGallery() {
    gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateGallery();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateGallery();
  });

  setInterval(() => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateGallery();
  }, 5000);

  function analyzeText() {
    const text = document.getElementById("inputText").value;
    const output = document.getElementById("output");

    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = (text.match(/\b\w+\b/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const symbols = (text.match(/[^\w\s]/g) || []).length;

    const pronouns = ['he', 'she', 'it', 'they', 'we', 'i', 'you', 'him', 'her', 'us', 'them', 'me'];
    const prepositions = ['in', 'on', 'at', 'by', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below'];
    const articles = ['a', 'an'];

    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

    const formatGroup = (label, words) => {
      let result = `${label}:\n`;
      for (let word of words) {
        const count = tokens.filter(t => t === word).length;
        if (count > 0) result += `  ${word}: ${count}\n`;
      }
      return result;
    };

    let result = '';
    result += `Letters: ${letters}\n`;
    result += `Words: ${words}\n`;
    result += `Spaces: ${spaces}\n`;
    result += `Newlines: ${newlines}\n`;
    result += `Special Symbols: ${symbols}\n\n`;
    result += formatGroup('Pronouns', pronouns);
    result += '\n' + formatGroup('Prepositions', prepositions);
    result += '\n' + formatGroup('Indefinite Articles', articles);

    output.textContent = result;
  }

  document.querySelector('.analyze-btn').addEventListener('click', analyzeText);

  // -------------------------------
  // USER INTERACTION TRACKING LOGIC
  // -------------------------------

  // Function to get object type
  function getObjectType(target) {
    const tag = target.tagName.toLowerCase();
    const type = target.getAttribute('type');
    const role = target.getAttribute('role');
    const aria = target.getAttribute('aria-label');
    const classList = [...target.classList];

    if (tag === 'img') return 'image';
    if (tag === 'textarea' || tag === 'input') return 'text input';
    if (tag === 'button') return 'button';
    if (tag === 'a') return 'link';
    if (tag === 'select') return 'drop-down';
    if (classList.includes('slide')) return 'image slide';
    if (target.classList.contains('nav-btn')) return 'gallery nav button';
    if (aria) return `aria-${aria}`;
    if (role) return `role-${role}`;
    return `${tag} element`;
  }

  // Click event logger
  document.addEventListener('click', (e) => {
    const timestamp = new Date().toLocaleString();
    const objectType = getObjectType(e.target);
    console.log(`${timestamp}, click, ${objectType}`);
  });

  // Page view logger
  const timestamp = new Date().toLocaleString();
  console.log(`${timestamp}, view, entire page`);
});
