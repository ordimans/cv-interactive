// Matrix CV - Antoine JACROT - Celui qui a pris la mauvaise pilule

// Anti-bot: contact data stored reversed
const secretContact = {
    email: 'moc.liamg@torcaj.eniotna',
    tel: '8️⃣0️⃣ 3️⃣5️⃣ 4️⃣5️⃣ 3️⃣4️⃣ 6️⃣0️⃣'
};

window.revealEmailMirror = function() {
    const el = document.getElementById('email-mirror-mx');
    if (el) {
        const revealed = secretContact.email.split('').reverse().join('');
        el.style.filter = 'none';
        el.innerHTML = `${revealed} <button onclick="copyToClipboard('${revealed}', 'email')" style="cursor: pointer; padding: 3px 8px; background: #0f0; color: #000; border: none; border-radius: 3px; margin-left: 10px; font-size: 0.8rem;">📋</button>`;
        el.onclick = null;
    }
};

window.revealTelMirror = function() {
    const el = document.getElementById('tel-mirror-mx');
    if (el) {
        const revealed = secretContact.tel.split('').reverse().join('');
        const plain = '0643545308';
        el.style.filter = 'none';
        el.innerHTML = `${revealed} <button onclick="copyToClipboard('${plain}', 'tel')" style="cursor: pointer; padding: 3px 8px; background: #0f0; color: #000; border: none; border-radius: 3px; margin-left: 10px; font-size: 0.8rem;">📋</button>`;
        el.onclick = null;
    }
};

window.copyToClipboard = function(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`✓ ${type === 'email' ? 'Email' : 'Téléphone'} copié dans le presse-papiers!`);
    });
};

// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = chars.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrixRain() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrixRain, 50);

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Pills Choice
    const bluePill = document.getElementById('blue-pill');
    const redPill = document.getElementById('red-pill');
    const choiceContainer = document.getElementById('choice-container');
    const cvContent = document.getElementById('cv-content');
    const whiteRabbit = document.getElementById('white-rabbit');

    bluePill.addEventListener('click', () => {
        alert('💊 PILULE BLEUE\n\n' +
              'Vous choisissez la sécurité...\n' +
              'Téléchargement du CV classique en cours...\n\n' +
              '(En vrai: Le CV PDF est dans /Users/antoine/Downloads/)\n' +
              'Redirection vers le Terminal CV...');

        // Redirect to terminal version
        window.location.href = '../version1-terminal/index.html';
    });

    redPill.addEventListener('click', () => {
        alert('💊 PILULE ROUGE\n\n' +
              '"Avez-vous pensé à élargir vos critères de recherche?"\n' +
              '- France Travail\n\n' +
              'Chargement de la Matrice...');

        choiceContainer.style.transition = 'opacity 1s';
        choiceContainer.style.opacity = '0';

        setTimeout(() => {
            choiceContainer.classList.add('hidden');
            cvContent.classList.remove('hidden');
            cvContent.style.opacity = '0';
            cvContent.style.transition = 'opacity 2s';

            setTimeout(() => {
                cvContent.style.opacity = '1';
            }, 100);
        }, 1000);
    });

    // White Rabbit Movement
    function moveWhiteRabbit() {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        whiteRabbit.style.left = x + 'px';
        whiteRabbit.style.top = y + 'px';
    }

    setInterval(moveWhiteRabbit, 4000);
    moveWhiteRabbit();

    let rabbitClicks = 0;
    whiteRabbit.addEventListener('click', () => {
        rabbitClicks++;

        if (rabbitClicks === 1) {
            alert('🐰 Follow the white rabbit...\n\nContinuez à cliquer!');
        } else if (rabbitClicks === 3) {
            alert('🐰 Vous suivez le lapin blanc...\n\n"Knock, knock, Neo."\n\nDécouvrez la vérité dans le CV!');
            whiteRabbit.style.display = 'none';

            // Show GOAT Easter Egg after following the rabbit
            setTimeout(() => {
                const goatEgg = document.getElementById('goat-easter-egg');
                goatEgg.classList.remove('hidden');
            }, 2000);
        }
    });

    // Packages Animation
    const packagesContainer = document.getElementById('packages-container');
    const packageStatuses = [
        { id: '#001', status: '✓ Livré', progress: 100 },
        { id: '#002', status: '▶ En transit', progress: 75 },
        { id: '#003', status: '▶ Tri en cours', progress: 50 },
        { id: '#042', status: '⚠ ERROR', progress: 0, glitch: true }
    ];

    function createPackages() {
        packagesContainer.innerHTML = '';

        packageStatuses.forEach(pkg => {
            const div = document.createElement('div');
            div.className = 'package' + (pkg.glitch ? ' glitching' : '');
            div.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 10px;">📦</div>
                <div style="font-weight: bold;">Colis ${pkg.id}</div>
                <div style="color: ${pkg.glitch ? '#ff0000' : 'var(--matrix-green)'}; margin: 10px 0;">
                    ${pkg.status}
                </div>
                <div style="height: 5px; background: rgba(0,255,65,0.1); border-radius: 5px; overflow: hidden;">
                    <div style="height: 100%; width: ${pkg.progress}%; background: ${pkg.glitch ? '#ff0000' : 'var(--matrix-green)'};"></div>
                </div>
            `;

            if (pkg.glitch) {
                div.addEventListener('click', () => {
                    alert('📦 Colis #042 - ERREUR DÉTECTÉE\n\n' +
                          'Personne ne veut débugger ça... sauf moi.\n' +
                          '(Parce que personne d\'autre ne comprend les traces)\n\n' +
                          'Traces LMWCS:\n' +
                          '[ERROR] Scanner #3 - Barcode failure\n' +
                          '[ERROR] Destination unknown\n\n' +
                          '👓 Solution: Recalibration scanner #3\n' +
                          '✓ Colis redirigé (après 3 cafés et 2h de debug)');
                });
            }

            packagesContainer.appendChild(div);
        });
    }

    createPackages();

    // Hire Button
    const hireButton = document.getElementById('hire-button');
    hireButton.addEventListener('click', () => {
        alert('🚀 PRÊT À RECRUTER CE TYPE BIZARRE?\n\n' +
              'Celui qui lit les traces LMWCS pour le fun.\n' +
              'Celui qui automatise des trucs que personne n\'a demandés.\n' +
              'Celui qui dit "c\'est pas un bug, c\'est une feature".\n\n' +
              'Cliquez sur les miroirs 🪞 dans la section CONTACT\n' +
              'pour révéler les informations de contact!\n\n' +
              '📧 Email et 📱 Téléphone sont protégés contre les bots.\n' +
              '(Parce que même mes coordonnées sont over-engineered)');
    });
});
