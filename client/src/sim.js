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

export { sim };
