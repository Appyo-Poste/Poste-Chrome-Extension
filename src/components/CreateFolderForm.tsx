'use client';

import React, { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from './ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/Form';
import { Input } from './ui/Input';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './AppContext';
import {
  formControlStyles,
  formLayoutStyles,
  formTypographyStyles,
} from './CreatePostForm';
import Folder from '../assets/Folder.png';

export const createFolderSchema = z.object({
  title: z.string().min(2).max(50),
});

export function CreateFolderForm() {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  // Define create folder form
  const form = useForm<z.infer<typeof createFolderSchema>>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(values: z.infer<typeof createFolderSchema>) {
    fetch(`${process.env.API_URL}api/folders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ?? '',
      },
      body: JSON.stringify({
        title: values.title,
      }),
    })
      .then((data) => {
        navigate('/post');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <img
        src={Folder}
        alt="Folder"
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
                    Folder Name
                  </FormLabel>
                  <FormControl style={{ ...formControlStyles }}>
                    <Input {...field} required placeholder="Name here..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </form>
        </Form>
      </div>
    </div>
  );
}
