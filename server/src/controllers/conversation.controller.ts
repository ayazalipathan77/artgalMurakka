import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/database';

export const getAllConversations = async (req: Request, res: Response): Promise<void> => {
    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: { date: 'desc' },
        });
        res.status(StatusCodes.OK).json({ conversations });
    } catch (error) {
        console.error('Get conversations error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch conversations' });
    }
};

export const createConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const conversation = await prisma.conversation.create({
            data: {
                ...req.body,
                date: req.body.date ? new Date(req.body.date) : new Date(),
            },
        });
        res.status(StatusCodes.CREATED).json({ conversation });
    } catch (error) {
        console.error('Create conversation error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create conversation' });
    }
};

export const updateConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const conversation = await prisma.conversation.update({
            where: { id: id as string },
            data: {
                ...req.body,
                date: req.body.date ? new Date(req.body.date) : undefined,
            },
        });
        res.status(StatusCodes.OK).json({ conversation });
    } catch (error) {
        console.error('Update conversation error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update conversation' });
    }
};

export const deleteConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await prisma.conversation.delete({ where: { id: id as string } });
        res.status(StatusCodes.OK).json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        console.error('Delete conversation error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete conversation' });
    }
};
