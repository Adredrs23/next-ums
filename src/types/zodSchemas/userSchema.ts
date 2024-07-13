import { z } from 'zod';

export const userSchema = z.object({
	name: z.string().min(1).max(50),
	email: z.string().email(),
	phone: z.string().min(10).max(15),
	address: z.string().min(1).max(100),
	role: z.string().min(1).max(10),
	github: z.string().min(1).max(50),
	linkedin: z.string().min(1).max(100),
	skypeid: z.string().min(1).max(50),
	dob: z.string().min(10).max(10),
	doj: z.string().min(10).max(10),
});

export const UserSchemaPartial = userSchema.partial();
