// CONFIGURAÇÃO DO GOOGLE
const GOOGLE_CLIENT_ID = 'SEU_CLIENT_ID_AQUI.apps.googleusercontent.com';
        
// CONFIGURAÇÃO DO FACEBOOK
const FACEBOOK_APP_ID = 'SEU_FACEBOOK_APP_ID_AQUI';

let currentUser = null;

// Usuários de exemplo (substitua por autenticação real no backend)
const users = [
    { username: 'admin', email: 'admin@example.com', password: 'admin123' },
    { username: 'user', email: 'user@example.com', password: 'user123' },
    { username: 'teste', email: 'teste@example.com', password: '123456' }
];

// Inicializa quando a página carregar
window.onload = function() {
    initializeGoogleSignIn();
    initializeFacebookSDK();
    checkSavedUser();
};

// Verifica se há usuário salvo
function checkSavedUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showUserInfo(currentUser);
    }
}

// ========== GOOGLE LOGIN ==========
function initializeGoogleSignIn() {
    if (window.google) {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
        });
    }
}

document.getElementById('googleLoginBtn').addEventListener('click', function() {
    if (!window.google) {
        showError('Erro ao carregar o Google Sign-In. Verifique sua conexão.');
        return;
    }

    google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            googleAlternativeLogin();
        }
    });
});

function googleAlternativeLogin() {
    const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        callback: async (response) => {
            if (response.access_token) {
                await getUserInfo(response.access_token);
            }
        },
    });
    client.requestAccessToken();
}

async function getUserInfo(accessToken) {
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        
        const userData = await response.json();
        
        currentUser = {
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
            id: userData.id,
            provider: 'google'
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showSuccess('Login com Google realizado com sucesso!');
        setTimeout(() => showUserInfo(currentUser), 1000);
    } catch (error) {
        showError('Erro ao buscar informações do usuário');
    }
}

function handleGoogleResponse(response) {
    try {
        const userData = parseJwt(response.credential);
        
        currentUser = {
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
            id: userData.sub,
            provider: 'google'
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showSuccess('Login com Google realizado com sucesso!');
        setTimeout(() => showUserInfo(currentUser), 1000);
    } catch (error) {
        showError('Erro ao processar resposta do Google');
    }
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// ========== FACEBOOK LOGIN ==========
function initializeFacebookSDK() {
    window.fbAsyncInit = function() {
        FB.init({
            appId: FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v18.0'
        });
    };

    // Carrega o SDK do Facebook
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/pt_BR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

document.getElementById('facebookLoginBtn').addEventListener('click', function() {
    if (typeof FB === 'undefined') {
        showError('SDK do Facebook não carregado. Verifique sua conexão.');
        return;
    }

    FB.login(function(response) {
        if (response.authResponse) {
            getFacebookUserInfo();
        } else {
            showError('Login com Facebook cancelado');
        }
    }, {scope: 'public_profile,email'});
});

function getFacebookUserInfo() {
    FB.api('/me', {fields: 'name,email,picture.width(200).height(200)'}, function(response) {
        currentUser = {
            name: response.name,
            email: response.email || 'Email não disponível',
            picture: response.picture.data.url,
            id: response.id,
            provider: 'facebook'
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showSuccess('Login com Facebook realizado com sucesso!');
        setTimeout(() => showUserInfo(currentUser), 1000);
    });
}

// ========== LOGIN TRADICIONAL ==========
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showError('Por favor, preencha todos os campos');
        return;
    }

    // Verifica credenciais
    const user = users.find(u => 
        (u.username === username || u.email === username) && u.password === password
    );

    if (user) {
        currentUser = {
            name: user.username,
            email: user.email,
            picture: 'https://ui-avatars.com/api/?name=' + user.username + '&background=2c5f7c&color=fff&size=200',
            id: user.username,
            provider: 'local'
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showSuccess('Login realizado com sucesso!');
        setTimeout(() => showUserInfo(currentUser), 1000);
    } else {
        showError('Usuário ou senha incorretos');
    }
});

// ========== FUNÇÕES DE UI ==========
function showUserInfo(user) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userPhoto').src = user.picture;
    hideMessages();
}

function logout() {
    if (currentUser && currentUser.provider === 'google' && window.google) {
        google.accounts.id.disableAutoSelect();
    }
    
    if (currentUser && currentUser.provider === 'facebook' && typeof FB !== 'undefined') {
        FB.logout();
    }
    
    localStorage.removeItem('currentUser');
    currentUser = null;
    
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    showSuccess('Logout realizado com sucesso!');
    setTimeout(hideMessages, 3000);
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    setTimeout(hideMessages, 5000);
}

function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
}

function hideMessages() {
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}

function goBack() {
    window.history.back();
}