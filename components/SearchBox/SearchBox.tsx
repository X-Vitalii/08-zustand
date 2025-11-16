import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChangeQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function SearchBox({ onChangeQuery, value }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={onChangeQuery}
    />
  );
}
