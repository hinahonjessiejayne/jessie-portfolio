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
} from 'simple-icons';

/**
 * Logo-only strip of the tools behind the work above. Marks come from
 * simple-icons (CC0) and are tinted with currentColor so they sit in the
 * site's gold; nothing is hot-linked. GoHighLevel has no simple-icons mark,
 * so it is drawn from a self-hosted image through a CSS mask, which tints
 * the same way.
 */
type Mark =
  | { name: string; path: string; maskClass?: never }
  | { name: string; maskClass: string; path?: never };

const MARKS: Mark[] = [
  {
    name: 'GoHighLevel',
    maskClass: '[mask-image:url(/logos/gohighlevel.png)] [-webkit-mask-image:url(/logos/gohighlevel.png)]',
  },
  { name: siN8n.title, path: siN8n.path },
  { name: siZapier.title, path: siZapier.path },
  { name: siMake.title, path: siMake.path },
  { name: siClaude.title, path: siClaude.path },
  { name: siCursor.title, path: siCursor.path },
  { name: siGithubcopilot.title, path: siGithubcopilot.path },
  { name: siReact.title, path: siReact.path },
  { name: siVite.title, path: siVite.path },
  { name: siTypescript.title, path: siTypescript.path },
  { name: siNextdotjs.title, path: siNextdotjs.path },
  { name: siTailwindcss.title, path: siTailwindcss.path },
  { name: siNodedotjs.title, path: siNodedotjs.path },
  { name: siVercel.title, path: siVercel.path },
  { name: siGithub.title, path: siGithub.path },
  { name: siExpo.title, path: siExpo.path },
  { name: siPython.title, path: siPython.path },
  { name: siSqlite.title, path: siSqlite.path },
  { name: siAsana.title, path: siAsana.path },
  { name: siGooglesheets.title, path: siGooglesheets.path },
  { name: siWix.title, path: siWix.path },
  { name: siObsidian.title, path: siObsidian.path },
  { name: siGooglechrome.title, path: siGooglechrome.path },
];

const Logo = ({ mark }: { mark: Mark }) => (
  <li className="flex shrink-0 items-center px-7 md:px-9">
    {mark.path ? (
      <svg
        className="h-7 w-7 md:h-8 md:w-8"
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        aria-label={mark.name}
      >
        <title>{mark.name}</title>
        <path d={mark.path} />
      </svg>
    ) : (
      <span
        className={`block h-7 w-7 bg-current md:h-8 md:w-8 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] ${mark.maskClass}`}
        role="img"
        aria-label={mark.name}
      />
    )}
  </li>
);

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
      <div className="flex w-max animate-marquee text-brand-600/70 transition-colors hover:text-brand-600 hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none dark:text-brand-400/55 dark:hover:text-brand-400">
        <Track />
        <Track hidden />
      </div>
    </div>
  </section>
);

export default ToolMarquee;
