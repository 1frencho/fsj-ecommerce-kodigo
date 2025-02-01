import { memo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface MainModalProps {
  open: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonTrigger?: React.ReactNode;
  [key: string]: unknown;
}

function MainModal({
  children,
  title = 'modal',
  description = 'modalView',
  open,
  buttonTrigger,
  setOpen,
  ...rest
}: MainModalProps) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {buttonTrigger && (
          <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>
        )}
        <DialogContent className="max-h-[85vh] overflow-auto" {...rest}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
export default memo(MainModal);
