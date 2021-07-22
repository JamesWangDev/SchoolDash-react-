import Link from 'next/link';
import styled from 'styled-components';
import { useUser } from '../User';
import CallbackCardMessages from './CallbackCardMessages';
import MarkCallbackCompleted from './MarkCallbackCompleted';

const SingleCardStyles = styled.div`
  background: linear-gradient(to top left, var(--redTrans), var(--blueTrans));
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0.5rem 1rem;
  }
  p {
    margin: 0rem 1rem 1rem 1rem;
  }
  .link {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.1rem 0.5rem;
    border-radius: 0.5rem;
    margin: -0.5rem 0 0.5rem;
    cursor: pointer;
  }
  a {
    text-align: center;
  }
  fieldset {
    width: 80%;
  }
`;

export default function SingleCallbackCard({ callback }) {
  const me = useUser();
  const dateAssigned = new Date(callback.dateAssigned).toLocaleDateString();
  const completed = callback.dateCompleted
    ? `Completed on ${new Date(callback.dateCompleted).toLocaleDateString()}`
    : 'Incomplete';
  return (
    <SingleCardStyles>
      <Link href={`/callback/${callback.id}`}>
        <a>
          <h1>{callback.title}</h1>
          <p>
            {callback.teacher.id === me.id
              ? ''
              : `${callback.teacher.name} -- `}{' '}
            {dateAssigned}
          </p>
          <p>
            {callback.student.id === me.id
              ? ''
              : `${callback.student.name} -- `}{' '}
            {completed}
          </p>
          <p>{callback.description}</p>
        </a>
      </Link>
      {callback.link && (
        <Link
          href={
            callback.link?.startsWith('http')
              ? callback.link
              : `http://${callback.link}`
          }
        >
          <p className="link">{callback.link ? 'Link' : ''}</p>
        </Link>
      )}
      <CallbackCardMessages me={me} callback={callback} />
      {!callback.dateCompleted && <MarkCallbackCompleted callback={callback} />}
    </SingleCardStyles>
  );
}
