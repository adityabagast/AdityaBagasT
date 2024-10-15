// site.js

// Mengatur efek scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mengambil data profil GitHub
fetch('https://api.github.com/users/adityabagast') // Ganti dengan username GitHub kamu
    .then(response => response.json())
    .then(data => {
        const profilePic = document.getElementById('github-profile-pic');
        profilePic.src = data.avatar_url; // Mengatur src gambar dengan URL foto profil
        profilePic.style.display = 'block'; // Menampilkan gambar
    })
    .catch(error => {
        console.error('Error fetching GitHub profile:', error);
    });
