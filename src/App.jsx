import { Carousel } from "./components/Carousel";
import { VirtualizedList } from "./components/VirtualizedList";
import { useToast } from "./components/Snackbar";
let count = 1;
function App() {
  const { showToast } = useToast();
  return <button onClick={() => showToast(`hello ${++count}`)}>click</button>;
}
export default App;
