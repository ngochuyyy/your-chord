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
import ChordMissMusician from './Musician/ChordMissMusicianPage'
import ViewSongMusician from './Musician/ViewSongMusicianPage'
import EditSongMusician from './Musician/EditSongMusicianPage'
import ProfileMusician from './Musician/ProfileMusicianPage'
import ChordMusician from './Musician/ChordMusicianPage'
import ManageBeat from './Musician/ManageBeatPage'
import OrderMusician from './Musician/OrderMusicianPage'
import CreateChord from './Musician/CreateChordPage'
import SongMusician from './Musician/SongMusicianPage'
import RejectSong from './Musician/RejectSongPage'
import SongBeatManager from './Musician/SongBeatManagerPage'
import ArtistMusician from './Musician/ArtistMusicianPage'
import ViewOrderMusician from './Musician/ViewOrderMusicianPage'
import ManageCourse from './Musician/ManageCoursePage'
import RejectCourse from './Musician/RejectCoursePage'
import ViewRejectCourse from './Musician/ViewRejectCoursePage'
import RequestChordMusician from './Musician/RequestChordMusicianPage';
import EditRequestChordMusician from './Musician/EditRequestChordMusicianPage';
import OrderHistory from './Musician/OrderHistoryPage';
import OrderMusicianAccept from './Musician/OrderMusicianAcceptPage';
import AcceptChordRequest from './Musician/AcceptChordRequestPage';
import ViewRequestChordMusician from './Musician/ViewRequestChordMusicianPage';

/////CUSTOMER
import Artist from './Customer/ArtistPage'
import DashboardCustomer from './Customer/DashboardCustomer'
import SongCustomer from './Customer/SongCustomerPage'
import ViewSongCustomer from './Customer/ViewSongCustomerPage'
import ProfileCustomer from './Customer/ProfileCustomerPage'
import Playlist from './Customer/PlaylistPage'
import CreatePlaylist from './Customer/CreatePlaylistPage'
import ViewPlaylist from './Customer/ViewPlaylistPage'
import Chord from './Customer/ChordPage'
import SearchChord from './Customer/SearchChordPage'
import Feedback from './Customer/FeedbackPage'
import ViewFeedbackCustomer from './Customer/ViewFeedbackCustomerPage'
import Beat from './Customer/BeatPage'
import SongBeat from './Customer/SongBeatPage'
import OrderCustomer from './Customer/OrderCustomerPage'
import ViewFeedbackCustomerAll from './Customer/ViewFeedBackCustomerAllPage'
import OrderStatus from './Customer/OrderStatusPage'
import ViewOrderCustomer from './Customer/ViewOrderCustomerPage'
import TransactionHistory from './Customer/TransactionHistoryPage'
import Course from './Customer/CoursePage'
import RequestChord from './Customer/RequestChordPage';
import RequestChordStatus from './Customer/RequestChordStatusPage';
import ViewRequestChord from './Customer/ViewRequestChordPage';
import ViewRequestChordCompletedPage from './Customer/ViewRequestChordCompletedPage';
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
          <Route path='/ViewRequestChordCompletedPage/:id' element={<ViewRequestChordCompletedPage />}></Route>

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
