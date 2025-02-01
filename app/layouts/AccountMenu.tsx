import { MotionDiv } from '@/components/main/content/MotionDiv';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaUserAlt } from 'react-icons/fa';

interface AccountMenuProps {
  fullName: string;
  email: string;
  role: 1 | 2;
  handleLogout: () => void;
}

function AccountMenu({
  fullName,
  email,
  role,
  handleLogout,
}: AccountMenuProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MotionDiv>
            <div className="myPrimaryBtn">
              <FaUserAlt className="text-white" />
            </div>
          </MotionDiv>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{fullName}</DropdownMenuItem>
          <DropdownMenuItem>{email}</DropdownMenuItem>
          <DropdownMenuItem>
            Role: {role === 1 ? 'Admin' : 'User'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default AccountMenu;
