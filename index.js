
import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
  const date = moment()
    .subtract(6, "months")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = async (n) => {
  if (n === 0) return simpleGit().push();
  
  const x = random.int(0, 25); // Adjusted for 6 months (approximately 26 weeks)
  const y = random.int(0, 6);
  const date = moment()
    .subtract(6, "months")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };
  console.log(date);
  
  await new Promise((resolve) => {
    jsonfile.writeFile(path, data, () => {
      simpleGit().add([path]).commit(date, { "--date": date }, () => {
        resolve();
      });
    });
  });
  
  // 1-second delay between commits
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await makeCommits(--n);
};

makeCommits(30);
