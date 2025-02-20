import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { Switch } from '@/components/ui/switch';
import { BriefcaseBusiness, GraduationCap, UserCircle } from 'lucide-react';

export const PersonalDetailsScreen = () => {
  return (
    <div>
      <div className="p-5 flex flex-col gap-6">
        <TableView title="Personal">
          <TableViewCell
            icon={<UserCircle />}
            title="Personal"
            description="Contact information, address, bio"
            link="/modal/profile"
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
          <TableViewCell title="Security" />
          <TableViewCell title="Notifications">
            <div className="divide-y pl-4">
              <div className="pl-2 p-3">
                <div className="flex items-center justify-between">
                  <span>Push notifications</span>
                  <Switch />
                </div>
              </div>
              <div className="pl-2 p-3">
                <div className="flex items-center justify-between">
                  <span>Email notifications</span>
                  <Switch />
                </div>
              </div>
            </div>
          </TableViewCell>
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
    </div>
  );
};
