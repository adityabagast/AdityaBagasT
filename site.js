require('dotenv').config(); // Tambahkan ini di bagian paling atas
// Token dan nama pengguna GitHub
const githubUsername = "adityabagast";
const token = process.env.GITHUB_TOKEN; // Ambil token dari variabel lingkungan

// Mengambil profil GitHub
fetch(`https://api.github.com/users/${githubUsername}`, {
    headers: {
        'Authorization': `token ${token}`
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    const profilePic = document.getElementById('github-profile-pic');
    profilePic.src = data.avatar_url;
    profilePic.style.display = 'block';
})
.catch(error => {
    console.error('Error fetching GitHub profile:', error);
});

// Mengambil data repositori dari GitHub
fetch(`https://api.github.com/users/${githubUsername}/repos`, {
    headers: {
        'Authorization': `token ${token}`
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response.json();
})
.then(repos => {
    const languageCounts = {};
    
    repos.forEach(repo => {
        if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        }
    });

    const languageLevelsContainer = document.getElementById('language-levels-container');
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
})
.catch(error => {
    console.error('Error fetching GitHub repos:', error);
});

const links = document.querySelectorAll('.sidebar nav ul li a');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});