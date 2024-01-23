import prisma from "../../prisma";
import { NewSchedule } from "./scheduleDto";

class ScheduleService {
	async createSchedule({user_id, customer, date, haircut_id, time}: NewSchedule){
		if (customer === "" || haircut_id === "" || date === "" || time === "") {
			throw new Error("All fields are required!");
		}

		const schedule = await prisma.service.create({
			data: {
				userId: user_id,
				customer,
				haircutId: haircut_id,
				date,
				time,
			}
		});

		return schedule;
	}
}

export { ScheduleService };