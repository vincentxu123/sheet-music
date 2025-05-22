"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  SINGLE_MUSIC_NOTE,
  MULTI_MUSIC_NOTE,
  TREBLE_CLEFF,
  BASS_CLEFF,
} from "./constants";

const NOTE_COUNT = 10;
const COLOR_PALETTE = ["#bc4d67", "#ae9332", "#139f7b", "#118AB2", "#1782a6", "#66b2b2", "#5c8374", "#8e05c2", "#a27b5c", "#ef88ad", "#8c3061", "#4c3bcf", "#e19898", "#395b64", "#ed6663", "#000000", "#000000", "#000000"];
const MUSIC_SYMBOL_SVG_LIST = [SINGLE_MUSIC_NOTE, MULTI_MUSIC_NOTE, TREBLE_CLEFF, BASS_CLEFF];
const MUSIC_NOTES_TOGGLE_KEY = "musicNotesAnimation";

type Note = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  speed: number;
  size: number;
  color: string; // hex
  angle: number;
  rotationSpeed: number;
  opacity: number;
  image: HTMLImageElement;
};

const createSVGDataURL = (color: string) => {
  const randomMusicSymbol = MUSIC_SYMBOL_SVG_LIST[Math.floor(Math.random() * MUSIC_SYMBOL_SVG_LIST.length)];
  const svgString = randomMusicSymbol(color);
  return "data:image/svg+xml;utf8," + encodeURIComponent(svgString);
};

const randomNote = (width: number, height: number): Note => {
  const color = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.4 + Math.random() * 0.7;
  // --- size: make slightly bigger (was 24 + rand * 14; now 32 + rand * 20)
  const size = 32 + Math.random() * 20;
  const rotationSpeed = (Math.random() - 0.5) * 0.01;
  const opacity = 0.6 + Math.random() * 0.35;

  const img = new window.Image();
  img.src = createSVGDataURL(color);

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
    speed,
    size,
    color,
    angle,
    rotationSpeed,
    opacity,
    image: img,
  };
};

const drawNote = (ctx: CanvasRenderingContext2D, note: Note) => {
  ctx.save();
  ctx.translate(note.x, note.y);
  ctx.rotate(note.angle);
  ctx.globalAlpha = note.opacity;

  // Center the note image, scale to match size (SVG's viewbox: 12.5w x 16.5h)
  const aspect = 16.5 / 12.5;
  const width = note.size;
  const height = note.size * aspect;

  ctx.drawImage(note.image, -width / 2, -height / 2, width, height);
  ctx.restore();
};


const MusicNotesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const notesRef = useRef<Note[]>([]);
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem(MUSIC_NOTES_TOGGLE_KEY) == "on") {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // High-DPI scaling
    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Initialize notes
    const initNotes = () => {
      notesRef.current = [];
      for (let i = 0; i < NOTE_COUNT; i++) {
        notesRef.current.push(randomNote(width, height));
      }
    };

    initNotes();

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = notesRef.current.length - 1; i >= 0; i--) {
        const note = notesRef.current[i];
        note.x += note.dx;
        note.y += note.dy;
        note.angle += note.rotationSpeed;

        // If the note floats off the screen, replace it with a new random one (new color & symbol)
        if (
          note.x < -40 ||
          note.x > width + 40 ||
          note.y < -40 ||
          note.y > height + 40
        ) {
          // Spawn new note from random edge
          const spawnEdge = Math.floor(Math.random() * 4); // 0: left, 1: right, 2: top, 3: bottom
          const newNote = randomNote(width, height);
          switch (spawnEdge) {
            case 0: // left
              newNote.x = -40;
              newNote.y = Math.random() * height;
              break;
            case 1: // right
              newNote.x = width + 40;
              newNote.y = Math.random() * height;
              break;
            case 2: // top
              newNote.x = Math.random() * width;
              newNote.y = -40;
              break;
            case 3: // bottom
              newNote.x = Math.random() * width;
              newNote.y = height + 40;
              break;
            default:
              // fallback, should never hit
              break;
          }
          notesRef.current[i] = newNote;
        }

        drawNote(ctx, notesRef.current[i]);
      }

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        tabIndex={-1}
        className={`pointer-events-none fixed top-0 left-0 w-full h-full z-[-10] select-none transition-opacity duration-500 ${
          enabled ? "opacity-100" : "opacity-0"
        }`}
      />
      <button
        aria-label={enabled ? "Disable music notes background" : "Enable music notes background"}
        onClick={() => {
            setEnabled(v => !v)
            localStorage.setItem(MUSIC_NOTES_TOGGLE_KEY, enabled ? "off" : "on");
          }
        }
        className="fixed bottom-6 right-6 z-50 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-full shadow-lg p-3 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform focus:outline-none"
        style={{ boxShadow: "0 2px 10px 2px rgba(0,32,70,0.09)" }}
        title={enabled ? "Hide music notes" : "Show music notes"}
      >
        <span className="w-6 h-6 flex items-center justify-center pb-2">
          <svg
                      viewBox="8 2.5 12.5 16.5"
                      fill="var(--svg-fill)"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="32"
                      style={{ display: "block", margin: "0 auto" }}
                    >
                      <g transform="translate(10.25, 17) scale(0.000625, -0.000625)">
                        <path d="M10444 14491 c-41 -19 -78 -59 -106 -116 -41 -83 -43 -114 -43 -805 0 -902 -13 -2293 -27 -2985 -16 -748 -15 -2187 3 -3100 27 -1386 18 -2497 -22 -2920 -17 -179 -17 -179 -67 -183 -23 -2 -105 8 -182 23 -494 91 -713 96 -1147 29 -373 -57 -681 -155 -988 -313 -602 -309 -959 -735 -1092 -1301 -34 -144 -43 -402 -19 -539 61 -348 247 -606 541 -751 342 -168 971 -209 1520 -99 505 101 846 233 1106 426 148 110 428 394 555 563 101 134 186 297 254 489 95 267 106 489 65 1351 -38 802 -40 911 -38 2110 3 1433 17 2841 38 3680 8 338 19 862 24 1163 5 302 11 551 14 553 3 3 48 -10 100 -30 52 -20 189 -63 303 -96 255 -74 315 -96 469 -172 359 -177 689 -471 900 -803 106 -168 209 -424 259 -648 80 -354 74 -746 -18 -1167 -63 -289 -111 -415 -257 -675 -92 -162 -188 -368 -196 -422 -15 -91 78 -79 190 25 130 122 327 404 432 617 178 364 245 681 245 1163 0 667 -186 1315 -541 1880 -143 228 -295 414 -645 789 -417 447 -566 622 -688 811 -200 308 -436 798 -540 1121 -69 215 -109 281 -198 325 -64 32 -143 34 -204 7z"/>
                      </g>
                    </svg>
        </span>
        <span className="ml-2 mr-2 text-xs text-neutral-600 dark:text-neutral-300 hidden sm:inline">
          {enabled ? "Hide notes" : "Show notes"}
        </span>
      </button>
    </>
  );
};

export default MusicNotesBackground;