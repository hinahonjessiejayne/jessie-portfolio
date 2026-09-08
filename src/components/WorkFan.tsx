import { useEffect, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import type { Project } from '../types';

/**
 * The work section's fanned card deck. Cards sit on an arc whose pivot is well
 * below the deck, so stepping through them reads like turning a hand of cards:
 * the active one stands upright and in front with its details, the rest lean
 * away and dim. Geometry is computed, styling is Tailwind; no inline styles
 * beyond the transforms Framer Motion animates.
 */

type Tier = 'mobile' | 'tablet' | 'desktop';

/** Arc radius, degrees between cards, and how many neighbours stay visible. */
const LAYOUT: Record<Tier, { radius: number; step: number; visible: number }> = {
  mobile: { radius: 620, step: 11, visible: 2 },
  tablet: { radius: 900, step: 9, visible: 4 },
  desktop: { radius: 1150, step: 8, visible: 6 },
};

const useTier = (): Tier => {
  const [tier, setTier] = useState<Tier>('desktop');
  useEffect(() => {
    const md = window.matchMedia('(min-width: 768px)');
    const xl = window.matchMedia('(min-width: 1280px)');
    const update = () => setTier(xl.matches ? 'desktop' : md.matches ? 'tablet' : 'mobile');
    update();
    md.addEventListener('change', update);
    xl.addEventListener('change', update);
    return () => {
      md.removeEventListener('change', update);
      xl.removeEventListener('change', update);
    };
  }, []);
  return tier;
};

/** The reference deck labels each card with a slug; ours comes from the title. */
const slugOf = (title: string) =>
  title
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 24);

const toRadians = (deg: number) => (deg * Math.PI) / 180;

type CardProps = {
  project: Project;
  offset: number;
  tier: Tier;
  index: number;
  total: number;
  reduced: boolean;
  onSelect: () => void;
  onOpen: () => void;
};

const Card = ({ project, offset, tier, index, total, reduced, onSelect, onOpen }: CardProps) => {
  const { radius, step, visible } = LAYOUT[tier];
  const active = offset === 0;
  const distance = Math.abs(offset);
  const hidden = distance > visible;
  const angle = offset * step;
  const x = radius * Math.sin(toRadians(angle));
  const y = radius * (1 - Math.cos(toRadians(angle)));
  const tags = [project.category, ...(project.metrics ?? [])].slice(0, 3);

  return (
    <motion.article
      className={`absolute left-1/2 top-1/2 -ml-[100px] -mt-[150px] h-[300px] w-[200px] overflow-hidden rounded-xl border bg-white text-left shadow-2xl dark:bg-dark-card md:-ml-[115px] md:-mt-[175px] md:h-[350px] md:w-[230px] xl:-ml-[130px] xl:-mt-[200px] xl:h-[400px] xl:w-[260px] ${
        active
          ? 'cursor-zoom-in border-brand-400 shadow-[0_30px_80px_-20px_rgba(212,175,55,0.35)]'
          : 'cursor-pointer border-light-border dark:border-dark-border'
      } ${hidden ? 'pointer-events-none' : ''}`}
      initial={false}
      animate={{
        x,
        y: y - (active ? 24 : 0),
        rotate: angle,
        scale: active ? 1.08 : Math.max(0.86, 1 - distance * 0.03),
        opacity: hidden ? 0 : Math.max(0.35, 1 - distance * 0.1),
        zIndex: 100 - distance,
      }}
      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 26 }}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${project.title}`}
      aria-hidden={hidden}
      onClick={active ? onOpen : onSelect}
    >
      {/* Art: the real capture, full-bleed on leaning cards, a header band on the active one. */}
      <div className={`relative overflow-hidden ${active ? 'h-[42%]' : 'h-full'}`}>
        <img
          src={project.imageUrl}
          alt=""
          loading="lazy"
          draggable={false}
          className={`h-full w-full object-cover object-top transition-opacity duration-500 ${
            active ? 'opacity-90' : 'opacity-60 dark:opacity-50'
          }`}
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${
            active
              ? 'bg-gradient-to-t from-white via-white/10 to-transparent dark:from-dark-card dark:via-dark-card/10'
              : 'bg-gradient-to-t from-black/85 via-black/20 to-black/40'
          }`}
        />
        {/* Inner keyline, like the reference deck's printed border. */}
        <div aria-hidden="true" className="absolute inset-2 rounded-lg border border-brand-400/40" />
        <p className="absolute left-4 top-4 font-mono text-[9px] font-semibold tracking-[0.2em] text-brand-300 drop-shadow md:text-[10px]">
          {slugOf(project.title)}
        </p>
      </div>

      {active && (
        <div className="flex h-[58%] flex-col p-4 md:p-5">
          <h4 className="font-serif text-lg font-bold leading-tight text-gray-900 dark:text-white md:text-xl">
            {project.title}
          </h4>
          <ul className="mt-2 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-brand-500/40 bg-brand-400/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300"
              >
                {tag}
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="mt-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
            <span className="h-px flex-1 bg-gradient-to-r from-brand-500/60 to-transparent" />
          </div>
          <p className="mt-3 line-clamp-4 text-xs leading-relaxed text-light-muted dark:text-dark-muted md:line-clamp-5 md:text-[13px]">
            {project.description}
          </p>
          <div className="mt-auto flex items-center justify-between pt-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
            <span className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400">
              View details <Maximize2 className="h-3 w-3" />
            </span>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-1 hover:text-brand-500"
              >
                Live <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </motion.article>
  );
};

type WorkFanProps = {
  projects: Project[];
  onOpen: (project: Project) => void;
};

const WorkFan = ({ projects, onOpen }: WorkFanProps) => {
  const [active, setActive] = useState(0);
  const tier = useTier();
  const reduced = useReducedMotion() ?? false;
  const total = projects.length;
  const current = projects[active];

  const go = (delta: number) => setActive((i) => Math.min(total - 1, Math.max(0, i + delta)));

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'Enter' && current) {
      onOpen(current);
    }
  };

  if (!current) {
    return (
      <p className="py-12 text-center text-gray-500 dark:text-gray-400">No projects in this category yet.</p>
    );
  }

  return (
    <div
      className="relative select-none focus:outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured work"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Deck. Clipped so the far cards can never widen the page. */}
      <div className="relative h-[460px] overflow-hidden md:h-[560px] xl:h-[640px]">
        {/* Ghosted title behind the deck, like the reference's oversized wordmark. */}
        <motion.p
          key={current.id}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.6 }}
          className="pointer-events-none absolute inset-x-0 top-6 line-clamp-2 px-4 text-center font-serif text-[15vw] font-bold leading-[0.9] text-black/[0.05] dark:text-white/[0.045] md:text-[11vw] xl:text-[9vw]"
        >
          {current.title}
        </motion.p>

        <div className="perspective-1000 absolute inset-0">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              project={project}
              offset={index - active}
              tier={tier}
              index={index}
              total={total}
              reduced={reduced}
              onSelect={() => setActive(index)}
              onOpen={() => onOpen(project)}
            />
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={active === 0}
              aria-label="Previous project"
              className="absolute left-0 top-1/2 z-[120] -translate-y-1/2 rounded-full border border-light-border bg-white/80 p-2 text-gray-900 backdrop-blur transition hover:border-brand-400 hover:text-brand-600 disabled:opacity-30 dark:border-dark-border dark:bg-black/60 dark:text-white dark:hover:text-brand-400 md:left-2 md:p-3"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={active === total - 1}
              aria-label="Next project"
              className="absolute right-0 top-1/2 z-[120] -translate-y-1/2 rounded-full border border-light-border bg-white/80 p-2 text-gray-900 backdrop-blur transition hover:border-brand-400 hover:text-brand-600 disabled:opacity-30 dark:border-dark-border dark:bg-black/60 dark:text-white dark:hover:text-brand-400 md:right-2 md:p-3"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Caption + dots, as in the reference. */}
      <div className="mt-2 flex flex-col items-center gap-4">
        <p aria-live="polite" className="font-serif text-lg italic text-gray-900 dark:text-white md:text-xl">
          {current.title}
        </p>
        {total > 1 && (
          <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Projects">
            {projects.map((project, index) => (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show ${project.title}`}
                  aria-current={index === active}
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    index === active
                      ? 'w-8 bg-brand-400 shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                      : 'w-2 bg-gray-300 hover:bg-brand-500/60 dark:bg-dark-border'
                  }`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WorkFan;
