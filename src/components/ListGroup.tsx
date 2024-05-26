import { useState } from "react";

function ListGroup() {
  const items = [
    { id: 1, city: "New York" },
    { id: 2, city: "London" },
    { id: 3, city: "Tokyo" },
    { id: 4, city: "Paris" },
    { id: 5, city: "Geneva" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No Items Found</p>}
      <ul className="list-group">
        {items.map(({ id, city }, index) => (
          <li
            key={id}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => setSelectedIndex(index)}
          >
            {city}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
