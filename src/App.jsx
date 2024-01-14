import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import SignUp from './SignUp'
import Login from './Login'
/////ADMIN
import Dashboard from './Admin/Dashboard'
import Profile from './Admin/ProfilePage'
import Song from './Admin/SongPage'
import ManageAccount from './Admin/ManageAcountPage'
import ManageFeedback from './Admin/ManageFeedbackPage'
import ViewFeedback from './Admin/ViewFeedbackPage'
import ViewSong from './Admin/ViewSongPage'
import RequestAccount from './Admin/RequestAccountPage'
import CreateSong from './Admin/CreateSongPage'
import ArtistAdmin from './Admin/ArtistAdminPage'
import RequestListCourse from './Admin/RequestListCoursePage'
import ViewRequestCourse from './Admin/ViewRequestCoursePage'
/////CHORDMANAGER
import DashboardChordManager from './ChordManager/DashboardChordManager'
import VerifySong from './ChordManager/VerifySongPage'
import ViewSongChordManager from './ChordManager/ViewSongChordManagerPage'
import ProfileChordManager from './ChordManager/ProfileChordManagerPage'
import SongChordManager from './ChordManager/SongChordManagerPage'
import ArtistChordManager from './ChordManager/ArtistChordManagerPage'
/////MUSICIAN
import DashboardMusician from './Musician/DashboardMusician'
import ChordMissMusician from './Musician/ChordMissMusician'
import ViewSongMusician from './Musician/ViewSongMusician'
import EditSongMusician from './Musician/EditSongMusician'
import ProfileMusician from './Musician/ProfileMusician'
import ChordMusician from './Musician/ChordMusician'
import ManageBeat from './Musician/ManageBeat'
import OrderMusician from './Musician/OrderMusician'
import CreateChord from './Musician/CreateChord'
import SongMusician from './Musician/SongMusician'
import RejectSong from './Musician/RejectSong'
import SongBeatManager from './Musician/SongBeatManager'
import ArtistMusician from './Musician/ArtistMusician'
import ViewOrderMusician from './Musician/ViewOrderMusician'
import ManageCourse from './Musician/ManageCourse'
import RejectCourse from './Musician/RejectCourse'
import ViewRejectCourse from './Musician/ViewRejectCourse'
import RequestChordMusician from './Musician/RequestChordMusician';
import EditRequestChordMusician from './Musician/EditRequestChordMusician';
import OrderHistory from './Musician/OrderHistory';
import OrderMusicianAccept from './Musician/OrderMusicianAccept';
import AcceptChordRequest from './Musician/AcceptChordRequest';
/////CUSTOMER
import Artist from './Customer/Artist'
import DashboardCustomer from './Customer/DashboardCustomer'
import SongCustomer from './Customer/SongCustomer'
import ViewSongCustomer from './Customer/ViewSongCustomer'
import ProfileCustomer from './Customer/ProfileCustomer'
import Playlist from './Customer/Playlist'
import CreatePlaylist from './Customer/CreatePlaylist'
import ViewPlaylist from './Customer/ViewPlaylist'
import Chord from './Customer/Chord'
import SearchChord from './Customer/SearchChord'
import Feedback from './Customer/Feedback'
import ViewFeedbackCustomer from './Customer/ViewFeedbackCustomer'
import Beat from './Customer/Beat'
import SongBeat from './Customer/SongBeat'
import OrderCustomer from './Customer/OrderCustomer'
import ViewFeedbackCustomerAll from './Customer/ViewFeedBackCustomerAll'
import OrderStatus from './Customer/OrderStatus'
import ViewOrderCustomer from './Customer/ViewOrderCustomer'
import TransactionHistory from './Customer/TransactionHistory'
import Course from './Customer/Course'
import RequestChord from './Customer/RequestChord';
import RequestChordStatus from './Customer/RequestChordStatus';
import ViewRequestChord from './Customer/ViewRequestChord';
import ViewRequestChordMusician from './Musician/ViewRequestChordMusician';
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  return (
    // <BrowserRouter>

    <Router>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>




        {/* ADMIN ROLE */}
        <Route path='/' element={<Dashboard />}>
          <Route path='/profile/:userId' element={<Profile />}></Route>
          <Route path='/song' element={<Song />}></Route>
          <Route path='/manageAccount' element={<ManageAccount />}></Route>
          <Route path='/requestAccount' element={<RequestAccount />}></Route>
          <Route path='/manageFeedback/:userId' element={<ManageFeedback />}></Route>
          <Route path='/viewFeedback/:id' element={<ViewFeedback />}></Route>
          <Route path='/createSong' element={<CreateSong />}></Route>
          <Route path='/requestCourse' element={<RequestListCourse />}></Route>
          <Route path='/viewRequestCourse/:id/' element={<ViewRequestCourse />}></Route>
        </Route>
        <Route path='/viewSong/:id' element={<ViewSong />}></Route>
        <Route path='/artistAdmin/:id/:artist_id' element={<ArtistAdmin />}></Route>

        {/* CHORD MANAGER ROLE */}
        <Route path='/' element={<DashboardChordManager />}>
          <Route path='/verifySong' element={<VerifySong />}></Route>
          <Route path='/profileChordManager/:userId' element={<ProfileChordManager />}></Route>
          <Route path='/songChordManager' element={<SongChordManager />}></Route>
        </Route>
        <Route path='/viewSongChordManager/:id' element={<ViewSongChordManager />}></Route>
        <Route path='/artistChordManager/:id/:artist_id' element={<ArtistChordManager />}></Route>


        {/* MUSICIAN ROLE */}
        <Route path='/' element={<DashboardMusician />}>
          <Route path='/chordMissMusician' element={<ChordMissMusician />}></Route>
          <Route path='/editSongMusician/:id' element={<EditSongMusician />}></Route>
          <Route path='/profileMusician/:userId' element={<ProfileMusician />}></Route>
          <Route path='/chordMusician' element={<ChordMusician />}></Route>
          <Route path='/manageBeat' element={<ManageBeat />}></Route>
          <Route path='/orderMusician' element={<OrderMusician />}></Route>
          <Route path='/createChord' element={<CreateChord />}></Route>
          <Route path='/songMusician' element={<SongMusician />}></Route>
          <Route path='/rejectSong' element={<RejectSong />}></Route>
          <Route path='/viewOrderMusician/:id/' element={<ViewOrderMusician />}></Route>
          <Route path='/manageCourse/:userId' element={<ManageCourse />}></Route>
          <Route path='/rejectCourse/:userId' element={<RejectCourse />}></Route>
          <Route path='/viewRejectCourse/:id' element={<ViewRejectCourse />}></Route>
          <Route path='/requestChordMusician' element={<RequestChordMusician />}></Route>
          <Route path='/viewRequestChordMusician/:id/' element={<ViewRequestChordMusician />}></Route>
          <Route path='/orderHistory/:userId/' element={<OrderHistory />}></Route>
          <Route path='/orderMusicianAccept/:userId/' element={<OrderMusicianAccept />}></Route>
          <Route path='/editRequestChordMusician/:id' element={<EditRequestChordMusician />}></Route>
          <Route path='/acceptChordRequest/:userId/' element={<AcceptChordRequest />}></Route>

        </Route>
        <Route path='/viewSongMusician/:id' element={<ViewSongMusician />}></Route>
        <Route path='/songBeatManager/:user_id/:beat_type' element={<SongBeatManager />}></Route>
        <Route path='/artistMusician/:id/:artist_id' element={<ArtistMusician />}></Route>


        {/* CUSTOMER ROLE */}
        <Route path='/' element={<DashboardCustomer />}>
          <Route path='/songCustomer/:userId' element={<SongCustomer />}></Route>
          <Route path='/profileCustomer/:userId' element={<ProfileCustomer />}></Route>
          <Route path='/createPlaylist/:userId' element={<CreatePlaylist />}></Route>
          <Route path='/playlist/:userId' element={<Playlist />}></Route>
          <Route path='/viewPlaylist/:id' element={<ViewPlaylist />}></Route>
          <Route path='/feedback/:userId' element={<Feedback />}></Route>
          <Route path='/viewFeedbackCustomer/:id' element={<ViewFeedbackCustomer />}></Route>
          <Route path='/viewFeedbackCustomerAll/:id' element={<ViewFeedbackCustomerAll />}></Route>
          <Route path='/transactionHistory/:userId' element={<TransactionHistory />}></Route>
          <Route path='/beat/:user_id/' element={<Beat />}></Route>
          <Route path='/order/:user_id/' element={<OrderCustomer />}></Route>
          <Route path='/orderStatus/:user_id/' element={<OrderStatus />}></Route>
          <Route path='/viewOrderCustomer/:id/' element={<ViewOrderCustomer />}></Route>
          <Route path='/course' element={<Course />}></Route>
          <Route path='/requestChord/:user_id/' element={<RequestChord />}></Route>
          <Route path='/requestChordStatus/:user_id/' element={<RequestChordStatus />}></Route>
          <Route path='/viewRequestChord/:id/' element={<ViewRequestChord />}></Route>

        </Route>
        <Route path='/songBeat/:user_id/:beat_type' element={<SongBeat />}></Route>
        <Route path='/chord' element={<Chord />}></Route>
        <Route path='/searchChord' element={<SearchChord />}></Route>
        <Route path='/viewSongCustomer/:id' element={<ViewSongCustomer />}></Route>
        <Route path='/artist/:id/:artist_id' element={<Artist />}></Route>

      </Routes>
    </Router>
  )
}

export default App
