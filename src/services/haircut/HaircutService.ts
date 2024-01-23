import prisma from "../../prisma";
import { CreateHaircutDto, ListHaircutsDto, UpdateHaircutDto } from "./dtos/HaircutDto";

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

	async listHaircuts({user_id, status}: ListHaircutsDto){
		const haircuts = await prisma.haircut.findMany({
			where: {
				userId: user_id,
				status: status === "true" ? true : false,
			}
		});

		return haircuts;
	}

	async updateHaircut({user_id, haircut_id, name, price, status}: UpdateHaircutDto){
		const user = await prisma.user.findFirst({
			where: {
				id: user_id,
			},
			include: {
				subscriptions: true,
			}
		});

		if(user?.subscriptions?.status !== "active"){
			throw new Error("You don't have an active subscription! Subscribe to update your haircut!");	
		}

		const haircut = await prisma.haircut.update({
			where: {
				id: haircut_id,
			},
			data: {
				name,
				price,
				status: status === "true" ? true : false,
			}
		});

		return haircut;
	}

	async detailHaircut(haircut_id: string){
		const haircut = await prisma.haircut.findFirst({
			where: {
				id: haircut_id,
			}
		});

		return haircut;
	}

	async deleteHaircut(haircut_id: string){
		const haircut = await prisma.haircut.delete({
			where: {
				id: haircut_id,
			}
		});

		return haircut;
	}
}

export { HaircutService};