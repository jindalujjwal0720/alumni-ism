import { Show } from '@/components/show';
import { Chip } from '@/components/standalone/chip';
import { SearchInput } from '@/components/standalone/search-input';
import {
  TableView,
  TableViewCell,
  TableViewLoading,
} from '@/components/standalone/table-view';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { AutoResizeTextarea } from '@/components/ui/textarea';
import {
  IAlumniSuggestion,
  useGetSearchResultsMutation,
  useGetSearchSuggestionsQuery,
} from '@/features/standalone-search/api/alumni';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { PostVisibility } from '@/types/models/post';
import { formatUcn } from '@/utils/ucn';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AtSign,
  ChevronDown,
  // Image as ImageIcon
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreatePostMutation } from '../../api/posts';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errors';

const schema = z.object({
  body: z
    .string()
    .min(1, {
      message: 'Post body must not be empty',
    })
    .max(2000, {
      message: 'Post body must be at most 1000 characters long',
    }),
  mentions: z.array(z.object({ ucn: z.string(), name: z.string() })),
  visibility: z.nativeEnum(PostVisibility),
});

type CreatePostFormValues = z.infer<typeof schema>;

interface CreatePostProps {
  onSuccess?: () => void;
}

export const CreatePost = ({ onSuccess }: CreatePostProps) => {
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      body: '',
      mentions: [],
      visibility: PostVisibility.PUBLIC,
    },
  });
  const [createPost, { isLoading }] = useCreatePostMutation();

  const handleSubmit = async (values: CreatePostFormValues) => {
    try {
      await createPost({
        ...values,
        media: [],
      }).unwrap();
      form.reset();
      onSuccess?.();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <Form {...form}>
      <form
        className="p-4 space-y-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Drawer>
                    <DrawerTrigger>
                      <Chip className="bg-card text-base text-primary font-medium rounded-full">
                        <span className="ml-2">
                          {field.value === PostVisibility.PUBLIC
                            ? 'Public'
                            : field.value === PostVisibility.FOLLOWERS
                              ? 'Followers'
                              : 'Unknown'}
                        </span>
                        <ChevronDown className="ml-2" size={20} />
                      </Chip>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="p-4 mb-24">
                        <TableView title="Post Visibility">
                          <TableViewCell
                            name="Public"
                            onClick={() => {
                              form.setValue(
                                'visibility',
                                PostVisibility.PUBLIC,
                              );
                            }}
                            description="Visible to everyone"
                            status={
                              field.value === PostVisibility.PUBLIC && '✔'
                            }
                          />
                          <TableViewCell
                            name="Followers"
                            onClick={() => {
                              form.setValue(
                                'visibility',
                                PostVisibility.FOLLOWERS,
                              );
                            }}
                            description="Visible to followers only"
                            status={
                              field.value === PostVisibility.FOLLOWERS && '✔'
                            }
                          />
                        </TableView>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            disabled={isLoading}
            className="px-6 rounded-full"
          >
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </div>
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutoResizeTextarea
                  placeholder="What's on your mind?"
                  {...field}
                  className="border-none rounded-none focus-visible:ring-0 shadow-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center p-4 gap-6">
          <FormField
            control={form.control}
            name="mentions"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Drawer>
                    <DrawerTrigger>
                      <div className="flex gap-2 items-center">
                        <AtSign className="text-primary" size={20} />
                        <Show when={field.value.length > 0}>
                          <span className="text-primary text-sm">
                            {field.value.length}
                          </span>
                        </Show>
                      </div>
                    </DrawerTrigger>
                    <DrawerContent>
                      <Mentions value={field.value} onChange={field.onChange} />
                    </DrawerContent>
                  </Drawer>
                </FormControl>
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Drawer>
                    <DrawerTrigger>
                      <ImageIcon className="text-primary" size={20} />
                    </DrawerTrigger>
                    <DrawerContent>Media Picker here</DrawerContent>
                  </Drawer>
                </FormControl>
              </FormItem>
            )}
          /> */}
        </div>
      </form>
    </Form>
  );
};

const Mentions = ({
  value,
  onChange,
}: {
  value: CreatePostFormValues['mentions'];
  onChange: (value: CreatePostFormValues['mentions']) => void;
}) => {
  const { data: { suggestions } = {} } = useGetSearchSuggestionsQuery();
  const [search, { data, isLoading }] = useGetSearchResultsMutation();
  const debouncedSearch = useDebouncedCallback(search, 1000);

  if (isLoading) {
    return <TableViewLoading />;
  }

  const handleMentionClick = (mentionSuggestion: {
    ucn: string;
    name: string;
  }) => {
    if (!value.find((mention) => mention.ucn === mentionSuggestion.ucn)) {
      onChange([
        ...value,
        {
          ucn: mentionSuggestion.ucn,
          name: mentionSuggestion.name,
        },
      ]);
    } else {
      onChange(
        value.filter((mention) => mention.ucn !== mentionSuggestion.ucn),
      );
    }
  };

  const SearchSuggestionCell = ({
    suggestion,
  }: {
    suggestion: Omit<IAlumniSuggestion, 'mutualFollowers' | 'score'>;
  }) => {
    return (
      <TableViewCell
        key={suggestion.ucn}
        icon={
          <Avatar className="size-8">
            <AvatarImage
              src={suggestion.profilePicture}
              alt={suggestion.name}
            />
            <AvatarFallback className="text-sm bg-muted-foreground/20 text-primary">
              {suggestion.name[0]}
            </AvatarFallback>
          </Avatar>
        }
        name={suggestion.name}
        onClick={() => handleMentionClick(suggestion)}
        description={formatUcn(suggestion.ucn)}
        status={value.find((mention) => mention.ucn === suggestion.ucn) && '✔'}
      />
    );
  };

  return (
    <div className="p-4 pb-24 space-y-4">
      <SearchInput
        onChange={(e) =>
          debouncedSearch({ query: e.target.value, filters: {} })
        }
        className="bg-card"
      />
      <Show when={value.length > 0}>
        <div className="flex flex-wrap gap-2">
          {value.map((mention) => (
            <Chip
              key={mention.ucn}
              className="bg-card text-base text-primary font-medium"
              onClick={() => handleMentionClick(mention)}
            >
              @{mention.name}
            </Chip>
          ))}
        </div>
      </Show>
      <Show when={data}>
        <TableView title="Search results">
          {data?.results?.map((result) => (
            <SearchSuggestionCell key={result.ucn} suggestion={result} />
          ))}
          <Show when={data?.results?.length === 0}>
            <TableViewCell name="No results found" />
          </Show>
        </TableView>
      </Show>
      <Show when={!data}>
        <Show when={!suggestions}>
          <TableViewLoading />
        </Show>
        <Show when={suggestions}>
          <TableView title="Suggestions">
            {suggestions?.map((suggestion) => (
              <SearchSuggestionCell
                key={suggestion.ucn}
                suggestion={suggestion}
              />
            ))}
          </TableView>
        </Show>
      </Show>
    </div>
  );
};
