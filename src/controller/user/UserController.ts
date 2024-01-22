import { Request, Response } from "express";
import { UserService } from "../../services/user/UserService";

class UserController {

	async createUser(request: Request, response: Response): Promise<Response>{

		const {email, name, password, cep, city, state, address, number, complement} = request.body;

		const userService = new UserService();
		
		const user = await userService.createUser({email, name, password, cep, city, state, address, number, complement});

		return response.json(user);
	}

	async authUser(request: Request, response: Response): Promise<Response>{
		const {email, password} = request.body;

		const userService = new UserService();

		const session = await userService.authUser({email, password});

		return response.json(session);
	}

	async getUser(request: Request, response: Response): Promise<Response>{
		const { user_id } = request;

		const userService = new UserService();

		const user = await userService.getUser(user_id);

		return response.json({user});
	}

	async updateUser(request: Request, response: Response): Promise<Response>{
		const { user_id } = request;
		const {name, cep, city, state, address, number, complement} = request.body;

		const userService = new UserService();

		const user = await userService.updateUser({id: user_id, name, cep, city, state, address, number, complement});

		return response.json({user});
	}

	async checkUserSubscription(request: Request, response: Response): Promise<Response>{
		const { user_id } = request;

		const userService = new UserService();

		const user = await userService.checkUserSubscription(user_id);

		return response.json({user});
	}
}

export { UserController };