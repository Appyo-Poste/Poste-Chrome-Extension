'use client';

import React, { useContext } from 'react';
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
import { AppContext } from './AppContext';

export const createUserSchema = z.object({
  email: z.string().min(8).max(50),
  password: z.string().min(8).max(50),
  name: z.string().min(1).max(50),
});

export function CreateUserForm() {
  const navigate = useNavigate();
  const { setToken, setIsLoggedIn } = useContext(AppContext);

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
        // response does not contain a body with the token thus we have to "login" again
        return fetch(`${process.env.API_URL}api/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setToken(`Token ${data.result.token}`);
        setIsLoggedIn(true);
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
              <FormLabel
                style={{
                  fontSize: '16px',
                  lineHeight: '20px',
                  color: '#000000',
                  fontWeight: '400',
                }}
              >
                Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder="First and last name"
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
                  style={{
                    width: '290px',
                    height: '40px',
                    borderRadius: '10px',
                    background: '#F0F0F0',
                  }}
                />
              </FormControl>
              <FormDescription>
                Your password should be at least eight characters.
              </FormDescription>
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
          Submit
        </Button>
      </form>
    </Form>
  );
}
