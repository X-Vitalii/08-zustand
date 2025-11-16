import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import type { AddNote } from '../../types/note';
import { createNote } from '../../lib/api';

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: AddNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Keep at least 3 characters')
    .max(50, 'Keep not more than 50 characters')
    .required('title is required'),
  content: Yup.string().max(500, 'Keep not more than 50 characters'),
  tag: Yup.string()
    .matches(/(Todo|Work|Personal|Meeting|Shopping)/)
    .required('tag is required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newNote: AddNote) => createNote(newNote),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (values: AddNote, actions: FormikHelpers<AddNote>) => {
    mutation.mutate(values);
    actions.resetForm();
  };

  const fieldID = useId();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm }) => (
        <Form className={css.form}>
          <fieldset className={css.formGroup}>
            {/* field title */}
            <label htmlFor={`${fieldID}-title`}>Title</label>
            <Field
              id={`${fieldID}-title`}
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage component="span" name="title" className={css.error} />

            {/* field CONTENT */}
            <label htmlFor={`${fieldID}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldID}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              component="span"
              name="content"
              className={css.error}
            />

            {/* field TAG */}
            <label htmlFor={`${fieldID}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldID}-tag`}
              name="tag"
              className={css.select}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage component="span" name="tag" className={css.error} />
          </fieldset>
          <fieldset className={css.actions}>
            {/* CANCEL button */}
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Cancel
            </button>
            {/* CREATE NOTE button */}
            <button type="submit" className={css.submitButton} disabled={false}>
              Create note
            </button>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
}
