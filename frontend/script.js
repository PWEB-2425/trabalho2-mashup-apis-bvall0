const apiBase = ''; // Assumindo que backend está na mesma origem

// Helper para mostrar mensagem
function showMessage(msg) {
  const p = document.getElementById('message');
  if (p) p.textContent = msg;
}

// Registo
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();
      if (res.ok) {
        showMessage('Registado com sucesso! Vai para login.');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      } else {
        showMessage(text);
      }
    } catch (err) {
      showMessage('Erro no registo');
    }
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();
      if (res.ok) {
        showMessage('Login efetuado! A redirecionar...');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } else {
        showMessage(text);
      }
    } catch (err) {
      showMessage('Erro no login');
    }
  });
}

// Pesquisa
const searchForm = document.getElementById('searchForm');
if (searchForm) {
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const term = document.getElementById('term').value.trim();
    const resultsEl = document.getElementById('results');
    resultsEl.textContent = 'A pesquisar...';

    try {
      const res = await fetch('/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term }),
      });

      if (res.ok) {
        const data = await res.json();
        resultsEl.textContent = JSON.stringify(data, null, 2);
      } else if (res.status === 401) {
        resultsEl.textContent = 'Não autenticado. Faça login.';
        setTimeout(() => window.location.href = 'login.html', 1500);
      } else {
        const text = await res.text();
        resultsEl.textContent = `Erro: ${text}`;
      }
    } catch (err) {
      resultsEl.textContent = 'Erro na pesquisa';
    }
  });
}

// Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/logout');
      if (res.ok) {
        window.location.href = 'login.html';
      } else {
        alert('Erro ao fazer logout');
      }
    } catch {
      alert('Erro ao fazer logout');
    }
  });
}