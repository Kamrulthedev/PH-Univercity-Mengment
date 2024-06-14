import { Schedule } from "./offeredCoures.interface";

export const hasTimeConflict = (
  assignSchedules: Schedule[],
  newSchedules: Schedule,
) => {
  for (const schedules of assignSchedules) {
    const existingStarTime = new Date(`1970-01-01T${newSchedules.starTime}`);
    const existingendTime = new Date(`1970-01-01T${newSchedules.endTime}`);
    const newtartingTime = new Date(`1970-01-01T${newSchedules.starTime}`);
    const newEndtime = new Date(`1970-01-01T${newSchedules.endTime}`);

    if (newtartingTime < existingStarTime && newEndtime > existingendTime) {
      console.log("kamrul hassan");
      return true;
    }
  }
  return false;
};
