import { UserDto } from "./dtos/UserDtos";
import prisma from "../../prisma";
import emailValidation from "../../validations/EmailValidation";
import { User } from "@prisma/client";
import passwordValidation from "../../validations/PasswordValidation";
import { hash } from "bcrypt";

class UserService{

	async findUserByEmail(email: string): Promise<User | null>{
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		return user;
	}

	async createUser({email, name, password, cep, city, state, address, number, complement}: UserDto): Promise<User>{

		const emailValidated = emailValidation(email);

		if (!emailValidated) {
			throw new Error("Email incorrect!");
		}

		const userAlreadyExists = await this.findUserByEmail(email);

		if (userAlreadyExists) {
			throw new Error("User already exists!");
		}

		const passwordValidated = passwordValidation(password);

		if (!passwordValidated) {
			throw new Error("Password must have at least 8 characters, 1 number, 1 uppercase letter and 1 lowercase letter!");
		}

		const hashedPassword = await hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				cep,
				city,
				address,
				complement,
				number,
				state,
			},
			select: {
				id: true,
				name: true,
				email: true,
				cep: true,
				city: true,
				address: true,
				complement: true,
				number: true,
				state: true,
			}
		});

		return user as User;
	}
}

export { UserService };