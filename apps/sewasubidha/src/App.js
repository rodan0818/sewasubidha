import Login from "./components/Login";
import backgroundImage from "./asset/background.jpg";

function App() {
  return (
    <>
      <main
        className="App"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <Login />
      </main>
    </>
  );
}

export default App;
