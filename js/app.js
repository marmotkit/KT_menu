class ShortcutManager {
    constructor() {
        this.shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
        this.editingShortcutId = null;
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
                await navigator.serviceWorker.register('/KT_menu/sw.js');
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
            this.editingShortcutId = null;
            form.reset();
            modal.style.display = 'block';
        });

        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            this.editingShortcutId = null;
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.editingShortcutId) {
                this.updateShortcut();
            } else {
                this.addShortcut();
            }
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

    updateShortcut() {
        const name = document.getElementById('shortcutName').value;
        const url = document.getElementById('shortcutUrl').value;
        const color = document.getElementById('shortcutColor').value;
        const index = this.shortcuts.findIndex(s => s.id === this.editingShortcutId);
        if (index !== -1) {
            this.shortcuts[index] = {
                ...this.shortcuts[index],
                name,
                url,
                color
            };
            this.saveShortcuts();
            this.renderShortcuts();
        }
        this.editingShortcutId = null;
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
                <span class="material-icons link-icon">link</span>
                <div class="shortcut-actions">
                    <span class="material-icons edit-icon" title="編輯">edit</span>
                    <span class="material-icons delete-icon" title="刪除">delete</span>
                </div>
            `;

            const linkArea = card.querySelector('h3, .link-icon');
            linkArea.addEventListener('click', () => {
                window.open(shortcut.url, '_blank');
            });

            const editIcon = card.querySelector('.edit-icon');
            editIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleEditShortcut(shortcut.id);
            });

            const deleteIcon = card.querySelector('.delete-icon');
            deleteIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleDeleteShortcut(shortcut.id);
            });

            grid.appendChild(card);
        });
    }

    handleDeleteShortcut(shortcutId) {
        if (confirm("確定要刪除此捷徑嗎？")) {
            this.shortcuts = this.shortcuts.filter(s => s.id !== shortcutId);
            this.saveShortcuts();
            this.renderShortcuts();
        }
    }

    handleEditShortcut(shortcutId) {
        const shortcut = this.shortcuts.find(s => s.id === shortcutId);
        if (shortcut) {
            document.getElementById('shortcutName').value = shortcut.name;
            document.getElementById('shortcutUrl').value = shortcut.url;
            document.getElementById('shortcutColor').value = shortcut.color;
            this.editingShortcutId = shortcutId;
            document.getElementById('shortcutModal').style.display = 'block';
        }
    }

    saveShortcuts() {
        localStorage.setItem('shortcuts', JSON.stringify(this.shortcuts));
    }
}

// 初始化應用
const app = new ShortcutManager(); 