window.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const cardSound = document.getElementById("card-sound");
    const flipSound = document.getElementById("flip-sound");
    const startBtn = document.getElementById("start-button");
  
    const winMessage = document.getElementById("win-message");
  const restartButton = document.getElementById("restart-button");
  
  
    const concepts = [
      { value: "solicitud", text: "Solicitud de información", img: "solicitud.png" },
      { value: "transparencia", text: "Transparencia proactiva", img: "transparencia.png" },
      { value: "inai", text: "INAI", img: "inai.png" },
      { value: "edificios", text: "Sujetos obligados", img: "edificios.png" },
      { value: "candado", text: "Datos personales", img: "candado.png" },
      { value: "recurso", text: "Recurso de revisión", img: "recurso.png" },
      { value: "ley", text: "Ley de Transparencia", img: "ley.png" },
      { value: "pnt", text: "Plataforma Nacional de Transparencia", img: "pnt.png" },
      { value: "acceso", text: "Acceso a la información pública", img: "acceso.png" },
      { value: "puebla", text: "Estado de Puebla", img: "puebla.png" },
      { value: "obligaciones", text: "Obligaciones de transparencia", img: "obligaciones.png" },
      { value: "unidad", text: "Unidad de Transparencia", img: "unidad.png" },
      { value: "infomex", text: "Sistema Infomex Puebla", img: "infomex.png" },
      { value: "sueldos", text: "Consulta de sueldos públicos", img: "sueldos.png" },
      { value: "privacidad", text: "Protección de datos personales", img: "privacidad.png" }
    ];
    
    const cols = 6;
    const cardSize = 80;
    const gap = 80;
    const totalSize = cardSize + gap;
    
    let flippedCards = [];
    let lockBoard = false;
    let matchedPairs = 0;
    const totalPairs = concepts.length;
    
    
    const playCardSound = () => {
      cardSound.currentTime = 0;
      cardSound.play().catch(err => console.log("No se pudo reproducir el sonido de la carta:", err));
    };
    
    const playFlipSound = () => {
      flipSound.currentTime = 0;
      flipSound.play().catch(err => console.log("No se pudo reproducir el sonido del flip:", err));
    };
    
    function repartirCartas() {
      matchedPairs = 0;
      
      board.innerHTML = "";
      flippedCards = [];
      lockBoard = false;
    
      const pairedCards = concepts.flatMap(({ value, text, img }) => ([
        { type: "image", value, content: `<img src="${img}" alt="${value}" class="card-icon">` },
        { type: "text", value, content: `<span class="card-text">${text}</span>` }
      ]));
    
      const shuffled = pairedCards.sort(() => Math.random() - 0.5);
    
      shuffled.forEach((cardData, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.setProperty('--i', index);
    
        const row = Math.floor(index / cols);
        const col = index % cols;
        card.style.setProperty('--top', `${row * totalSize}px`);
        card.style.setProperty('--left', `${col * totalSize}px`);
    
        const inner = document.createElement("div");
        inner.className = "card-inner";
    
        const front = document.createElement("div");
        front.className = "card-front";
        front.innerHTML = cardData.content;
    
        const back = document.createElement("div");
        back.className = "card-back";
    
        card.dataset.value = cardData.value;
    
        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        board.appendChild(card);
    
        card.addEventListener("click", () => {
          if (lockBoard || card.classList.contains("flipped")) return;
    
          card.classList.add("flipped");
          playFlipSound();
          flippedCards.push(card);
    
          if (flippedCards.length === 2) {
            lockBoard = true;
            const [first, second] = flippedCards;
            if (first.dataset.value === second.dataset.value) {
              flippedCards = [];
              lockBoard = false;
              matchedPairs++;
            
              if (matchedPairs === totalPairs) {
                setTimeout(() => {
                  winMessage.removeAttribute("hidden");
                }, 500);
              }
              
            }
            
             else {
              setTimeout(() => {
                first.classList.remove("flipped");
                second.classList.remove("flipped");
                flippedCards = [];
                lockBoard = false;
              }, 900);
            }
          }
        });
    
        setTimeout(() => {
          playCardSound();
        }, index * 50);
      });
    }
    
    startBtn.addEventListener("click", () => {
      startBtn.remove();
      repartirCartas();
    });
    
    
    
    
    restartButton.addEventListener("click", () => {
      repartirCartas();
      winMessage.setAttribute("hidden", true);
    });
    
  
  });
  
  
  
  