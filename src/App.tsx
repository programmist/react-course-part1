import ListGroup, { ListItem } from "@components/ListGroup";
import Alert from "@components/Alert";
import Button from "@components/Button";

const cities = [
  { id: 1, name: "New York" },
  { id: 2, name: "London" },
  { id: 3, name: "Tokyo" },
  { id: 4, name: "Paris" },
  { id: 5, name: "Geneva" },
];

function App() {
  const handleSelect = (item: ListItem) => console.log(item);
  return (
    <>
      <Alert type="success">
        A simple primary{" "}
        <a
          href="https://getbootstrap.com/docs/5.3/components/alerts/"
          target="_blank"
        >
          Alert
        </a>{" "}
        <div>
          <Button variant="info" onClick={() => console.log("button clicked")}>
            check it out!
          </Button>
        </div>
      </Alert>
      <ListGroup title="Cities" items={cities} onSelectItem={handleSelect} />
    </>
  );
}

export default App;
