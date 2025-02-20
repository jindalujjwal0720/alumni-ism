import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { BriefcaseBusiness, GraduationCap, UserCircle } from 'lucide-react';

const ProfileScreen = () => {
  return (
    <>
      <ScreenTitleBar title="Profile" />
      <ScreenContent className="bg-background">
        <div className="p-4 flex flex-col gap-6">
          <TableView title="Personal">
            <TableViewCell
              icon={<UserCircle />}
              title="Personal"
              description="Contact information, address, bio"
              link="/profile"
            />
            <TableViewCell
              icon={<GraduationCap />}
              title="Academic"
              description="Education, certifications, skills"
              link="/profile"
            />
            <TableViewCell
              icon={<BriefcaseBusiness />}
              title="Professional"
              description="Employment, projects, achievements"
              link="/profile"
            />
          </TableView>
          <TableView title="Preferences">
            <TableViewCell
              title="Mentorship"
              description="Mentorship preferences, availability"
              link="/profile"
            />
            <TableViewCell
              title="Jobs"
              description="Job preferences, availability"
              link="/profile"
            />
          </TableView>
          <TableView title="Account">
            <TableViewCell title="Security" link="/profile" />
            <TableViewCell title="Notifications" link="/profile" />
            <TableViewCell title="Change password" link="/profile" />
            <TableViewCell
              description={
                <div
                  role="button"
                  title="Sign out"
                  className="w-full text-destructive text-center text-base"
                >
                  Sign out
                </div>
              }
            />
          </TableView>
        </div>
      </ScreenContent>
    </>
  );
};

export default ProfileScreen;
