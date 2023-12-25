import React, { useEffect, useState } from 'react';
import "./meeting.css"
import { GiExplosiveMeeting } from "react-icons/gi";
import Home from '../Home';
import {collection, getDocs} from 'firebase/firestore'
import {db} from '../../firebase'
const Meeting = () => {
  const [infoEtudiants, setinfoEtudiants] = useState([]);
    const infoEtudiantsCollectionRef = collection(db, "InfoEtudiant")
    useEffect(() => {
        const getsetinfoEtudiants = async () =>{
            const data = await getDocs(infoEtudiantsCollectionRef);
            setinfoEtudiants(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getsetinfoEtudiants();
    })

    const [notes, setNotes] = useState('');
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      date: '2023-01-01',
      group: 'Group A',
      students: ['Student 1', 'Student 2'],
      presence: { 'Student 1': true, 'Student 2': false },
      notes: '',
    },
    {
        id: 2,
        date: new Date(2023, 0, 2),
        group: 'Group B',
        students: ['Student 4', 'Student 5', 'Student 6'],
        presence: { 'Student 4': false, 'Student 5': false, 'Student 6': false },
        notes: '',
      },
      {
        id: 3,
        date: new Date(2023, 0, 2),
        group: 'Group C',
        students: ['Student 6', 'Student 7', 'Student 8'],
        presence: { 'Student 6': false, 'Student 7': true, 'Student 8': true },
        notes: '',
      },
    // Add more meetings as needed
  ]);

 
  const addMeetingNote = (meetingId, newNote) => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) =>
        meeting.id === meetingId ? { ...meeting, notes: [...meeting.notes, newNote] } : meeting
      )
    );
  };

  const handleMarkAsPresent = (studentId, meetingId) => {
    setMeetings((prevMeetings) =>
      prevMeetings.map((meeting) =>
        meeting.id === meetingId
          ? {
              ...meeting,
              presence: {
                ...meeting.presence,
                [studentId]: true,
              },
            }
          : meeting
      )
    );
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };


  

  return (
    <div><Home />
    <br/><br/><br/>
    <div className="meeting-container">
        
        
      <h2 style={{ textAlign: 'center' }}>
        <GiExplosiveMeeting /> Meetings
      </h2>
      <table className="meeting-table">
        <thead>
          <tr>
            <th>Date de reunion</th>
            <th>Groupe</th>
            <th>Participants</th>
            <th>Presence</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
                <td>{new Date(meeting.date).toLocaleDateString()}</td>
              <td>{meeting.group}</td>
              <td>{infoEtudiants.map((infoetud) => {
                return(
            <tr>
      {infoetud.prenom}
      {infoetud.nom}
    </tr>
                );
       })}</td>
              <td>
                <ul>
                  {Object.entries(meeting.presence).map(([studentId, status]) => (
                    <li key={studentId} className={status ? 'present' : 'absent'}>
                      {studentId}: {status ? 'Present' : 'Absent'}
                      <button
                        className='btn btn-info'
                        onClick={() => handleMarkAsPresent(studentId, meeting.id)}
                      >
                        Mark as Present
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <div>{meeting.notes}</div>
                <textarea
                  className="meeting-notes"
                  placeholder="Enter notes here..."
                  value={notes}
                  onChange={handleNotesChange}
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    addMeetingNote(meeting.id, notes);
                    setNotes(''); // Clear the textarea after adding the note
                  }}
                >
                  Add Note
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></div>
  );
};

export default Meeting;