import styled from "styled-components";

const StudentPickerStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  min-width: max-content;
  h4 {
    margin-bottom: 0;
    font-size: medium;
    color: #3f3f3f;
  }
  input[type="checkbox"] {
    position: relative;
    cursor: pointer;
    margin-bottom: 5px;
    width: 10px;
    padding: 0;
  }
  .list {
    list-style: none;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0;
    height: 20px;
  }
  label {
    margin-left: 10px;
    font-size: small;
    display: flex;
    padding: 0;
  }
`;

export default function StudentList({
  studentList,
  selectedStudents,
  setSelecetedStudents,
}) {
  const {
    block1Students,
    block2Students,
    block3Students,
    block4Students,
    block5Students,
    block6Students,
    block7Students,
    block8Students,
  } = studentList || [];

  function DisplaySingleClass({ classList }) {
    // console.log(classList);
    return classList.map((student) => (
      <li className="list" key={student.id}>
        <label htmlFor={student.id}>
          <input
            type="checkbox"
            checked={selectedStudents.includes(student.id)}
            id={student.id}
            name={student.name}
            onChange={(e) => {
              if (e.target.checked) {
                setSelecetedStudents([...selectedStudents, student.id]);
              } else {
                setSelecetedStudents(
                  selectedStudents.filter((id) => id !== student.id)
                );
              }
            }}
          />
          {student.name}
        </label>
      </li>
    ));
  }

  return (
    <StudentPickerStyle>
      {block1Students?.length > 0 && (
        <div>
          <h4>block 1 Students</h4>
          <DisplaySingleClass classList={block1Students} />
        </div>
      )}
      {block2Students?.length > 0 && (
        <div>
          <h4>block 2 Students</h4>
          <DisplaySingleClass classList={block2Students} />
        </div>
      )}
      {block3Students?.length > 0 && (
        <div>
          <h4>block 3 Students</h4>
          <DisplaySingleClass classList={block3Students} />
        </div>
      )}
      {block4Students?.length > 0 && (
        <div>
          <h4>block 4 Students</h4>
          <DisplaySingleClass classList={block4Students} />
        </div>
      )}
      {block5Students?.length > 0 && (
        <div>
          <h4>block 5 Students</h4>
          <DisplaySingleClass classList={block5Students} />
        </div>
      )}
      {block6Students?.length > 0 && (
        <div>
          <h4>block 6 Students</h4>
          <DisplaySingleClass classList={block6Students} />
        </div>
      )}
      {block7Students?.length > 0 && (
        <div>
          <h4>block 7 Students</h4>
          <DisplaySingleClass classList={block7Students} />
        </div>
      )}
      {block8Students?.length > 0 && (
        <div>
          <h4>block 8 Students</h4>
          <DisplaySingleClass classList={block8Students} />
        </div>
      )}
    </StudentPickerStyle>
  );
}
