export default {
  filterByTime: (input, returnUpcoming = true) => {
    const now = new Date().getTime();

    return input
      .filter((node) => {
        return returnUpcoming
          ? new Date(node.date).getTime() >= now
          : new Date(node.date).getTime() < now;
      })
      .sort((a, b) => {
        return returnUpcoming
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  },
  sortMostRecent: (input) => {
    return input.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },
  convertMilitary: (input) => {
    if (!input) {
      return "";
    }

    let time = input.split(":");

    let hours = Number(time[0]);
    let minutes = Number(time[1]);

    let timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours === 0) {
      timeValue = "12";
    }

    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
    timeValue += hours >= 12 ? " P.M." : " A.M.";

    return timeValue;
  },
};
