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

export default function RegisterForm() {
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
                  placeholder="JohnDoe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer">
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
