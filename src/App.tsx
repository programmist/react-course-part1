import ListGroup from "./components/ListGroup";

const cities = [
  { id: 1, name: "New York" },
  { id: 2, name: "London" },
  { id: 3, name: "Tokyo" },
  { id: 4, name: "Paris" },
  { id: 5, name: "Geneva" },
];

function App() {
  return <ListGroup title="Cities" items={cities} />;
}

export default App;
