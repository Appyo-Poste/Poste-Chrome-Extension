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

export const loginSchema = z.object({
  email: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
});

export function LoginForm() {
  // Define login form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Define login submit handler
  function onSubmit(values: z.infer<typeof loginSchema>) {
    // @TODO something with the form values
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline">
          Log in
        </Button>
      </form>
    </Form>
  );
}
