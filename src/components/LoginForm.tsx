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

  // @TODO consider if a user doesn't have an account, would I redirect them to /new-user
  function onSubmit(values: z.infer<typeof loginSchema>) {
    fetch(`${process.env.API_URL}api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const _token = `Token ${data.result.token}`;
        setToken(_token);
        chrome.storage.local.set({ poste: _token }, () => {});
        setLoggedIn(true);
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
                <FormLabel
                  style={{
                    fontSize: '16px',
                    lineHeight: '20px',
                    color: '#000000',
                    fontWeight: '400',
                  }}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@mail.com"
                    {...field}
                    required
                    style={{
                      width: '290px',
                      height: '40px',
                      borderRadius: '10px',
                      background: '#F0F0F0',
                    }}
                  />
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
                <FormLabel
                  style={{
                    fontSize: '16px',
                    lineHeight: '20px',
                    color: '#000000',
                    fontWeight: '400',
                  }}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="**********"
                    {...field}
                    required
                    type={'password'}
                    style={{
                      width: '290px',
                      height: '40px',
                      borderRadius: '10px',
                      background: '#F0F0F0',
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            style={{
              width: '290px',
              height: '40px',
              background:
                'linear-gradient(180deg, #357497 0%, rgba(53, 116, 151, 0.69) 100%)',
              border: 'none',
              color: '#FFFFFF',
              marginTop: '60px',
              marginBottom: '15px',
            }}
          >
            Get Started
          </Button>
        </form>
      </Form>
      <p style={{ color: 'red' }}>{error}</p>
    </>
  );
}
