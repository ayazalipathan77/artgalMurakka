import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/database';

export const getSettings = async (req: Request, res: Response): Promise<void> => {
    try {
        const settings = await prisma.setting.findMany();
        const settingsMap = settings.reduce((acc: Record<string, any>, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, any>);
        res.status(StatusCodes.OK).json({ settings: settingsMap });
    } catch (error) {
        console.error('Get settings error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch settings' });
    }
};

export const updateSetting = async (req: Request, res: Response): Promise<void> => {
    try {
        const { key, value } = req.body;

        if (!key) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Key is required' });
            return;
        }

        const setting = await prisma.setting.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        });

        res.status(StatusCodes.OK).json({ setting });
    } catch (error) {
        console.error('Update setting error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update setting' });
    }
};

export const getSettingByKey = async (req: Request, res: Response): Promise<void> => {
    try {
        const { key } = req.params;
        const setting = await prisma.setting.findUnique({ where: { key: key as string } });
        if (!setting) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Setting not found' });
            return;
        }
        res.status(StatusCodes.OK).json({ value: setting.value });
    } catch (error) {
        console.error('Get setting error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch setting' });
    }
};
