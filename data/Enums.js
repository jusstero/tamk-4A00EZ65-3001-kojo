export const Priority = {
  none: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export const getPriority = (index) => {
  switch (index) {
    case 1:
      return Priority.high;
    case 2:
      return Priority.medium;
    case 3:
      return Priority.low;
    default:
      return Priority.none;
  }
};

export const getPriorityByName = (name) => {
  let priority = Priority[name.toLowerCase()];
  if (priority === undefined) {
    priority = Priority.none;
  }

  return priority;
};
