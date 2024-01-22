import { RegisterUserDto, AuthUserDto, Session, UpdateUserDto } from "./dtos/UserDtos";
import prisma from "../../prisma";
import emailValidation from "../../validations/EmailValidation";
import { User } from "@prisma/client";
import passwordValidation from "../../validations/PasswordValidation";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

class UserService{
	async findUserByEmail(email: string): Promise<User | null>{
		const user = await prisma.user.findFirst({
			where: {
				email
			},
			include: {
				subscriptions: true
			},
		});

		return user;
	}

	async createUser({email, name, password, cep, city, state, address, number, complement}: RegisterUserDto): Promise<User>{

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

	async authUser({email, password}: AuthUserDto): Promise<Session> {

		const user = await this.findUserByEmail(email);

		if (!user) {
			throw new Error("Email or password incorrect!");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error("Email or password incorrect!");
		}

		const token = sign(
			{
				name: user.name,
				email: user.email,
			},
			process.env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: "30d"
			}
		);

		const userReturn = {
			...user,
			password: undefined
		};


		return {
			user: userReturn,
			token
		};
	}

	async getUser(user_id: string) {

		const user = await prisma.user.findFirst({
			where: {
				id: user_id
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
				subscriptions: {
					select: {
						id: true,
						priceId: true,
						status: true,
					}
				}
			}
		});

		return user;
	}

	async updateUser({id, name, cep, city, state, address, number, complement}: UpdateUserDto) {
		try {
			const user = await prisma.user.findFirst({
				where: {
					id
				}
			});
			
			if (!user) {
				throw new Error("User not found!");
			}

			const userUpdated = await prisma.user.update({
				where: {
					id
				},
				data: {
					name,
					cep,
					city,
					state,
					address,
					number,
					complement,
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

			return userUpdated;

		} catch (error) {
			throw new Error(error.message);
		}
	}

	async checkUserSubscription(user_id: string) {
		const user = await prisma.user.findFirst({
			where: {
				id: user_id
			},
			select: {
				subscriptions: {
					select: {
						id: true,
						status: true,
					}
				}
			}
		});

		if (!user) {
			throw new Error("User not found!");
		}

		return user;
	}
}

export { UserService };