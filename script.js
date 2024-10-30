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

    // تحقق مما إذا كان هناك رمز (code) في URL بعد تسجيل الدخول
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        // هنا يمكنك إجراء طلب إلى Discord API للحصول على معلومات المستخدم
        fetch(`YOUR_REDIRECT_URI?code=${code}`)
            .then(response => response.json())
            .then(data => {
                // إخفاء الرسالة وعرض الأزرار
                loginMessage.style.display = 'none';
                buttons.style.display = 'block'; // إظهار الأزرار

                // إضافة صورة الحساب
                const avatarUrl = data.avatar ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png` : '';
                document.body.innerHTML += `<img src="${avatarUrl}" alt="User Avatar" class="user-avatar">`;
            })
            .catch(err => console.error('Error fetching user data:', err));
    }
});
