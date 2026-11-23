# Fibra & Sociedade — Portal Educativo sobre Infraestrutura Óptica

Portal web educativo desenvolvido para a disciplina de **Desenvolvimento Web**, com o objetivo de democratizar o conhecimento técnico e socioeconômico sobre a infraestrutura física da internet — desde os princípios físicos da luz até a malha submarina global e a conectividade no Brasil.

---

## Destaques Técnicos e Implementações

### 1. Caráter Educativo e Arquitetura de Conteúdo
O projeto foi estruturado em três páginas interligadas para conduzir o visitante de forma progressiva:
* **Início & Fundamentos (`index.html`):** Explica o fenômeno físico da *Reflexão Interna Total*, a evolução histórica (do cabo telegráfico de 1858 e o coaxial TAT-1 à fibra óptica), a comparação entre fibras *Monomodo* e *Multimodo* e o impacto social da banda larga.
* **Malha Submarina Global (`cabos.html`):** Detalha a anatomia das 8 camadas de proteção de um cabo oceânico, a amplificação óptica (EDFA/Raman) e permite filtrar os principais sistemas conectados ao Brasil por continente.
* **Rede no Brasil (`distribuicao.html`):** Analisa o papel estratégico do *hub* de Fortaleza, a topologia do *backbone* nacional (Rede Ipê / RNP), as infovias fluviais do *Programa Norte Conectado* e oferece um comparador interativo entre tecnologias (ADSL, Coaxial e FTTH).

### 2. Globo Terrestre 3D Interativo (`Globe.gl`)
Para representar a escala real da infraestrutura física da internet — onde cerca de 99% do tráfego intercontinental passa pelo fundo dos oceanos — foi integrado um globo terrestre 3D interativo via CDN utilizando a biblioteca **`Globe.gl`** (baseada em WebGL e Three.js):
* Mapeamento de **38 grandes sistemas submarinos reais** e **31 pontos de aterrissagem** (*landing stations*) distribuídos por todos os continentes.
* Suporte a rotação livre, zoom, animação de fluxo de dados e inspeção individual de extensão (km) e capacidade (Tbps) ao passar o cursor sobre cada rota.

### 3. Implementação de Tema Claro e Escuro (Dark / Light Mode)
Para garantir conforto visual e acessibilidade em diferentes ambientes de leitura, o sistema conta com alternância dinâmica de temas sem recarregar a página:
* **CSS Custom Properties (`:root` e `[data-theme="dark"]`):** Toda a paleta de cores, superfícies, bordas e sombras é controlada por variáveis CSS nativas.
* **Persistência via JavaScript (`localStorage`):** O script detecta e salva a preferência do usuário no navegador, mantendo o tema escolhido durante a navegação entre as três páginas do portal.

---

## Estrutura de Arquivos

```text
├── index.html                  # Página inicial: fundamentos físicos e impacto social
├── cabos.html                  # Malha submarina global e globo 3D interativo
├── distribuicao.html           # Infraestrutura nacional e comparador de tecnologias
├── evolucao_rede_ipe_2.png     # Mapa da topologia do backbone nacional (RNP)
├── css/
│   └── style.css               # Estilização responsiva e variáveis de tema claro/escuro
└── js/
    └── main.js                 # Lógica do tema, globo 3D, filtros e simulador
