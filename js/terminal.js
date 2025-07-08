import utils from './utils.js';
import config from './config.js';
import theme from './theme.js';

const terminal = {
    commands: {
        'help': () => {
            return `
            <div aria-live="polite">
                <p class="highlight">Comandos disponibles:</p>
                <ul class="command-list" role="list">
                    <li><span class="highlight">help</span>: Muestra esta ayuda</li>
                    <li><span class="highlight">about</span>: Información sobre mí</li>
                    <li><span class="highlight">skills</span>: Mis habilidades técnicas</li>
                    <li><span class="highlight">projects</span>: Proyectos destacados</li>
                    <li><span class="highlight">experience</span>: Mi experiencia laboral</li>
                    <li><span class="highlight">education</span>: Mi formación académica</li>
                    <li><span class="highlight">contact</span>: Datos de contacto</li>
                    <li><span class="highlight">clear</span>: Limpia la terminal</li>
                    <li><span class="highlight">pdf</span>: Generar versión PDF del CV</li>
                    <li><span class="highlight">print</span>: Versión imprimible del CV</li>
                    <li><span class="highlight">theme</span>: Cambia entre temas Matrix y Formal</li>
                    <li><span class="highlight">idioma</span>: Cambia entre español e inglés</li>
                    <li><span class="highlight">portfolio</span>: Información del portfolio</li>
                    <li><span class="highlight">easter</span>: Comandos secretos</li>
                    <li><span class="highlight">stats</span>: Métricas de rendimiento</li>
                </ul>
                <p>Usa las teclas ↑/↓ para navegar por el historial y <kbd>Tab</kbd> para autocompletar.</p>
            </div>
            `;
        },
        'about': () => {
            return `
            <div aria-live="polite">
                <p class="highlight">Ingeniero en Computación e Informática</p>
                
                <p>Especializado en desarrollo web full-stack y ciberseguridad con experiencia
                en la creación de soluciones tecnológicas innovadoras. Destacado por trabajo
                en equipos multidisciplinarios, comunicación técnica efectiva y adaptación
                rápida a nuevas tecnologías.</p>
                
                <p>Localización: Concepción, Chile</p>
            </div>
            `;
        },
        'skills': () => {
            return `
            <div aria-live="polite">
                <p class="highlight">HABILIDADES TÉCNICAS</p>
                
                <ul class="no-bullet">
                    <li>► Lenguajes: JavaScript, Ruby, Python, C++</li>
                    <li>► Frameworks & Bibliotecas: Ruby on Rails 7, React, Node.js, Stimulus.js, Turbo</li>
                    <li>► Herramientas & Tecnologías: PostgreSQL, Docker, Git, TailwindCSS, Firebase</li>
                    <li>► Especialidades: Desarrollo full-stack, Ciberseguridad, Pentesting, DevOps</li>
                </ul>
                
                <p class="highlight">COMPETENCIAS PROFESIONALES</p>
                
                <ul class="no-bullet">
                    <li>♦ Resolución analítica de problemas complejos</li>
                    <li>♦ Liderazgo de equipos técnicos</li>
                    <li>♦ Comunicación técnica efectiva</li>
                    <li>♦ Adaptabilidad tecnológica rápida</li>
                    <li>♦ Gestión eficiente de proyectos</li>
                    <li>♦ Automatización de procesos</li>
                </ul>
            </div>
            `;
        },
        'projects': () => {
            return `
            <div aria-live="polite">
                <p class="highlight">PROYECTOS DESTACADOS</p>
                
                <div>
                    <p>► <span class="highlight">Plataforma Educativa de Ciberseguridad</span></p>
                    <p>  Proyecto de Titulación - Universidad del Biobío (2024)</p>
                    <p>  Ruby on Rails 7.1.3, PostgreSQL, Docker, TailwindCSS, Stimulus.js</p>
                </div>
                
                <div>
                    <p>► <span class="highlight">Sistema de Gestión Digital</span></p>
                    <p>  INDAMA, Concepción - Práctica Profesional (2024)</p>
                    <p>  React Native, Firebase, Redux, Node.js, Express</p>
                </div>
                
                <div>
                    <p>► <span class="highlight">Dashboard Recursos Humanos</span></p>
                    <p>  Municipalidad de Concepción - Práctica Profesional (2022)</p>
                    <p>  Excel VBA, Power BI, Análisis de Datos</p>
                </div>
            </div>
            `;
        },
        'experience': () => {
            return `
            <div aria-live="polite">
                <p class="highlight">EXPERIENCIA PROFESIONAL</p>
                
                <div>
                    <p>► <span class="highlight">Ayudante Académico</span> (03/2023 - 04/2025)</p>
                    <p>  Universidad del Biobío, Concepción, Chile</p>
                    <ul>
                        <li>- Impartí múltiples asignaturas de ingeniería</li>
                        <li>- Metodologías didácticas: +25% mejora en aprobación</li>
                        <li>- Sistema automatizado: -40% tiempo evaluación</li>
                    </ul>
                </div>
                
                <div>
                    <p>► <span class="highlight">Co-fundador y Coordinador Opensource UBB</span> (01/2022 - Presente)</p>
                    <p>  Universidad del Biobío, Concepción, Chile</p>
                    <ul>
                        <li>- Organización: 40+ miembros en dos años</li>
                        <li>- Eventos: 15+ educativos con 500+ asistentes</li>
                        <li>- Alianzas: 5 prácticas profesionales</li>
                    </ul>
                </div>
                
                <div>
                    <p>► <span class="highlight">Desarrollador Full-Stack</span> (01/2024 - 03/2024)</p>
                    <p>  INDAMA, Concepción, Chile - Práctica Profesional</p>
                    <ul>
                        <li>- Sistema de gestión: -60% tiempo procesamiento</li>
                    </ul>
                </div>
                
                <div>
                    <p>► <span class="highlight">Analista de Datos</span> (07/2022 - 09/2022)</p>
                    <p>  Municipalidad de Concepción - Práctica Profesional</p>
                    <ul>
                        <li>- Dashboard interactivo: -75% tiempo cálculo</li>
                        <li>- Automatización: +35% eficiencia</li>
                    </ul>
                </div>
            </div>
            `;
        },
        'education': () => {
            return `
            <div aria-live="polite">
                <p class="highlight">EDUCACIÓN</p>
                
                <p>► <span class="highlight">Ingeniería en Computación e Informática</span> (2020-2024)</p>
                <p>  Universidad del Biobío, Concepción, Chile</p>
                
                <p class="highlight">CERTIFICACIONES</p>
                
                <p>► Huawei - Fiber to the Home (FTTH) (2023)</p>
                <p>► Huawei - Mobile Broadband (MBB) (2023)</p>
            </div>
            `;
        },
        'contact': () => {
            return `
            <div aria-live="polite">
                <p class="highlight">DATOS DE CONTACTO</p>
                
                <ul class="no-bullet">
                    <li>► Email: <a href="mailto:juanpablorosasmartin@gmail.com" class="contact-link" aria-label="Enviar correo a Juan Pablo Rosas">juanpablorosasmartin@gmail.com</a></li>
                    <li>► GitHub: <a href="https://github.com/yeipills" target="_blank" class="contact-link" aria-label="Visitar perfil de GitHub">github.com/yeipills</a></li>
                    <li>► LinkedIn: <a href="https://linkedin.com/in/juan-pablo-rosas-martin" target="_blank" class="contact-link" aria-label="Visitar perfil de LinkedIn">linkedin.com/in/juan-pablo-rosas-martin</a></li>
                    <li>► Web: <a href="https://portfolio.yeipi.cl" target="_blank" class="contact-link" aria-label="Visitar sitio web personal">portfolio.yeipi.cl</a></li>
                    <li>► Teléfono: <a href="tel:+56969030631" class="contact-link" aria-label="Llamar a Juan Pablo Rosas">+56 9 6903 0631</a></li>
                </ul>
                
                <p class="status-message success" role="status">
                    [ESTADO: DISPONIBLE PARA OPORTUNIDADES LABORALES]
                </p>
            </div>
            `;
        },
        'clear': () => {
            return 'CLEAR_COMMAND';
        },
        'portfolio': () => {
            return `
                <div class="command-output">
                    <h3>📁 Portfolio Information</h3>
                    <p><strong>Version:</strong> 2.0.0</p>
                    <p><strong>Build:</strong> Production</p>
                    <p><strong>Tech Stack:</strong> HTML5, CSS3, JavaScript ES6+</p>
                    <p><strong>Features:</strong> PWA, Dual Theme, Responsive, Accessible</p>
                    <p><strong>Repository:</strong> <a href="https://github.com/yeipi/portfolio" target="_blank" class="contact-link">GitHub</a></p>
                </div>
            `;
        },
        'easter': () => {
            return `
                <div class="command-output">
                    <h3>🥚 Easter Eggs</h3>
                    <p>Try these secret commands:</p>
                    <ul>
                        <li><span class="command-highlight">matrix</span> - Enter the Matrix</li>
                        <li><span class="command-highlight">neo</span> - Follow the white rabbit</li>
                        <li><span class="command-highlight">hack</span> - Hacker mode</li>
                        <li><span class="command-highlight">konami</span> - Classic code</li>
                        <li>Press <span class="command-highlight">↑ ↑ ↓ ↓ ← → ← → B A</span> for surprise</li>
                    </ul>
                </div>
            `;
        },
        'stats': () => {
            return `
                <div class="command-output">
                    <h3>📊 Portfolio Stats</h3>
                    <p><strong>Performance:</strong> 95/100</p>
                    <p><strong>Accessibility:</strong> 100/100</p>
                    <p><strong>SEO:</strong> 100/100</p>
                    <p><strong>PWA:</strong> 100/100</p>
                    <p><strong>Lines of Code:</strong> 8,058</p>
                    <p><strong>Files:</strong> 35</p>
                    <p><strong>Load Time:</strong> <2s</p>
                </div>
            `;
        },
        'print': () => {
            window.print();
            return '<p aria-live="polite">Preparando versión imprimible del CV...</p>';
        },
        'theme': () => {
            theme.toggle();
            return '<p aria-live="polite">Cambiando tema...</p>';
        },
        'pdf': () => {
            document.getElementById('export-pdf').click();
            return '<p aria-live="polite">Descargando versión PDF del CV...</p>';
        },
        'idioma': () => {
            if (window.language && typeof window.language.toggle === 'function') {
                window.language.toggle();
            } else {
                location.reload();
            }
            return '<p aria-live="polite">Cambiando idioma...</p>';
        }
    },
    init() {
        try {
            // Configurar comandos secretos después de la inicialización
            this.commands['neo'] = () => {
                if (config.secretCommands.neo) {
                    this.triggerMatrixEffect();
                    return '<p class="matrix-message" aria-live="polite">Wake up, Neo...</p>';
                }
                return this.commands.help();
            };
            
            this.commands['matrix'] = () => {
                if (config.secretCommands.matrix) {
                    document.body.classList.add('matrix-rain-intense');
                    setTimeout(() => {
                        document.body.classList.remove('matrix-rain-intense');
                    }, 5000);
                    return '<p class="matrix-message" aria-live="polite">There is no spoon...</p>';
                }
                return this.commands.help();
            };
            
            this.commands['hack'] = () => {
                if (config.secretCommands.hack) {
                    this.simulateHacking();
                    return '<p class="hacking" aria-live="polite">Iniciando secuencia de hackeo...</p>';
                }
                return this.commands.help();
            };
            
            const input = document.getElementById('terminal-input');
            if (!input) return;
            input.addEventListener('keydown', (e) => this.handleInput(e));
            document.addEventListener('keydown', (e) => this.checkKonamiCode(e));
            const terminalBody = document.querySelector('.terminal-body');
            if (terminalBody) {
                terminalBody.addEventListener('dblclick', () => {
                    document.body.classList.toggle('show-shortcuts');
                });
            }
            this.displayResult(`<p aria-live="polite">Terminal lista. Escribe <span class="highlight">help</span> para ver los comandos disponibles.</p>`, 'SYSTEM');
            
            // Hacemos disponible terminal globalmente para que language.js pueda acceder a él
            window.terminal = this;
        } catch (e) {
            utils.logError('Terminal Init', e);
        }
    },
    updateCommandsLanguage(lang) {
        if (lang === 'en') {
            this.commands.help = () => {
                return `
                <div aria-live="polite">
                    <p class="highlight">Available commands:</p>
                    <ul class="command-list" role="list">
                        <li><span class="highlight">help</span>: Shows this help</li>
                        <li><span class="highlight">about</span>: Information about me</li>
                        <li><span class="highlight">skills</span>: My technical skills</li>
                        <li><span class="highlight">projects</span>: Featured projects</li>
                        <li><span class="highlight">experience</span>: My work experience</li>
                        <li><span class="highlight">education</span>: My education</li>
                        <li><span class="highlight">contact</span>: Contact information</li>
                        <li><span class="highlight">clear</span>: Clears the terminal</li>
                        <li><span class="highlight">pdf</span>: Generate PDF version of CV</li>
                        <li><span class="highlight">print</span>: Printable version of CV</li>
                        <li><span class="highlight">theme</span>: Switch between Matrix and Formal themes</li>
                        <li><span class="highlight">language</span>: Change language (ES/EN)</li>
                        <li><span class="highlight">portfolio</span>: Portfolio information</li>
                        <li><span class="highlight">easter</span>: Hidden commands</li>
                        <li><span class="highlight">stats</span>: Performance metrics</li>
                    </ul>
                    <p>Use ↑/↓ keys to navigate history and <kbd>Tab</kbd> for autocompletion.</p>
                </div>
                `;
            };
            
            this.commands.language = () => {
                if (window.language && typeof window.language.toggle === 'function') {
                    window.language.toggle();
                } else {
                    location.reload();
                }
                return '<p aria-live="polite">Changing language...</p>';
            };
            
            this.commands.about = () => {
                return `
                <div aria-live="polite">
                    <p class="highlight">Computer and Information Engineer</p>
                    
                    <p>Specialized in full-stack web development and cybersecurity with experience
                    in creating innovative technological solutions. Renowned for working 
                    in multidisciplinary teams, effective technical communication, and quick
                    adaptation to new technologies.</p>
                    
                    <p>Location: Concepción, Chile</p>
                </div>
                `;
            };
            
            this.commands.skills = () => {
                return `
                <div aria-live="polite">
                    <p class="highlight">TECHNICAL SKILLS</p>
                    
                    <ul class="no-bullet">
                        <li>► Languages: JavaScript, Ruby, Python, C++</li>
                        <li>► Frameworks & Libraries: Ruby on Rails 7, React, Node.js, Stimulus.js, Turbo</li>
                        <li>► Tools & Technologies: PostgreSQL, Docker, Git, TailwindCSS, Firebase</li>
                        <li>► Specialties: Full-stack development, Cybersecurity, Pentesting, DevOps</li>
                    </ul>
                    
                    <p class="highlight">PROFESSIONAL COMPETENCIES</p>
                    
                    <ul class="no-bullet">
                        <li>♦ Analytical problem-solving of complex issues</li>
                        <li>♦ Technical team leadership</li>
                        <li>♦ Effective technical communication</li>
                        <li>♦ Quick technological adaptability</li>
                        <li>♦ Efficient project management</li>
                        <li>♦ Process automation</li>
                    </ul>
                </div>
                `;
            };
            
            this.commands.contact = () => {
                return `
                <div aria-live="polite">
                    <p class="highlight">CONTACT INFORMATION</p>
                    
                    <ul class="no-bullet">
                        <li>► Email: <a href="mailto:juanpablorosasmartin@gmail.com" class="contact-link" aria-label="Send email to Juan Pablo Rosas">juanpablorosasmartin@gmail.com</a></li>
                        <li>► GitHub: <a href="https://github.com/yeipills" target="_blank" class="contact-link" aria-label="Visit GitHub profile">github.com/yeipills</a></li>
                        <li>► LinkedIn: <a href="https://linkedin.com/in/juan-pablo-rosas-martin" target="_blank" class="contact-link" aria-label="Visit LinkedIn profile">linkedin.com/in/juan-pablo-rosas-martin</a></li>
                        <li>► Web: <a href="https://portfolio.yeipi.cl" target="_blank" class="contact-link" aria-label="Visit personal website">portfolio.yeipi.cl</a></li>
                        <li>► Phone: <a href="tel:+56969030631" class="contact-link" aria-label="Call Juan Pablo Rosas">+56 9 6903 0631</a></li>
                    </ul>
                    
                    <p class="status-message success" role="status">
                        [STATUS: AVAILABLE FOR JOB OPPORTUNITIES]
                    </p>
                </div>
                `;
            };
            
            this.commands.projects = () => {
                return `
                <div aria-live="polite">
                    <p class="highlight">FEATURED PROJECTS</p>
                    
                    <div>
                        <p>► <span class="highlight">Cybersecurity Educational Platform</span></p>
                        <p>  Degree Project - Universidad del Biobío (2024)</p>
                        <p>  Ruby on Rails 7.1.3, PostgreSQL, Docker, TailwindCSS, Stimulus.js</p>
                    </div>
                    
                    <div>
                        <p>► <span class="highlight">Digital Management System</span></p>
                        <p>  INDAMA, Concepción - Professional Internship (2024)</p>
                        <p>  React Native, Firebase, Redux, Node.js, Express</p>
                    </div>
                    
                    <div>
                        <p>► <span class="highlight">Human Resources Dashboard</span></p>
                        <p>  Municipality of Concepción - Professional Internship (2022)</p>
                        <p>  Excel VBA, Power BI, Data Analysis</p>
                    </div>
                </div>
                `;
            };
            
            this.commands.experience = () => {
                return `
                <div aria-live="polite">
                    <p class="highlight">PROFESSIONAL EXPERIENCE</p>
                    
                    <div>
                        <p>► <span class="highlight">Academic Assistant</span> (03/2023 - 04/2025)</p>
                        <p>  Universidad del Biobío, Concepción, Chile</p>
                        <ul>
                            <li>- Taught multiple engineering subjects</li>
                            <li>- Teaching methodologies: +25% improvement in approval rates</li>
                            <li>- Automated system: -40% evaluation time</li>
                        </ul>
                    </div>
                    
                    <div>
                        <p>► <span class="highlight">Co-founder and Coordinator of Opensource UBB</span> (01/2022 - Present)</p>
                        <p>  Universidad del Biobío, Concepción, Chile</p>
                        <ul>
                            <li>- Organization: 40+ members in two years</li>
                            <li>- Events: 15+ educational events with 500+ attendees</li>
                            <li>- Partnerships: 5 professional internships</li>
                        </ul>
                    </div>
                    
                    <div>
                        <p>► <span class="highlight">Full-Stack Developer</span> (01/2024 - 03/2024)</p>
                        <p>  INDAMA, Concepción, Chile - Professional Internship</p>
                        <ul>
                            <li>- Management system: -60% document processing time</li>
                        </ul>
                    </div>
                    
                    <div>
                        <p>► <span class="highlight">Data Analyst</span> (07/2022 - 09/2022)</p>
                        <p>  Municipality of Concepción - Professional Internship</p>
                        <ul>
                            <li>- Interactive dashboard: -75% calculation time</li>
                            <li>- Automation: +35% efficiency</li>
                        </ul>
                    </div>
                </div>
                `;
            };
            
            this.commands.education = () => {
                return `
                <div aria-live="polite">
                    <p class="highlight">EDUCATION</p>
                    
                    <p>► <span class="highlight">Computer and Information Engineering</span> (2020-2024)</p>
                    <p>  Universidad del Biobío, Concepción, Chile</p>
                    
                    <p class="highlight">CERTIFICATIONS</p>
                    
                    <p>► Huawei - Fiber to the Home (FTTH) (2023)</p>
                    <p>► Huawei - Mobile Broadband (MBB) (2023)</p>
                </div>
                `;
            };
        } else {
            this.commands.idioma = () => {
                if (window.language && typeof window.language.toggle === 'function') {
                    window.language.toggle();
                } else {
                    location.reload();
                }
                return '<p aria-live="polite">Cambiando idioma...</p>';
            };
        }
    },
    checkKonamiCode(e) {
        try {
            if (e.key === config.konami.sequence[config.konami.position]) {
                config.konami.position++;
                
                if (config.konami.position === config.konami.sequence.length) {
                    this.activateKonamiCode();
                    config.konami.position = 0;
                }
            } else {
                config.konami.position = 0;
            }
        } catch (e) {
            utils.logError('Konami Code', e);
            config.konami.position = 0;
        }
    },
    activateKonamiCode() {
        try {
            config.konami.enabled = true;
            
            document.body.classList.add('konami-active');
            setTimeout(() => {
                document.body.classList.remove('konami-active');
            }, 3000);
            
            this.displayResult('<p class="konami-message" aria-live="polite">¡Código Konami activado! Nuevos comandos desbloqueados: neo, matrix, hack</p>', 'SYSTEM');
            
            document.body.classList.add('show-shortcuts');
            setTimeout(() => {
                document.body.classList.remove('show-shortcuts');
            }, 5000);
        } catch (e) {
            utils.logError('Konami Activate', e);
        }
    },
    triggerMatrixEffect() {
        try {
            const terminal = document.querySelector('.terminal-window');
            if (!terminal) return;
            
            terminal.classList.add('glitch-effect');
            
            const messages = [
                'Despertando...',
                'Seguir al conejo blanco...',
                'La Matrix te rodea...',
                'Elige: píldora roja o azul...'
            ];
            
            let index = 0;
            const interval = setInterval(() => {
                if (index < messages.length) {
                    this.displayResult(`<p class="matrix-message">${messages[index]}</p>`, 'SYSTEM');
                    index++;
                } else {
                    clearInterval(interval);
                    terminal.classList.remove('glitch-effect');
                }
            }, 1500);
        } catch (e) {
            utils.logError('Matrix Effect', e);
        }
    },
    simulateHacking() {
        try {
            const hackingTexts = [
                'Analizando sistema objetivo...',
                'Escaneando puertos...',
                'Detectando vulnerabilidades...',
                'Explotando CVE-2023-1337...',
                'Estableciendo punto de acceso...',
                'Elevando privilegios...',
                'Acceso concedido!',
                '> SISTEMA HACKEADO exitosamente'
            ];
            
            let index = 0;
            const interval = setInterval(() => {
                if (index < hackingTexts.length) {
                    const text = hackingTexts[index];
                    const className = index === hackingTexts.length - 1 ? 'success' : 'hacking';
                    this.displayResult(`<p class="${className}">${text}</p>`, 'SYSTEM');
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 800);
        } catch (e) {
            utils.logError('Hack Simulation', e);
        }
    },
    handleInput(e) {
        try {
            const input = e.target;
            
            if (e.key === 'Enter') {
                const command = input.value.trim();
                
                if (command !== '') {
                    config.commandHistory.push(command);
                    config.historyIndex = config.commandHistory.length;
                    
                    this.processCommand(command);
                }
                
                input.value = '';
            }
            else if (e.key === 'ArrowUp') {
                if (config.historyIndex > 0) {
                    config.historyIndex--;
                    input.value = config.commandHistory[config.historyIndex];
                    
                    setTimeout(() => {
                        input.selectionStart = input.selectionEnd = input.value.length;
                    }, 0);
                }
                e.preventDefault();
            }
            else if (e.key === 'ArrowDown') {
                if (config.historyIndex < config.commandHistory.length - 1) {
                    config.historyIndex++;
                    input.value = config.commandHistory[config.historyIndex];
                } else {
                    config.historyIndex = config.commandHistory.length;
                    input.value = '';
                }
                e.preventDefault();
            }
            else if (e.key === 'Tab') {
                e.preventDefault();
                this.autocomplete(input);
            }
        } catch (e) {
            utils.logError('Input Handler', e);
        }
    },
    autocomplete(input) {
        try {
            const currentInput = input.value.toLowerCase().trim();
            
            if (currentInput) {
                let availableCommands = Object.keys(this.commands);
                
                if (!config.konami.enabled) {
                    availableCommands = availableCommands.filter(cmd => 
                        !['neo', 'matrix', 'hack'].includes(cmd)
                    );
                }
                
                const possibleCommands = availableCommands.filter(cmd => 
                    cmd.startsWith(currentInput)
                );
                
                if (possibleCommands.length === 1) {
                    input.value = possibleCommands[0];
                } else if (possibleCommands.length > 1) {
                    const commandList = possibleCommands.join(', ');
                    this.displayResult(`<p>Comandos posibles: ${commandList}</p>`, 'SYSTEM');
                }
            }
        } catch (e) {
            utils.logError('Autocomplete', e);
        }
    },
    processCommand(cmd) {
        try {
            const commandLower = cmd.toLowerCase().trim();
            let result = '';
            
            if (commandLower === '') {
                return;
            }
            
            if (this.commands[commandLower]) {
                result = this.commands[commandLower]();
            } else {
                result = `<div aria-live="polite"><span class="error">Comando no reconocido: ${cmd}</span><br>Escribe <span class="highlight">help</span> para ver comandos disponibles.</div>`;
            }
            
            this.displayResult(result, cmd);
        } catch (e) {
            utils.logError('Process Command', e);
            this.displayResult(`<p class="error">Error al procesar el comando: ${e.message}</p>`, 'SYSTEM');
        }
    },
    displayResult(result, input) {
        try {
            const terminalContent = document.querySelector('.terminal-content');
            const consoleInput = document.querySelector('.console-input');
            
            if (!terminalContent || !consoleInput) {
                throw new Error('Elementos de terminal no encontrados');
            }
            
            const executedCommand = document.createElement('div');
            executedCommand.style.marginBottom = '10px';
            
            if (input === 'SYSTEM') {
                executedCommand.innerHTML = '';
            } else {
                executedCommand.innerHTML = `<span class="prompt" aria-hidden="true">dev@matrix:~/portfolio$</span> <span class="command-text">${input}</span>`;
                executedCommand.setAttribute('role', 'log');
            }
            
            if (result === 'CLEAR_COMMAND') {
                const asciiArt = document.querySelector('.ascii-art');
                if (asciiArt) {
                    terminalContent.innerHTML = '';
                    terminalContent.appendChild(asciiArt.cloneNode(true));
                    
                    const keyboardShortcuts = document.querySelector('.keyboard-shortcuts');
                    if (keyboardShortcuts) {
                        terminalContent.appendChild(keyboardShortcuts.cloneNode(true));
                    }
                    
                    terminalContent.appendChild(consoleInput);
                    
                    const announcer = document.getElementById('a11y-announcer');
                    if (announcer) {
                        announcer.textContent = 'Terminal limpiada';
                    }
                }
                return;
            }
            
            terminalContent.insertBefore(executedCommand, consoleInput);
            
            const resultElement = document.createElement('div');
            resultElement.style.marginBottom = '20px';
            resultElement.innerHTML = result;
            resultElement.setAttribute('role', 'region');
            
            terminalContent.insertBefore(resultElement, consoleInput);
            
            terminalContent.scrollTo({
                top: terminalContent.scrollHeight,
                behavior: 'smooth'
            });
        } catch (e) {
            utils.logError('Display Result', e);
            try {
                const terminalContent = document.querySelector('.terminal-content');
                if (terminalContent) {
                    const errorMsg = document.createElement('div');
                    errorMsg.innerHTML = `<p class="error">Error al mostrar resultado: ${e.message}</p>`;
                    terminalContent.appendChild(errorMsg);
                }
            } catch (e2) {
                console.error('Error fatal en displayResult:', e2);
            }
        }
    }
};

export default terminal; 