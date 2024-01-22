import prisma from "../../prisma";
import { CreateHaircutDto } from "./dtos/HaircutDto";

class HaircutService{
	async createHaircut({user_id, name, price}: CreateHaircutDto){
		if(!name || !price){
			throw new Error("Name and price are required!");
		}

		const myHaircuts = await prisma.haircut.count({
			where: {
				userId: user_id,
			}
		});

		const user = await prisma.user.findFirst({
			where: {
				id: user_id,
			},
			include: {
				subscriptions: true,
			}
		});

		if(myHaircuts >= 3 && user?.subscriptions?.status !== "active"){
			throw new Error("You have reached the limit of haircuts! Subscribe to add more haircuts!");	
		}

		const haircut = await prisma.haircut.create({
			data: {
				name,
				price,
				userId: user_id
			}
		});

		return haircut;
	}

	async listHaircuts(user_id: string, status: boolean | string){
		const haircuts = await prisma.haircut.findMany({
			where: {
				userId: user_id,
				status: status === "true" ? true : false,
			}
		});

		return haircuts;
	}
}

export { HaircutService};