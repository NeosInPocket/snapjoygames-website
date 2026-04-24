/* global React, ReactDOM, TweaksPanel, TweakSection, TweakRadio, TweakSlider, useTweaks */

const { useEffect } = React;

const MOODS = {
  bright: { bg:'#FFFBF0', bg2:'#FFF4D1', ink:'#1E2230', ink2:'#2A2F40', muted:'#6B6F7E', yellow:'#FFD23F', yellowDeep:'#F2A900', yellowSoft:'#FFE88A', line:'rgba(30,34,48,.12)', grainOpacity:.35 },
  noir:   { bg:'#181A22', bg2:'#20222C', ink:'#FFFBF0', ink2:'#E9E7DD', muted:'#8A8D9E', yellow:'#FFD23F', yellowDeep:'#F2A900', yellowSoft:'#3A3322', line:'rgba(255,251,240,.14)', grainOpacity:.55 },
  void:   { bg:'#0A0A0C', bg2:'#15151A', ink:'#FFD23F', ink2:'#EEC63A', muted:'#6A6A78', yellow:'#FFD23F', yellowDeep:'#F2A900', yellowSoft:'#2B2411', line:'rgba(255,210,63,.18)', grainOpacity:.7 }
};

function applyMood(name){
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
  document.body.dataset.mood = name;
}

function applyEnergy(level){
  // 0 = static, 1 = default, 2 = playful
  const root = document.documentElement;
  root.style.setProperty('--energy', level);
  root.style.setProperty('--marquee-dur', (80 / (0.35 + level)) + 's');
  root.style.setProperty('--float-dur', (9 / (0.35 + level)) + 's');
  if(window.__snapjoy3d) window.__snapjoy3d.setEnergy(level);
  document.body.dataset.energy = level < 0.33 ? 'static' : (level > 1.3 ? 'playful' : 'normal');
}

function applyMaterial(kind){
  if(window.__snapjoy3d) window.__snapjoy3d.setMaterial(kind);
  document.body.dataset.material = kind;
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "bright",
  "energy": 1.0
}/*EDITMODE-END*/;

function SnapJoyTweaks(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(()=>{ applyMood(t.mood); }, [t.mood]);
  useEffect(()=>{ applyEnergy(t.energy); }, [t.energy]);

  useEffect(()=>{
    applyMood(t.mood); applyEnergy(t.energy);
  // eslint-disable-next-line
  },[]);

  return (
    <TweaksPanel title="Tweaks · SnapJoy">
      <TweakSection label="Mood" hint="Recolors the entire site" />
      <TweakRadio  label="Palette" value={t.mood}
                   options={['bright','noir','void']}
                   onChange={(v)=>setTweak('mood', v)} />
      <TweakSection label="Energy" hint="Motion, speed, sparkle" />
      <TweakSlider label="Level" value={t.energy} min={0} max={2} step={0.05}
                   onChange={(v)=>setTweak('energy', v)} />
    </TweaksPanel>
  );
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<SnapJoyTweaks />);
