export const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;

export default function Icon({ name, className = '' }) {
  return (
    <svg className={`icon ${className}`.trim()} aria-hidden="true" focusable="false">
      <use href={`${asset('icons.svg')}#i-${name}`} />
    </svg>
  );
}
