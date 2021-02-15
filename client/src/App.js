import { Bar, Line } from 'react-chartjs-2';
import { sim } from './sim';
import random from 'random';
import './App.css';

function World(n=100, generator=() => 0.5) {
  const w = [];
  for (let i = 0; i < n; i++) {
    w.push(generator());
  }
  return w;
}

function shapeForChartJs(data) {
  const labels = data.map((d, i) => i);
  return {
    labels,
    datasets: [{data}]
  };
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
      <UniformDistribution />
      <PoissonDistribution />
      <NormalDistribution />
      <LogNormalDistribution />
      <ExponentialDistribution />
    </div>
  );
}

export default App;
