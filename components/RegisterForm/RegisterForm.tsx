'use client'

import Link from 'next/link';
import './RegisterForm.css'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Landmark } from "lucide-react";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()

  const createCredentials = async (event: any) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'ContentType': 'application/json'
      },
      body: JSON.stringify({
        user,
        email,
        password,
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('User created successfully')
      router.push('/')
    }
  }

  return (
    <div className="flex h-screen">

      <div id='intro' className="w-[70%] flex flex-col justify-center items-center">
        <div className="text-white">
          <Landmark size={60} />
          <p className="text-5xl mt-5">Welcome to</p>
          <h1 className="text-8xl">Easy Finance</h1>
          <p className="text-2xl mt-10">Your finance organizer</p>
        </div>
      </div>

      <Card className="w-[30%]">
        <CardHeader>
          <CardTitle className="text-3xl">Create your account</CardTitle>
          <CardDescription>
            Enter a new username, email and password below to login to your account
          </CardDescription>
          <CardAction>
            <Link href='/'>
                <Button variant="link" className="cursor-pointer">
                Sign In
                </Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
            <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="JohnDoe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" onClick={createCredentials} className="w-full cursor-pointer">
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
