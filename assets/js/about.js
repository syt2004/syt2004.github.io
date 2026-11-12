(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;
  const biography = document.querySelector('.biography');
  const showAll = document.querySelector('.show-all');
  const walker = document.createTreeWalker(biography, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const letters = [];
  // Keep the original markup, links and full text accessible, reserving line layout.
  for (const node of nodes) {
    if (!node.textContent.trim()) continue;
    const fragment = document.createDocumentFragment();
    for (const character of node.textContent) {
      const span = document.createElement('span');
      span.className = 'typing-character';
      span.textContent = character;
      fragment.append(span);
      letters.push(span);
    }
    node.replaceWith(fragment);
  }
  let frame;
  let count = 0;
  let started;
  let done = false;
  showAll.hidden = false;
  const finish = () => {
    done = true;
    cancelAnimationFrame(frame);
    for (const span of letters) span.replaceWith(document.createTextNode(span.textContent));
    biography.normalize();
    showAll.hidden = true;
  };
  const tick = time => {
    if (done) return;
    if (started === undefined) started = time + 750;
    const target = Math.min(letters.length, Math.max(0, Math.floor((time - started) * .095)));
    if (count) letters[count - 1].classList.remove('current');
    while (count < target) letters[count++].classList.add('shown');
    if (count) letters[count - 1].classList.add('current');
    if (count === letters.length) finish();
    else frame = requestAnimationFrame(tick);
  };
  showAll.addEventListener('click', finish);
  reduced.addEventListener('change', () => { if (reduced.matches && !done) finish(); });
  frame = requestAnimationFrame(tick);
})();
