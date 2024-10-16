// Mengambil nama pengguna GitHub
const githubUsername = "adityabagast";

// Cek dan ambil profil GitHub dari localStorage
const cachedProfile = JSON.parse(localStorage.getItem('githubProfile'));
if (cachedProfile) {
    displayProfile(cachedProfile);
} else {
    // Mengambil profil GitHub
    fetch(`https://api.github.com/users/${githubUsername}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Simpan profil di localStorage
        localStorage.setItem('githubProfile', JSON.stringify(data));
        displayProfile(data);
    })
    .catch(error => {
        console.error('Error fetching GitHub profile:', error);
    });
}

// Fungsi untuk menampilkan profil GitHub
function displayProfile(data) {
    const profilePic = document.getElementById('github-profile-pic');
    profilePic.src = data.avatar_url;
    profilePic.style.display = 'block';
}

// Cek dan ambil data repositori dari localStorage
const cachedRepos = JSON.parse(localStorage.getItem('githubRepos'));
if (cachedRepos) {
    displayRepos(cachedRepos);
} else {
    // Mengambil data repositori dari GitHub
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(repos => {
        // Simpan repositori di localStorage
        localStorage.setItem('githubRepos', JSON.stringify(repos));
        displayRepos(repos);
    })
    .catch(error => {
        console.error('Error fetching GitHub repos:', error);
    });
}

// Fungsi untuk menampilkan repositori dan tingkat bahasa
function displayRepos(repos) {
    const languageCounts = {};
    
    repos.forEach(repo => {
        if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        }
    });

    const languageLevelsContainer = document.getElementById('language-levels-container');
    languageLevelsContainer.innerHTML = ''; // Kosongkan kontainer sebelum menambahkan

    for (const [language, count] of Object.entries(languageCounts)) {
        const percentage = (count / repos.length) * 100;
        const languageDiv = document.createElement('div');
        languageDiv.classList.add('language-level');

        languageDiv.innerHTML = `
            <span class="language-label">${language}</span>
            <div class="language-bar-container">
                <div class="language-bar" style="width: ${percentage}%; background-color: #3178c6;"></div>
            </div>
            <span class="language-percentage">${percentage.toFixed(2)}%</span>
        `;
        languageLevelsContainer.appendChild(languageDiv);
    }
}

// Menangani pengiriman form kontak
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman form

    // Mengambil data dari form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Melakukan aksi seperti mengirim email atau menyimpan data di server
    console.log('Form submitted:', { name, email, message });
    
    // Reset form
    document.getElementById('contact-form').reset();
});

// Menangani tampilan sidebar untuk layar kecil
const sidebar = document.querySelector('.sidebar');
const hamburgerMenu = document.querySelector('.hamburger-menu');

hamburgerMenu.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Menutup sidebar setelah klik pada link
const sidebarLinks = document.querySelectorAll('.sidebar nav ul li a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
});