import React, { Component } from "react";
import posed from "react-pose";

const Container = posed.ul({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 }
});

const Item = posed.li({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 }
});

export default () => {
  <div>
    <h6>Hello PokerNews</h6>
  </div>;
};
