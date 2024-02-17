'use client';

import React, { useContext, useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';

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
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [folders, setFolders] = useState<Array<Folder>>([]);
  const [defaultUrl, setDefaultUrl] = useState<string>('');
  const [defaultTitle, setDefaultTitle] = useState<string>('');

  useEffect(() => {
    fetch(`${process.env.API_URL}api/folders/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? '',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const mappedFolders = data.map((f) => {
          return {
            title: f.title,
            id: f.id,
          };
        });
        setFolders(mappedFolders);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // @TODO consider abstracting the url and automatically populating it within the form
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   if (tabs && tabs[0]) {
    //     setDefaultUrl(tabs[0].url);
    //     setDefaultTitle(tabs[0].title);
    //   }
    // });
  }, []);

  const form = useForm<z.infer<typeof createPostSchema>>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: defaultTitle,
      description: '',
      url: defaultUrl,
      tags: '',
      folders: [],
    },
  });

  function onSubmit(values: z.infer<typeof createPostSchema>) {
    // @TODO verify this fetch
    fetch(`${process.env.API_URL}api/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? '',
      },
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        url: values.url,
        // @TODO something with folder_id:
        tags: values.tags,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // @TODO what to do with data
        navigate('/success');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

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
