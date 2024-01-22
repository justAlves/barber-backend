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

		const haircuts = await haircutService.listHaircuts({user_id, status});

		return response.json(haircuts);
	}

	async updateHaircut(request: Request, response: Response): Promise<Response>{
		const {user_id} = request;
		const {name, price, status, haircut_id} = request.body;

		const haircutService = new HaircutService();

		const haircut = await haircutService.updateHaircut({user_id, haircut_id, name, price, status});

		return response.json(haircut);
	}
}

export { HaircutController };