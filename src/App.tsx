import ListGroup, { ListItem } from "@components/ListGroup";
import Alert from "@components/Alert";
import Button from "@components/Button";
import { useState } from "react";
import { FaCity } from "react-icons/fa6";

const cities = [
  { id: 1, name: "New York", likeState: false },
  { id: 2, name: "London", likeState: false },
  { id: 3, name: "Tokyo", likeState: true },
  { id: 4, name: "Paris", likeState: false },
  { id: 5, name: "Geneva", likeState: true },
];

function App() {
  const handleSelect = (item: ListItem) => console.log(item);
  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <>
      {alertVisible && (
        <Alert type="success" onClose={() => setAlertVisible(false)}>
          A simple primary{" "}
          <a
            href="https://getbootstrap.com/docs/5.3/components/alerts/"
            target="_blank"
          >
            Alert
          </a>{" "}
        </Alert>
      )}

      <div>
        <Button
          variant="info"
          onClick={() => setAlertVisible(alertVisible ? false : true)}
        >
          {alertVisible ? "Hide" : "Reveal"} Alert
        </Button>
      </div>
      <ListGroup
        title={
          <>
            <FaCity /> Cities
          </>
        }
        items={cities}
        onSelectItem={handleSelect}
      />
    </>
  );
}

export default App;
