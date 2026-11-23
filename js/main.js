document.addEventListener('DOMContentLoaded', () => {
    // Alternância e persistência do tema escuro/claro
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Globo 3D interativo via biblioteca externa Globe.gl
    const mapContainer = document.getElementById('submarine-map-container');
    if (mapContainer && typeof Globe !== 'undefined') {
        const submarineCables = [
            // Brasil
            { name: 'EllaLink (Fortaleza - Sines/Portugal | 6.200 km | 100 Tbps)', startLat: -3.7172, startLng: -38.5433, endLat: 37.9562, endLng: -8.8698, color: '#38bdf8' },
            { name: 'Monet (Fortaleza - Boca Raton/EUA | 10.556 km | 64 Tbps)', startLat: -3.7172, startLng: -38.5433, endLat: 26.3683, endLng: -80.1289, color: '#22d3ee' },
            { name: 'Monet (Praia Grande/SP - Fortaleza)', startLat: -24.0084, startLng: -46.4121, endLat: -3.7172, endLng: -38.5433, color: '#22d3ee' },
            { name: 'BRUSA (Rio de Janeiro - Virginia Beach/EUA | 11.000 km | 160 Tbps)', startLat: -22.9068, startLng: -43.1729, endLat: 36.8529, endLng: -75.9780, color: '#34d399' },
            { name: 'Seabras-1 (Praia Grande/SP - Nova York/EUA | 10.800 km | 72 Tbps)', startLat: -24.0084, startLng: -46.4121, endLat: 40.7128, endLng: -74.0060, color: '#38bdf8' },
            { name: 'Firmina (Praia Grande/SP - Myrtle Beach/EUA | 14.517 km | 240 Tbps)', startLat: -24.0084, startLng: -46.4121, endLat: 33.6891, endLng: -78.8867, color: '#fbbf24' },
            { name: 'Firmina (Praia Grande/SP - Las Toninas/Argentina)', startLat: -24.0084, startLng: -46.4121, endLat: -36.4735, endLng: -56.6956, color: '#fbbf24' },
            { name: 'Malbec (Rio de Janeiro - Las Toninas/Argentina | 2.600 km)', startLat: -22.9068, startLng: -43.1729, endLat: -36.4735, endLng: -56.6956, color: '#fbbf24' },
            { name: 'SACS (Fortaleza - Luanda/Angola | 6.165 km | 40 Tbps)', startLat: -3.7172, startLng: -38.5433, endLat: -8.8390, endLng: 13.2894, color: '#a78bfa' },
            { name: 'SAIL (Fortaleza - Kribi/Camarões | 5.800 km | 32 Tbps)', startLat: -3.7172, startLng: -38.5433, endLat: 2.9373, endLng: 9.9077, color: '#f472b6' },

            // Pacífico Sul e América Latina
            { name: 'Curie (Los Angeles/EUA - Valparaíso/Chile | 10.500 km | 72 Tbps)', startLat: 33.9416, startLng: -118.4085, endLat: -33.0472, endLng: -71.6127, color: '#34d399' },
            { name: 'Mistral (Guatemala - Valparaíso/Chile | 7.300 km)', startLat: 13.9242, startLng: -90.8247, endLat: -33.0472, endLng: -71.6127, color: '#22d3ee' },
            { name: 'SAm-1 (Boca Raton/EUA - Lima/Peru)', startLat: 26.3683, startLng: -80.1289, endLat: -12.0464, endLng: -77.0428, color: '#38bdf8' },
            { name: 'Humboldt (Valparaíso/Chile - Sydney/Austrália | Rota Transpacífica Sul)', startLat: -33.0472, startLng: -71.6127, endLat: -33.8688, endLng: 151.2093, color: '#f472b6' },

            // Atlântico Norte
            { name: 'Marea (Virginia Beach/EUA - Bilbao/Espanha | 6.605 km | 200 Tbps)', startLat: 36.8529, startLng: -75.9780, endLat: 43.2630, endLng: -2.9350, color: '#38bdf8' },
            { name: 'Dunant (Virginia Beach/EUA - Saint-Hilaire/França | 6.400 km | 250 Tbps)', startLat: 36.8529, startLng: -75.9780, endLat: 46.7214, endLng: -1.9461, color: '#fbbf24' },
            { name: 'Grace Hopper (Nova York/EUA - Bude/Reino Unido | 6.250 km | 352 Tbps)', startLat: 40.7128, startLng: -74.0060, endLat: 50.8249, endLng: -4.5432, color: '#34d399' },
            { name: 'Grace Hopper (Nova York/EUA - Bilbao/Espanha)', startLat: 40.7128, startLng: -74.0060, endLat: 43.2630, endLng: -2.9350, color: '#34d399' },
            { name: 'Amitié (Boston/EUA - Bude/Reino Unido & Le Porge/França | 400 Tbps)', startLat: 42.3601, startLng: -71.0589, endLat: 44.8725, endLng: -1.1417, color: '#a78bfa' },
            { name: 'Havfrue / AEC-2 (Nova Jersey/EUA - Esbjerg/Dinamarca | 7.200 km)', startLat: 40.2206, startLng: -74.0121, endLat: 55.4765, endLng: 8.4594, color: '#22d3ee' },

            // África
            { name: 'Equiano (Sesimbra/Portugal - Lagos/Nigéria & Cidade do Cabo | 144 Tbps)', startLat: 38.4445, startLng: -9.1015, endLat: 6.5244, endLng: 3.3792, color: '#38bdf8' },
            { name: 'Equiano Sul (Lagos/Nigéria - Cidade do Cabo/África do Sul)', startLat: 6.5244, startLng: 3.3792, endLat: -33.9249, endLng: 18.4241, color: '#38bdf8' },
            { name: '2Africa Oeste (Bude/Reino Unido - Dakar/Senegal & Acra/Gana)', startLat: 50.8249, startLng: -4.5432, endLat: 14.7167, endLng: -17.4677, color: '#fbbf24' },
            { name: '2Africa Sul (Dakar/Senegal - Cidade do Cabo/África do Sul | 45.000 km)', startLat: 14.7167, startLng: -17.4677, endLat: -33.9249, endLng: 18.4241, color: '#fbbf24' },
            { name: '2Africa Leste (Cidade do Cabo - Mombaça/Quênia & Djibuti)', startLat: -33.9249, startLng: 18.4241, endLat: -4.0435, endLng: 39.6682, color: '#fbbf24' },
            { name: '2Africa Mar Vermelho (Mombaça/Quênia - Suez/Egito & Marselha/França)', startLat: -4.0435, startLng: 39.6682, endLat: 43.2965, endLng: 5.3698, color: '#fbbf24' },

            // Europa, Oriente Médio e Ásia
            { name: 'SEA-ME-WE 5 (Marselha/França - Alexandria/Egito | 20.000 km)', startLat: 43.2965, startLng: 5.3698, endLat: 31.2001, endLng: 29.9187, color: '#22d3ee' },
            { name: 'SEA-ME-WE 5 (Suez/Egito - Fujairah/Emirados Árabes & Mumbai/Índia)', startLat: 29.9668, startLng: 32.5498, endLat: 19.0760, endLng: 72.8777, color: '#22d3ee' },
            { name: 'SEA-ME-WE 5 (Mumbai/Índia - Singapura | 24 Tbps)', startLat: 19.0760, startLng: 72.8777, endLat: 1.3521, endLng: 103.8198, color: '#22d3ee' },
            { name: 'PEACE Cable (Marselha/França - Karachi/Paquistão & Singapura | 15.000 km)', startLat: 43.2965, startLng: 5.3698, endLat: 24.8607, endLng: 67.0011, color: '#a78bfa' },
            { name: 'APG / SJC (Singapura - Hong Kong & Tóquio/Japão | 10.400 km)', startLat: 1.3521, startLng: 103.8198, endLat: 22.3193, endLng: 114.1694, color: '#34d399' },
            { name: 'APG Norte (Hong Kong - Xangai/China & Tóquio/Japão)', startLat: 22.3193, startLng: 114.1694, endLat: 35.6762, endLng: 139.6503, color: '#34d399' },

            // Transpacífico
            { name: 'FASTER (Chikura/Japão - Bandon/Oregon, EUA | 9.000 km | 60 Tbps)', startLat: 34.9760, startLng: 139.9547, endLat: 43.1190, endLng: -124.4084, color: '#38bdf8' },
            { name: 'JUPITER (Maruyama/Japão - Los Angeles/EUA | 14.557 km | 60+ Tbps)', startLat: 35.0394, startLng: 139.9825, endLat: 33.9416, endLng: -118.4085, color: '#fbbf24' },
            { name: 'PLCN (Hong Kong & Taiwan - El Segundo/Califórnia, EUA | 12.800 km | 144 Tbps)', startLat: 25.0330, startLng: 121.5654, endLat: 33.9192, endLng: -118.4165, color: '#f472b6' },

            // Oceania
            { name: 'Southern Cross NEXT (Sydney/Austrália - Auckland/Nova Zelândia & Los Angeles/EUA)', startLat: -33.8688, startLng: 151.2093, endLat: 33.9416, endLng: -118.4085, color: '#a78bfa' },
            { name: 'Indigo-West (Singapura - Perth/Austrália | 4.600 km | 36 Tbps)', startLat: 1.3521, startLng: 103.8198, endLat: -31.9505, endLng: 115.8605, color: '#22d3ee' },
            { name: 'Indigo-Central (Perth - Sydney/Austrália)', startLat: -31.9505, startLng: 115.8605, endLat: -33.8688, endLng: 151.2093, color: '#22d3ee' }
        ];

        // Pontos de aterrissagem globais
        const landingPoints = [
            { lat: -3.7172, lng: -38.5433, label: 'Fortaleza - CE (Hub Brasil)' },
            { lat: -22.9068, lng: -43.1729, label: 'Rio de Janeiro - RJ' },
            { lat: -24.0084, lng: -46.4121, label: 'Praia Grande / Santos - SP' },
            { lat: -36.4735, lng: -56.6956, label: 'Las Toninas (Argentina)' },
            { lat: -33.0472, lng: -71.6127, label: 'Valparaíso (Chile)' },
            { lat: -12.0464, lng: -77.0428, label: 'Lima (Peru)' },
            { lat: 26.3683, lng: -80.1289, label: 'Boca Raton (Flórida, EUA)' },
            { lat: 33.6891, lng: -78.8867, label: 'Myrtle Beach (Carolina do Sul, EUA)' },
            { lat: 36.8529, lng: -75.9780, label: 'Virginia Beach (EUA)' },
            { lat: 40.7128, lng: -74.0060, label: 'Nova York / Nova Jersey (EUA)' },
            { lat: 33.9416, lng: -118.4085, label: 'Los Angeles (Califórnia, EUA)' },
            { lat: 43.1190, lng: -124.4084, label: 'Bandon (Oregon, EUA)' },
            { lat: 37.9562, lng: -8.8698, label: 'Sines / Sesimbra (Portugal)' },
            { lat: 43.2630, lng: -2.9350, label: 'Bilbao (Espanha)' },
            { lat: 50.8249, lng: -4.5432, label: 'Bude (Reino Unido)' },
            { lat: 43.2965, lng: 5.3698, label: 'Marselha (Hub Mediterrâneo, França)' },
            { lat: 55.4765, lng: 8.4594, label: 'Esbjerg (Dinamarca)' },
            { lat: 14.7167, lng: -17.4677, label: 'Dakar (Senegal)' },
            { lat: 6.5244, lng: 3.3792, label: 'Lagos (Nigéria)' },
            { lat: 2.9373, lng: 9.9077, label: 'Kribi (Camarões)' },
            { lat: -8.8390, lng: 13.2894, label: 'Luanda (Angola)' },
            { lat: -33.9249, lng: 18.4241, label: 'Cidade do Cabo (África do Sul)' },
            { lat: -4.0435, lng: 39.6682, label: 'Mombaça (Quênia)' },
            { lat: 31.2001, lng: 29.9187, label: 'Alexandria / Suez (Egito)' },
            { lat: 19.0760, lng: 72.8777, label: 'Mumbai (Índia)' },
            { lat: 1.3521, lng: 103.8198, label: 'Singapura (Maior Hub da Ásia)' },
            { lat: 22.3193, lng: 114.1694, label: 'Hong Kong' },
            { lat: 25.0330, lng: 121.5654, label: 'Taipei (Taiwan)' },
            { lat: 35.6762, lng: 139.6503, label: 'Tóquio / Chikura (Japão)' },
            { lat: -31.9505, lng: 115.8605, label: 'Perth (Austrália)' },
            { lat: -33.8688, lng: 151.2093, label: 'Sydney (Austrália)' }
        ];

        // Instancia o globo 3D com a biblioteca Globe.gl
        const world = Globe()(mapContainer)
            .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
            .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
            .arcsData(submarineCables)
            .arcLabel('name')
            .arcColor('color')
            .arcDashLength(0.45)
            .arcDashGap(0.15)
            .arcDashAnimateTime(2000)
            .arcStroke(0.65)
            .pointsData(landingPoints)
            .pointLabel('label')
            .pointColor(() => '#ffffff')
            .pointAltitude(0.015)
            .pointRadius(0.4);

        world.pointOfView({ lat: 5, lng: -25, altitude: 2.2 });

        window.addEventListener('resize', () => {
            world.width(mapContainer.clientWidth);
            world.height(mapContainer.clientHeight);
        });
    }

    // Filtro de rotas por região
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cableCards = document.querySelectorAll('#cables-list .card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                cableCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-region') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Comparador interativo de tecnologias
    const techButtons = document.querySelectorAll('.tech-btn');
    const techResult = document.getElementById('tech-result');

    const techData = {
        adsl: {
            title: 'Cabo Metálico (ADSL — Par Trançado de Cobre)',
            speed: 'Até 15 a 35 Mbps (assimétrico — upload muito baixo)',
            latency: 'Alta (30 ms a 70 ms)',
            impact: 'Predominou no Brasil nos anos 2000. Sofre perda severa de sinal conforme a distância da central telefônica e inviabiliza videochamadas em alta definição ou trabalho remoto simultâneo.'
        },
        coaxial: {
            title: 'Cabo Coaxial (HFC — Híbrido Fibra-Coaxial)',
            speed: '100 Mbps a 500 Mbps (download alto, upload limitado)',
            latency: 'Moderada (15 ms a 30 ms)',
            impact: 'Utiliza fibra até o bairro e cabo coaxial até a residência. Como a banda é compartilhada entre vizinhos no mesmo nó, sofre lentidão nos horários de pico.'
        },
        fibra: {
            title: 'Fibra Óptica (FTTH — Fiber-to-the-Home)',
            speed: '300 Mbps a 2+ Gbps (simétrico ou alta taxa de upload)',
            latency: 'Ultrabaixa (2 ms a 8 ms)',
            impact: 'Padrão atual de infraestrutura no Brasil. Imune a interferências eletromagnéticas, sustenta telemedicina, educação online, computação em nuvem e múltiplos dispositivos conectados sem degradação.'
        }
    };

    function renderTechInfo(techKey) {
        if (!techResult || !techData[techKey]) return;
        const info = techData[techKey];
        techResult.innerHTML = `
            <h4>${info.title}</h4>
            <p><strong>Velocidade Típica:</strong> ${info.speed}</p>
            <p><strong>Latência Média:</strong> ${info.latency}</p>
            <p><strong>Impacto na Experiência Social:</strong> ${info.impact}</p>
        `;
    }

    if (techButtons.length > 0 && techResult) {
        renderTechInfo('adsl');

        techButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                techButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const selectedTech = btn.getAttribute('data-tech');
                renderTechInfo(selectedTech);
            });
        });
    }
});