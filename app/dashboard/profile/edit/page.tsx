
import ProfileForm from '@/components/form/profileForm/ProfileForm';
import DashboardLayout from '@/layout/DashboardLayout';
import { getSession } from '@/lib/session';
import { getUserById } from '@/services/usersService';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getSession();
  const userData = await getUserById(session?.id || '');
  if (!userData) {
    return redirect('/dashboard/profile');
  }

  return (
    <DashboardLayout>
      <p className="py-4 text-lg font-semibold">Edit Profile</p>
      <ProfileForm userData={userData} />
    </DashboardLayout>
  );
};

export default page;
