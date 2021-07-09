import ViewStudentPage from './ViewStudentPage';

export default function ViewParentPage({ parent }) {
  return (
    <div>
      <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>
        Parent info
      </h2>
      {parent.children.map((child) => (
        <div key={child.id}>
          <ViewStudentPage student={child} />
        </div>
      ))}
    </div>
  );
}
