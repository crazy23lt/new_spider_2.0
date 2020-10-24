const TimeMachine = function () {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let date = new Date().getDate();
  let leftvalue = new Date(`${year}-${month}-${date}`).getTime();
  let rightvalue = leftvalue + 86400000;
  return { leftvalue, rightvalue };
};
module.exports = TimeMachine;
