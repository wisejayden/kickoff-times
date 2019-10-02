import React from "react";

const ScrollToElement = () => {
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  const handleClick = () =>
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  return (
    <>
      <div ref={myRef}>I wanna be seen</div>
      <button onClick={executeScroll}> Click to scroll </button>
    </>
  );
};
