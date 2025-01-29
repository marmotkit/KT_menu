class ShortcutManager {
    constructor() {
        this.shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
        this.init();
    }

    init() {
        this.renderShortcuts();
        this.setupEventListeners();
        this.registerServiceWorker();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js');
            } catch (error) {
                console.error('Service Worker 註冊失敗:', error);
            }
        }
    }

    setupEventListeners() {
        const addBtn = document.getElementById('addShortcut');
        const modal = document.getElementById('shortcutModal');
        const form = document.getElementById('shortcutForm');
        const cancelBtn = document.querySelector('.cancel-btn');

        addBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addShortcut();
        });
    }

    addShortcut() {
        const name = document.getElementById('shortcutName').value;
        const url = document.getElementById('shortcutUrl').value;
        const color = document.getElementById('shortcutColor').value;

        const shortcut = {
            id: Date.now(),
            name,
            url,
            color
        };

        this.shortcuts.push(shortcut);
        this.saveShortcuts();
        this.renderShortcuts();
        
        document.getElementById('shortcutModal').style.display = 'none';
        document.getElementById('shortcutForm').reset();
    }

    renderShortcuts() {
        const grid = document.getElementById('shortcutsGrid');
        grid.innerHTML = '';

        this.shortcuts.forEach(shortcut => {
            const card = document.createElement('div');
            card.className = 'shortcut-card';
            card.style.backgroundColor = shortcut.color;
            
            card.innerHTML = `
                <h3>${shortcut.name}</h3>
                <span class="material-icons">link</span>
            `;

            card.addEventListener('click', () => {
                window.open(shortcut.url, '_blank');
            });

            grid.appendChild(card);
        });
    }

    saveShortcuts() {
        localStorage.setItem('shortcuts', JSON.stringify(this.shortcuts));
    }
}

// 初始化應用
const app = new ShortcutManager(); 