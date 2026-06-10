import { BartleQuiz } from './BartleQuiz';
import { AdminPanel } from './AdminPanel';

const isAdmin = new URLSearchParams(window.location.search).has('admin');

function App() {
  return isAdmin ? <AdminPanel /> : <BartleQuiz />;
}

export default App;
