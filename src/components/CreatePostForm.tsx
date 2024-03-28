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
import TagsList from './Tags/TagsList';
import { Input } from './ui/Input';
import FolderList, { Folder } from './FolderList';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import File from '../assets/File.png';

const folderSchema = z.object({
  title: z.string(),
  id: z.string(),
});

export const formControlStyles = {
  background: '#F0F0F0',
  border: '1px solid #F0F0F0',
  borderRadius: '20px',
  fontSize: '12px',
  color: '#747474',
};

export const formTypographyStyles = { fontSize: '18px', lineHeight: '22px' };

export const formLayoutStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

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

// const fakeFolders = [
//   {
//     title: 'Work Documents',
//     id: 'folder_1',
//   },
//   {
//     title: 'Personal Photos',
//     id: 'folder_2',
//   },
//   {
//     title: 'Music Collection',
//     id: 'folder_3',
//   },
// ];

export function CreatePostForm() {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  const [folders, setFolders] = useState<Array<Folder>>([]);
  const [defaultUrl, setDefaultUrl] = useState<string>('');
  const [defaultTitle, setDefaultTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');

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
        tags: tags,
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

  function onReset() {
    setTags('');
    form.reset({
      title: defaultTitle,
      description: '',
      url: defaultUrl,
      tags: '',
      folders: [],
    });
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={File}
        alt="File"
        style={{
          marginBottom: '16px',
          width: '85px',
        }}
      />
      <div style={{ width: '100%' }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem style={{ ...formLayoutStyles }}>
                  <FormLabel style={{ ...formTypographyStyles }}>
                    Filename
                  </FormLabel>
                  <FormControl style={{ ...formControlStyles }}>
                    <Input placeholder="Name here..." {...field} required />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem style={{ ...formLayoutStyles }}>
                  <FormLabel style={{ ...formTypographyStyles }}>URL</FormLabel>
                  <FormControl style={{ ...formControlStyles }}>
                    <Input {...field} placeholder="www.website.com" required />
                  </FormControl>
                </FormItem>
              )}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h2 style={{ ...formTypographyStyles }}>Tags</h2>
              <TagsList tags={tags} setTags={setTags} />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h2 style={{ ...formTypographyStyles }}>Move To</h2>
              <FolderList folders={folders} />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem style={{ ...formLayoutStyles }}>
                  <FormLabel style={{ ...formTypographyStyles }}>
                    Description
                  </FormLabel>
                  <FormControl style={{ ...formControlStyles }}>
                    <Input placeholder="Description here..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div
              display="flex"
              flexDiretion="row"
              justifyContent="flex-end"
              width="100%"
            >
              <Button
                type="submit"
                style={{
                  width: '85px',
                  background: '#84D6EF',
                  color: '#000000',
                  borderRadius: '15px',
                  marginRight: '8px',
                }}
              >
                Save
              </Button>
              <Button
                onClick={onReset}
                style={{
                  width: '85px',
                  background: '#357497',
                  color: '#FFFFFF',
                  borderRadius: '15px',
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
