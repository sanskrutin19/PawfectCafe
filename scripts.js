document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader Logic ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    });

    // --- Parallax Hero Logic ---
    const hero = document.getElementById('hero-section');
    window.addEventListener('scroll', () => {
        let offset = window.pageYOffset;
        if (hero) {
             hero.style.backgroundPositionY = offset * 0.5 + 'px';
        }
    });

    // --- On-Scroll Animation Logic (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { 
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => { scrollObserver.observe(element); });

    // --- Experience Tabs Logic ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => {
                if (content.id === tabId) { content.classList.add('active'); } 
                else { content.classList.remove('active'); }
            });
        });
    });

    // --- Pet Data and Modals ---
    const petModal = document.getElementById('pet-modal');
    const petModalBody = document.getElementById('modal-body');
    const closePetModalBtn = document.getElementById('close-modal-btn');
    const openPetModalBtns = document.querySelectorAll('.open-modal-btn');
    
    const petData = {
        mittens: { name: "Mittens", image: "images/mittens.jpg", age: "2 years old", story: "Mittens is a sweet, gentle soul...", personality: { weekend: "homebody", noise: "quiet" } },
        buster: { name: "Buster", image: "images/buster.webp", age: "3 years old", story: "Buster is a happy-go-lucky goofball...", personality: { weekend: "adventurer", noise: "lively" } },
        shadow: { name: "Shadow", image: "images/shadow.jpg", age: "1 year old", story: "Shadow is shy at first...", personality: { weekend: "homebody", noise: "lively" } }
    };
    
    const openPetModal = (petId) => {
        const pet = petData[petId];
        if (pet) {
            petModalBody.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}" style="width:100%; height: auto; border-radius: 8px; margin-bottom: 1rem;">
                <h2>${pet.name}</h2>
                <p><strong>Age:</strong> ${pet.age}</p><p>${pet.story}</p>
                <button class="btn btn-primary" style="margin-top: 1rem;">Apply to Adopt</button>
            `;
            petModal.style.display = 'flex';
            document.body.classList.add('modal-open');
        }
    };
    
    const closePetModal = () => { petModal.style.display = 'none'; document.body.classList.remove('modal-open'); };
    openPetModalBtns.forEach(btn => { btn.addEventListener('click', () => { openPetModal(btn.dataset.pet); }); });
    closePetModalBtn.addEventListener('click', closePetModal);
    petModal.addEventListener('click', (e) => { if (e.target === petModal) { closePetModal(); } });

    // --- Menu Modal Logic ---
    const menuModal = document.getElementById('menu-modal');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const openMenuBtn = document.getElementById('open-menu-btn');
    const menuModalBody = document.getElementById('menu-modal-body');

    const openMenuModal = () => {
        menuModalBody.innerHTML = `
            <div>
                <h2>Our Menu</h2>
                <div class="menu-columns">
                    <div class="menu-column">
                        <h3>Coffee & Drinks ☕</h3>
                        <ul>
                            <li><strong>Espresso:</strong> $3.00</li> <li><strong>Lavender Latte:</strong> $5.50</li>
                            <li><strong>The Cat-purr-cino:</strong> $5.00</li> <li><strong>Mocha:</strong> $5.00</li>
                        </ul>
                    </div>
                    <div class="menu-column">
                        <h3>Bakery & Food 🥐</h3>
                        <ul>
                            <li><strong>Blueberry Scone:</strong> $4.00</li> <li><strong>Avocado Toast:</strong> $8.00</li>
                        </ul>
                    </div>
                    <div class="menu-column">
                        <h3>For Paws 🐾</h3>
                        <ul>
                            <li><strong>Pup-uccino:</strong> $2.00</li> <li><strong>Kitty Kustard:</strong> $2.00</li>
                        </ul>
                    </div>
                </div>
            </div>`;
        menuModal.style.display = 'flex';
        document.body.classList.add('modal-open');
    };
    const closeMenuModal = () => { menuModal.style.display = 'none'; document.body.classList.remove('modal-open'); };
    openMenuBtn.addEventListener('click', openMenuModal);
    closeMenuBtn.addEventListener('click', closeMenuModal);
    menuModal.addEventListener('click', (e) => { if (e.target === menuModal) { closeMenuModal(); } });
    
    // --- Carousel Logic ---
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const slides = Array.from(carouselTrack.children);
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        let currentIndex = 0;
        const updateCarousel = () => {
            if (slides.length > 0) {
                carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
        };
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
            });
        }
    }

    // --- Pet Matchmaking Quiz Logic ---
    const quizForm = document.getElementById('personality-quiz');
    const quizResults = document.getElementById('quiz-results');
    const resultPetCard = document.getElementById('result-pet-card');
    
    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const q1Answer = quizForm.elements['q1'].value;
            const q2Answer = quizForm.elements['q2'].value;
            let matchedPet = null;

            for (const petId in petData) {
                const pet = petData[petId];
                if (pet.personality.weekend === q1Answer && pet.personality.noise === q2Answer) {
                    matchedPet = petId;
                    break;
                }
            }
            
            if (!matchedPet) { matchedPet = 'mittens'; }
            const pet = petData[matchedPet];
            if (pet) {
                resultPetCard.innerHTML = `
                    <div class="resident-card-new is-visible">
                        <div class="card-image-wrap">
                            <img src="${pet.image}" alt="${pet.name}">
                        </div>
                        <div class="card-details">
                            <h3>${pet.name}</h3>
                            <p class="pet-trait">${pet.story}</p>
                            <button class="btn btn-secondary open-modal-btn" data-pet="${matchedPet}">View Profile</button>
                        </div>
                    </div>
                `;
                quizResults.style.display = 'block';
                resultPetCard.scrollIntoView({ behavior: 'smooth' });

                const newOpenModalBtn = resultPetCard.querySelector('.open-modal-btn');
                newOpenModalBtn.addEventListener('click', () => openPetModal(newOpenModalBtn.dataset.pet));
            }
        });
    }
    
    // --- DIY Pet Treats Flip Card Logic ---
    const flipBtns = document.querySelectorAll('.flip-btn');
    if (flipBtns.length > 0) {
        flipBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.recipe-card');
                if (card) {
                    card.classList.toggle('flipped');
                }
            });
        });
    }

    // --- Scavenger Hunt Logic ---
    const huntIcons = document.querySelectorAll('.hunt-icon');
    const foundCount = document.getElementById('found-count');
    let count = 0;

    if (huntIcons.length > 0) {
        huntIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                if (!icon.classList.contains('found')) {
                    icon.classList.add('found');
                    count++;
                    if (foundCount) {
                        foundCount.textContent = count;
                    }
                    if (count === 3) {
                        alert('You found all the icons! Congratulations!');
                    }
                }
            });
        });
    }

    const residentCards = document.querySelectorAll('.resident-card-new');
    if (residentCards.length > 0) {
        const huntObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const icon = entry.target.querySelector('.hunt-icon');
                    if (icon) {
                        icon.classList.add('active');
                    }
                } else {
                    const icon = entry.target.querySelector('.hunt-icon');
                    if (icon) {
                        icon.classList.remove('active');
                    }
                }
            });
        }, { threshold: 0.5 });
        residentCards.forEach(card => {
            huntObserver.observe(card);
        });
    }
    

    // --- Postcard Modal Logic ---
    const postcardModal = document.getElementById('postcard-modal');
    const openPostcardBtn = document.getElementById('open-postcard-btn');
    const closePostcardBtn = document.getElementById('close-postcard-btn');
    const postcardPetImage = document.getElementById('postcard-pet-image');
    const petSelectPostcard = document.getElementById('pet-select-postcard');
    const messageInput = document.getElementById('message-input');
    const postcardMessage = document.getElementById('postcard-message');

    if (openPostcardBtn) { openPostcardBtn.addEventListener('click', () => { postcardModal.style.display = 'flex'; }); }
    if (closePostcardBtn) { closePostcardBtn.addEventListener('click', () => { postcardModal.style.display = 'none'; }); }
    if (postcardModal) { postcardModal.addEventListener('click', (e) => { if (e.target === postcardModal) { postcardModal.style.display = 'none'; } }); }
    if (petSelectPostcard) {
        petSelectPostcard.addEventListener('change', (e) => {
            const pet = petData[e.target.value];
            if (pet) postcardPetImage.src = pet.image;
        });
    }
    if (messageInput) {
        messageInput.addEventListener('input', (e) => {
            postcardMessage.textContent = e.target.value || 'Sending you some love from The Pawfect Cup!';
        });
    }

    // --- Cafe + Pets Experience Section Logic ---
    function reserveBuddy() {
        const petSelect = document.getElementById('pet-select-buddy');
        const message = document.getElementById('buddy-message');
        if(petSelect.value) {
            message.textContent = `Great choice! ${petSelect.value} is excited to meet you.`;
        } else {
            message.textContent = "Please select a buddy first!";
        }
    }

    function bookParty() {
        const date = document.getElementById('party-date').value;
        const message = document.getElementById('party-message');
        if(date) {
            message.textContent = "Party booked! We'll be in touch to plan the details.";
        } else {
            message.textContent = "Please select a date for the party.";
        }
    }
    // Make functions globally accessible for inline onclick
    window.reserveBuddy = reserveBuddy;
    window.bookParty = bookParty;

    // --- NEW STICKY NOTES FEEDBACK SECTION LOGIC ---
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesContainer = document.getElementById('notes-container');
    const notesPlaceholder = document.getElementById('notes-placeholder');

    addNoteBtn.addEventListener('click', () => {
        const text = noteInput.value.trim();
        if (text) {
            createStickyNote(text);
            noteInput.value = '';
        }
    });

    function createStickyNote(text) {
        if (notesPlaceholder) notesPlaceholder.style.display = 'none';

        const note = document.createElement('div');
        const colors = ['bg-note-yellow', 'bg-note-green', 'bg-note-blue', 'bg-note-pink'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        note.className = `sticky-note ${randomColor}`;
        note.innerHTML = `
            <textarea class="note-content">${text}</textarea>
            <div class="note-toolbar">
                <button class="delete-note"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        const containerRect = notesContainer.getBoundingClientRect();
        note.style.left = (Math.random() * (containerRect.width - 150)) + "px";
        note.style.top = (Math.random() * (containerRect.height - 150)) + "px";
        
        notesContainer.appendChild(note);
        makeDraggable(note);

        note.querySelector('.delete-note').addEventListener('click', () => {
            note.remove();
            if (notesContainer.querySelectorAll('.sticky-note').length === 0) {
                 if (notesPlaceholder) notesPlaceholder.style.display = 'flex';
            }
        });
    }
    
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let isDragging = false;

        element.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            if (e.target.closest('textarea, .delete-note')) return;
            e.preventDefault();
            isDragging = true;
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            if (!isDragging) return;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            const newTop = element.offsetTop - pos2;
            const newLeft = element.offsetLeft - pos1;
            
            const containerRect = notesContainer.getBoundingClientRect();
            element.style.top = Math.max(0, Math.min(newTop, containerRect.height - 150)) + "px";
            element.style.left = Math.max(0, Math.min(newLeft, containerRect.width - 150)) + "px";
        }

        function closeDragElement() {
            isDragging = false;
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});