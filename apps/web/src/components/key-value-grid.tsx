export type FormatterFunction<TRow extends Record<string, unknown>> = (params: {
  key: keyof TRow;
  row: TRow;
}) => string | JSX.Element;

export type KeyValueType<TRow extends Record<string, unknown>> =
  | string
  | {
      key: string;
      label?: string;
      formatter?: FormatterFunction<TRow>;
    };

interface KeyValueProps<TRow extends Record<string, unknown>> {
  dataKey: string;
  label: string;
  formatter?: FormatterFunction<TRow>;
  row: TRow;
}

function KeyValue<TRow extends Record<string, unknown>>({
  row,
  label,
  dataKey,
  formatter,
}: Readonly<KeyValueProps<TRow>>) {
  const value = row[dataKey as keyof TRow];

  return (
    <div className="space-y-1.5">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-sm">
        {formatter ? formatter({ key: dataKey, row }) : value?.toString()}
      </div>
    </div>
  );
}

interface KeyValueGridProps<TData extends Record<string, unknown>> {
  title?: string;
  data: TData;
  keys?: KeyValueType<TData>[];
  colsCount?: number;
  formatter?: FormatterFunction<TData>;
}

function KeyValueGrid<TData extends Record<string, unknown>>({
  title,
  data,
  keys,
  formatter,
  // colsCount = 2,
}: Readonly<KeyValueGridProps<TData>>) {
  return (
    <div className="flex flex-col">
      {title && <h1 className="font-medium text-lg mb-3">{title}</h1>}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        // style={{ gridTemplateColumns: `repeat(${colsCount}, auto)` }}
      >
        {keys
          ? keys.map((currentKey, index) => {
              if (typeof currentKey === 'string') {
                return (
                  <KeyValue
                    key={`${currentKey}-${index}`}
                    dataKey={currentKey}
                    label={currentKey}
                    formatter={formatter}
                    row={data}
                  />
                );
              } else {
                return (
                  <KeyValue
                    key={`${currentKey.key}-${index}`}
                    dataKey={currentKey.key}
                    label={currentKey.label ?? currentKey.key}
                    formatter={currentKey.formatter ?? formatter}
                    row={data}
                  />
                );
              }
            })
          : null}
      </div>
    </div>
  );
}

export default KeyValueGrid;
