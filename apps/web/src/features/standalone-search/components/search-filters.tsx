import { TableView, TableViewCell } from '@/components/standalone/table-view';
import { useSearch } from './provider';
import { Show } from '@/components/show';
import { Settings2 } from 'lucide-react';

const SearchFilterIcon = () => {
  const { filters } = useSearch();
  const filtersApplied = Object.values(filters).filter((filter) => filter);

  return (
    <div className="relative size-8 flex items-center justify-center">
      <Settings2 size={24} className="text-muted-foreground" />
      <Show when={filtersApplied.length > 0}>
        <span className="absolute top-0 right-0 text-xs bg-primary text-white rounded-full size-3.5 flex items-center justify-center">
          {filtersApplied.length}
        </span>
      </Show>
    </div>
  );
};

const SearchFilters = () => {
  const { filters, clearFilters } = useSearch();
  const areAnyFiltersApplied = Object.values(filters).some((filter) => filter);
  const filtersApplied = Object.entries(filters).filter(([, value]) => value);

  return (
    <TableView title="Filter by">
      <TableViewCell
        name="Branch"
        link="?filter=branch"
        status={filters.branch}
      />
      <TableViewCell
        name="Degree"
        link="?filter=degree"
        status={filters.degree}
      />
      <TableViewCell
        name="Year of Graduation"
        link="?filter=year"
        status={filters.year}
      />
      <TableViewCell
        name="Current Company"
        link="?filter=company"
        status={filters.company}
      />
      <TableViewCell
        name="Designation"
        link="?filter=designation"
        status={filters.designation}
      />
      <Show when={areAnyFiltersApplied}>
        <TableViewCell
          onClick={clearFilters}
          name="Clear All Filters"
          status={`(${filtersApplied.length})`}
        />
      </Show>
    </TableView>
  );
};

export { SearchFilterIcon, SearchFilters };
