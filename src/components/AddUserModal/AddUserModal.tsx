'use client';

import { useState } from 'react';

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	Button,
	Label,
	Input,
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Progress,
} from '@/components/Atoms';
import { UserPartialType, UserType } from '@/types/interfaces';
import { UserActionTile } from '../UserActionTile';
import { UserPlusIcon } from 'lucide-react';

export function AddUserModal() {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<UserType>({
		name: 'John Doe',
		email: 'john@example.com',
		phone: '123-456-7890',
		address: '123 Main St, Anytown USA',
		role: 'admin',
		github: 'johndoe',
		linkedin: 'https://linkedin.com/in/johndoe',
		skypeid: 'johndoe',
		dob: '1990-01-01',
		doj: '2022-01-01',
	});

	const [errors, setErrors] = useState<UserPartialType | null>(null);

	const handleInputChange = (e: { target: { id: string; value: string } }) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleNextStep = () => {
		const validationErrors: UserPartialType = {};

		if (currentStep === 1) {
			if (!formData.name) {
				validationErrors.name = 'Name is required';
			}
			if (!formData.email) {
				validationErrors.email = 'Email is required';
			} else if (!isValidEmail(formData.email)) {
				validationErrors.email = 'Invalid email address';
			}
			if (!formData.phone) {
				validationErrors.phone = 'Phone is required';
			}
			if (!formData.address) {
				validationErrors.address = 'Address is required';
			}
		} else {
			if (!formData.role) {
				validationErrors.role = 'Role is required';
			}
			if (!formData.github) {
				validationErrors.github = 'Github is required';
			}
			if (!formData.linkedin) {
				validationErrors.linkedin = 'LinkedIn is required';
			}
			if (!formData.skypeid) {
				validationErrors.skypeid = 'Skype ID is required';
			}
			if (!formData.dob) {
				validationErrors.dob = 'Date of Birth is required';
			}
			if (!formData.doj) {
				validationErrors.doj = 'Date of Joining is required';
			}
		}

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setCurrentStep(currentStep + 1);
		setErrors(null);
	};

	const handlePrevStep = () => {
		setCurrentStep(currentStep - 1);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(formData);
	};

	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<UserActionTile actionLabel="Add User">
					<UserPlusIcon className="h-5 w-5" />
				</UserActionTile>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<div className="flex items-center justify-between">
						<DialogTitle>Add New User</DialogTitle>
					</div>
					<DialogDescription>
						Fill out the form to add a new user to the system.
					</DialogDescription>
					<div className="flex items-center justify-between mt-4">
						<div className="flex items-center space-x-2">
							<div
								className={`px-3 py-1 rounded-md text-sm font-medium ${
									currentStep === 1
										? 'bg-primary text-primary-foreground'
										: 'bg-muted text-muted-foreground'
								}`}
							>
								Step 1
							</div>
							<div
								className={`px-3 py-1 rounded-md text-sm font-medium ${
									currentStep === 2
										? 'bg-primary text-primary-foreground'
										: 'bg-muted text-muted-foreground'
								}`}
							>
								Step 2
							</div>
						</div>
					</div>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						{currentStep === 1 && (
							<div className="grid gap-4">
								<div className="grid grid-cols-1 gap-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										placeholder="Enter name"
										value={formData.name}
										onChange={handleInputChange}
										className={errors?.name ? 'border-red-500' : ''}
									/>
									{errors?.name && (
										<div className="text-red-500 text-sm">{errors?.name}</div>
									)}
								</div>
								<div className="grid grid-cols-1 gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter email"
										value={formData.email}
										onChange={handleInputChange}
										className={errors?.email ? 'border-red-500' : ''}
									/>
									{errors?.email && (
										<div className="text-red-500 text-sm">{errors?.email}</div>
									)}
								</div>
								<div className="grid grid-cols-1 gap-2">
									<Label htmlFor="phone">Phone</Label>
									<Input
										id="phone"
										type="tel"
										placeholder="Enter phone number"
										value={formData.phone}
										onChange={handleInputChange}
										className={errors?.phone ? 'border-red-500' : ''}
									/>
									{errors?.phone && (
										<div className="text-red-500 text-sm">{errors?.phone}</div>
									)}
								</div>
								<div className="grid grid-cols-1 gap-2">
									<Label htmlFor="address">Address</Label>
									<Input
										id="address"
										placeholder="Enter address"
										value={formData.address}
										onChange={handleInputChange}
										className={errors?.address ? 'border-red-500' : ''}
									/>
									{errors?.address && (
										<div className="text-red-500 text-sm">
											{errors?.address}
										</div>
									)}
								</div>
							</div>
						)}
						{currentStep === 2 && (
							<div className="grid gap-4">
								<div className="grid grid-cols-1 gap-2">
									<Label htmlFor="role">Role</Label>
									<Select
										// id="role"
										value={formData.role}
										// className={errors?.role ? 'border-red-500' : ''}
										onValueChange={(role) =>
											setFormData({ ...formData, role: role })
										}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="admin">Admin</SelectItem>
											<SelectItem value="manager">Manager</SelectItem>
											<SelectItem value="user">User</SelectItem>
										</SelectContent>
									</Select>
									{errors?.role && (
										<div className="text-red-500 text-sm">{errors?.role}</div>
									)}
								</div>
								<div className="grid grid-cols-1 gap-2">
									<Label htmlFor="github">Github</Label>
									<Input
										id="github"
										placeholder="Enter Github username"
										value={formData.github}
										onChange={handleInputChange}
										className={errors?.github ? 'border-red-500' : ''}
									/>
									{errors?.github && (
										<div className="text-red-500 text-sm">{errors?.github}</div>
									)}
								</div>
								<div className="grid grid-cols-1 gap-2">
									<Label htmlFor="linkedin">LinkedIn</Label>
									<Input
										id="linkedin"
										placeholder="Enter LinkedIn profile URL"
										value={formData.linkedin}
										onChange={handleInputChange}
										className={errors?.linkedin ? 'border-red-500' : ''}
									/>
									{errors?.linkedin && (
										<div className="text-red-500 text-sm">
											{errors?.linkedin}
										</div>
									)}
								</div>
								<div className="grid grid-cols-1 gap-2">
									<Label htmlFor="skypeid">Skype ID</Label>
									<Input
										id="skypeid"
										placeholder="Enter Skype ID"
										value={formData.skypeid}
										onChange={handleInputChange}
										className={errors?.skypeid ? 'border-red-500' : ''}
									/>
									{errors?.skypeid && (
										<div className="text-red-500 text-sm">
											{errors?.skypeid}
										</div>
									)}
								</div>
								<div className="grid grid-cols-1 gap-2">
									<Label htmlFor="dob">Date of Birth</Label>
									<Input
										id="dob"
										type="date"
										placeholder="Enter date of birth"
										value={formData.dob}
										onChange={handleInputChange}
										className={errors?.dob ? 'border-red-500' : ''}
									/>
									{errors?.dob && (
										<div className="text-red-500 text-sm">{errors?.dob}</div>
									)}
								</div>
								<div className="grid grid-cols-1 gap-2">
									<Label htmlFor="doj">Date of Joining</Label>
									<Input
										id="doj"
										type="date"
										placeholder="Enter date of joining"
										value={formData.doj}
										onChange={handleInputChange}
										className={errors?.doj ? 'border-red-500' : ''}
									/>
									{errors?.doj && (
										<div className="text-red-500 text-sm">{errors?.doj}</div>
									)}
								</div>
							</div>
						)}
					</div>
				</form>
				<DialogFooter className="flex justify-between border-t pt-4">
					{currentStep > 1 && (
						<Button variant="outline" onClick={handlePrevStep}>
							Previous
						</Button>
					)}
					{currentStep < 2 && <Button onClick={handleNextStep}>Next</Button>}
					{currentStep === 2 && (
						<Button type="submit" onClick={handleSubmit}>
							Save User
						</Button>
					)}
				</DialogFooter>
				<div className="mt-4">
					<Progress value={(currentStep / 2) * 100} className="w-full" />
				</div>
			</DialogContent>
		</Dialog>
	);
}
