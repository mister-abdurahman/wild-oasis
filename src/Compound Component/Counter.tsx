import React, { createContext, useContext, useState } from "react";

// interface CounterType {
//   count: number;
//   increase: void;
//   decrease: void;
// }

const CounterContext = createContext({});

function Counter({ children }: any) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => prev - 1);

  return (
    <CounterContext.Provider
      value={{
        count,
        increase,
        decrease,
      }}
    >
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

const Count = () => {
  const { count }: any = useContext(CounterContext);
  return <span>{count}</span>;
};
const Label = ({ children }: { children: React.ReactNode }) => {
  return <p>{children}</p>;
};
const Increase = ({ icon }: { icon: string }) => {
  const { increase }: any = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
};
const Decrease = ({ icon }: { icon: string }) => {
  const { decrease }: any = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
};

Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
