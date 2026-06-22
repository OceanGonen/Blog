(function () {
    const board = document.querySelector('.kb-board');
    if (!board) return;

    let dragged = null;

    function updateProgress() {
        const total = board.querySelectorAll('.kb-card').length;
        const done  = board.querySelectorAll('[data-col="done"] .kb-card').length;
        const pct   = total ? Math.round((done / total) * 100) : 0;

        const countEl = document.querySelector('.kb-progress-count');
        const fillEl  = document.querySelector('.kb-progress-fill');
        const barEl   = document.querySelector('.kb-progress-bar');

        if (countEl) countEl.textContent = `${done} / ${total} behaald`;
        if (fillEl)  fillEl.style.width  = pct + '%';
        if (barEl)   barEl.setAttribute('aria-valuenow', pct);
    }

    function updateColCounts() {
        board.querySelectorAll('.kb-col').forEach(col => {
            const count = col.querySelectorAll('.kb-card').length;
            const badge = col.querySelector('.kb-col-count');
            if (badge) badge.textContent = count;
        });
    }

    // Bron: ChatGPT:
    function getDropTarget(col, y) {
        const cards = [...col.querySelectorAll('.kb-card:not(.dragging)')];
        return cards.find(card => {
            const { top, height } = card.getBoundingClientRect();
            return y < top + height / 2;
        }) ?? null;
    }

    board.querySelectorAll('.kb-card').forEach(card => {
        card.setAttribute('draggable', 'true');

        card.addEventListener('dragstart', e => {
            dragged = card;
            e.dataTransfer.effectAllowed = 'move';
            requestAnimationFrame(() => card.classList.add('dragging'));
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            board.querySelectorAll('.kb-col').forEach(c => c.classList.remove('drag-over'));
            dragged = null;
        });
    });

    board.querySelectorAll('.kb-col').forEach(col => {
        col.addEventListener('dragover', e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            col.classList.add('drag-over');
        });

        col.addEventListener('dragleave', e => {
            if (!col.contains(e.relatedTarget)) col.classList.remove('drag-over');
        });

        col.addEventListener('drop', e => {
            e.preventDefault();
            col.classList.remove('drag-over');
            if (!dragged || col.contains(dragged)) return;

            const after = getDropTarget(col, e.clientY);
            after ? col.insertBefore(dragged, after) : col.appendChild(dragged);

            updateProgress();
            updateColCounts();
        });
    });

    updateProgress();
    updateColCounts();
})();
