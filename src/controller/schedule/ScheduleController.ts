import { Request, Response } from "express";
import { ScheduleService } from "../../services/schedule/ScheduleService";

class ScheduleController {
	async createSchedule(request: Request, response: Response) {
		const { user_id } = request;
		const { customer, date, haircut_id, time } = request.body;

		const scheduleService = new ScheduleService();

		const schedule = await scheduleService.createSchedule({ user_id, customer, date, haircut_id, time });

		return response.json(schedule);
	}
}

export { ScheduleController };