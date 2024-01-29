'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { redirect } from 'react-router-dom';
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

interface LoginFormProps {
  setLoggedIn: (isLoggedIn: boolean) => void;
  setToken: (token: string) => void;
  error?: string;
  setError: (error?: string) => void;
}

export const loginSchema = z.object({
  email: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
});

export function LoginForm({
  setLoggedIn,
  setToken,
  error,
  setError,
}: LoginFormProps) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // @TODO consider if a user doesn't have an account would I redirect them to /new-user
  function onSubmit(values: z.infer<typeof loginSchema>) {
    // @TODO verify this fetch
    fetch('https://localhost:8081/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoggedIn(true);
        // @TODO what is structure of data so I can pass the token to setToken
        // setToken();
        // chrome.storage.local.set({ poste: '' }, () => {});
        redirect('/post');
      })
      .catch((e) => {
        setError(e);
      });
  }

  return (
    <>
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
      {/* @TODO Add formatting to error */}
      <p>{error}</p>
    </>
  );
}
