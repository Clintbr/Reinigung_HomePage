import { searchLocations, SERVICE_LOCATIONS } from './einsatzgebiet-data.js';

export function initEinsatzgebietChecker() {
    const root = document.getElementById('einsatzgebiet-checker');
    if (!root) return;

    const input = root.querySelector('#plz-check-input');
    const checkBtn = root.querySelector('#plz-check-btn');
    const resetBtn = root.querySelector('#plz-clear-btn');
    const suggestionsBox = root.querySelector('#plz-suggestions');
    const resultBox = root.querySelector('#plz-result-container');
    const chipBtns = root.querySelectorAll('.plz-quick-chip');

    if (!input || !resultBox) return;

    function renderResult(loc, query) {
        if (!loc) {
            resultBox.innerHTML = `
                <div class="einsatz-result-card result-notfound animate-fade-in">
                    <div class="result-card-header">
                        <div class="result-icon-badge notfound-badge">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M9 11h4"/></svg>
                        </div>
                        <div class="result-title-group">
                            <span class="result-status-tag status-tag-neutral">Standort prüfen</span>
                            <h3 class="result-location-name">»${escapeHtml(query)}« nicht direkt erkannt</h3>
                        </div>
                    </div>
                    <p class="result-description">
                        Wir bedienen <strong>Rechberghausen, Göppingen, Schorndorf</strong> sowie alle Orte im Umkreis von maximal <strong>25 Minuten Fahrzeit</strong> ab Messelbergstraße 4, 73098 Rechberghausen.
                    </p>
                    <div class="result-actions">
                        <a href="https://wa.me/4917665838189?text=${encodeURIComponent(`Hallo ProKlar Team, ich möchte fragen, ob Sie auch in ${query} reinigen?`)}" target="_blank" rel="noopener" class="btn btn-whatsapp-action">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                            Unverbindlich per WhatsApp nachfragen
                        </a>
                        <a href="tel:+4971619666659" class="btn btn-secondary-action">
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            +49 (0) 7161 9666659 anrufen
                        </a>
                    </div>
                </div>
            `;
            resultBox.style.display = 'block';
            return;
        }

        const plzList = loc.plz.join(', ');
        const waMsg = `Hallo ProKlar Team, ich interessiere mich für Reinigungsarbeiten in ${plzList} ${loc.name}. Bitte um ein unverbindliches Angebot.`;
        const waUrl = `https://wa.me/4917665838189?text=${encodeURIComponent(waMsg)}`;

        if (loc.status === 'core') {
            resultBox.innerHTML = `
                <div class="einsatz-result-card result-success animate-fade-in">
                    <div class="result-card-header">
                        <div class="result-icon-badge success-badge">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div class="result-title-group">
                            <span class="result-status-tag status-tag-success">✓ Im regulären Einsatzgebiet</span>
                            <h3 class="result-location-name">${escapeHtml(loc.name)} <span class="result-plz">(${plzList})</span></h3>
                            <div class="result-sub">${escapeHtml(loc.district || '')}</div>
                        </div>
                    </div>

                    <div class="result-metrics-grid">
                        <div class="result-metric-card">
                            <div class="metric-icon"></div>
                            <div class="metric-info">
                                <span class="metric-label">Fahrzeit</span>
                                <span class="metric-val">ca. ${loc.time} Min.</span>
                            </div>
                        </div>
                        <div class="result-metric-card">
                            <div class="metric-icon"></div>
                            <div class="metric-info">
                                <span class="metric-label">Distanz</span>
                                <span class="metric-val">ca. ${loc.dist} km</span>
                            </div>
                        </div>
                        <div class="result-metric-card">
                            <div class="metric-icon"></div>
                            <div class="metric-info">
                                <span class="metric-label">Anfahrt</span>
                                <span class="metric-val">Kostenfrei / Fair</span>
                            </div>
                        </div>
                        <div class="result-metric-card">
                            <div class="metric-icon"></div>
                            <div class="metric-info">
                                <span class="metric-label">Verfügbarkeit</span>
                                <span class="metric-val">Regelmäßig vor Ort</span>
                            </div>
                        </div>
                    </div>

                    ${loc.highlight ? `<div class="result-highlight-box"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> <span>${escapeHtml(loc.highlight)}</span></div>` : ''}

                    <div class="result-actions">
                        <button type="button" class="btn btn-primary-action" id="btn-request-location" data-location="${escapeHtml(loc.name)}" data-plz="${plzList}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            Jetzt Angebot für ${escapeHtml(loc.name)} anfragen &darr;
                        </button>
                        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp-action">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                            Schnellanfrage via WhatsApp
                        </a>
                    </div>
                </div>
            `;
        } else if (loc.status === 'extended') {
            resultBox.innerHTML = `
                <div class="einsatz-result-card result-extended animate-fade-in">
                    <div class="result-card-header">
                        <div class="result-icon-badge extended-badge">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        </div>
                        <div class="result-title-group">
                            <span class="result-status-tag status-tag-extended">⚡ Erweiterter Servicebereich (ca. ${loc.time} Min.)</span>
                            <h3 class="result-location-name">${escapeHtml(loc.name)} <span class="result-plz">(${plzList})</span></h3>
                            <div class="result-sub">${escapeHtml(loc.district || '')}</div>
                        </div>
                    </div>

                    <p class="result-description">
                        ${escapeHtml(loc.name)} liegt mit <strong>ca. ${loc.time} Minuten Fahrtzeit</strong> am Rande unseres 25-Minuten-Kerngebiets. 
                        <strong>Kein Problem:</strong> Für größere Projekte, regelmäßige Turnuspflege oder nach kurzer Rücksprache reinigen wir auch hier gerne für Sie!
                    </p>

                    <div class="result-actions">
                        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp-action">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                            Verfügbarkeit via WhatsApp anfragen
                        </a>
                        <button type="button" class="btn btn-secondary-action" id="btn-request-location" data-location="${escapeHtml(loc.name)}" data-plz="${plzList}">
                            Formular-Anfrage stellen &darr;
                        </button>
                    </div>
                </div>
            `;
        } else {
            resultBox.innerHTML = `
                <div class="einsatz-result-card result-outside animate-fade-in">
                    <div class="result-card-header">
                        <div class="result-icon-badge outside-badge">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                        </div>
                        <div class="result-title-group">
                            <span class="result-status-tag status-tag-outside">❌ Außerhalb unseres Standard-Radius</span>
                            <h3 class="result-location-name">${escapeHtml(loc.name)} <span class="result-plz">(${plzList})</span></h3>
                            <div class="result-sub">${escapeHtml(loc.district || '')} (ca. ${loc.time} Min. Anfahrt)</div>
                        </div>
                    </div>

                    <p class="result-description">
                        Dieser Ort liegt außerhalb unseres regulären 25-Minuten-Einsatzbereichs ab Rechberghausen. 
                        Für gewerbliche Großflächen, Spezialaufträge oder Bauendreinigungen prüfen wir gerne eine Ausnahme.
                    </p>

                    <div class="result-actions">
                        <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp-action">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                            Sonderanfrage per WhatsApp stellen
                        </a>
                        <a href="tel:+4971619666659" class="btn btn-secondary-action">
                            Telefonisch anfragen: 07161 9666659
                        </a>
                    </div>
                </div>
            `;
        }

        resultBox.style.display = 'block';

        // Connect "Anfrage für Ort" button to form
        const reqBtn = resultBox.querySelector('#btn-request-location');
        if (reqBtn) {
            reqBtn.addEventListener('click', () => {
                const locName = reqBtn.dataset.location;
                const locPlz = reqBtn.dataset.plz;
                
                // Check if index form or kontakt form exists
                const form = document.querySelector('.inquiry-form, .contact-form');
                const formSection = document.getElementById('anfrage') || document.getElementById('kontakt-form');
                
                if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Pre-fill / append into description field if available
                    const descField = form?.querySelector('[name="beschreibung"], [name="nachricht"]');
                    if (descField) {
                        const note = `[Einsatzort: ${locPlz} ${locName}]`;
                        if (!descField.value.includes(locName)) {
                            descField.value = descField.value ? `${descField.value}\n${note}` : note;
                        }
                        descField.focus();
                    }
                }
            });
        }
    }

    function hideSuggestions() {
        if (suggestionsBox) {
            suggestionsBox.style.display = 'none';
            suggestionsBox.innerHTML = '';
        }
    }

    function showSuggestions(matches) {
        if (!suggestionsBox) return;
        if (!matches || matches.length === 0) {
            hideSuggestions();
            return;
        }

        const topMatches = matches.slice(0, 6);
        suggestionsBox.innerHTML = topMatches.map(m => {
            const statusIcon = m.status === 'core' ? '🟢' : m.status === 'extended' ? '🟡' : '⚪';
            const statusText = m.status === 'core' ? `ca. ${m.time} Min.` : m.status === 'extended' ? `ca. ${m.time} Min. (Rand)` : `Außerhalb`;
            return `
                <div class="suggestion-item" data-name="${escapeHtml(m.name)}" data-plz="${m.plz[0]}">
                    <div class="suggestion-left">
                        <span class="suggestion-status">${statusIcon}</span>
                        <span class="suggestion-title"><strong>${escapeHtml(m.name)}</strong> (${m.plz.join(', ')})</span>
                    </div>
                    <span class="suggestion-time">${statusText}</span>
                </div>
            `;
        }).join('');

        suggestionsBox.style.display = 'block';

        // Bind clicks to items
        suggestionsBox.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const name = item.dataset.name;
                const found = SERVICE_LOCATIONS.find(l => l.name === name);
                input.value = name;
                hideSuggestions();
                if (found) {
                    renderResult(found, name);
                } else {
                    executeCheck(name);
                }
            });
        });
    }

    function executeCheck(val) {
        const query = (val || input.value || '').trim();
        hideSuggestions();
        if (!query) {
            resultBox.style.display = 'none';
            return;
        }

        const matches = searchLocations(query);
        if (matches.length > 0) {
            renderResult(matches[0], query);
        } else {
            renderResult(null, query);
        }
    }

    // Input listeners
    let debounceTimer = null;
    input.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (resetBtn) {
            resetBtn.style.display = query.length > 0 ? 'inline-flex' : 'none';
        }

        clearTimeout(debounceTimer);
        if (query.length < 2) {
            hideSuggestions();
            return;
        }

        debounceTimer = setTimeout(() => {
            const matches = searchLocations(query);
            showSuggestions(matches);
        }, 180);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeCheck();
        } else if (e.key === 'Escape') {
            hideSuggestions();
        }
    });

    // Check button click
    checkBtn?.addEventListener('click', () => {
        executeCheck();
    });

    // Reset button click
    resetBtn?.addEventListener('click', () => {
        input.value = '';
        input.focus();
        resetBtn.style.display = 'none';
        hideSuggestions();
        resultBox.style.display = 'none';
    });

    // Click outside hides suggestions
    document.addEventListener('click', (e) => {
        if (!root.contains(e.target)) {
            hideSuggestions();
        }
    });

    // Quick Chips click
    chipBtns.forEach(chip => {
        chip.addEventListener('click', () => {
            const locName = chip.dataset.checkTarget || chip.textContent.trim();
            input.value = locName;
            if (resetBtn) resetBtn.style.display = 'inline-flex';
            executeCheck(locName);
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
