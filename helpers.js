export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function getFunName() {
  const verbs = ['kicks', 'pushes', 'frames', 'convinces', 'hates', 'stabs', 'calls', 'wonders-about', 'looks-like', 'upper-cuts', 'killed', 'ruined'];

  const nouns = ['flash', 'batman', 'superman', 'thor', 'wonder-woman', 'spiderman', 'captain-america', 'silver-surfer', 'invisible-woman', 'wolverine', 'cyclops', 'iron-man', 'super-girl'];

  return `${rando(nouns)}-${rando(verbs)}-${rando(nouns)}`;
}
