import { cn } from '@/utils/tw';
import React, { useCallback } from 'react';
import { useStandaloneNavigation } from './navigation';
import { useScreenLayout } from './screen-layout';
import { Show } from '../show';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
      <div className="border shadow-sm rounded-xl">
        <table
          ref={ref}
          className={cn('w-full h-max rounded-xl bg-card', className)}
          {...props}
        >
          <tbody className="divide-y-2">{children}</tbody>
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
    title?: string;
    /** The description to be displayed below the title */
    description?: string | React.ReactNode;
    /** The link to be navigated to when the cell is clicked */
    link?: string;
    /** The actions to be displayed on the right side of the cell,
     * such as buttons or icons
     */
    actions?: React.ReactNode;
  }
>(
  (
    {
      className,
      children,
      icon,
      title,
      description,
      link,
      actions,

      ...props
    },
    ref,
  ) => {
    const { navigate } = useStandaloneNavigation();
    const { title: screenTitle } = useScreenLayout();
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleRowClick = useCallback(() => {
      if (children) return setIsExpanded((prev) => !prev);

      if (link) navigate(link, screenTitle);
    }, [children, link, navigate, screenTitle]);

    return (
      <>
        <tr
          ref={ref}
          className={cn('w-full hover:bg-muted/70', className)}
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
            <div className={cn('py-3 flex items-center justify-between gap-4')}>
              <div className="w-full flex flex-col">
                <span className="text-base">{title}</span>
                <span className="text-sm text-muted-foreground w-full">
                  {description}
                </span>
              </div>
            </div>
          </td>
          <td className="pr-3 p-0">
            <div className="flex items-center justify-end gap-2">
              <Show when={actions !== undefined}>{actions}</Show>
              <Show when={children !== undefined}>
                <ChevronDown
                  size={24}
                  className={cn(
                    'text-muted-foreground hover:text-foreground transition-transform',
                    isExpanded && 'transform rotate-180',
                  )}
                />
              </Show>
              <Show when={link !== undefined && !children}>
                <ChevronRight size={24} className="text-muted-foreground" />
              </Show>
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

export { TableView, TableViewCell };
