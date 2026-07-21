import re

with open('k:/projects/animated_portfolio/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Define descriptions and classes
data = {
    'Python': {'class': 'bento-large', 'sub': 'Backend Core', 'desc': 'Robust and scalable server-side architecture for data-intensive applications.'},
    'JavaScript': {'class': '', 'sub': 'Frontend Logic', 'desc': 'Dynamic UI interactions.'},
    'HTML5': {'class': '', 'sub': 'Markup', 'desc': 'Semantic web structure.'},
    'CSS3': {'class': '', 'sub': 'Styling', 'desc': 'Responsive modern designs.'},
    'SQL': {'class': '', 'sub': 'Data', 'desc': 'Relational queries.'},
    'Django': {'class': 'bento-wide', 'sub': 'Web Framework', 'desc': 'Rapid development and clean, pragmatic design principles.'},
    'Bootstrap 5': {'class': '', 'sub': 'CSS Framework', 'desc': 'Mobile-first layouts.'},
    'MySQL': {'class': 'bento-tall', 'sub': 'Database', 'desc': 'High-performance data storage and retrieval systems.'},
    'SQLite': {'class': '', 'sub': 'Database', 'desc': 'Lightweight local storage.'},
    'Git': {'class': '', 'sub': 'Version Control', 'desc': 'Code tracking.'},
    'GitHub': {'class': 'bento-wide', 'sub': 'Repository', 'desc': 'Secure, scalable collaborative code management.'},
    'REST APIs': {'class': '', 'sub': 'Integrations', 'desc': 'Scalable endpoints.'},
    'Responsive Design': {'class': '', 'sub': 'UX/UI', 'desc': 'Cross-device compatibility.'},
    'Deployment': {'class': 'bento-wide', 'sub': 'DevOps', 'desc': 'Automated cloud hosting and continuous integration.'}
}

def repl(m):
    icon_svg = m.group(1)
    name = m.group(2)
    b_class = data.get(name, {}).get('class', '')
    sub = data.get(name, {}).get('sub', '')
    desc = data.get(name, {}).get('desc', '')

    new_html = f'''<div class=\"skill-card {b_class}\">
                        <div class=\"bento-header\">
                            <div class=\"skill-icon-wrap\">
                                {icon_svg.strip()}
                            </div>
                            <div class=\"bento-title-wrap\">
                                <span class=\"skill-card-name\">{name}</span>
                                <span class=\"bento-subtitle\">{sub}</span>
                            </div>
                        </div>
                        <p class=\"bento-desc\">{desc}</p>
                    </div>'''
    return new_html

# Regex to match the old format
pattern = r'<div class=\"skill-card\">\s*<div class=\"skill-icon-wrap\">\s*(<svg[\s\S]*?</svg>)\s*</div>\s*<span class=\"skill-card-name\">([^<]+)</span>\s*</div>'

new_html = re.sub(pattern, repl, html)

# Insert the center-text overlay
new_html = new_html.replace('<section id=\"skills\" class=\"skills section-pad\">', '<section id=\"skills\" class=\"skills section-pad grid-hero-section\">\n            <div class=\"center-text-overlay\">TECH STACK</div>')

with open('k:/projects/animated_portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)
print('Done!')
