'use client';

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/Form';
import { Input } from './ui/Input';
import FolderList, { Folder } from './FolderList';

const folderSchema = z.object({
  title: z.string(),
  id: z.string(),
});

export const createPostSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  url: z.string().min(2).max(50),
  folders: z.array(folderSchema),
  tags: z
    .string()
    .min(2)
    .max(100)
    .refine(
      (data) => {
        // Split the string by comma and trim whitespace from each tag
        const tagsArray = data.split(',').map((tag) => tag.trim());
        // Check each tag is not empty and does not exceed the maximum length
        return tagsArray.every((tag) => tag.length > 0 && tag.length <= 25);
      },
      {
        message:
          'Tags must be a comma-separated list, each tag should be non-empty and up to 25 characters long.',
      }
    ),
});

export function CreatePostForm() {
  const [folders, setFolders] = useState<Array<Folder>>([]);
  // Define create post form
  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      description: '',
      url: '',
      tags: '',
      folders: [],
    },
  });

  // Define create post submit handler
  function onSubmit(values: z.infer<typeof createPostSchema>) {
    // @TODO something with the form values
    console.log(values);
  }

  useEffect(() => {
    // @TODO remove fake data and get a list of the folders from the user
    setFolders([
      {
        title: 'sample folder one',
        id: '1',
      },
      {
        title: 'sample folder two',
        id: '2',
      },
    ]);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://www..." required />
              </FormControl>
            </FormItem>
          )}
        />
        <FolderList folders={folders} />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="social, post, tags" {...field} required />
              </FormControl>
              <FormDescription>Seperate each tag with a comma</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
