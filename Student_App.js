import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import { listExams, listResults } from './graphql/queries'
import { onCreateResults, onCreateExam } from './graphql/subscriptions'

function App() {
  const [Exam, setExam] = useState({date: 'Please wait...', subject: 'Please wait...', teacher: 'Please wait...'});
  const [examResults, setExamResults] = useState([])

  useEffect(() => {
    fetchExam();
    fetchExamResults();
  }, [])

  useEffect(() => {
    const subscriptionOnCreateExam = API.graphql(
      {
        query: onCreateExam,
        operationName: 'onCreateExam',
        authMode: 'AWS_IAM'
      }
    ).subscribe({
      next: ({ provider, value }) => {
        fetchExam();
      },
      error: (error) => console.log('Error subscribing...', JSON.stringify(error)),
    });

    return function cleanup() {
      subscriptionOnCreateExam.unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    const subscriptionOnCreateResult = API.graphql(
      {
        query: onCreateResults,
        operationName: 'onCreateResult',
        authMode: 'AWS_IAM'
      }
    ).subscribe({
      next: ({ provider, value }) => {
        console.log('Subscription worked!!!');
        fetchExamResults();
      },
      error: (error) => console.log('Error subscribing...', JSON.stringify(error)),
    });

    return function cleanup() {
      subscriptionOnCreateResult.unsubscribe();
    };
  }, []);

  const fetchExam = async () => {
    try {
      const fetchedExam = await API.graphql({ query: listExams, authMode: 'AWS_IAM' });
      if (fetchedExam.data.listExams.items.length >= 1) {
        setExam(fetchedExam.data.listExams.items[0]);
      }
    } catch (error) {
      alert(`Could not get Exam data ${JSON.stringify(error)}`)
    }
  }

  const fetchExamResults = async () => {
    try {
      const fetchedExamResults = await API.graphql({ query: listResults, authMode: 'AWS_IAM' });
      setExamResults(fetchedExamResults.data.listResults.items);
    } catch (error) {
      alert(`Could not get Exam Results data ${JSON.stringify(error)}`)
    }
  }

  return (

    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
    <header style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#282c34', color: 'white', justifyContent: 'center', alignItems: 'center', height: '8vh'}}>
      <img src={logo} alt="logo" style={{ height: '7vmin',  pointerEvents: 'none' }}/>
      <p>   __________Student app__________   </p>
    </header>
    <body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f1f2f4', minHeight: '92vh'}}>
      <h2>Exam information</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '75%', maxWidth: '25em', paddingBottom: '1em', }}>
          <p>Date: {Exam.date}<br></br>Subject: {Exam.subject}<br></br>Teacher: {Exam.teacher}</p> 
      </div>
      <h2>Results</h2>
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
