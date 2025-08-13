import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader } from "lucide-react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import Logo from "@/components/common/logo"
import GoogleOauthButton from "@/components/auth/google-oauth-button"
import { Input } from "@/components/ui/input"


export default function SignInPage() {

    const form = useForm()

    const onSubmit = () => { }

    const isPending = false

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <div className="flex items-center self-center gap-2">
                    <Logo />
                    Team Sync
                </div>
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Welcome back</CardTitle>
                            <CardDescription>
                                Login with your Email or Google account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="grid gap-6">
                                        <div className="flex flex-col gap-4">
                                            <GoogleOauthButton label="Login" />
                                        </div>
                                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                                Or continue with
                                            </span>
                                        </div>
                                        <div className="grid gap-3">
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                                                Email
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="m@example.com"
                                                                    className="!h-[48px]"
                                                                    {...field}
                                                                />
                                                            </FormControl>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <div className="flex items-center">
                                                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                                                    Password
                                                                </FormLabel>
                                                                <a
                                                                    href="#"
                                                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                                                >
                                                                    Forgot your password?
                                                                </a>
                                                            </div>
                                                            <FormControl>
                                                                <Input
                                                                    type="password"
                                                                    className="!h-[48px]"
                                                                    {...field}
                                                                />
                                                            </FormControl>

                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <Button
                                                disabled={isPending}
                                                type="submit"
                                                className="w-full"
                                            >
                                                {isPending && <Loader className="animate-spin" />}
                                                Login
                                            </Button>
                                        </div>
                                        <div className="text-center text-sm">
                                            Don&apos;t have an account?{" "}
                                            <Link
                                                to="/sign-up"
                                                className="underline underline-offset-4"
                                            >
                                                Sign up
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                        By clicking continue, you agree to our{" "}
                        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}
