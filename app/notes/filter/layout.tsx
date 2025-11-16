import css from './Beside.module.css';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.beside}>
      <aside>{sidebar}</aside>
      {children}
    </section>
  );
};

export default NotesLayout;
