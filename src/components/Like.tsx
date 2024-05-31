import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

interface Props {
  initialState?: boolean;
  onChange: (likeState: boolean) => void;
}
function Like({ initialState = false, onChange }: Props) {
  const [likeState, setLikeState] = useState(initialState);
  const toggleLikeState = () => {
    setLikeState(!likeState);
    onChange(!likeState);
  };
  return (
    <>
      {likeState ? (
        <FaHeart color="red" onClick={toggleLikeState} />
      ) : (
        <FaRegHeart onClick={toggleLikeState} />
      )}
    </>
  );
}

export default Like;
