import Link from 'next/link';
import css from './SidebarNotes.module.css';

const NotesSidebar = () => {
  const tags = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];
  return (
    <div className={css.subContainer}>
      <Link href="/notes/action/create" className={css.createLink}>
        Create note
      </Link>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSidebar;
