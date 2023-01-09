
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <label htmlFor="my-modal" className="btn">open modal</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Congratulations</h3>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div className="modal-action">
      <label htmlFor="my-modal" className="btn">Yay!</label>
    </div>
  </div>
</div>
      </header>
    </div>
  );
}

export default App;
