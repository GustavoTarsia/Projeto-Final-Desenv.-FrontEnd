(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function (){
    const THEME_KEY = 'modoEscuro';

    const themeToggleButtons = document.querySelectorAll('#toggle-dark');

    function applySavedTheme(){
      const saved = localStorage.getItem(THEME_KEY);
      const isDark = saved === 'true';
      if (isDark){
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      themeToggleButtons.forEach(btn => btn.setAttribute('aria-pressed', isDark ? 'true' : 'false'));
    }

    function toggleTheme(){
      const isNowDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem(THEME_KEY, isNowDark ? 'true' : 'false');
      themeToggleButtons.forEach(btn => btn.setAttribute('aria-pressed', isNowDark ? 'true' : 'false'));
    }

    applySavedTheme();

    if (themeToggleButtons && themeToggleButtons.length){
      themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
        btn.addEventListener('keydown', function (e){
          if (e.key === 'Enter' || e.key === ' '){
            e.preventDefault();
            btn.click();
          }
        });
      });
    }

    const quizForm = document.getElementById('quizForm');
    if (quizForm){
      quizForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const radioInputs = quizForm.querySelectorAll('input[type="radio"]');
        const questionNames = new Set();
        radioInputs.forEach(r => questionNames.add(r.name));

        let total = questionNames.size;
        let pontos = 0;

        questionNames.forEach(name => {
          const checked = quizForm.querySelector(`input[name="${name}"]:checked`);
          if (checked && checked.value === 'certa') pontos += 1;
        });

        const resultadoEl = document.getElementById('resultado');
        if (resultadoEl){
          resultadoEl.textContent = `Você acertou ${pontos} de ${total} pergunta(s)!`;
          resultadoEl.setAttribute('role', 'status');
          resultadoEl.setAttribute('aria-live', 'polite');
          resultadoEl.focus();
        } else{
          alert(`Você acertou ${pontos} de ${total} pergunta(s)!`);
        }
      });

      document.addEventListener('keydown', function (ev){
        const active = document.activeElement;
        const tag = active && active.tagName ? active.tagName.toLowerCase() : '';
        if (tag === 'input' || tag === 'textarea' || active.isContentEditable) return;

        if (ev.key.toLowerCase() === 'n'){
          const nextBtn = document.getElementById('nextBtn');
          if (nextBtn) nextBtn.click();
        } else if (ev.key.toLowerCase() === 'p'){
          const prevBtn = document.getElementById('prevBtn');
          if (prevBtn) prevBtn.click();
        } else if (ev.key.toLowerCase() === 's'){
          const submitBtn = quizForm.querySelector('button[type="submit"], input[type="submit"]');
          if (submitBtn) submitBtn.click();
        }
      }, false);
    }

    const contatoForm = document.getElementById('contatoForm');
    if (contatoForm){
      contatoForm.addEventListener('submit', function (e){
        e.preventDefault();

        if (!contatoForm.checkValidity()){
          contatoForm.classList.add('was-validated');
          const firstInvalid = contatoForm.querySelector(':invalid');
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        const nome = contatoForm.querySelector('#nome') ? contatoForm.querySelector('#nome').value.trim() : '';
        const email = contatoForm.querySelector('#email') ? contatoForm.querySelector('#email').value.trim() : '';
        const mensagemEl = contatoForm.querySelector('#mensagem') || contatoForm.querySelector('#mensagem') || contatoForm.querySelector('#message');
        const mensagem = mensagemEl ? mensagemEl.value.trim() : '';

        const confirmEl = document.getElementById('msgConfirmacao') || document.getElementById('msgConfirmacao') || document.createElement('div');
        if (nome && email && mensagem){
          confirmEl.textContent = 'Mensagem enviada com sucesso! Obrigado.';
          confirmEl.classList.remove('text-danger');
          confirmEl.classList.add('text-success');
          confirmEl.setAttribute('role', 'status');
          confirmEl.setAttribute('aria-live', 'polite');

          if (!document.getElementById('msgConfirmacao')){
            confirmEl.id = 'msgConfirmacao';
            contatoForm.appendChild(confirmEl);
          }

          contatoForm.reset();
          contatoForm.classList.remove('was-validated');
          confirmEl.focus();
        } else{
          confirmEl.textContent = 'Por favor, preencha todos os campos.';
          confirmEl.classList.remove('text-success');
          confirmEl.classList.add('text-danger');
          if (!document.getElementById('msgConfirmacao')){
            confirmEl.id = 'msgConfirmacao';
            contatoForm.appendChild(confirmEl);
          }
          confirmEl.setAttribute('role', 'alert');
          confirmEl.focus();
        }
      }, false);
    }
  });
})();

const FONT_KEY = 'fontSize';
let currentFont = parseFloat(localStorage.getItem(FONT_KEY)) || 16;

function applyFontSize(){
  document.documentElement.style.fontSize = currentFont + 'px';
}

function increaseFont(){
  if (currentFont < 22){
    currentFont += 1;
    localStorage.setItem(FONT_KEY, currentFont);
    applyFontSize();
  }
}

function decreaseFont(){
  if (currentFont > 12){
    currentFont -= 1;
    localStorage.setItem(FONT_KEY, currentFont);
    applyFontSize();
  }
}

applyFontSize();

const increaseBtn = document.getElementById('increase-font');
const decreaseBtn = document.getElementById('decrease-font');

if (increaseBtn) increaseBtn.addEventListener('click', increaseFont);
if (decreaseBtn) decreaseBtn.addEventListener('click', decreaseFont);