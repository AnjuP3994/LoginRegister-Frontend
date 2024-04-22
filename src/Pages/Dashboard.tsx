import React, { useEffect, useState } from 'react'
import '../Styles/dashboard.css'
import grid from '../Assets/overview-grid-icon.png'
import help from '../Assets/help-messages.png'
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

interface UserData {
  fname: string;
  surname:string
}

function Dashboard() {

  const [centredModal, setCentredModal] = useState(false); 

  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData | null>(); 

  useEffect(() => {
    const existingUser = sessionStorage.getItem("existingUser");
    // console.log('existingUser:',existingUser);   
    if (existingUser) {
      try {
        setUserData(JSON.parse(existingUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  console.log('userData:',userData);

  const toggleOpen = () => setCentredModal(!centredModal);

  const handleLogout = () => {
    sessionStorage.removeItem("existingUser");
    navigate('/');
  };
  

  return (
    <div>

      <div className="sidebar shadow">
        <div className='ps-5 pt-5 ms-3 text-dark'>
          <h2 className='fw-bolder'>Dashboard</h2>
        </div>
        <div className='p-5 ms-5 text-dark'>
          <h5 className='fw-bolder my-4'><img src={grid} width={'22px'} alt="" /> Overview</h5>
          <h5 className='fw-bolder mb-4'><i className="fa-solid fa-chart-line me-1"></i> Growth</h5>
          <h5 className='fw-bolder mb-4'><i className="fa-solid fa-gear me-1"></i> Settings</h5>
          <h5 className='fw-bolder'><img src={help} width={'20px'} alt="" className='me-1' /> Help</h5>
        </div>
        <div className='logout'>
          <button onClick={toggleOpen} className='btnlogout text-dark'><i className="fa-solid fa-right-from-bracket me-1"></i> Logout</button>
        </div>
        <MDBModal staticBackdrop tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalBody className='text-center fs-5 fw-bolder p-4'>Are you sure you want to logout?</MDBModalBody>
              <MDBModalFooter className='d-flex justify-content-evenly p-4'>
                <MDBBtn color='warning' onClick={toggleOpen}>No</MDBBtn>
                <MDBBtn color='info' onClick={handleLogout}>Yes</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>

      <div className="body">
        <div className='content p-5'>
          <h1>Welcome {userData ? `${userData.fname} ${userData.surname}!` : 'user'}</h1>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard