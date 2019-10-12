import React, { useEffect, useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../index";
import "./GameDate.scss";

const GameDate = observer(
  ({ date, needsRef, pathname, latestGame = false, ...props }) => {
    const store = useContext(StoreContext).AppStore;

    if (needsRef === true) {
      console.log("date", date);
      const myRef = useRef();

      useEffect(() => {
        if (myRef.current) {
          let pageViewObservableCheck;
          //On first view of the page, scroll down smoothly, then on each recurring pageview auto view the ref.
          if (pathname === "/matches") {
            pageViewObservableCheck = store.matchesFirstScroll;
          } else if (pathname === "/ratings") {
            pageViewObservableCheck = store.ratingsFirstScroll;
          }
          let height = myRef.current.offsetTop + window.innerHeight - 300;
          window.scrollTo({
            behavior: pageViewObservableCheck ? "smooth" : "auto",
            top: height
          });
          store.changeScrollBehaviour(pathname);
        }
      }, []);
      return (
        <>
          <div className="gamedate-line">^ Previous Games ^</div>
          <div ref={myRef} className="GameDate">
            {date}
          </div>
        </>
      );
    } else if (latestGame === true) {
      return (
        <>
          <div className="GameDate">{date}</div>;
        </>
      );
    } else {
      return <div className="GameDate">{date}</div>;
    }
  }
);
export default GameDate;
