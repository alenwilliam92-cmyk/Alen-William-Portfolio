import re

def update_index():
    with open('k:/projects/animated_portfolio/index.html', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    start_idx = 149 # 0-indexed, so line 150
    end_idx = 296 # line 296 is the last closing div
    
    new_html = """            <div class="container">
                <div class="masonry-grid">
                    
                    <!-- Languages -->
                    <div class="masonry-item">
                        <div class="cat-badge b-lang">Languages</div>
                        
                        <div class="skill-row">
                            <div class="m-icon-box b-lang"><i class="fa-brands fa-python"></i></div>
                            <div class="m-skill-info">
                                <div class="m-skill-top">
                                    <span class="m-name">Python</span>
                                    <span class="m-level">Advanced</span>
                                </div>
                                <div class="m-progress-track"><div class="m-progress-fill b-lang" style="width: 88%;"></div></div>
                            </div>
                        </div>

                        <div class="skill-row">
                            <div class="m-icon-box b-lang"><i class="fa-brands fa-js"></i></div>
                            <div class="m-skill-info">
                                <div class="m-skill-top">
                                    <span class="m-name">JavaScript</span>
                                    <span class="m-level">Proficient</span>
                                </div>
                                <div class="m-progress-track"><div class="m-progress-fill b-lang" style="width: 72%;"></div></div>
                            </div>
                        </div>

                        <div class="skill-row">
                            <div class="m-icon-box b-lang"><i class="fa-brands fa-html5"></i></div>
                            <div class="m-skill-info">
                                <div class="m-skill-top">
                                    <span class="m-name">HTML5</span>
                                    <span class="m-level">Advanced</span>
                                </div>
                                <div class="m-progress-track"><div class="m-progress-fill b-lang" style="width: 90%;"></div></div>
                            </div>
                        </div>

                        <div class="skill-row">
                            <div class="m-icon-box b-lang"><i class="fa-brands fa-css3-alt"></i></div>
                            <div class="m-skill-info">
                                <div class="m-skill-top">
                                    <span class="m-name">CSS3</span>
                                    <span class="m-level">Proficient</span>
                                </div>
                                <div class="m-progress-track"><div class="m-progress-fill b-lang" style="width: 80%;"></div></div>
                            </div>
                        </div>

                        <div class="skill-row">
                            <div class="m-icon-box b-lang"><i class="fa-solid fa-database"></i></div>
                            <div class="m-skill-info">
                                <div class="m-skill-top">
                                    <span class="m-name">SQL</span>
                                    <span class="m-level">Proficient</span>
                                </div>
                                <div class="m-progress-track"><div class="m-progress-fill b-lang" style="width: 75%;"></div></div>
                            </div>
                        </div>
                    </div>

                    <!-- Frameworks -->
                    <div class="masonry-item">
                        <div class="cat-badge b-frame">Frameworks &amp; Libraries</div>
                        
                        <div class="skill-row">
                            <div class="m-icon-box b-frame"><i class="fa-solid fa-leaf"></i></div>
                            <div class="m-skill-info">
                                <div class="m-skill-top">
                                    <span class="m-name">Django</span>
                                    <span class="m-level">Advanced</span>
                                </div>
                                <div class="m-progress-track"><div class="m-progress-fill b-frame" style="width: 85%;"></div></div>
                            </div>
                        </div>

                        <div class="skill-row">
                            <div class="m-icon-box b-frame"><i class="fa-brands fa-bootstrap"></i></div>
                            <div class="m-skill-info">
                                <div class="m-skill-top">
                                    <span class="m-name">Bootstrap 5</span>
                                    <span class="m-level">Proficient</span>
                                </div>
                                <div class="m-progress-track"><div class="m-progress-fill b-frame" style="width: 80%;"></div></div>
                            </div>
                        </div>
                    </div>

                    <!-- Databases -->
                    <div class="masonry-item">
                        <div class="cat-badge b-data">Databases</div>
                        
                        <div class="skill-row">
                            <div class="m-icon-box b-data"><i class="fa-solid fa-server"></i></div>
                            <div class="m-skill-info">
                                <div class="m-skill-top">
                                    <span class="m-name">MySQL</span>
                                    <span class="m-level">Proficient</span>
                                </div>
                                <div class="m-progress-track"><div class="m-progress-fill b-data" style="width: 78%;"></div></div>
                            </div>
                        </div>

                        <div class="skill-row">
                            <div class="m-icon-box b-data"><i class="fa-solid fa-database"></i></div>
                            <div class="m-skill-info">
                                <div class="m-skill-top">
                                    <span class="m-name">SQLite</span>
                                    <span class="m-level">Intermediate</span>
                                </div>
                                <div class="m-progress-track"><div class="m-progress-fill b-data" style="width: 70%;"></div></div>
                            </div>
                        </div>
                    </div>

                    <!-- Tools (Separate Cards) -->
                    <div class="masonry-item tool-card">
                        <div class="tool-top">
                            <div class="m-icon-box b-tool1"><i class="fa-brands fa-git-alt"></i></div>
                            <div class="cat-badge b-tool1">Tool</div>
                        </div>
                        <h3 class="tool-name">Git</h3>
                        <p class="tool-desc">Version control &amp; branching</p>
                    </div>

                    <div class="masonry-item tool-card">
                        <div class="tool-top">
                            <div class="m-icon-box b-tool2"><i class="fa-brands fa-github"></i></div>
                            <div class="cat-badge b-tool2">Tool</div>
                        </div>
                        <h3 class="tool-name">GitHub</h3>
                        <p class="tool-desc">Repository management</p>
                    </div>

                    <div class="masonry-item tool-card">
                        <div class="tool-top">
                            <div class="m-icon-box b-tool3"><i class="fa-solid fa-mobile-screen"></i></div>
                            <div class="cat-badge b-tool3">Skill</div>
                        </div>
                        <h3 class="tool-name">Responsive Design</h3>
                        <p class="tool-desc">Mobile-first layouts</p>
                    </div>

                    <div class="masonry-item tool-card">
                        <div class="tool-top">
                            <div class="m-icon-box b-tool4"><i class="fa-solid fa-cloud-arrow-up"></i></div>
                            <div class="cat-badge b-tool4">Tool</div>
                        </div>
                        <h3 class="tool-name">Deployment</h3>
                        <p class="tool-desc">Heroku/Railway/PythonAnywhere</p>
                    </div>

                    <!-- My Stack Final Card -->
                    <div class="masonry-item mystack-card">
                        <h3 class="mystack-title">My stack</h3>
                        <div class="chip-row">
                            <div class="stack-chip">Python</div>
                            <i class="fa-solid fa-arrow-right stack-arr"></i>
                            <div class="stack-chip">Django</div>
                            <i class="fa-solid fa-arrow-right stack-arr"></i>
                            <div class="stack-chip">MySQL</div>
                            <i class="fa-solid fa-arrow-right stack-arr"></i>
                            <div class="stack-chip">Bootstrap</div>
                        </div>
                        <div class="stack-final-wrap">
                            <div class="stack-arrow-down"><i class="fa-solid fa-arrow-down"></i></div>
                            <div class="stack-final">Full Stack App</div>
                        </div>
                    </div>

                </div>
            </div>
"""

    lines[start_idx:end_idx] = [new_html]
    with open('k:/projects/animated_portfolio/index.html', 'w', encoding='utf-8') as f:
        f.writelines(lines)

def append_css():
    css = """

/* Masonry Grid Styles */
.masonry-grid {
    column-count: 3;
    column-gap: 1.5rem;
    padding-bottom: 3rem;
}

@media (max-width: 1024px) {
    .masonry-grid { column-count: 2; }
}

@media (max-width: 768px) {
    .masonry-grid { column-count: 1; }
}

.masonry-item {
    break-inside: avoid;
    background: transparent;
    border: 0.5px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 1.75rem;
    margin-bottom: 1.5rem;
    transition: transform 0.3s var(--transition-curve);
    box-shadow: none; /* No shadows */
}

.masonry-item:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.2);
}

/* Category Badges */
.cat-badge {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
    font-weight: 500;
}

/* Base colors for light pastel badges */
.b-lang { background: rgba(59, 130, 246, 0.1); color: #93c5fd; }
.b-frame { background: rgba(16, 185, 129, 0.1); color: #6ee7b7; }
.b-data { background: rgba(20, 184, 166, 0.1); color: #5eead4; }
.b-tool1 { background: rgba(239, 68, 68, 0.1); color: #fca5a5; }
.b-tool2 { background: rgba(168, 85, 247, 0.1); color: #d8b4fe; }
.b-tool3 { background: rgba(245, 158, 11, 0.1); color: #fcd34d; }
.b-tool4 { background: rgba(99, 102, 241, 0.1); color: #a5b4fc; }

/* Skill Rows */
.skill-row {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 1.25rem;
}

.skill-row:last-child {
    margin-bottom: 0;
}

.m-icon-box {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    flex-shrink: 0;
}

.m-skill-info {
    flex-grow: 1;
}

.m-skill-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.4rem;
}

.m-name {
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--text-main);
}

.m-level {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--text-muted);
    text-transform: uppercase;
}

.m-progress-track {
    width: 100%;
    height: 4px; /* Thin progress bar */
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    overflow: hidden;
}

.m-progress-fill {
    height: 100%;
    border-radius: 2px;
}
/* Re-use badge background color (without alpha if possible, but keeping it flat) */
.m-progress-fill.b-lang { background: #93c5fd; }
.m-progress-fill.b-frame { background: #6ee7b7; }
.m-progress-fill.b-data { background: #5eead4; }

/* Tool Cards */
.tool-card {
    padding: 1.5rem;
}

.tool-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.tool-top .cat-badge {
    margin-bottom: 0;
}

.tool-name {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-main);
    margin-bottom: 0.25rem;
}

.tool-desc {
    font-size: 0.85rem;
    color: var(--text-muted);
}

/* My Stack Card */
.mystack-card {
    background: rgba(168, 255, 120, 0.03) !important;
    border-color: rgba(168, 255, 120, 0.1) !important;
    text-align: center;
}

.mystack-title {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
    color: var(--text-main);
}

.chip-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.stack-chip {
    padding: 0.4rem 0.75rem;
    background: transparent;
    border: 0.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 20px;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--text-main);
}

.stack-arr {
    color: var(--text-muted);
    font-size: 0.7rem;
}

.stack-final-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
}

.stack-arrow-down {
    color: var(--accent-neon);
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.stack-final {
    padding: 0.5rem 1rem;
    background: rgba(168, 255, 120, 0.1);
    color: var(--accent-neon);
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
}
"""
    with open('k:/projects/animated_portfolio/styles.css', 'a', encoding='utf-8') as f:
        f.write(css)

update_index()
append_css()
print("Done")
