'use client'

import './LoginForm.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { useState } from "react";

export default function LoginForm() {

  const router = useRouter(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateCredentials = async (event: any) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Login successful');
      
      const { token } = data;
      // Store token in cookie for 7 days
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;

      router.push('/HomePage');
    } else {
      console.log('Login failed');
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
          <CardTitle className="text-3xl">Login to your account</CardTitle>
          <CardDescription className='text-[18px]'>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Link href="/RegisterPage">
              <Button variant="link" className="cursor-pointer">Sign Up</Button>
            </Link> 
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className='text-[18px]'>Email</Label>
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
                  <Label htmlFor="password" className='text-[18px]'>Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
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
          <Button type="submit" onClick={validateCredentials} className="w-full cursor-pointer">
            Login
          </Button>
          <Button variant="outline" className="w-full cursor-pointer">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
