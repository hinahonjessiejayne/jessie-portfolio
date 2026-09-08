import {
  siAsana,
  siClaude,
  siCursor,
  siExpo,
  siGithub,
  siGithubcopilot,
  siGooglechrome,
  siGooglesheets,
  siMake,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siObsidian,
  siPython,
  siReact,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siWix,
  siZapier,
  type SimpleIcon,
} from 'simple-icons';

/**
 * Logo-only strip of the tools behind the work above, each in its own brand
 * colour. Marks come from simple-icons (CC0) and carry the brand hex; nothing
 * is hot-linked. Brands whose mark is black (GitHub, Vercel, Next.js, Cursor…)
 * follow the page theme instead, the way those brands publish their own
 * light-on-dark variants. GoHighLevel and Botpress have no simple-icons
 * entry: GoHighLevel is traced from its own mark, Botpress is a self-hosted
 * alpha mask.
 */
type Mark =
  | { name: string; path: string; hex: string }
  | { name: string; maskClass: string }
  | { name: string; custom: 'gohighlevel' };

const brand = (icon: SimpleIcon): Mark => ({ name: icon.title, path: icon.path, hex: icon.hex });

const MARKS: Mark[] = [
  { name: 'GoHighLevel', custom: 'gohighlevel' },
  brand(siN8n),
  brand(siZapier),
  brand(siMake),
  {
    name: 'Botpress',
    maskClass: '[mask-image:url(/logos/botpress.png)] [-webkit-mask-image:url(/logos/botpress.png)]',
  },
  brand(siClaude),
  brand(siCursor),
  brand(siGithubcopilot),
  brand(siReact),
  brand(siVite),
  brand(siTypescript),
  brand(siNextdotjs),
  brand(siTailwindcss),
  brand(siNodedotjs),
  brand(siVercel),
  brand(siGithub),
  brand(siExpo),
  brand(siPython),
  brand(siSqlite),
  brand(siAsana),
  brand(siGooglesheets),
  brand(siWix),
  brand(siObsidian),
  brand(siGooglechrome),
];

/** A brand colour too dark to read on the dark theme's near-black ground. */
const isNearBlack = (hex: string) => {
  const n = parseInt(hex, 16);
  return Math.max((n >> 16) & 255, (n >> 8) & 255, n & 255) < 96;
};

/** Text colour for theme-following marks: black on light, white on dark. */
const THEMED = 'text-light-text dark:text-white';

const GoHighLevelMark = () => (
  <svg className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 32 32" role="img" aria-label="GoHighLevel">
    <title>GoHighLevel</title>
    <path fill="#FFD600" d="M10 6.2 5.6 10.6h2.9V26.6h3V10.6h2.9z" />
    <path fill="#2FABFF" d="M16 11.6 11.6 16h2.9V26.6h3V16h2.9z" />
    <path fill="#55EE26" d="M22 5.6 17.6 10h2.9V26.6h3V10h2.9z" />
  </svg>
);

const Logo = ({ mark }: { mark: Mark }) => {
  if ('custom' in mark) {
    return (
      <li className="flex shrink-0 items-center px-7 md:px-9">
        <GoHighLevelMark />
      </li>
    );
  }
  if ('maskClass' in mark) {
    return (
      <li className={`flex shrink-0 items-center px-7 md:px-9 ${THEMED}`}>
        <span
          className={`block h-7 w-7 bg-current md:h-8 md:w-8 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] ${mark.maskClass}`}
          role="img"
          aria-label={mark.name}
        />
      </li>
    );
  }
  const themed = isNearBlack(mark.hex);
  return (
    <li className={`flex shrink-0 items-center px-7 md:px-9 ${themed ? THEMED : ''}`}>
      <svg
        className="h-7 w-7 md:h-8 md:w-8"
        viewBox="0 0 24 24"
        fill={themed ? 'currentColor' : `#${mark.hex}`}
        role="img"
        aria-label={mark.name}
      >
        <title>{mark.name}</title>
        <path d={mark.path} />
      </svg>
    </li>
  );
};

const Track = ({ hidden = false }: { hidden?: boolean }) => (
  <ul
    className="flex w-max items-center motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center"
    aria-hidden={hidden}
  >
    {MARKS.map((mark) => (
      <Logo key={`${hidden ? 'b' : 'a'}-${mark.name}`} mark={mark} />
    ))}
  </ul>
);

const ToolMarquee = () => (
  <section
    id="tools"
    className="relative border-y border-light-border py-10 dark:border-dark-border md:py-12"
    aria-labelledby="tools-heading"
  >
    <h2
      id="tools-heading"
      className="mb-8 text-center font-mono text-xs uppercase tracking-widest text-brand-600 dark:text-brand-400"
    >
      Tools I work with
    </h2>

    <div className="relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-24 before:bg-gradient-to-r before:from-light-bg before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-24 after:bg-gradient-to-l after:from-light-bg after:to-transparent dark:before:from-dark-bg dark:after:from-dark-bg">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none">
        <Track />
        <Track hidden />
      </div>
    </div>
  </section>
);

export default ToolMarquee;
