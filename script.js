const input = document.getElementById('username');
const btn = document.getElementById('searchBtn');
const result = document.getElementById('result');

// Función principal de búsqueda
async function buscarUsuario() {
  const username = input.value.trim();
  
  if (!username) {
    mostrarError('⚠️ Por favor escribe un nombre de usuario');
    return;
  }

  mostrarLoading();

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error('Usuario no encontrado');
    }

    const data = await response.json();
    mostrarPerfil(data);

  } catch (error) {
    mostrarError(`❌ ${error.message}`);
  }
}

// Estado: cargando
function mostrarLoading() {
  result.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      Buscando perfil...
    </div>
  `;
}

// Estado: error
function mostrarError(mensaje) {
  result.innerHTML = `<div class="error">${mensaje}</div>`;
}

// Estado: mostrar perfil
function mostrarPerfil(user) {
  result.innerHTML = `
    <div class="card">
      <img src="${user.avatar_url}" alt="${user.login}">
      <h2>${user.name || user.login}</h2>
      <p style="color:#764ba2;">@${user.login}</p>
      <p class="bio">${user.bio || 'Sin biografía disponible'}</p>
      
      <div class="stats">
        <div class="stat">
          <span class="num">${user.public_repos}</span>
          <span class="label">Repos</span>
        </div>
        <div class="stat">
          <span class="num">${user.followers}</span>
          <span class="label">Seguidores</span>
        </div>
        <div class="stat">
          <span class="num">${user.following}</span>
          <span class="label">Siguiendo</span>
        </div>
      </div>
    </div>
  `;
}

// Eventos
btn.addEventListener('click', buscarUsuario);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') buscarUsuario();
});
