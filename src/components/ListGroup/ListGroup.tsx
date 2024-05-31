import { ReactNode, useState } from "react";
import styled from "styled-components";
import { FcOk } from "react-icons/fc";

const Title = styled.h1`
  font-family: ystem-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface ListItemProps {
  active: boolean;
}

const ListItem = styled.li<ListItemProps>`
  background: ${(props) => (props.active ? "dodgerblue" : "none")};
  padding: 5px 0;
  cursor: pointer;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
`;

export interface ListItem {
  id: number;
  name: string;
}

interface Props {
  title?: ReactNode;
  items: ListItem[];
  onSelectItem: (item: ListItem) => void;
}

function ListGroup({ title, items = [], onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <Title>{title}</Title>
      {items.length === 0 && <p>No Items Found</p>}
      <List>
        {items.map((item, index) => (
          <ListItem
            active={index === selectedIndex}
            key={item.id}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item.name} {selectedIndex === index && <FcOk />}
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ListGroup;
