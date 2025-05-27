const markCommit = async (x, y) => {
  const date = moment()
    .subtract(6, "months")
    .add(1, "day")
    .add(x, "weeks")
    .add(y, "days")
    .format("ddd MMM DD HH:mm:ss YYYY ZZ");

  const data = { date };
  await jsonfile.writeFile(path, data);

  await simpleGit()
    .add([path])
    .commit("Commit: " + date, { "--date": date })
    .push();
};

const makeCommits = async (n) => {
  if (n === 0) return;

  const x = random.int(0, 25);
  const y = random.int(0, 6);
  await markCommit(x, y);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await makeCommits(n - 1);
};

makeCommits(30);
