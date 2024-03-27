'use client';

import React from 'react';
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
import { useNavigate } from 'react-router-dom';

export const createUserSchema = z.object({
  email: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
  name: z.string().min(1).max(50),
});

export function CreateUserForm() {
  const navigate = useNavigate();
  // Define login form
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof createUserSchema>) {
    fetch(`${process.env.API_URL}api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        name: values.name,
      }),
    })
      .then((response) => {
        console.log('response:', response);
        response.json();
      })
      .then((data) => {
        console.log('data: ', data);
        // @TODO what to do with data; set Authorization token and automatically log in?
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@mail.com" {...field} required />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} required />
              </FormControl>
              <FormDescription>
                Your password should be at least eight characters.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">
          Submit
        </Button>
      </form>
    </Form>
  );
}
