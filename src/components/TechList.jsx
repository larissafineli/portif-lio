import { asset } from './Icon.jsx';

const icons = {
  HTML5: 'html5', CSS3: 'css3', JavaScript: 'javascript', Java: 'java', Python: 'python',
  'Spring Boot': 'spring-boot', Git: 'git', GitHub: 'github', React: 'react', Vite: 'vite'
};

export default function TechList({ items }) {
  return (
    <ul className="tech-list">
      {items.map((label) => (
        <li className="tech" key={label}>
          {icons[label] && (
            <span className={`tech-mark tech-mark--${icons[label]}`}>
              <img className="tech-icon" src={asset(`tech/${icons[label]}.svg`)} alt="" width="26" height="26" />
            </span>
          )}
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
