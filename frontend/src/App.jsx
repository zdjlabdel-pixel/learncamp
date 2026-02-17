import BootcampList from './components/BootcampList.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import MobileMoneyCard from './components/MobileMoneyCard.jsx';
import ReplayPanel from './components/ReplayPanel.jsx';
import ResourcePanel from './components/ResourcePanel.jsx';
import SessionPanel from './components/SessionPanel.jsx';
import { bootcamps, chat, replays, resources } from './services/mockData.js';

export default function App() {
  return (
    <main className="layout">
      <header>
        <h1>LearnCamp · Plateforme Bootcamp-first</h1>
        <p>Formateurs africains, live intégré, paiement Mobile Money, replay & ressources.</p>
      </header>
      <BootcampList bootcamps={bootcamps} />
      <SessionPanel />
      <MobileMoneyCard />
      <ReplayPanel replays={replays} />
      <ResourcePanel resources={resources} />
      <ChatPanel messages={chat} />
    </main>
  );
}
