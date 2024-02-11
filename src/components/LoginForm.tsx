'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // @TODO consider if a user doesn't have an account would I redirect them to /new-user
  function onSubmit(values: z.infer<typeof loginSchema>) {
    fetch(`${process.env.API_URL}api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        console.log('response: ', response);
        return response.json();
      })
      .then((data) => {
        console.log('data: ', data);
        setLoggedIn(true);
        // @TODO what is structure of data so I can pass the token to setToken
        // setToken();
        // chrome.storage.local.set({ poste: '' }, () => {});
        navigate('/post');
      })
      .catch((e) => {
        setError('There was a problem logging in, please try again.');
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
