import { cn } from '@/utils/tw';
import React, { useCallback } from 'react';
import { useStandaloneNavigation } from './navigation';
import { useScreenLayout } from './screen-layout';
import { Show } from '../show';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const TableView = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    title?: string;
  }
>(({ className, children, title, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Show when={title !== undefined}>
        <h2 className="px-4 text-xs uppercase font-semibold text-muted-foreground tracking-wider">
          {title}
        </h2>
      </Show>
      <div className="border rounded-xl">
        <table
          ref={ref}
          className={cn('w-full h-max rounded-xl bg-card', className)}
          {...props}
        >
          <tbody className="divide-y">{children}</tbody>
        </table>
      </div>
    </div>
  );
});
TableView.displayName = 'TableView';

const TableViewCell = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    /** The icon to be displayed on the left side of the cell */
    icon?: React.ReactNode;
    /** The title to be displayed on the left side of the cell */
    name?: React.ReactNode;
    /** The description to be displayed below the title */
    description?: React.ReactNode;
    /** The link to be navigated to when the cell is clicked */
    link?: string;
    /** The actions to be displayed on the right side of the cell,
     * such as buttons or icons
     */
    actions?: React.ReactNode;
    /** The status to be displayed on the right side of the cell */
    status?: React.ReactNode;

    more?: boolean;
    dropdown?: boolean;
  }
>(
  (
    {
      className,
      children,
      onClick,

      icon,
      name,
      description,
      link,
      actions,
      status,

      more,
      dropdown,

      ...props
    },
    ref,
  ) => {
    const { navigate } = useStandaloneNavigation();
    const { title: screenTitle } = useScreenLayout();
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleRowClick = useCallback(
      (e: React.MouseEvent<HTMLTableRowElement>) => {
        if (children) return setIsExpanded((prev) => !prev);

        if (link) navigate(link, screenTitle);

        if (onClick) onClick(e);
      },
      [children, link, navigate, onClick, screenTitle],
    );

    return (
      <>
        <tr
          ref={ref}
          className={cn('w-full hover:bg-muted/50', className)}
          {...props}
          onClick={handleRowClick}
        >
          <td className="pl-4 p-0">
            <Show when={icon !== undefined}>
              <span className="pr-4 text-muted-foreground flex items-center justify-center w-max">
                {icon}
              </span>
            </Show>
          </td>
          <td className="p-0 w-full">
            <div className="w-full flex justify-between gap-2">
              <div className="w-full py-3 flex flex-col justify-center">
                <div className="w-full flex justify-between gap-4">
                  <div>
                    {typeof name === 'string' ? (
                      <p className="text-sm w-max">{name}</p>
                    ) : (
                      name
                    )}
                  </div>
                  <Show when={status !== undefined}>
                    <div className="text-end w-full text-sm text-muted-foreground">
                      {status}
                    </div>
                  </Show>
                </div>
                <Show when={description !== undefined}>
                  <Show when={typeof description === 'string'}>
                    <p className="w-full text-xs text-muted-foreground">
                      {description}
                    </p>
                  </Show>
                  <Show when={typeof description !== 'string'}>
                    <div className="w-full">{description}</div>
                  </Show>
                </Show>
              </div>
              <div className="flex items-center justify-end gap-2 pr-2">
                <Show when={actions !== undefined}>{actions}</Show>
                <Show when={children !== undefined || dropdown}>
                  <ChevronDown
                    size={20}
                    className={cn(
                      'text-muted-foreground hover:text-foreground transition-transform',
                      isExpanded && 'transform rotate-180',
                    )}
                  />
                </Show>
                <Show when={(link !== undefined && !children) || more}>
                  <ChevronRight size={20} className="text-muted-foreground" />
                </Show>
              </div>
            </div>
          </td>
        </tr>
        <Show when={children !== undefined && isExpanded}>
          <tr>
            <td colSpan={3}>{children}</td>
          </tr>
        </Show>
      </>
    );
  },
);

const TableViewLoading = ({ rows = 3 }: { rows?: number }) => {
  return (
    <TableView>
      {[...Array(rows)].map((_, i) => (
        <TableViewCell
          key={i}
          icon={<Skeleton className="h-8 w-8" />}
          description={
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          }
        />
      ))}
    </TableView>
  );
};

export { TableView, TableViewCell, TableViewLoading };
