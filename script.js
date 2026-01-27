const domains = {
    'Python': {
        color: '#ff6384',
        projects: [
            { id: 'py-1', title: 'Sentiment Analysis', desc: 'NLP project.', content: 'Detailed analysis of sentiment using transformers...' },
            { id: 'py-2', title: 'Object Detection', desc: 'CV project.', content: 'Real-time detection using YOLOv8...' },
            { id: 'py-3', title: 'Generative Art', desc: 'GANs project.', content: 'Creating synthetic imagery with GANs...' }
        ]
    },
    'C++': {
        color: '#08da35',
        projects: [
            { id: 'cpp-1', title: 'Sentiment Analysis', desc: 'NLP project.', content: 'Detailed analysis of sentiment using transformers...' },
            { id: 'cpp-2', title: 'Object Detection', desc: 'CV project.', content: 'Real-time detection using YOLOv8...' },
            { id: 'cpp-3', title: 'Generative Art', desc: 'GANs project.', content: 'Creating synthetic imagery with GANs...' }
        ]
    },
    'LaTeX': {
        color: '#fca903',
        projects: [
            { id: 'latex-1',
            title: 'CV code',
            desc: 'Wonder how I created my CV? Here\'s the code for you to download!',
            content: `
            <p> This LaTeX file was last updated in January 2026.</p>
            <h3> Visual preview </h3>
            <img src="assets/cv-preview.jpg" alt="CV Preview" class="project-img">
            <a href="assets/template.zip" class="download-btn">Download Source Code</a>
            ` },
        ]
    },
    'SQL': {
        color: '#36a2eb',
        projects: [
            { id: 'sql-1', title: 'Parallel Matrix Mult', desc: 'MPI/OpenMP project.', content: 'Optimization of matrix operations on clusters...' },
            { id: 'sql-2', title: 'Advection problem', desc: 'MPI Project', content: 'Solving fluid dynamics equations in parallel...' }
        ]
    }
};

const app = document.getElementById('app');

// --- VIEW CONTROLLERS ---

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    
    document.getElementById('theme-icon').innerText = targetTheme === 'dark' ? '☀️' : '🌙';
    
    localStorage.setItem('theme', targetTheme);
    
    if (document.getElementById('donutChart')) {
        showHome();
    }
}

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('theme-icon').innerText = savedTheme === 'dark' ? '☀️' : '🌙';

function showHome() {
    app.innerHTML = `
        <div class="chart-wrapper">
            <h2 style="text-align:center">Project Distribution</h2>
            <div class="chart-container">
                <canvas id="donutChart"></canvas>
            </div>
        </div>`;
    renderDonutChart();
}

function showDomainPage(domainName) {
    const domain = domains[domainName];
    
    // Wrapping everything in a viewport-container for alignment
    app.innerHTML = `
        <div class="viewport-container">
            <button class="back-btn" onclick="showHome()">← Back to Overview</button>
            <h1 style="border-left: 5px solid ${domain.color}; padding-left: 15px;">
                ${domainName} Projects
            </h1>
            <div class="project-grid">
                ${domain.projects.map(p => `
                    <div class="project-card" onclick="showProjectDetails('${domainName}', '${p.id}')">
                        <h3>${p.title}</h3>
                        <p>${p.desc}</p>
                        <span class="read-more">View Details →</span>
                    </div>
                `).join('')}
            </div>
        </div>`;
}

function showProjectDetails(domainName, projectId) {
    const project = domains[domainName].projects.find(p => p.id === projectId);
    
    app.innerHTML = `
        <div class="viewport-container">
            <button class="back-btn" onclick="showDomainPage('${domainName}')">← Back to ${domainName}</button>
            <article class="project-detail">
                <header>
                    <span class="category-tag" style="background: ${domains[domainName].color}">
                        ${domainName}
                    </span>
                    <h1>${project.title}</h1>
                </header>
                <div class="content-body">
                    ${project.content}
                </div>
            </article>
        </div>`;
}

function showContact() {
    app.innerHTML = `
        <div class="contact-container">
            <div class="contact-info">
                <h1>Contact Me</h1>
                <p><strong>Name:</strong> Dushyant Khatri</p>
                <p><strong>Location:</strong> Glasgow, Scotland</p>
                <p><strong>Email:</strong> dushyant.khatri@icloud.com</p>
                <p><strong>Phone:</strong> +44 759 653 6143</p>
            </div>
            <form action="https://formspree.io/f/xvzaywrz" method="POST">
                <div class="form-group">
                    <label>Your Name</label>
                    <input type="text" name="name" required placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label>Your Email</label>
                    <input type="email" name="_replyto" required placeholder="john@example.com">
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea name="message" rows="5" required placeholder="How can I help you?"></textarea>
                </div>
                <button type="submit" class="submit-btn">Send Message</button>
            </form>
        </div>`;
}

// --- ENGINE: CHART RENDERING ---

function renderDonutChart() {
    const ctx = document.getElementById('donutChart').getContext('2d');
    const labels = Object.keys(domains);
    const projectCounts = labels.map(key => domains[key].projects.length);
    const colors = labels.map(key => domains[key].color);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: projectCounts,
                backgroundColor: colors,
                borderWidth: 2,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((ctx.raw / total) * 100).toFixed(1);
                            return `${ctx.label}: ${ctx.raw} projects (${percentage}%)`;
                        }
                    }
                }
            },
            onClick: (evt, item, chart) => {
                if (item.length > 0) {
                    const index = item[0].index;
                    showDomainPage(chart.data.labels[index]);
                }
            }
        }
    });
}

// Initialise
window.onload = showHome;