import { useState } from "react";
import styled from "styled-components";

const LinkButton = styled.button`
  font: bold 11px Arial;
  cursor: pointer;
  background-color: #ddd;
  padding: 2px 6px;
  border: 0;
`;

interface Props {
  maxChars?: number;
  children: string;
}
function ExpandableText({ maxChars = 25, children }: Props) {
  const [expanded, toggleExpanded] = useState(false);
  const text = expanded ? children : children.substring(0, maxChars);

  return (
    <>
      <span>
        {text}
        {expanded ? " " : " ... "}
      </span>
      <LinkButton onClick={() => toggleExpanded((expanded) => !expanded)}>
        {expanded ? "<<" : ">>"}
      </LinkButton>
    </>
  );
}

export default ExpandableText;
