import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header.jsx';
import Home from "./pages/Home.jsx";
import OpenTicket from "./pages/OpenTicket";
import CheckStatus from "./pages/CheckStatus";
import Login from "./pages/Login";
import AgentDashboard from "./pages/AgentDashboard.jsx";
import { containerClass } from "./utils/classes";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import AgentTicketView from "./pages/AgentTicketView.jsx"; // adjust path as needed

function App() {
    return (
        <Router>
            <Header />
            <main className={containerClass + " py-6"}>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/agent-dashboard" element={<AgentDashboard />} />
                        <Route path="/agent/tickets/:reference" element={<AgentTicketView />} />
                    </Route>

                    <Route path="/" element={<Home />} />
                    <Route path="/open-ticket" element={<OpenTicket key={location.pathname} />} />
                    <Route path="/check-status" element={<CheckStatus />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
