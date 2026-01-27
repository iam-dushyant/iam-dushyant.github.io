// 1. Data Structure
const domains = {
    'ML': {
        color: '#ff6384',
        projects: [
            { id: 'ml-1', title: 'NLP Sentiment Engine', desc: 'A transformer-based model for social media analysis.', content: 'Full details about NLP...' },
            { id: 'ml-2', title: 'Computer Vision API', desc: 'Real-time object detection.', content: 'Full details about CV...' }
        ]
    },
    'HPC': {
        color: '#36a2eb',
        projects: [
            { id: 'hpc-1', title: 'CUDA Fluid Simulation', desc: 'Parallelized Navier-Stokes solver.', content: 'Full details about CUDA...' }
        ]
    }
};

const app = document.getElementById('app');

// 2. Render Functions
function showHome() {
    app.innerHTML = '<div class="chart-container"><canvas id="donutChart"></canvas></div>';
    const ctx = document.getElementById('donutChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(domains),
            datasets: [{
                data: Object.keys(domains).map(() => 1), // Equal segments
                backgroundColor: Object.values(domains).map(d => d.color)
            }]
        },
        options: {
            onClick: (evt, item) => {
                if (item.length > 0) {
                    const index = item[0].index;
                    const label = chart.data.labels[index];
                    showDomainPage(label);
                }
            }
        }
    });
}

function showDomainPage(domainName) {
    const domain = domains[domainName];
    let html = `<h1>${domainName} Projects</h1>`;
    domain.projects.forEach(p => {
        html += `
            <div class="project-card" onclick="showProjectDetails('${domainName}', '${p.id}')">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
            </div>`;
    });
    app.innerHTML = html;
}

function showProjectDetails(domainName, projectId) {
    const project = domains[domainName].projects.find(p => p.id === projectId);
    app.innerHTML = `
        <button onclick="showDomainPage('${domainName}')">← Back to ${domainName}</button>
        <h2>${project.title}</h2>
        <div class="content">${project.content}</div>
    `;
}

// Initialize
showHome();