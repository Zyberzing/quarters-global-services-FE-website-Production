
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/session';
import { getUserById } from '@/services/usersService';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import DashboardLayout from '@/layout/DashboardLayout';

const page = async () => {
    const session = await getSession();

    const userData = await getUserById(session.id);
    if (!userData) {
        return redirect('/dashboard/home');
    }
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <Card>
                    <CardContent className="grid gap-8">
                        {/* Left Side - Profile */}
                        <div className="flex flex-col lg:flex-row items-center lg:gap-6 space-y-2">
                            <Avatar className="h-20 w-20">
                                <AvatarImage
                                    src={userData.profilePicture || 'https://via.placeholder.com/80'}
                                    alt={userData.firstName}
                                />
                                <AvatarFallback className="uppercase">
                                    {userData?.firstName?.charAt(0)}
                                    {userData?.lastName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-base">
                                    {userData.firstName} {userData.lastName}
                                </p>
                                <p className="text-sm text-gray-500">{userData.email}</p>
                            </div>
                            <Button asChild className="ms-auto">
                                <Link href={'/dashboard/profile/edit'}>Edit</Link>
                            </Button>
                        </div>

                        {/* Right Side - Form Fields */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" value={userData.firstName} readOnly />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" value={userData.lastName} readOnly />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={userData.email} readOnly />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" value={userData.phone} readOnly />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <Input id="role" value={userData.role} readOnly />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>

    );
};

export default page;
