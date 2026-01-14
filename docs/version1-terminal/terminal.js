// Terminal CV - Antoine JACROT
const output = document.getElementById('output');
const input = document.getElementById('command-input');
const terminal = document.getElementById('terminal');
const coffeeRabbit = document.getElementById('white-rabbit');

let commandHistory = [];
let historyIndex = -1;
let codeRainActive = false;
let coffeeRabbitClicked = false;
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Anti-bot: contact data stored reversed
const secretContact = {
    email: 'moc.liamg@torcaj.eniotna',
    tel: '8️⃣0️⃣3️⃣5️⃣4️⃣5️⃣3️⃣4️⃣6️⃣0️⃣',
    telPlain: '8030545346'
};

// Mirror reveal system
let contactRevealed = false;

function revealContact(type) {
    const reversed = secretContact[type];
    const revealed = reversed.split('').reverse().join('');

    // Copy to clipboard
    const plainText = type === 'email' ? revealed : '0643545308';
    navigator.clipboard.writeText(plainText).then(() => {
        return `<span class="success">✓ ${type === 'email' ? 'Email' : 'Téléphone'} copié!</span> ${revealed}`;
    }).catch(() => {
        return revealed;
    });

    return revealed;
}

function createMirrorContact() {
    return `
📧 Email: <span class="mirror" id="email-mirror" style="filter: blur(3px); cursor: pointer;" onclick="revealEmailMirror()">moc.liamg@torcaj.eniotna</span> 🪞
📱 Tel: <span class="mirror" id="tel-mirror" style="filter: blur(3px); cursor: pointer;" onclick="revealTelMirror()">8️⃣0️⃣3️⃣5️⃣4️⃣5️⃣3️⃣4️⃣6️⃣0️⃣</span> 🪞

💡 Cliquez sur 🪞 pour déchiffrer (anti-bots!)
    `;
}

// Global reveal functions for onclick
window.revealEmailMirror = function() {
    const el = document.getElementById('email-mirror');
    if (el) {
        const revealed = secretContact.email.split('').reverse().join('');
        el.style.filter = 'none';
        el.innerHTML = `${revealed} <button onclick="copyToClipboard('${revealed}', 'email')" style="cursor: pointer;">📋 Copier</button>`;
        el.onclick = null;
    }
};

window.revealTelMirror = function() {
    const el = document.getElementById('tel-mirror');
    if (el) {
        const revealed = secretContact.tel.split('').reverse().join('');
        const plain = '0643545308';
        el.style.filter = 'none';
        el.innerHTML = `${revealed} <button onclick="copyToClipboard('${plain}', 'tel')" style="cursor: pointer;">📋 Copier</button>`;
        el.onclick = null;
    }
};

window.copyToClipboard = function(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        displayOutput('', `<span class="success">✓ ${type === 'email' ? 'Email' : 'Téléphone'} copié dans le presse-papiers!</span>`);
    });
};

// Helper function to create perfectly centered box titles
function createBox(title) {
    const boxWidth = 62;
    const titleLength = title.length;
    const totalPadding = boxWidth - titleLength;
    const leftPad = Math.floor(totalPadding / 2);
    const rightPad = totalPadding - leftPad;

    const topBottom = `╔${'═'.repeat(boxWidth)}╗`;
    const middle = `║${' '.repeat(leftPad)}${title}${' '.repeat(rightPad)}║`;
    const bottom = `╚${'═'.repeat(boxWidth)}╝`;

    return `${topBottom}\n${middle}\n${bottom}`;
}

// CV Data
const cvData = {
    about: `
${createBox('ANTOINE JACROT')}
${createBox('EXPERT TECHNIQUE')}

Autodidacte avec 14 ans d'expérience en systèmes logistiques
(WMS, WCS, TMS, OMS). Polyvalence technique du code aux
infrastructures. Esprit pragmatique orienté solutions concrètes
et durables... quand le cafe est bon.

"Le seul qui lit les traces LMWCS... parce que personne d'autre ne veut s'y coller."
    `,

    experience: `
${createBox('EXPÉRIENCE')}

[2025-Present] EXPERT TECHNIQUE - Savoye
  • Referent technique (celui qu'on appelle quand plus rien ne marche)
  • Support niveau 3 sur problematiques complexes
  • Force de proposition... parfois trop, d'apres certains

[2012-2025] INGENIEUR SUPPORT - Savoye
  • Support niveau 1 a 3 (niveau 4 quand le cafe est vraiment bon)
  • Suivi client avec rapports et plans d'action (oui, de la paperasse aussi)
  • Developpement monitoring proactif (Centreon) - aka "prevenir avant que ca explose"
  • Polyvalence: PL/SQL, C, Java, MongoDB, Talend, Perl (Jack of all trades, master of... quelques-uns)

[2011-2012] ANALYSTE / PROGRAMMEUR C - Dematic
  • Integrations EDI transporteurs
  • Developpement systemes de tri automatises (le debut de l'aventure)
    `,

    projects: `
${createBox('PROJETS TECHNIQUES')}

🤖 Developpement de bots industrialises
   → Alertes et automatisation (parce que faire les choses a la main, c'est so 2010)

📊 Solutions de monitoring proactif
   → Centreon, automatisation systeme (pour dormir tranquille la nuit)

🏠 Projets personnels
   → Domotique, mining, IoT (oui, ma maison est plus intelligente que moi)

🔬 Experimentation continue sur nouvelles technologies
   → Alias: "Tiens, et si j'essayais ca a 2h du mat..."
    `,

    skills: `
${createBox('COMPÉTENCES CLÉS')}

• Curiosite technique et apprentissage continu (aka Google-fu niveau expert)
• Proactivite: anticipe et previent plutot que reagir (la plupart du temps)
• Pragmatisme creatif: solutions durables... ou au moins qui tiennent jusqu'a lundi
• Vision systemique de l'ensemble de l'ecosysteme (je vois des patterns partout)
• Esprit d'equipe et transmission de connaissances (j'adore expliquer des trucs que personne n'a demande)
    `,

    contact: `
${createBox('CONTACT')}

📍 Localisation: Marcigny (71)
${createMirrorContact()}

💡 Tapez 'hire-me' pour en savoir plus...
    `
};

// Commands
const commands = {
    help: () => `
${createBox('COMMANDES DISPONIBLES')}

📋 INFORMATIONS CV
    whoami              À propos de moi
    experience          Parcours professionnel détaillé
    ls experience       Liste courte des expériences
    cat projects        Projets techniques réalisés
    skills              Compétences et atouts
    contact             Informations de contact
    hire-me             Pourquoi me recruter?

🎮 EASTER EGGS & SPECIAL
    clear               Effacer l'ecran du terminal
    hacker              Activer le mode hacker (effet visuel)
    debug               Simuler une session de debug
    colis               📦 Voir les colis en transit
    cafe                ☕ Secret...
    sudo hire-me        Commande admin privilegiee

⚙️  UTILITAIRES
    history             Historique des commandes
    easter-eggs         Liste complète des easter eggs
    ls                  Lister les fichiers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Tip: Utilisez les fleches pour naviguer dans l'historique
☕ Astuce: Une tasse de cafe se promene quelque part...
    `,

    whoami: () => cvData.about,
    about: () => cvData.about,

    experience: () => cvData.experience,

    'ls experience': () => `
experience/
├── expert-technique-2025.md
├── ingenieur-support-2012-2025.md
└── analyste-2011-2012.md
    `,

    'cat projects': () => cvData.projects,
    projects: () => cvData.projects,

    skills: () => cvData.skills,
    atouts: () => cvData.skills,

    contact: () => cvData.contact,

    'hire-me': () => `
${createBox('POURQUOI ME RECRUTER?')}

✓ 14 ans d'experience sur systemes logistiques critiques (et toujours la)
✓ Vision transverse de l'ecosysteme (je connais tous les bugs par leur prenom)
✓ Capacite a resoudre les problemes complexes (sur ceux que j'arrive a reproduire)
✓ Le seul qui lit les traces LMWCS (competence que personne ne m'envie)
✓ Approche proactive et preventive (parce que les urgences a 3h du mat, non merci)
✓ Createur de bots et solutions automatisees (pour travailler moins, mais mieux)

${createMirrorContact()}
📍 Marcigny (71)

Prêt à rejoindre votre équipe! 🚀
    `,

    clear: () => {
        output.innerHTML = '';
        return '';
    },

    hacker: () => {
        if (!codeRainActive) {
            startCodeRain();
            return `
<span class="success glitch">Initialisation du mode hacker...</span>
Connexion aux serveurs en cours...
Acces autorise. Bienvenue, Antoine. ☕

Konami Code activated!
            `;
        }
        return 'Mode hacker deja actif... patience!';
    },

    debug: () => `
<span class="glitch">
 ____  _____ ____  _   _  ____   __  __  ___  ____  _____
|  _ \\| ____| __ )| | | |/ ___| |  \\/  |/ _ \\|  _ \\| ____|
| | | |  _| |  _ \\| | | | |  _  | |\\/| | | | | | | |  _|
| |_| | |___| |_) | |_| | |_| | | |  | | |_| | |_| | |___
|____/|_____|____/ \\___/ \\____| |_|  |_|\\___/|____/|_____|
</span>

Ah, les joies du debugging a 23h un vendredi soir...

Session de debug en cours sur traces LMWCS:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ERROR] Package #42 - Destination unknown (encore lui...)
[WARN] Conveyor belt #7 - Speed anomaly detected
[INFO] Sorting complete - 99.8% accuracy (pas mal!)
[ERROR] Scanner #3 - Barcode read failure
[DEBUG] Cafe restant: 12% - CRITICAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="success">► Erreur identifiee: Scanner #3 necessite calibration</span>
<span class="success">► Solution: Eteindre et rallumer (ca marche 60% du temps)</span>
<span class="warning">► Cafe: Niveau critique - Pause recommandee</span>

Achievement: Debug Master (sur les bugs reproductibles)
    `,

    colis: () => `
${createBox('📦 COLIS EN TRANSIT 📦')}

Traitement en cours...

📦 Colis #0001 → [████████████░░░░] 75% - En route vers destination
📦 Colis #0002 → [████████████████] 100% ✓ Livre (miracle!)
📦 Colis #0003 → [██████░░░░░░░░░░] 40% - Tri en cours
📦 Colis #0042 → [░░░░░░░░░░░░░░░░] ERROR - Voir 'debug' command
📦 Colis #1337 → [████████████████] 100% ✓ Livre chez le dev

💡 Systeme logistique: WMS + WCS + TMS + OMS (oui, beaucoup d'acronymes)
📊 Taux de succes: 99.8% (sur les colis qu'on retrouve)
🤖 Automatisation: ACTIVE
☕ Niveau de cafe: OPTIMAL

Tout fonctionne... la plupart du temps. C'est deja pas mal!
    `,

    sudo: (args) => {
        const command = args.join(' ');
        if (command === 'hire-me' || command === 'hire me') {
            return `
[sudo] password for recruiter: ********
<span class="success">Access GRANTED!</span>

${createBox('🎯 ACCÈS PRIVILÉGIÉ ACCORDÉ 🎯')}

Félicitations! Vous avez découvert le mode admin.

${createMirrorContact()}
📍 Marcigny (71)

Status: DISPONIBLE IMMEDIATEMENT
Niveau: EXPERT TECHNIQUE (auto-proclame, mais confirme par les faits)
XP: 14 ans d'experience (et toutes mes dents)
Special Skill: Lecture de traces LMWCS (Unique! Et personne ne me l'envie)

<span class="success">✓ CV telecharge</span>
<span class="success">✓ Profil LinkedIn synchronise</span>
<span class="success">✓ Motivation: MAXIMALE (surtout avant 18h)</span>
<span class="success">✓ Cafe: EN STOCK</span>

Pret pour l'entretien! (promis, je serai a l'heure)
            `;
        }
        return `[sudo] password for recruiter: ********
Permission denied. Try: sudo hire-me`;
    },

    history: () => {
        if (commandHistory.length === 0) {
            return 'Aucune commande dans l\'historique.';
        }
        return commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');
    },

    'easter-eggs': () => `
${createBox('🥚 EASTER EGGS 🥚')}

Decouvrez les secrets caches:

☕ Une tasse de cafe se promene... Cliquez dessus!
🎮 Konami Code: haut haut bas bas gauche droite gauche droite B A
🐛 debug - Une session de debugging typique
📦 colis - Systeme logistique en action
🔐 sudo hire-me - Acces privilegie
💻 hacker - Pluie de code style Hollywood
☕ cafe - Le vrai carburant du developpeur

💡 D'autres secrets se cachent... ou pas. Faut bien garder du mystere!
    `,

    ls: () => `
📁 experience/
📁 projects/
📁 skills/
📄 about.md
📄 contact.md
📄 README.md
🔒 .secrets/
    `,

    'cat .secrets': () => `
<span class="glitch">Access Denied</span>
Mais puisque vous avez essaye... voici un indice:
Le cafe ☕ est cache quelque part dans ce terminal.
Tapez 'cafe' et voyez ce qui se passe!
    `,

    cafe: () => `
<span class="success glitch">
☕ LE VRAI CARBURANT DU DEV ☕
</span>

Vous avez trouve le secret cafe!

Mes superpouvoirs dependent directement du niveau de cafeine:
✓ 0 cafe: Capacite a lire du code = 0%
✓ 1 cafe: Je commence a comprendre ce que j'ai ecrit hier
✓ 2 cafes: Je peux lire les traces LMWCS (exploit rare)
✓ 3+ cafes: Je vois des patterns partout (peut-etre trop)

"Antoine sans cafe, c'est comme un serveur sans RAM."
- Moi-meme, a moi-meme, un lundi matin

Fun fact: Ce CV a necessite 4 cafes pour etre realise.

Achievement Unlocked: ☕ Barista of Code
+50 XP (et une pause bien meritee)
    `,

    // Alias pour goat redirige vers cafe
    goat: () => `
Ah, vous cherchez le GOAT? C'est gentil, mais soyons humbles...
Tapez plutot 'cafe' pour decouvrir mon vrai secret! ☕
    `,

    // Alias matrix et neo redirigent vers les nouvelles commandes
    matrix: () => {
        if (!codeRainActive) {
            startCodeRain();
            return `
<span class="success glitch">Mode hacker active!</span>
(Vous cherchiez peut-etre un film des annees 90?)

Tapez 'hacker' ou 'debug' pour plus de fun!
            `;
        }
        return 'Effet deja actif... patience!';
    },

    neo: () => `
Desole, pas de "The One" ici, juste un dev qui fait de son mieux!
Tapez 'debug' pour une vraie session de travail. ☕
    `
};

// Process command
function processCommand(cmd) {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commands[cmd.trim()]) {
        return commands[cmd.trim()]();
    } else if (commands[command]) {
        return commands[command](args);
    } else if (cmd.trim() === '') {
        return '';
    } else {
        return `<span class="error">Commande non reconnue: ${cmd}</span>
Tapez 'help' pour voir les commandes disponibles.`;
    }
}

// Display output
function displayOutput(command, result) {
    const cmdDiv = document.createElement('div');
    cmdDiv.className = 'command';
    cmdDiv.innerHTML = `<span class="prompt">antoine@expert-technique:~$</span> ${command}`;
    output.appendChild(cmdDiv);

    if (result) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        // Replace \n with <br> for proper line breaks in HTML
        resultDiv.innerHTML = result.replace(/\n/g, '<br>');
        output.appendChild(resultDiv);
    }

    terminal.scrollTop = terminal.scrollHeight;
}

// Input handler
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = input.value;
        if (command.trim() !== '') {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        }

        const result = processCommand(command);
        displayOutput(command, result);
        input.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
    }

    // Konami code detection
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        startCodeRain();
        displayOutput('', '<span class="success glitch">🎮 KONAMI CODE ACTIVATED! 🎮</span>\nMode hacker active! Pluie de code en cours...\n+100 XP pour avoir trouve ce secret old-school!');
        konamiCode = [];
    }
});

// Coffee Cup Easter Egg
function moveCoffeeRabbit() {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    coffeeRabbit.style.left = x + 'px';
    coffeeRabbit.style.top = y + 'px';
}

coffeeRabbit.addEventListener('click', () => {
    if (!coffeeRabbitClicked) {
        coffeeRabbitClicked = true;
        displayOutput('☕ Tasse de cafe attrapee!', `
<span class="success glitch">Vous avez attrape le cafe!</span>

Bravo, vous avez trouve la tasse de cafe errante!

"Un developpeur sans cafe, c'est comme un terminal sans prompt."

🔓 Achievement Unlocked: Coffee Hunter
${createMirrorContact()}

Le cafe vous donne de l'energie... Tapez 'cafe' ou 'debug' pour continuer!
        `);
        coffeeRabbit.style.display = 'none';
    }
});

// Move coffee cup every 5 seconds
setInterval(moveCoffeeRabbit, 5000);
moveCoffeeRabbit();

// Code Rain Effect (effet pluie de code style hacker)
function startCodeRain() {
    if (codeRainActive) return;
    codeRainActive = true;

    const codeContainer = document.createElement('div');
    codeContainer.className = 'matrix-rain';
    document.body.appendChild(codeContainer);

    // Mix de caracteres: code, symboles, et un peu de fun
    const chars = '{}[]()<>=!+-*/&|;:,.0123456789ABCDEFabcdef$#@%^_~`☕🐛💻';

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * window.innerWidth + 'px';
            char.style.animationDuration = (Math.random() * 3 + 2) + 's';
            codeContainer.appendChild(char);

            setTimeout(() => char.remove(), 5000);
        }, i * 100);
    }

    setTimeout(() => {
        codeContainer.remove();
        codeRainActive = false;
    }, 10000);
}

// Keep focus on input
document.addEventListener('click', () => {
    input.focus();
});

// Initial focus
input.focus();
