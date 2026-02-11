        // --- LÓGICA DE PARTÍCULAS DE FONDO ---
        const particleContainer = document.getElementById('particles-container');
        const particleCount = 50; // Cantidad de corazones
        const particles = [];

        // Colores románticos
        const colors = ['#ff4d6d', '#c9184a', '#ff758f', '#ffb3c1', '#a4133c'];

        // Crear corazones
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('heart-particle');
            
            // Tamaño aleatorio
            const size = Math.random() * 20 + 10; // Entre 10px y 30px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Color aleatorio
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Posición inicial aleatoria
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            // Velocidad de movimiento (factor de profundidad)
            const speed = Math.random() * 0.05 + 0.02;
            
            particleContainer.appendChild(particle);
            
            // Guardamos datos para la animación
            particles.push({
                element: particle,
                x: x,
                y: y,
                speed: speed,
                initialX: x,
                initialY: y
            });
        }

        // Evento de movimiento del mouse
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Mover cada partícula
            particles.forEach(p => {
                // Calculamos el desplazamiento opuesto al mouse (Parallax)
                const offsetX = (mouseX - window.innerWidth / 2) * p.speed * -1;
                const offsetY = (mouseY - window.innerHeight / 2) * p.speed * -1;

                // Aplicamos transformación manteniendo la rotación del corazón
                p.element.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(-45deg)`;
            });
        });

        // --- LÓGICA DEL JUEGO (SI/NO) ---
        const modalProposal = document.getElementById('modal-proposal');
        const modalSuccess = document.getElementById('modal-success');
        const btnOpen = document.getElementById('btn-open-proposal');
        const btnYes = document.getElementById('btn-yes');
        const btnNo = document.getElementById('btn-no');
        let scaleSize = 1;

        btnOpen.addEventListener('click', () => {
            modalProposal.classList.add('show');
        });

        btnNo.addEventListener('click', () => {
            scaleSize += 0.5; 
            btnYes.style.transform = `scale(${scaleSize})`;
            const frases = ["¿Estás segura?", "¡Piénsalo bien!", "¡No seas maluca!", "¡Mira el verde!", "¡Te voy a dar comida!"];
            btnNo.innerText = frases[Math.floor(Math.random() * frases.length)];
            // Mueve el botón NO aleatoriamente un poco para confundir
            btnNo.style.transform = `translate(${Math.random()*50 - 25}px, ${Math.random()*50 - 25}px)`;
        });

        btnYes.addEventListener('click', () => {
            modalProposal.classList.remove('show');
            modalSuccess.classList.add('show');
            launchConfetti(); // Función extra (simulada)
        });

        modalSuccess.addEventListener('click', (e) => {
            if (e.target === modalSuccess) {
                modalSuccess.classList.remove('show');
            }
        });
        
        // Ajustar partículas si se cambia tamaño de ventana
        window.addEventListener('resize', () => {
            particles.forEach(p => {
                p.initialX = Math.random() * window.innerWidth;
                p.initialY = Math.random() * window.innerHeight;
                p.element.style.left = `${p.initialX}px`;
                p.element.style.top = `${p.initialY}px`;
            });
        });