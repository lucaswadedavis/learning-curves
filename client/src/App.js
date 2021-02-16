import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { sim } from './sim';
import random from 'random';
import './App.css';

function World(n=100, generator=() => 0.5) {
  let w = [];
  for (let i = 0; i < n; i++) {
    w.push(generator());
  }
  return w;
}

function shapeForChartJs(data) {
  const labels = data.map((d, i) => i);
  return {
    labels,
    datasets: [{ data }]
  };
}

function AnimatedExample() {
  const generator = random.uniform(0, 1);
  const initialWorld = World(100, generator);
  let [state, set] = useState([[0], [...initialWorld], 0]);
  let [data, world] = state;
  useEffect(() => {
    const interval = setInterval(() => {
      set(state => {
        let [[...data], [...world], step] = state;
        if (step > 5 * world.length) {
          clearInterval(interval);
          return [data, initialWorld, ++step];
        }
        const index = Math.random() * world.length | 0;
        data.push(data[data.length - 1] + world[index]);
        world[index] = 0;
        return [data, world, ++step];
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="animated-example-area">
      <h2>Example</h2>
      <div>
        <Bar
          data={ shapeForChartJs(world) }
          width={100}
          height={100}
          legend={{display:false}}
          options={{ maintainAspectRatio: false }}
          /> 
      </div>
      <div>
        <Line
          data={ shapeForChartJs(data) }
          width={100}
          height={200}
          legend={{display:false}}
          options={{ maintainAspectRatio: false }}
          /> 
      </div>
    </div>
  );
}

function UniformDistribution() {
  const generator = random.uniform(0, 1);
  const world = World(100, generator);
  const simData = sim(world, 1, 1000);
  const data = shapeForChartJs(simData);
  return (
    <div className="world-one">
      <h2>Uniform Distribution</h2>
      <div>
        <Bar
          data={ shapeForChartJs(world) }
          width={100}
          height={100}
          legend={{display:false}}
          options={{ maintainAspectRatio: false }}
          /> 
      </div>
      <div>
        <Line
          data={ data }
          width={100}
          height={200}
          legend={{display:false}}
          options={{ maintainAspectRatio: false }}
          /> 
      </div>
    </div>
  );
}

function PoissonDistribution() {
  const generator = random.poisson();
  const world = World(100, generator);
  const simData = sim(world, 1, 1000);
  const data = shapeForChartJs(simData);
  return (
    <div className="world-two">
      <h2>Poisson Distribution</h2>
      <div>
        <Bar
          data={ shapeForChartJs(world) }
          width={100}
          height={100}
          legend={{display:false}}
          options={{ maintainAspectRatio: false }}
          /> 
      </div>
      <div>
      <Line
        data={ data }
        width={100}
        height={200}
        legend={{display:false}}
        options={{ maintainAspectRatio: false }}
        /> 
      </div>
    </div>
  );
}

function NormalDistribution() {
  const generator = random.normal();
  const world = World(100, generator);
  const simData = sim(world, 1, 1000);
  const data = shapeForChartJs(simData);
  return (
    <div className="world-three">
      <h2>Normal Distribution</h2>
      <div>
        <Bar
          data={ shapeForChartJs(world) }
          width={100}
          height={100}
          legend={{display:false}}
          options={{ maintainAspectRatio: false }}
          /> 
      </div>
      <div>
      <Line
        data={ data }
        width={100}
        height={200}
        legend={{display:false}}
        options={{ maintainAspectRatio: false }}
        /> 
      </div>
    </div>
  );
}

function LogNormalDistribution() {
  const generator = random.logNormal();
  const world = World(100, generator);
  const simData = sim(world, 1, 1000);
  const data = shapeForChartJs(simData);
  return (
    <div className="log-normal-area">
      <h2>Log Normal Distribution</h2>
      <div>
        <Bar
          data={ shapeForChartJs(world) }
          width={100}
          height={100}
          legend={{display:false}}
          options={{ maintainAspectRatio: false }}
          /> 
      </div>
      <div>
      <Line
        data={ data }
        width={100}
        height={200}
        legend={{display:false}}
        options={{ maintainAspectRatio: false }}
        /> 
      </div>
    </div>
  );
}


function ExponentialDistribution() {
  const generator = random.exponential();
  const world = World(100, generator);
  const simData = sim(world, 1, 1000);
  const data = shapeForChartJs(simData);
  return (
    <div className="world-four">
      <h2>Exponential Distribution</h2>
      <div>
        <Bar
          data={ shapeForChartJs(world) }
          width={100}
          height={100}
          legend={{display:false}}
          options={{ maintainAspectRatio: false }}
          /> 
      </div>
      <div>
      <Line
        data={ data }
        width={100}
        height={200}
        legend={{display:false}}
        options={{ maintainAspectRatio: false }}
        /> 
      </div>
    </div>
  );
}



function App() {
  return (
    <div className="App">
      <AnimatedExample />
      <UniformDistribution />
      <PoissonDistribution />
      <NormalDistribution />
      <LogNormalDistribution />
      <ExponentialDistribution />
    </div>
  );
}

export default App;
