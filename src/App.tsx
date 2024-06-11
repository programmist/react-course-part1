import ListGroup, { ListItem } from "@components/ListGroup";
import Alert from "@components/Alert";
import Button from "@components/Button";
import { useState } from "react";
import { FaCity } from "react-icons/fa6";
import BugList from "@components/BugList";
import ExpandableText from "@components/ExpandableText";
import Form from "./components/Form";
import ExpenseList from "./expense-tracker/components/ExpenseList";

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
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Electricity", amount: 15, category: "Utility" },
    { id: 2, description: "Internet", amount: 5, category: "Utility" },
    { id: 3, description: "Flour", amount: 5, category: "Grocery" },
    { id: 4, description: "Salt", amount: 2, category: "Grocery" },
  ]);
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
          variant="success"
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
      <hr />
      <BugList />
      <hr />
      <h1>Expandable Text Component:</h1>
      <ExpandableText maxChars={89} breakWords={true}>
        Bacon ipsum dolor amet t-bone shank venison rump picanha porchetta
        capicola. Swine hamburger tri-tip, drumstick kevin corned beef salami
        picanha shank t-bone beef ribs ham chicken jerky meatball. Pork belly
        brisket fatback boudin ground round pancetta chicken. Beef ribs
        hamburger spare ribs doner tri-tip pork chop brisket sirloin pork loin
        kevin. Meatloaf doner chislic chicken, pastrami prosciutto ham ball tip
        filet mignon sirloin buffalo bresaola. Salami shank ribeye brisket
        tri-tip frankfurter, kevin jerky doner beef beef ribs pancetta
        tenderloin short loin.
      </ExpandableText>
      <hr />
      <h1>Forms:</h1>
      <Form />
      <hr />
      <ExpenseList
        expenses={expenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </>
  );
}

export default App;
