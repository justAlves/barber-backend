import { Request, Response } from "express";
import { UserService } from "../../services/user/UserService";

class UserController {

	async createUser(request: Request, response: Response): Promise<Response>{

		const {email, name, password, cep, city, state, address, number, complement} = request.body;

		const userService = new UserService();
		
		const user = await userService.createUser({email, name, password, cep, city, state, address, number, complement});

		return response.json(user);
	}
}

export { UserController };