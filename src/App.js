import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleLogin from './ComponanstFile/GoogleLoginFile/GoogleLogin';
import GitHubLonIn from './ComponanstFile/GitHubLoginFile/GitHubLonIn';
import PassWordEmail from './ComponanstFile/UserPassWordFile/PassWordEmail';


function App() {
  return (
    <div className="App">

      <GoogleLogin></GoogleLogin>

      <GitHubLonIn></GitHubLonIn>

      <PassWordEmail></PassWordEmail>

    </div>
  );
}

export default App;
