import Counter from "./counter";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>
      <Counter>
        <Counter.Label>
          <span>Select your count</span>
        </Counter.Label>
        <Counter.Count />
        <Counter.Increase icon="+" />
        <Counter.Decrease icon="-" />
      </Counter>
      {/* <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
      /> */}
    </div>
  );
}
