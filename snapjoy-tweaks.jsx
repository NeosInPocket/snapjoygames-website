/* global React, ReactDOM, TweaksPanel, TweakSection, TweakRadio, TweakSlider, useTweaks */

const { useEffect } = React;

function applyMood(name) {
  if (typeof window.__snapJoyApplyMood === 'function') {
    window.__snapJoyApplyMood(name);
    return;
  }
  const MOODS = window.__SJ_MOODS;
  if (!MOODS) return;
  const m = MOODS[name] || MOODS.bright;
  const root = document.documentElement;
  root.style.setProperty('--bg', m.bg);
  root.style.setProperty('--bg-2', m.bg2);
  root.style.setProperty('--ink', m.ink);
  root.style.setProperty('--ink-2', m.ink2);
  root.style.setProperty('--muted', m.muted);
  root.style.setProperty('--yellow', m.yellow);
  root.style.setProperty('--yellow-deep', m.yellowDeep);
  root.style.setProperty('--yellow-soft', m.yellowSoft);
  root.style.setProperty('--line', m.line);
  root.style.setProperty(
    '--grain-opacity',
    String(m.grainOpacity != null ? m.grainOpacity : 0.35)
  );
  const ex = m.extras || {};
  for (const key of Object.keys(ex)) {
    root.style.setProperty('--' + key, ex[key]);
  }
  if (document.body) document.body.dataset.mood = name;
  root.style.colorScheme = name === 'bright' ? 'light' : 'dark';
}

function getInitialMood() {
  if (typeof window.__snapJoyGetInitialMood === 'function') {
    return window.__snapJoyGetInitialMood();
  }
  return 'bright';
}

function applyEnergy(level) {
  const root = document.documentElement;
  root.style.setProperty('--energy', level);
  root.style.setProperty('--marquee-dur', 80 / (0.35 + level) + 's');
  root.style.setProperty('--float-dur', 9 / (0.35 + level) + 's');
  if (window.__snapjoy3d) window.__snapjoy3d.setEnergy(level);
  document.body.dataset.energy = level < 0.33 ? 'static' : level > 1.3 ? 'playful' : 'normal';
}

function applyMaterial(kind) {
  if (window.__snapjoy3d) window.__snapjoy3d.setMaterial(kind);
  document.body.dataset.material = kind;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  mood: 'bright',
  energy: 1.0,
}/*EDITMODE-END*/;

function ThemeToggle({ mood, onChange, lang }) {
  const isDark = mood === 'noir' || mood === 'void';
  const next = isDark ? 'bright' : 'noir';
  const label =
    lang === 'ru'
      ? isDark
        ? 'Светлая тема'
        : 'Тёмная тема'
      : isDark
        ? 'Light theme'
        : 'Dark theme';
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      data-hover
      onClick={() => onChange(next)}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function SnapJoyTweaks() {
  const initMood = getInitialMood();
  const [t, setTweak] = useTweaks({ ...TWEAK_DEFAULTS, mood: initMood });
  const [navLang, setNavLang] = React.useState(
    () => document.documentElement.lang || 'en'
  );

  useEffect(() => {
    applyMood(t.mood);
    try {
      localStorage.setItem('snapjoy-mood', t.mood);
    } catch (e) {}
  }, [t.mood]);

  useEffect(() => {
    applyEnergy(t.energy);
  }, [t.energy]);

  useEffect(() => {
    const onLang = () =>
      setNavLang(document.documentElement.lang || 'en');
    window.addEventListener('snapjoy-lang', onLang);
    const mo = new MutationObserver(onLang);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => {
      window.removeEventListener('snapjoy-lang', onLang);
      mo.disconnect();
    };
  }, []);

  const slot =
    typeof document !== 'undefined' && document.getElementById('theme-slot');

  return (
    <>
      {slot &&
        ReactDOM.createPortal(
          <ThemeToggle
            mood={t.mood}
            lang={navLang}
            onChange={(m) => setTweak('mood', m)}
          />,
          slot
        )}
      <TweaksPanel title="Tweaks · SnapJoy">
        <TweakSection label="Mood" hint="Recolors the entire site" />
        <TweakRadio
          label="Palette"
          value={t.mood}
          options={['bright', 'noir', 'void']}
          onChange={(v) => setTweak('mood', v)}
        />
        <TweakSection label="Energy" hint="Motion, speed, sparkle" />
        <TweakSlider
          label="Level"
          value={t.energy}
          min={0}
          max={2}
          step={0.05}
          onChange={(v) => setTweak('energy', v)}
        />
      </TweaksPanel>
    </>
  );
}

const mount = document.createElement('div');
document.body.appendChild(mount);
ReactDOM.createRoot(mount).render(<SnapJoyTweaks />);
