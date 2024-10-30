// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const loginMessage = document.getElementById('login-message');
    const buttons = document.getElementById('buttons');
    const loginButton = document.getElementById('login-button');

    // تحقق مما إذا كان هناك رمز (code) في URL بعد تسجيل الدخول
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        // طلب للحصول على توكن المستخدم
        fetch(`https://discord.com/api/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'client_id': '1299718078866784306', // استبدل بـ client ID الخاص بك
                'client_secret': 'Hco5iMBTxqALA0avWCr5AQJAlSDq-MqD', // استبدل بـ client secret الخاص بك
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': 'https://redmicar.github.io/Vera-Dashboard/' // استبدل بـ redirect URI الخاص بك
            })
        })
        .then(response => response.json())
        .then(data => {
            // طلب للحصول على معلومات المستخدم
            return fetch('https://discord.com/api/users/@me', {
                headers: {
                    'Authorization': `Bearer ${data.access_token}`
                }
            });
        })
        .then(response => response.json())
        .then(userData => {
            // إخفاء الرسالة وعرض الأزرار
            loginMessage.style.display = 'none';
            buttons.style.display = 'block'; // إظهار الأزرار

            // إخفاء زر تسجيل الدخول
            loginButton.style.display = 'none';

            // إضافة صورة الحساب
            const avatarUrl = userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : '';
            document.body.innerHTML += `<img src="${avatarUrl}" alt="User Avatar" class="user-avatar">`;
        })
        .catch(err => console.error('Error fetching user data:', err));
    }
});
