import { Sheet, SheetContent, SheetHeader } from '../ui/sheet';
import { Outlet } from 'react-router-dom';
import { useStandaloneNavigation } from './navigation';

export const ModalLayout = () => {
  const { goBackTitle, goBack } = useStandaloneNavigation();

  return (
    <Sheet
      open={true}
      onOpenChange={() => {
        goBack('/');
      }}
    >
      <SheetContent
        side={'bottom'}
        className="rounded-t-2xl h-[calc(100dvh-1rem)] p-4"
        close={false}
      >
        <SheetHeader>
          <div className="flex items-center justify-between">
            <span
              className="text-primary font-medium"
              onClick={() => {
                goBack('/');
              }}
            >
              Cancel
            </span>
            <span className="text-primary font-medium">{goBackTitle}</span>
          </div>
        </SheetHeader>
        <Outlet />
      </SheetContent>
    </Sheet>
  );
};
