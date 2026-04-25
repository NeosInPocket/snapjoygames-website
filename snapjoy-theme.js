/**
 * SnapJoy site theme — runs synchronously before React/Babel.
 * Base palette + semantic tokens (--nav-glass, --card-surface, …) per mood.
 */
(function (global) {
  var MOODS = {
    bright: {
      bg: '#FFFBF0',
      bg2: '#FFF4D1',
      ink: '#1E2230',
      ink2: '#2A2F40',
      muted: '#6B6F7E',
      yellow: '#FFD23F',
      yellowDeep: '#F2A900',
      yellowSoft: '#FFE88A',
      line: 'rgba(30,34,48,.12)',
      grainOpacity: 0.35,
      extras: {
        'nav-glass': 'rgba(255,251,240,.55)',
        'nav-glass-scrolled': 'rgba(255,251,240,.82)',
        'pill-bg': 'rgba(30,34,48,.06)',
        'grain-blend': 'multiply',
        'card-surface': '#1E2230',
        'card-fg': '#FFFBF0',
        'card-fg-muted': 'rgba(255,251,240,.72)',
        'card-line': 'rgba(255,251,240,.12)',
        'card-art-fade': 'rgba(30,34,48,.92)',
        'marquee-bg': '#1E2230',
        'marquee-fg': '#FFD23F',
        'derail-fade': 'rgba(30,34,48,.95)',
        'studio-bg': '#1E2230',
        'studio-fg': 'rgba(255,251,240,.82)',
        'studio-heading': '#FFFBF0',
        'studio-meta': 'rgba(255,251,240,.55)',
        'studio-idx': 'rgba(255,251,240,.55)',
        'studio-values-grid': 'rgba(255,251,240,.08)',
        'studio-value-p': 'rgba(255,251,240,.65)',
        'studio-card': '#1E2230',
        'star-fill': '#1E2230',
        'contact-card-bg': '#FFF4D1',
        'contact-item-bg': '#FFFBF0',
        'contact-item-hover': '#1E2230',
        'contact-shadow': 'rgba(30,34,48,.35)',
        'btn-primary-bg': '#1E2230',
        'btn-primary-fg': '#FFD23F',
        'btn-primary-hover': '#0d0f16',
        'btn-primary-shadow': 'rgba(30,34,48,.55)',
        'btn-ghost-fg': '#1E2230',
        'btn-ghost-border': '#1E2230',
        'orbit-chip-bg': 'rgba(255,251,240,.88)',
        'orbit-chip-fg': '#1E2230',
        'orbit-chip-shadow': 'rgba(30,34,48,.22)',
        'shadow-card': 'rgba(30,34,48,.35)',
        'yellow-tag-bg': 'rgba(255,210,63,.15)',
        'nav-link-hover-bg': '#1E2230',
        'nav-link-hover-fg': '#FFD23F',
        'cursor-stroke': '#1E2230',
        'steam-hover-bg': '#ffffff',
        'steam-fg': '#1E2230',
        'em-on-yellow': '#1E2230',
        'stat-strong': '#1E2230',
        'wordmark-strong': '#1E2230',
        'hit-fg': '#1E2230',
        'ghost-dark-border': 'rgba(255,251,240,.25)',
        'ghost-dark-fg': '#FFFBF0',
        'derail-subtitle': 'rgba(255,210,63,.85)',
        'derail-lead': 'rgba(255,251,240,.78)',
        'derail-h3': '#FFFBF0',
        'derail-meta-label': 'rgba(255,251,240,.45)',
        'derail-meta-value': '#FFFBF0',
        'timeline-track': 'rgba(255,251,240,.12)',
        'timeline-node-border': 'rgba(255,251,240,.2)',
        'timeline-node-fg': 'rgba(255,251,240,.5)',
        'timeline-label': 'rgba(255,251,240,.5)',
        'timeline-label-done': 'rgba(255,251,240,.75)',
        'derail-meta-border': 'rgba(255,251,240,.08)',
        'avatar-ring': '#1E2230',
        'avatar-e-bg': '#FFFBF0',
        'avatar-e-fg': '#1E2230',
        'contact-blob': '#FFD23F',
        'contact-lead': '#2A2F40',
      },
    },
    noir: {
      bg: '#14161E',
      bg2: '#1A1D28',
      ink: '#ECE9E2',
      ink2: '#C8C4BA',
      muted: '#8B8F9C',
      yellow: '#FFD23F',
      yellowDeep: '#F2A900',
      yellowSoft: '#3D3520',
      line: 'rgba(236,233,226,.12)',
      grainOpacity: 0.42,
      extras: {
        'nav-glass': 'rgba(12,14,22,.78)',
        'nav-glass-scrolled': 'rgba(10,12,18,.92)',
        'pill-bg': 'rgba(236,233,226,.08)',
        'grain-blend': 'soft-light',
        'card-surface': '#0F1118',
        'card-fg': '#EEEBE4',
        'card-fg-muted': 'rgba(238,235,228,.74)',
        'card-line': 'rgba(238,235,228,.14)',
        'card-art-fade': 'rgba(8,9,14,.94)',
        'marquee-bg': '#0A0C12',
        'marquee-fg': '#FFD23F',
        'derail-fade': 'rgba(8,9,14,.96)',
        'studio-bg': '#08090E',
        'studio-fg': 'rgba(236,233,226,.86)',
        'studio-heading': '#F5F2EA',
        'studio-meta': 'rgba(180,176,168,.62)',
        'studio-idx': 'rgba(180,176,168,.62)',
        'studio-values-grid': 'rgba(236,233,226,.06)',
        'studio-value-p': 'rgba(190,186,178,.72)',
        'studio-card': '#0E1018',
        'star-fill': '#FFD23F',
        'contact-card-bg': '#1A1D28',
        'contact-item-bg': '#12141C',
        'contact-item-hover': 'rgba(255,210,63,.5)',
        'contact-shadow': 'rgba(0,0,0,.5)',
        'btn-primary-bg': '#FFD23F',
        'btn-primary-fg': '#12141C',
        'btn-primary-hover': '#E8BC2E',
        'btn-primary-shadow': 'rgba(0,0,0,.4)',
        'btn-ghost-fg': '#ECE9E2',
        'btn-ghost-border': 'rgba(236,233,226,.32)',
        'orbit-chip-bg': 'rgba(18,20,30,.92)',
        'orbit-chip-fg': '#E2DFD6',
        'orbit-chip-shadow': 'rgba(0,0,0,.4)',
        'shadow-card': 'rgba(0,0,0,.55)',
        'yellow-tag-bg': 'rgba(255,210,63,.14)',
        'nav-link-hover-bg': 'rgba(255,210,63,.18)',
        'nav-link-hover-fg': '#12141C',
        'cursor-stroke': '#12141C',
        'steam-hover-bg': '#f2f2f4',
        'steam-fg': '#12141C',
        'em-on-yellow': '#12141C',
        'stat-strong': '#F5F2EA',
        'wordmark-strong': '#F5F2EA',
        'hit-fg': '#ECE9E2',
        'ghost-dark-border': 'rgba(238,235,228,.28)',
        'ghost-dark-fg': '#EEEBE4',
        'derail-subtitle': 'rgba(255,210,63,.88)',
        'derail-lead': 'rgba(228,225,218,.82)',
        'derail-h3': '#F7F4EC',
        'derail-meta-label': 'rgba(200,196,188,.5)',
        'derail-meta-value': '#EEEBE4',
        'timeline-track': 'rgba(238,235,228,.12)',
        'timeline-node-border': 'rgba(238,235,228,.22)',
        'timeline-node-fg': 'rgba(200,196,188,.55)',
        'timeline-label': 'rgba(200,196,188,.52)',
        'timeline-label-done': 'rgba(228,225,218,.78)',
        'derail-meta-border': 'rgba(238,235,228,.1)',
        'avatar-ring': '#14161E',
        'avatar-e-bg': '#2A2D38',
        'avatar-e-fg': '#ECE9E2',
        'contact-blob': 'rgba(255,210,63,.55)',
        'contact-lead': 'rgba(210,206,198,.92)',
      },
    },
    void: {
      bg: '#0A0A0C',
      bg2: '#121218',
      ink: '#FFD23F',
      ink2: '#E8C84A',
      muted: '#7A7A88',
      yellow: '#FFD23F',
      yellowDeep: '#F2A900',
      yellowSoft: '#2B2411',
      line: 'rgba(255,210,63,.2)',
      grainOpacity: 0.55,
      extras: {
        'nav-glass': 'rgba(6,6,10,.82)',
        'nav-glass-scrolled': 'rgba(4,4,8,.94)',
        'pill-bg': 'rgba(255,210,63,.08)',
        'grain-blend': 'soft-light',
        'card-surface': '#050508',
        'card-fg': '#F2EFE6',
        'card-fg-muted': 'rgba(242,239,230,.72)',
        'card-line': 'rgba(255,210,63,.16)',
        'card-art-fade': 'rgba(0,0,0,.9)',
        'marquee-bg': '#000000',
        'marquee-fg': '#FFD23F',
        'derail-fade': 'rgba(0,0,0,.92)',
        'studio-bg': '#000000',
        'studio-fg': 'rgba(240,236,220,.84)',
        'studio-heading': '#FFD23F',
        'studio-meta': 'rgba(200,190,160,.55)',
        'studio-idx': 'rgba(200,190,160,.55)',
        'studio-values-grid': 'rgba(255,210,63,.08)',
        'studio-value-p': 'rgba(200,190,170,.68)',
        'studio-card': '#08080C',
        'star-fill': '#FFD23F',
        'contact-card-bg': '#12121A',
        'contact-item-bg': '#08080C',
        'contact-item-hover': 'rgba(255,210,63,.55)',
        'contact-shadow': 'rgba(0,0,0,.55)',
        'btn-primary-bg': '#FFD23F',
        'btn-primary-fg': '#0A0A0C',
        'btn-primary-hover': '#E5BC35',
        'btn-primary-shadow': 'rgba(0,0,0,.45)',
        'btn-ghost-fg': '#FFD23F',
        'btn-ghost-border': 'rgba(255,210,63,.45)',
        'orbit-chip-bg': 'rgba(12,12,18,.9)',
        'orbit-chip-fg': '#E8C84A',
        'orbit-chip-shadow': 'rgba(0,0,0,.5)',
        'shadow-card': 'rgba(0,0,0,.65)',
        'yellow-tag-bg': 'rgba(255,210,63,.12)',
        'nav-link-hover-bg': 'rgba(255,210,63,.2)',
        'nav-link-hover-fg': '#0A0A0C',
        'cursor-stroke': '#0A0A0C',
        'steam-hover-bg': '#f5f5f5',
        'steam-fg': '#0A0A0C',
        'em-on-yellow': '#0A0A0C',
        'stat-strong': '#FFD23F',
        'wordmark-strong': '#FFD23F',
        'hit-fg': '#FFF3C4',
        'ghost-dark-border': 'rgba(255,210,63,.3)',
        'ghost-dark-fg': '#F2EFE6',
        'derail-subtitle': 'rgba(255,210,63,.9)',
        'derail-lead': 'rgba(235,228,210,.8)',
        'derail-h3': '#F7F4EC',
        'derail-meta-label': 'rgba(200,185,150,.48)',
        'derail-meta-value': '#F2EFE6',
        'timeline-track': 'rgba(255,210,63,.14)',
        'timeline-node-border': 'rgba(255,210,63,.28)',
        'timeline-node-fg': 'rgba(200,185,150,.55)',
        'timeline-label': 'rgba(200,185,150,.52)',
        'timeline-label-done': 'rgba(235,220,180,.78)',
        'derail-meta-border': 'rgba(255,210,63,.1)',
        'avatar-ring': '#0A0A0C',
        'avatar-e-bg': '#1A1810',
        'avatar-e-fg': '#FFD23F',
        'contact-blob': 'rgba(255,210,63,.4)',
        'contact-lead': 'rgba(220,210,185,.88)',
      },
    },
  };

  function getInitialMood() {
    try {
      var s = global.localStorage.getItem('snapjoy-mood');
      if (s && MOODS[s]) return s;
    } catch (e) {}
    if (
      typeof global.matchMedia === 'function' &&
      global.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'noir';
    }
    return 'bright';
  }

  function applyMood(name) {
    var m = MOODS[name] || MOODS.bright;
    var root = document.documentElement;
    root.style.setProperty('--bg', m.bg);
    root.style.setProperty('--bg-2', m.bg2);
    root.style.setProperty('--ink', m.ink);
    root.style.setProperty('--ink-2', m.ink2);
    root.style.setProperty('--muted', m.muted);
    root.style.setProperty('--yellow', m.yellow);
    root.style.setProperty('--yellow-deep', m.yellowDeep);
    root.style.setProperty('--yellow-soft', m.yellowSoft);
    root.style.setProperty('--line', m.line);
    root.style.setProperty('--grain-opacity', String(m.grainOpacity != null ? m.grainOpacity : 0.35));

    var ex = m.extras || MOODS.bright.extras;
    for (var key in ex) {
      root.style.setProperty('--' + key, ex[key]);
    }

    if (document.body) document.body.dataset.mood = name;
    else document.documentElement.dataset.snapjoyMoodBoot = name;
    root.style.colorScheme = name === 'bright' ? 'light' : 'dark';
  }

  function bootBodyMood() {
    if (!document.body) return;
    var boot = document.documentElement.dataset.snapjoyMoodBoot;
    if (boot) {
      document.body.dataset.mood = boot;
      delete document.documentElement.dataset.snapjoyMoodBoot;
    }
  }

  global.__SJ_MOODS = MOODS;
  global.__snapJoyApplyMood = applyMood;
  global.__snapJoyGetInitialMood = getInitialMood;

  applyMood(getInitialMood());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootBodyMood);
  } else {
    bootBodyMood();
  }
})(typeof window !== 'undefined' ? window : this);
