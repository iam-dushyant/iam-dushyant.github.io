/**
 * DATA DEFINITIONS
 * Each project uses 'id' for routing and 'tags' for sub-chart filtering.
 */
const domains = {
    'Python': {
        color: '#ff6384',
        subSkills: {
            labels: ['NumPy', 'PyTorch', 'Pandas', 'AWS', 'Azure', 'GCP'],
            colors: ['#4c8cb5', '#ee4c2c', '#150458', '#FF9900', '#0089D6', '#4285F4']
        },
        projects: [
            { id: 'py-1', tags: ['NumPy'], title: 'Sentiment Analysis', desc: 'NLP project.', content: 'Detailed analysis of sentiment using transformers...' },
            { id: 'py-2', tags: ['AWS'], title: 'Object Detection', desc: 'CV project.', content: 'Real-time detection using YOLOv8...' },
            { id: 'py-3', tags: ['AWS'], title: 'Cloud Sentiment', desc: 'NLP on AWS.', content: 'Scaling transformer models using Lambda...' },
            { id: 'py-4', tags: ['Azure'], title: 'Azure Vision', desc: 'CV project.', content: 'Implementing Azure Cognitive Services...' },
            { id: 'py-5', tags: ['NumPy', 'Pandas', 'PyTorch'], title: 'Deep Learning Pipeline', desc: 'Full-stack AI.', content: 'Data processing with Pandas and training in PyTorch.' },
            { id: 'py-6', tags: ['AWS'], title: 'S3 Image Processor', desc: 'Cloud storage.', content: 'Automatic image tagging on upload.' },
        ]
    },
    'C++': {
        color: '#08da35',
        subSkills: {
            labels: ['HPC', 'Graphics', 'Quant', 'AWS', 'Azure', 'GCP'],
            colors: ['#4c8cb5', '#ee4c2c', '#150458', '#FF9900', '#0089D6', '#4285F4']
        },
        projects: [
            { id: 'cpp-1', tags: ['HPC'], title: 'Advection problem', desc: 'NLP project.', content: 'Detailed analysis of sentiment using transformers...' },
            { id: 'cpp-2', tags: ['HPC'], title: 'Navier Stokes equation', desc: 'CV project.', content: 'Real-time detection using YOLOv8...' },
            { id: 'cpp-3', tags: ['HPC'], title: 'Turbulent wave simulation', desc: 'NLP on AWS.', content: 'Scaling transformer models using Lambda...' },
            { id: 'cpp-4', tags: ['Graphics'], title: 'Ray tracing', desc: 'CV project.', content: 'Implementing Azure Cognitive Services...' },
            { id: 'cpp-5', tags: ['HPC', 'AWS'], title: 'Advection using AWS', desc: 'Full-stack AI.', content: 'Data processing with Pandas and training in PyTorch.' },
            { id: 'cpp-6', tags: ['AWS'], title: 'AWS', desc: 'Cloud storage.', content: 'Automatic image tagging on upload.' },
        ]
    },
    'LaTeX': {
        color: '#fca903',
        projects: [
            { 
                id: 'latex-1', 
                title: 'My CV', 
                desc: 'Wonder how my CV was created? Take a look 👀', 
                content: `
                    <p>This LaTeX file was last updated in January 2026.</p>
                    <h3>Visual preview</h3>
                    <img src="assets/cv-preview.jpg" alt="CV Preview" class="project-img" style="width:100%; border-radius:8px;">
                    <a href="assets/PlushCV.zip" class="download-btn">Download Source Code</a>
                ` 
            },
        ]
    },
    'SQL': {
        color: '#36a2eb',
        projects: [
            { id: 'sql-1', title: 'Database Optimization', desc: 'Query tuning.', content: 'Index optimization for large datasets.' },
            { id: 'sql-2', title: 'Analytics Dashboard', desc: 'Data modeling.', content: 'Complex JOIN operations for business intel.' }
        ]
    },
    'Bash':{
        color: '#D83185',
        projects: [
            {id: 'bash-1', title: 'Own developed MLOps CLI',
            desc: 'My first attempt in creating a CLI exploring the ML Operations Lifecycle',
            content: `
            <h3>Introduction</h3>

            `}
        ]
    }
};

const app = document.getElementById('app');

/**
 * THEME TOGGLE LOGIC
 */
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', targetTheme);
    document.getElementById('theme-icon').innerText = targetTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', targetTheme);
    
    // Refresh current view to update Chart text colors
    if (document.getElementById('donutChart')) showHome();
}

// Initial Theme Load
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

/**
 * VIEW: HOMEPAGE (Main Donut)
 */
function showHome() {
    app.innerHTML = `
        <div class="chart-wrapper">
            <h2 style="text-align:center">Project Distribution</h2>
            <div class="chart-container">
                <canvas id="donutChart"></canvas>
            </div>
        </div>`;
    renderMainChart();
}

function renderMainChart() {
    const ctx = document.getElementById('donutChart').getContext('2d');
    const labels = Object.keys(domains);
    const data = labels.map(key => domains[key].projects.length);
    const colors = labels.map(key => domains[key].color);
    const textColor = getComputedStyle(document.body).getPropertyValue('--text').trim();

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { color: textColor } }
            },
            onClick: (evt, item) => {
                if (item.length > 0) {
                    const index = item[0].index;
                    showDomainPage(labels[index]);
                }
            }
        }
    });
}

/**
 * VIEW: DOMAIN PAGE (Sub-Chart & Filtering)
 */

function showDomainPage(domainName, filter = null) {
    const domain = domains[domainName];
    const projects = filter 
        ? domain.projects.filter(p => p.tags && p.tags.includes(filter))
        : domain.projects;

    app.innerHTML = `
        <div class="viewport-container">
            <button class="back-btn" onclick="showHome()">← Back to Overview</button>
            <h1 style="border-left: 5px solid ${domain.color}; padding-left: 15px;">
                ${domainName} Projects ${filter ? `: ${filter}` : ''}
            </h1>

            ${domain.subSkills ? `
                <div class="sub-chart-wrapper" style="text-align:center; margin-bottom:2rem;">
                    <div style="max-width: 300px; margin: auto;">
                        <canvas id="subDonutChart"></canvas>
                    </div>
                    ${filter ? `<button class="back-btn" onclick="showDomainPage('${domainName}')">Show All ${domainName}</button>` : ''}
                </div>
            ` : ''}

            <div class="project-grid">
                ${projects.map(p => `
                    <div class="project-card" onclick="showProjectDetails('${domainName}', '${p.id}')">
                        <h3>${p.title}</h3>
                        <p>${p.desc}</p>
                        <small>Tags: ${p.tags ? p.tags.join(', ') : 'None'}</small>
                    </div>
                `).join('')}
            </div>
        </div>`;

    if (domain.subSkills) renderSubChart(domainName, domain.subSkills, filter);
}

function renderSubChart(domainName, subSkills) {
    const ctx = document.getElementById('subDonutChart').getContext('2d');
    const projects = domains[domainName].projects;
    const textColor = getComputedStyle(document.body).getPropertyValue('--text').trim();

    // Calculate dynamic counts
    const counts = subSkills.labels.map(label => 
        projects.filter(p => p.tags && p.tags.includes(label)).length
    );

    // Clean data: hide 0-value segments
    const finalLabels = [], finalData = [], finalColors = [];
    counts.forEach((val, i) => {
        if (val > 0) {
            finalLabels.push(subSkills.labels[i]);
            finalData.push(val);
            finalColors.push(subSkills.colors[i]);
        }
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: finalLabels,
            datasets: [{ data: finalData, backgroundColor: finalColors }]
        },
        options: {
            plugins: {
                legend: { position: 'right', labels: { color: textColor } }
            },
            onClick: (evt, item) => {
                if (item.length > 0) {
                    const tag = finalLabels[item[0].index];
                    showDomainPage(domainName, tag);
                }
            }
        }
    });
}

/**
 * VIEW: PROJECT DETAILS
 */
function showProjectDetails(domainName, projectId) {
    const project = domains[domainName].projects.find(p => p.id === projectId);
    app.innerHTML = `
        <div class="viewport-container">
            <button class="back-btn" onclick="showDomainPage('${domainName}')">← Back to ${domainName}</button>
            <article class="project-detail">
                <header>
                    <span class="category-tag" style="background: ${domains[domainName].color}; color: white; padding: 4px 8px; border-radius: 4px;">
                        ${domainName}
                    </span>
                    <h1>${project.title}</h1>
                </header>
                <div class="content-body" style="margin-top: 2rem; line-height: 1.6;">
                    ${project.content}
                </div>
            </article>
        </div>`;
}

/**
 * VIEW: CONTACT
 */
function showContact() {
    app.innerHTML = `
        <div class="contact-container">
            <h1>Contact Me</h1>
            <p><strong>Location:</strong> Glasgow, Scotland</p>
            <p><strong>Email:</strong> dushyant.khatri@icloud.com</p>
            <form action="https://formspree.io/f/xvzaywrz" method="POST" style="margin-top:2rem;">
                <div class="form-group"><label>Name</label><input type="text" name="name" required></div>
                <div class="form-group"><label>Email</label><input type="email" name="email" required></div>
                <div class="form-group"><label>Message</label><textarea name="message" rows="5" required></textarea></div>
                <button type="submit" class="submit-btn">Send Message</button>
            </form>
        </div>`;
}

// Bootstrap the app
window.onload = () => {
    // Ensure icon matches saved theme
    document.getElementById('theme-icon').innerText = savedTheme === 'dark' ? '☀️' : '🌙';
    showHome();
};