const HEADER_OFFSET = 80;

/**
 * Scrolls to a section by id, offsetting for the floating header.
 * Accepts either "work" or "#work".
 */
export function scrollToSection(
  event: React.MouseEvent<HTMLAnchorElement>,
  target: string,
): string | null {
  event.preventDefault();

  const id = target.startsWith('#') ? target.substring(1) : target;
  const element = document.getElementById(id);
  if (!element) return null;

  const top =
    element.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });

  return id;
}
