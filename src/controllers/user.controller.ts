import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(User).find();
    return res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
    const user = await getRepository(User).findOne(req.params.id);
    return res.json(user);
};

export const createUser = async (req: Request , res: Response): Promise<Response> => {
    const userRepository = getRepository(User);
    const user = userRepository.create(req.body);
    const result = await userRepository.save(user);
    return res.json(result);
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    if (user) {
        const updatedUser = getRepository(User).merge(user, req.body);
        const result = await getRepository(User).save(updatedUser);
        return res.json(result);
    }
    return res.status(404).json({
        message: "User with id not found",
        code: 404,
        error: true
    });
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).delete(req.params.id);
    return res.json(user);
};
