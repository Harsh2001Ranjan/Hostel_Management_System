import cron from "node-cron";
import { resetFoodWastageCounts } from "../controllers/foodWastageController.js";

const initializeCronJobs = () => {
  // Schedule the resetFoodWastageCounts function to run at 8 PM every day
  cron.schedule("0 20 * * *", async () => {
    console.log("Running food wastage reset at 8 PM");
    try {
      await resetFoodWastageCounts();
      console.log("Food wastage counts successfully reset.");
    } catch (error) {
      console.error("Error resetting food wastage counts:", error);
    }
  });

  console.log("Cron jobs initialized.");
};

export default initializeCronJobs;
