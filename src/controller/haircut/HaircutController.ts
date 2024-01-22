import { Request, Response } from "express";
import { HaircutService } from "../../services/haircut/HaircutService";

class HaircutController {
	async createHaircut(request: Request, response: Response): Promise<Response>{

		const {name, price} = request.body;
		const {user_id} = request;

		const haircutService = new HaircutService();
    
		const haircut = await haircutService.createHaircut({user_id, name, price});

		return response.json(haircut);
	}

	async listHaircuts(request: Request, response: Response): Promise<Response>{
		const {user_id} = request;
		const status = request.query.status as string;

		const haircutService = new HaircutService();

		const haircuts = await haircutService.listHaircuts(user_id, status);

		return response.json(haircuts);
	}
}

export { HaircutController };