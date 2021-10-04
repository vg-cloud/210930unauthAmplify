import React from 'react';
import logo from './logo.svg';

function App() {
  // prettier-ignore
  const ExamTemplate = { id: '', subject: '', date: '', teacher: '', };
  const StudentResultTemplate = { id: '', student: '', grade: '' };
  // prettier-ignore
  const StudentResultTemplateBis = { id: '2', student: 'Richardson', grade: '9', };

  const [examResults, setExamResults] = React.useState([]);
  const [Exam, setExam] = React.useState(ExamTemplate);
  // prettier-ignore
  const [studentResult, setStudentResult] = React.useState( StudentResultTemplate );

  const saveExam = () => {};

  const addResult = (e) => {
    studentResult.id = Date().substr(0, 24);
    setExamResults([...examResults, studentResult]);
    setStudentResult(StudentResultTemplate);
    e.preventDefault();
  };

  const newExam = () => {};

  const handleExamChange = (evt) => {
    const value = evt.target.value;
    setExam({ ...Exam, [evt.target.name]: value });
  };

  const handleResultChange = (evt) => {
    const value = evt.target.value;
    setStudentResult({ ...studentResult, [evt.target.name]: value });
  };

  // prettier-ignore
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
      <header style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#282c34', color: 'white', justifyContent: 'center', alignItems: 'center', height: '8vh'}}>
        <img src={logo} alt="logo" style={{ height: '7vmin',  pointerEvents: 'none' }}/>
        <p>   __________Teacher app__________   </p>
        <button onClick={newExam} type="button">new exam</button>
      </header>
      <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f1f2f4', minHeight: '92vh'}}>
        <h2>Exam information</h2>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '75%', maxWidth: '25em', paddingBottom: '1em', }}>
          <form>
            <input type="text" name="date" size="9" value={Exam.date} onChange={handleExamChange} placeholder="Date"></input>
            <input type="text" name="subject" size="12" value={Exam.subject} onChange={handleExamChange} placeholder="Subject"></input>
            <input type="text" name="teacher" size="14" value={Exam.teacher} onChange={handleExamChange} placeholder="Teacher name"></input>
            <button onClick={saveExam} type="button">Save</button>
          </form>
        </div>
        <h2>Results</h2>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '65%', maxWidth: '20em', paddingBottom: '1em', }}>
          <form onSubmit={addResult}>
            <input type="text" name="student" size="20" value={studentResult.student} onChange={handleResultChange} placeholder="Student name"></input>
            <input type="text" name="grade" size="5" value={studentResult.grade} onChange={handleResultChange} placeholder="Grade"></input>
            <input type="submit" name="submit" value="Submit" />
          </form>
        </div>
        <div>
          <table style={{ minWidth: '18em'}}>
              <thead style={{ backgroundColor: '#c5cad3' }}>
                <tr><th>Student</th><th>Grade</th></tr>
              </thead>
              <tbody>
                {examResults.map((item) => (
                  <tr key={item.id}>
                    <td>{item.student}</td>
                    <td style={{ textAlign: 'center'}}>{item.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </body>
    </div>
  );
}

export default App;
