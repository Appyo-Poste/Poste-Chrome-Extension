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
      .then((response) => response.json())
      .then((data) => {
        navigate('/post');
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
              <FormLabel>Folder Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
