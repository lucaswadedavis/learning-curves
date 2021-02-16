import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import random from 'random';
import './App.css';

function sim(world, dimensions=1, limit=100) {
  let w = [...world];
  let rec = [];
  let eff = 0;
  for (let i = 0; i < limit; i++) {
    const index = Math.random() * w.length | 0;
    eff += w[index];
    w[index] = 0;
    rec.push(eff);
  }
  return rec; 
}

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
      <p>
        I've tried to illustrate this idea in the example
        above by representing the information space on the
        first of the two graphs. The Y axis is the utility
        of the insight, and the X axis just represents the
        information space. As you randomly wander around
        the space, the bars representing insight disappear
        and are added to the learning curve line graph
        below it. As time goes on, all the available insights
        are harvested and the learning curve plateaus.
      </p>
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

function Closing() {
  return (
    <div>
      <p>
        I think the thing that most surprised me
        about this was how similar sampling from
        the different distributions looks. I expected
        the exponential distribution to be really
        different from the uniform distribution, but
        I don't think I could honestly eyeball the
        difference with any confidence if I had to.
      </p>
    </div>
  );
}

function Exposition() {
  return (
    <div>
      <p>
        Below I experimented with a sampling from a few
        different distributions. I ran these for 1000
        steps, rather than the 500 steps from the
        example above.
      </p>
    </div>
  );
}

function Intro() {
  return (
    <div>
      <h1>Learning Curves</h1>
      <p>
        So, the probably half-baked idea is that
        information space is saturated with good ideas
        or put a different way, compressible information,
        and that knocking around in that information space
        will lead to a gradual accumulation of these
        insights, which manifest in increased efficiency.
      </p>
      <p>
        The trick is that once you stumble across an insight
        you can't gain the same increase in efficiency by
        stumbling across the same one again, and if you're
        building a table or welding together a steel boat
        hull, you're going to wind up crossing the same
        parts of information space over and over, making it
        even less likely that you'll learn anything new.
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Intro />
      <AnimatedExample />
      <Exposition />
      <UniformDistribution />
      <PoissonDistribution />
      <NormalDistribution />
      <LogNormalDistribution />
      <ExponentialDistribution />
      <Closing />
    </div>
  );
}

export default App;
