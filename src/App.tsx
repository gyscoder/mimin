import { useEffect, useMemo, useRef, useState } from "react";

type Photo = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

import mimin1 from '../photos/mimin-1.jpeg';
import mimin2 from '../photos/mimin-2.jpeg';
import mimin3 from '../photos/mimin-3.jpeg';
import mimin4 from '../photos/mimin-4.jpeg';
import mimin5 from '../photos/mimin-5.jpeg';

const PHOTOS: Photo[] = [
  { src: mimin1, alt: "Mimin", caption: "Mimin sendo Mimin.", className: "portrait tall" },
  { src: mimin2, alt: "Mimin no espelho", caption: "Simplesmente ela. ❤️", className: "portrait" },
  { src: mimin3, alt: "Mimin no espelho", caption: "A mais linda de todas. ❤️", className: "portrait" },
  { src: mimin4, alt: "Mimin no espelho", caption: "Linda igual a mãe dela. ❤️", className: "portrait" },
  { src: mimin5, alt: "Mimin no espelho", caption: "Nossa família linda! ❤️", className: "portrait" },
  // Adicione novas fotos aqui:
  // { src: "/photos/mimin-3.jpeg", alt: "Mimin", caption: "Olha ela 😌❤️" },
];

const TARGET = new Date("2026-09-01T12:47:00-03:00").getTime();
const YOUTUBE_ID = "1lrFsXkT_rM";

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff <= 0,
  };
}

function FloatingBackground() {
  const dots = useMemo(
    () => Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 37) % 100}%`,
      top: `${(i * 61) % 100}%`,
      delay: `${(i % 9) * 0.7}s`,
      size: 2 + (i % 3),
    })),
    []
  );

  return (
    <div className="background-effects" aria-hidden="true">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      {dots.map((d) => (
        <span
          key={d.id}
          className="particle"
          style={{ left: d.left, top: d.top, animationDelay: d.delay, width: d.size, height: d.size }}
        />
      ))}
    </div>
  );
}

function Countdown({ onReveal }: { onReveal: () => void }) {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = getTimeLeft();
      setTime(next);
      if (next.done) {
        window.clearInterval(timer);
        onReveal();
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [onReveal]);

  return (
    <main className="countdown-screen">
      <div className="countdown-card">
        <span className="eyebrow">uma pequena surpresa</span>
        <h1>Tem uma surpresa esperando por você, Mimin... <span>❤️</span></h1>
        <p className="countdown-label">Faltam...</p>

        <div className="timer-grid">
          {[
            ["DIAS", time.days],
            ["HORAS", time.hours],
            ["MINUTOS", time.minutes],
            ["SEGUNDOS", time.seconds],
          ].map(([label, value]) => (
            <div className="timer-unit" key={String(label)}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <p className="hint">Quando chegar a hora, uma surpresa vai aparecer... 👀</p>
      </div>
    </main>
  );
}

function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    const pieces = Array.from({ length: 170 }, (_, i) => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 80,
      y: window.innerHeight * 0.28,
      vx: (Math.random() - 0.5) * 13,
      vy: -(Math.random() * 12 + 5),
      size: Math.random() * 7 + 3,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      life: 1,
      hue: (i * 31) % 360,
    }));

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.vy += 0.25;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.004;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = `hsl(${p.hue} 85% 70%)`;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
        ctx.restore();
      });

      frame = requestAnimationFrame(animate);
    };

    animate();
    const stop = window.setTimeout(() => cancelAnimationFrame(frame), 7000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(stop);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="confetti" aria-hidden="true" />;
}

function BirthdayReveal() {
  return (
    <section className="reveal-screen">
      <div className="reveal-glow" />
      <div className="reveal-content">
        <span className="reveal-mini">chegou a hora...</span>
        <div className="big-heart">♥</div>
        <h1>FELIZ ANIVERSÁRIO,<br />MIMIN!!! 🎉❤️</h1>
        <div className="age">14 ANOS!!!</div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="section hero" id="inicio">
      <div className="hero-copy reveal-on-scroll">
        <span className="eyebrow">hoje o dia é todinho seu</span>
        <h2>Feliz aniversário,<br /><em>Mimin!</em> ❤️</h2>
        <p>14 anos de uma menina simplesmente incrível.</p>
      </div>
      <div className="hero-photo-wrap reveal-on-scroll">
        <div className="photo-halo" />
        <img src="/photos/mimin-2.jpeg" alt="Mimin" className="hero-photo" />
        <span className="photo-sticker">♡</span>
      </div>
    </section>
  );
}

function PhotoGallery({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section className="section gallery-section" id="ela">
      <div className="section-heading reveal-on-scroll">
        <span className="eyebrow">sem precisar explicar</span>
        <h2>Essa é a Mimin. <span>❤️</span></h2>
        <p>Do jeitinho dela.</p>
      </div>

      <div className="masonry">
        {PHOTOS.map((photo, index) => (
          <button
            className={`gallery-card reveal-on-scroll ${photo.className ?? ""}`}
            key={photo.src}
            onClick={() => onOpen(index)}
            aria-label={`Abrir foto ${index + 1}`}
          >
            <img src={photo.src} alt={photo.alt} />
            {photo.caption && <span className="photo-caption">{photo.caption}</span>}
          </button>
        ))}

        <button className="secret-card reveal-on-scroll" onClick={() => alert("Você merece o mundo inteiro!!! 👀❤️")}>
          <span>✦</span>
          <strong>tem mais uma coisinha...</strong>
          <small>clique aqui 👀</small>
        </button>
      </div>
    </section>
  );
}

function Lightbox({ index, onClose, onChange }: { index: number; onClose: () => void; onChange: (n: number) => void }) {
  const photo = PHOTOS[index];
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="close-lightbox" onClick={onClose} aria-label="Fechar">×</button>
      <button
        className="lightbox-arrow left"
        onClick={(e) => { e.stopPropagation(); onChange((index - 1 + PHOTOS.length) % PHOTOS.length); }}
        aria-label="Foto anterior"
      >‹</button>
      <img src={photo.src} alt={photo.alt} onClick={(e) => e.stopPropagation()} />
      <button
        className="lightbox-arrow right"
        onClick={(e) => { e.stopPropagation(); onChange((index + 1) % PHOTOS.length); }}
        aria-label="Próxima foto"
      >›</button>
    </div>
  );
}

function LoveLetter() {
  return (
    <section className="section letter-section">
      <div className="letter reveal-on-scroll">
        <div className="letter-top">
          <span>♡</span>
          <span>Uma mensagem do papai</span>
          <span>♡</span>
        </div>
        <div className="paper">
          <h2>Uma mensagem do papai ❤️</h2>
          <div className="handwritten">
            <p>Oii Mimin, feliz aniversário!!! ❤️</p>
            <p>Hoje é seu dia e eu quero te dizer que você é uma menina incrível e muitoooo legal.</p>
            <p>Eu admiro muito você e nós te amamos, Mimin.</p>
            <p>Você merece o mundo todo só por ser quem você é, com esse coraçãozinho puro!! ❤️</p>
            <p>Isso é raro hoje em dia e você é muito especial.</p>
            <p>Feliz seu diaaaaa!!! 🎉❤️</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SurpriseGift({ onMusic }: { onMusic: () => void }) {
  const [open, setOpen] = useState(false);

  const openGift = () => {
    setOpen(true);
    onMusic();
  };

  return (
    <section className="section gift-section" id="surpresa">
      <div className="gift-intro reveal-on-scroll">
        <span className="eyebrow">psiu...</span>
        <h2>Tem mais uma coisa aqui... 👀</h2>
        <p>Mas essa você vai ter que descobrir.</p>
      </div>

      <button className={`gift-button ${open ? "opened" : ""}`} onClick={openGift} aria-label="Abrir presente">
        <span className="gift-glow" />
        <span className="gift-box">
          <span className="gift-lid" />
          <span className="gift-body" />
          <span className="gift-ribbon-v" />
          <span className="gift-ribbon-h" />
        </span>
      </button>

      {open && (
        <div className="gift-message reveal-message">
          <span className="sparkle">✦</span>
          <p>Se você chegou até aqui...</p>
          <p>é porque ainda tinha um pedacinho desse presente guardado para você. ❤️</p>
          <p>Nunca esquece o quanto você é especial, Mimin.</p>
          <strong>Nós te amamos! ❤️</strong>
        </div>
      )}
    </section>
  );
}

function PressAndHold() {
  const [holding, setHolding] = useState(false);
  const [love, setLove] = useState(false);

  useEffect(() => {
    if (!holding) return;
    const timer = window.setTimeout(() => setLove(true), 2200);
    return () => window.clearTimeout(timer);
  }, [holding]);

  return (
    <section className="section hold-section">
      <div className="hold-card reveal-on-scroll">
        <span className="eyebrow">uma coisa simples</span>
        <h2>Pressione aqui ❤️</h2>
        <p>Segura por alguns segundos.</p>

        <button
          className={`hold-button ${holding ? "holding" : ""}`}
          onPointerDown={() => setHolding(true)}
          onPointerUp={() => setHolding(false)}
          onPointerLeave={() => setHolding(false)}
          onPointerCancel={() => setHolding(false)}
        >
          <span>{holding ? "mais um pouquinho..." : "segura aqui ❤️"}</span>
        </button>

        <div className="heart-rain" aria-hidden="true">
          {holding && Array.from({ length: 34 }, (_, i) => (
            <span key={i} style={{ left: `${(i * 29) % 100}%`, animationDelay: `${(i % 8) * 0.12}s` }}>♥</span>
          ))}
        </div>

        {love && <p className="hold-reveal">Esse aqui é só para lembrar que eu te amo. ❤️</p>}
      </div>
    </section>
  );
}

function MusicPlayer({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button className="music-player" onClick={onToggle} aria-label={playing ? "Pausar música" : "Tocar música"}>
      <span className={`music-icon ${playing ? "playing" : ""}`}>♫</span>
      <span>{playing ? "tocando..." : "música"}</span>
      <span>{playing ? "⏸" : "▶"}</span>
    </button>
  );
}

function FinalMessage() {
  return (
    <section className="final-section">
      <div className="final-inner reveal-on-scroll">
        <span className="eyebrow">antes de você ir...</span>
        <h2>Mimin, nunca esquece disso:</h2>
        <div className="final-lines">
          <p>Você é única.</p>
          <p>Você é especial.</p>
          <p>Você é muito amada.</p>
        </div>
        <div className="final-age">Feliz 14 anos. ❤️</div>
        <div className="signature">Com amor,<br /><strong>Papai ❤️</strong></div>
      </div>
    </section>
  );
}

function App() {
  const [birthday, setBirthday] = useState(Date.now() >= TARGET);
  const [reveal, setReveal] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const musicRef = useRef<HTMLIFrameElement>(null);

  const triggerReveal = () => {
    setBirthday(true);
    setReveal(true);
    window.setTimeout(() => setReveal(false), 7200);
  };

  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) el.classList.add("visible");
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [birthday]);

  const startMusic = () => {
    setPlaying(true);
  };

  const toggleMusic = () => setPlaying((v) => !v);

  return (
    <div className={`app ${birthday ? "birthday" : "waiting"}`}>
      <FloatingBackground />

      {!birthday ? (
        <Countdown onReveal={triggerReveal} />
      ) : (
        <>
          {reveal && (
            <>
              <div className="reveal-overlay"><BirthdayReveal /></div>
              <Confetti active />
            </>
          )}

          <MusicPlayer playing={playing} onToggle={toggleMusic} />
          {playing && (
            <iframe
              ref={musicRef}
              className="youtube-player"
              title="Música"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&playsinline=1&controls=0&loop=1&playlist=${YOUTUBE_ID}`}
              allow="autoplay; encrypted-media"
            />
          )}

          <Hero />
          <PhotoGallery onOpen={setLightbox} />
          <LoveLetter />
          <SurpriseGift onMusic={startMusic} />
          <PressAndHold />
          <FinalMessage />

          <footer>feito com carinho, para a Mimin. ❤️</footer>

          {lightbox !== null && (
            <Lightbox
              index={lightbox}
              onClose={() => setLightbox(null)}
              onChange={setLightbox}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
